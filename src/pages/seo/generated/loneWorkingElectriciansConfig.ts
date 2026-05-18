import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in the Management of Health and Safety at Work Regulations
// 1999, HSE guidance INDG73 (lone working), BS 7671:2018+A4:2026 (18th
// Edition) and the Electricity at Work Regulations 1989.

const published = '2026-05-17';
const modified = '2026-05-18';

export const loneWorkingElectriciansConfig: GeneratedGuideConfig = {
  pagePath: '/guides/lone-working-electricians',
  title: 'Lone Working Procedures for UK Electricians | Elec-Mate',
  description:
    'Lone working procedures for UK electricians: what counts as lone working in the trade…',
  datePublished: published,
  dateModified: modified,
  readingTime: 12,
  badge: 'Health & Safety Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'Lone Working — Electricians',
  heroPrefix: 'Lone Working Procedures',
  heroHighlight: 'for UK Electricians',
  heroSuffix: '',
  heroSubtitle:
    'Most UK electricians work alone for at least part of their week — domestic call-outs, after-hours commercial work, void properties, plant rooms in unstaffed buildings. Lone working is not banned, but it is regulated, and certain tasks must never be done alone. This guide explains what counts as lone working in an electrical context, the legal framework, control measures that actually work on site, the tasks you should refuse to do alone, and the mental health side that the trade has historically ignored.',
  keyTakeaways: [
    'Lone working is not illegal — but the duty holder must assess and control the risk under the Management of Health and Safety at Work Regulations 1999 and follow HSE guidance INDG73 ("Protecting lone workers").',
    'In the electrical trade, lone working covers customer premises call-outs, after-hours work, unstaffed plant rooms, remote infrastructure (substations, renewables), and multi-floor jobs where colleagues are out of sight and sound.',
    'Certain tasks must NOT be undertaken alone: live working, work at height above 2 metres, confined-space entry, and work in any location where escape would be impeded if something went wrong.',
    'Control measures include a written lone-working policy, task-specific risk assessment, scheduled phone check-ins, lone-worker apps with man-down/no-movement detection, location sharing, and a clear emergency contact procedure.',
    'Mental health is part of lone-working risk. Prolonged isolation in the trades is linked to higher rates of anxiety and depression. Charities such as Mates in Mind and the Electrical Industries Charity provide free, confidential support.',
    'Document everything. A lone-working policy, signed risk assessment and a logged check-in pattern is what protects the duty holder, the electrician and the customer if anything goes wrong.',
  ],
  sections: [
    {
      id: 'what-is-lone-working',
      heading: 'What Counts as Lone Working for an Electrician',
      tocLabel: 'What lone working means',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE defines a lone worker as anyone who works by themselves without close or direct supervision. In an electrical context that net is wider than most people realise — it covers far more than just a solo domestic call-out.',
        },
        {
          type: 'list',
          items: [
            'Working at customer premises alone — domestic faults, EICRs, consumer-unit changes, EV charger installs where you are the only operative on site.',
            'After-hours or out-of-hours work — commercial fit-outs, shop refits, retail park maintenance carried out overnight when the building is otherwise empty.',
            'Unstaffed or remote buildings — void properties, holiday lets between tenants, plant rooms, riser cupboards, substations, telecoms huts, rural pump stations and renewable-generation sites.',
            'Multi-floor or large-site work where colleagues are technically on site but out of sight and out of audible range — for example, you on level 4 and your mate on level 1 of a strip-out.',
            'Mobile work between sites — driving alone between jobs all day with no scheduled contact is itself a lone-working scenario.',
            'Apprentices left to complete second-fix or testing on their own when the qualified supervisor is at a different property.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: '"Alone" includes "out of sight and sound"',
          text:
            'A colleague three floors away who cannot see or hear you, and who is not on a scheduled check-in pattern, does not change your lone-worker status. The test is whether someone could realistically detect that you are in trouble and respond in time.',
        },
      ],
    },
    {
      id: 'risks',
      heading: 'The Specific Risks Lone Electricians Face',
      tocLabel: 'Risks',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Lone working does not create new electrical hazards — the cable is just as live whether you are alone or with a mate. What lone working changes is the consequence severity and the time-to-help if anything goes wrong. The risks worth assessing fall into five buckets:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Delayed alarm raising after injury — electric shock, fall, burn, manual-handling injury or sudden medical event (cardiac, stroke). If you cannot reach a phone, the clock keeps ticking.',
            'No witness to the incident — for RIDDOR reportable events, insurance claims, or HSE investigation, an unwitnessed incident is harder to evidence and harder to learn from.',
            'Prolonged exposure to a hazard — a partial shock, smoke inhalation, or arc-flash burn that would normally prompt an immediate response from a colleague can worsen significantly if you are alone and disoriented.',
            'Aggressive customers, intruders or unsafe premises — domestic call-outs to addresses with no prior site information carry a real personal-safety risk that lone working amplifies.',
            'Mental fatigue and decision drift — long solo days lead to skipped steps, rushed isolation, weaker test discipline. Errors of judgement increase when there is no second pair of eyes to challenge a decision.',
          ],
        },
      ],
    },
    {
      id: 'legal-framework',
      heading: 'The Legal Framework',
      tocLabel: 'Legal framework',
      blocks: [
        {
          type: 'paragraph',
          text:
            'There is no single "Lone Workers Act" in UK law. Instead, lone working is governed by a stack of overlapping duties — primarily under health and safety legislation, and supplemented by industry guidance:',
        },
        {
          type: 'list',
          items: [
            'Management of Health and Safety at Work Regulations 1999 — duty holders must carry out suitable and sufficient risk assessments. Lone working is an explicit consideration. The hierarchy of control (eliminate, reduce, isolate, control, PPE, discipline) applies.',
            'Health and Safety at Work etc. Act 1974 — the umbrella duty: employers must ensure the health, safety and welfare of employees so far as is reasonably practicable. Self-employed electricians owe the same duty to themselves and to anyone affected by their work.',
            'HSE INDG73 — "Protecting lone workers: How to manage the risks of working alone." Free HSE guidance booklet. The reference text for procedure, communication and emergency planning.',
            'Electricity at Work Regulations 1989 — Regulations 14 (work on or near live conductors) and 16 (persons to be competent) interact directly with lone working: certain regulatory duties are effectively impossible to discharge alone.',
            'BS 7671:2018+A4:2026 (18th Edition) — safe isolation, dead-testing, and the prohibition on live working except where unavoidable. These cross-reference EAWR 1989 and have practical consequences for lone electricians.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'There is no legal ban on lone working',
          text:
            'HSE is explicit: lone working is permitted provided the risks have been properly assessed and controlled. The duty is to assess, control and review — not to refuse all solo work. The exception is the small set of tasks that legislation or industry practice treats as never-alone, covered below.',
        },
      ],
    },
    {
      id: 'control-measures',
      heading: 'Control Measures That Work on Site',
      tocLabel: 'Control measures',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A lone-working policy that lives in a folder nobody reads is worthless. The controls below are the ones HSE expects to see in practice — and the ones that survive a real incident investigation:',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Written lone-working policy — short, signed by the duty holder, reviewed annually. Cover who can lone work, what they can do alone, what they cannot, and the check-in pattern.',
            'Task-specific risk assessment — generic blanket assessments do not satisfy MHSWR 1999. Each lone-working scenario (domestic EICR, void-property first fix, after-hours retail strip-out) needs its own assessment. The [RAMS generator](/tools/rams-generator) speeds this up without losing rigour.',
            'Scheduled phone check-ins — agree call times in advance (e.g. start of shift, mid-morning, lunch, mid-afternoon, end of shift). Missed call triggers an escalation pattern: ring, ring again, ring emergency contact, ring 999 if no contact within an agreed window.',
            'Lone-worker app with man-down / no-movement detection — modern apps trigger an alert if the device is motionless or tilted abnormally for a set period. SOS button with GPS location sharing. Battery and signal monitoring.',
            'Location sharing — the simplest control. Your office, partner or designated contact knows where you are and what time you will be done. Calendar / shared location is enough for most jobs.',
            'Time-limited tasks — set a maximum solo work duration and book a second operative in for anything beyond it. "I will be no more than 2 hours" is a control measure if it is actually enforced.',
            'Emergency contact procedure — every lone worker should know the exact phone number, escalation order, and what information to give. Practice the call once a year.',
            'Pre-work site information — for unfamiliar addresses, get a site description, known hazards, access notes and (for domestic) any flags from the customer. Refuse to attend if pre-work info is missing on higher-risk jobs.',
          ],
        },
      ],
    },
    {
      id: 'tasks-not-alone',
      heading: 'Tasks You Must Not Do Alone',
      tocLabel: 'Never-alone tasks',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A subset of electrical work is treated by industry and regulators as never-alone. The reasoning is not "two pairs of hands" — it is that the consequence of a single mistake is so severe that a second person is required to raise the alarm, isolate, and effect rescue. Do not attempt these tasks solo regardless of commercial pressure:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Live working — testing or working on conductors that have not been proven dead. EAWR 1989 Regulation 14 already restricts live work to scenarios where it is unreasonable to work dead AND suitable precautions are in place. A safety person (an "accompanying person" trained to rescue from electric shock) is one of those precautions and is incompatible with lone working. See our guide on [working near live mains](/guides/working-near-live-mains-hazard-control).',
            'Work at height above 2 metres on a stepladder, ladder, MEWP or scaffold — the combination of fall risk plus electrical injury means a second person is needed both to spot and to call for help if you fall. Detail in our [working at height](/guides/working-at-height-electricians) guide.',
            'Confined-space entry — risers, ducts, plant pits, basement transformer rooms, large enclosed switchrooms with limited egress. Confined Spaces Regulations 1997 effectively require a top-side attendant.',
            'Any work where escape is impeded — locked plant rooms, work behind heavy plant where the route out could be blocked, work in locations where smoke from an electrical fire would prevent egress.',
            'High-voltage (HV) switching, racking or earthing — governed by separate HV operational procedures, always two-person under permit.',
            'First-fix or rescue in domestic premises where the customer is hostile, intoxicated, or where a prior risk flag has been raised — refuse and rebook with a colleague present.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Commercial pressure is not a defence',
          text:
            'If a customer, employer or principal contractor pressures you to do never-alone work solo, the answer is no. HSE and the courts will not accept "the client wanted it finished today" as a defence to a Regulation 14 prosecution or a fatal-accident investigation.',
        },
      ],
    },
    {
      id: 'mental-health',
      heading: 'The Mental Health Side of Lone Working',
      tocLabel: 'Mental health',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The trade has historically treated lone-working risk as purely physical — shock, fall, burn. The mental health dimension is real and has measurable consequences. Construction has one of the highest suicide rates of any sector in the UK. Prolonged solo work, financial pressure, and a culture that discourages talking are all contributors.',
        },
        {
          type: 'list',
          items: [
            'Isolation amplifies stress — long stretches without conversation reduce the chance of catching fatigue, frustration or low mood before they affect work quality and decision-making.',
            'Anxiety and depression are recognised occupational risks for trades — the data is published by Mates in Mind, the Lighthouse Construction Industry Charity, and the Electrical Industries Charity.',
            'Mates in Mind — UK construction-sector mental health charity providing free training and resources for employers. matesinmind.org.',
            'Electrical Industries Charity — confidential support for electricians and their families: financial, legal, bereavement, mental health. electricalcharity.org.',
            'Lighthouse Construction Industry Charity 24/7 helpline — 0345 605 1956 in the UK. Free, confidential, manned by qualified counsellors.',
            'Samaritans — 116 123, free from any phone, 24/7. Not construction-specific but available immediately when nothing else is.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Build a check-in pattern that asks the real question',
          text:
            'The scheduled phone check-in is also an opportunity for a short, honest "how are you doing today" — not just "are you alive." A 30-second conversation costs nothing and is the single most reliable way to spot a problem before it becomes a crisis.',
        },
      ],
    },
    {
      id: 'documentation',
      heading: 'Documentation That Protects Everyone',
      tocLabel: 'Documentation',
      blocks: [
        {
          type: 'paragraph',
          text:
            'When something goes wrong on a lone-working job, HSE, insurance and the courts ask three questions: was there a risk assessment, were the controls followed, and was it documented. The paperwork below is the minimum that survives scrutiny:',
        },
        {
          type: 'list',
          items: [
            'Written lone-working policy — signed and dated, reviewed annually. One page is fine if it covers scope, never-alone tasks, check-in pattern and emergency procedure.',
            'Task-specific Risk Assessment & Method Statement (RAMS) — generated per job, not copy-pasted. Our [electrical RAMS template](/guides/electrical-rams-template-uk) walks through the structure.',
            'Safe isolation record — every lone job that involves working dead should produce a [safe isolation method statement](/guides/method-statement-safe-isolation) record, signed and dated, with lock-off device used.',
            'Check-in log — the simplest possible record: time, name, location, status. Can live in WhatsApp, a shared spreadsheet, or a lone-worker app log.',
            'Near-miss register — a missed check-in, a refused job, a customer-aggression incident: all near-misses should be logged under the [near-miss reporting](/guides/near-miss-reporting-electricians) process. They are the early warning signal for the next serious incident.',
            'Site induction record — for principal-contractor sites, the [site induction record](/guides/site-induction-electrical-contractors) confirms you have been briefed on local emergency procedures, which matter more when you are alone.',
            'Project-level controls under [CDM 2015](/guides/cdm-2015-for-electricians) — the principal contractor has duties around lone-working on notifiable projects. Make sure your scope is reflected in the construction phase plan.',
          ],
        },
      ],
    },
  ],
  howToHeading: 'How to set up safe lone working in your business',
  howToDescription:
    'A practical four-to-six step rollout that meets HSE INDG73 expectations and gives you defensible documentation.',
  howToSteps: [
    {
      name: 'Write a one-page lone-working policy',
      text:
        'State who can work alone, what tasks are permitted alone, the never-alone list (live work, height above 2 m, confined space, impeded-escape locations), the check-in pattern, and the emergency escalation procedure. Sign and date it. Review annually.',
    },
    {
      name: 'Produce task-specific risk assessments',
      text:
        'For each recurring lone-working scenario (domestic EICR, void first-fix, after-hours commercial, plant-room maintenance), generate a RAMS that names the hazards, the controls and the residual risk. Do not rely on a single generic assessment — MHSWR 1999 expects task-specificity.',
    },
    {
      name: 'Deploy a check-in pattern and lone-worker app',
      text:
        'Agree scheduled call times with a named contact. Install a lone-worker app with man-down and SOS features on every operative\'s phone. Test the app, the SOS, and the escalation chain once before relying on them in the field.',
    },
    {
      name: 'Train and brief operatives',
      text:
        'Walk every operative — including apprentices and subcontractors — through the policy, the never-alone list, the app, and the emergency procedure. Record the briefing. Repeat annually and after any incident or near-miss.',
    },
    {
      name: 'Log near-misses and review monthly',
      text:
        'Capture missed check-ins, refused jobs, customer-aggression incidents and any equipment failure. Review the log monthly. Use it to retune the policy — if a control is failing in practice, change it before the next incident.',
    },
    {
      name: 'Build mental-health support into the routine',
      text:
        'Add a real "how are you doing" question to the check-in pattern. Put the Lighthouse 24/7 helpline (0345 605 1956), Electrical Industries Charity and Samaritans (116 123) numbers on every operative\'s phone home screen. Normalise the conversation.',
    },
  ],
  faqs: [
    {
      question: 'Is lone working as an electrician legal in the UK?',
      answer:
        'Yes — there is no general legal prohibition on lone working in the UK. The Management of Health and Safety at Work Regulations 1999 and HSE guidance INDG73 require duty holders to assess and control the risks. Certain tasks (live working, work at height above 2 m, confined-space entry, work where escape is impeded) should not be carried out alone, but the rest of the trade routinely involves periods of solo work and is lawful provided risk assessment and control measures are in place.',
    },
    {
      question: 'Can I carry out an EICR on my own?',
      answer:
        'For most domestic and small commercial installations, yes — an EICR on a de-energised installation is widely treated as a permissible lone-working task provided you have completed safe isolation, you have a documented check-in pattern, and the installation does not involve confined-space access or work at height above 2 m. Larger commercial or industrial EICRs that involve live testing, HV elements, or restricted-egress plant rooms should not be carried out alone.',
    },
    {
      question: 'Do I need a lone-worker app, or is a phone enough?',
      answer:
        'A phone with scheduled check-ins is the legal minimum and is often sufficient for lower-risk lone working. A lone-worker app adds man-down detection, SOS with GPS, and automatic escalation if you do not respond — useful where injury could prevent you reaching the phone (falls, severe shock, sudden medical events). For higher-risk lone work and as best practice for any operative working in unstaffed buildings, an app-based solution is strongly recommended by HSE INDG73.',
    },
    {
      question: 'What if a customer refuses to leave the property while I work?',
      answer:
        'You are not in a confined-space or never-alone scenario simply because a customer is present, but their presence does not satisfy the "second competent person" requirement either — a customer is not a trained rescuer. You can proceed with normal lone-working controls, but if the customer becomes aggressive, intoxicated or otherwise unsafe, stop work, leave the property, log the incident as a near-miss and rebook with a colleague present.',
    },
    {
      question: 'Is an apprentice considered a lone worker?',
      answer:
        'An apprentice working on their own at a site where the supervising electrician is not present is a lone worker — and is usually a higher-risk lone-working scenario because of their experience level. Apprentices should not be left alone to carry out work outside their competence, and the supervising electrician retains responsibility for assessing what tasks the apprentice can lawfully and safely complete without direct supervision.',
    },
    {
      question: 'What should I do if I miss a check-in?',
      answer:
        'The check-in pattern only works if the missed call triggers a documented escalation. The standard pattern is: contact tries to reach you (call, then text). If no response within an agreed window (typically 15–30 minutes), they contact a second number (partner, supervisor). If still no response, they call 999 with your last known location and the nature of the work. The pattern only protects you if everyone in the chain knows their part — practise it once a year.',
    },
    {
      question: 'Where can I get mental-health support as a lone-working electrician?',
      answer:
        'The Electrical Industries Charity provides free, confidential support tailored to the electrical trade — financial, legal, bereavement, mental health. Mates in Mind is the construction-sector mental health charity. The Lighthouse Construction Industry Charity runs a 24/7 helpline on 0345 605 1956. Samaritans (116 123) is available 24/7 to anyone, free from any UK phone. None of these will appear on a regulatory return and none of them charge.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Generate task-specific Risk Assessment & Method Statements for lone working, live work, height work and confined space.',
      icon: 'FileText',
      category: 'Tool',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description:
        'Free RAMS template structure for UK electrical work — hazards, controls, residual risk, sign-off.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Safe Isolation Method Statement',
      description:
        'The core method statement every lone-working electrician needs — proving dead, lock-off, sign-off.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/working-near-live-mains-hazard-control',
      title: 'Working Near Live Mains',
      description:
        'Hazard control for any work that approaches live conductors — when EAWR 1989 Reg 14 applies, and why a safety person is required.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/working-at-height-electricians',
      title: 'Working at Height for Electricians',
      description:
        'Why work at height above 2 m is a never-alone task, and the controls that apply for ladders, MEWPs and scaffold.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/near-miss-reporting-electricians',
      title: 'Near-Miss Reporting',
      description:
        'How to log missed check-ins, refused jobs and lone-working incidents — the early warning data that prevents the next serious accident.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate compliant lone-working RAMS in under five minutes',
  ctaSubheading:
    'Elec-Mate\'s RAMS Generator produces task-specific Risk Assessment & Method Statements aligned to HSE INDG73, MHSWR 1999, EAWR 1989 and BS 7671:2018+A4:2026 — with lone-working controls, check-in patterns and emergency procedures already mapped to the hazards on your job. Start a 7-day free trial, cancel anytime.',
};
