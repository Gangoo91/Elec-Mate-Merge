import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition), the IET On-Site Guide, plus the
// Electricity at Work Regulations 1989 and HSE guidance GS6 / HSG47.

const published = '2026-05-17';
const modified = '2026-05-18';

export const workingNearLiveMainsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/working-near-live-mains-hazard-control',
  title:
    'Working Near Live Mains — Hazard Control for UK',
  description:
    'Working near live mains: identifying the hazard, control measures, safe approach distances, PPE, and the legal framework under EAWR 1989…',
  datePublished: published,
  dateModified: modified,
  readingTime: 13,
  badge: 'Method Statement & Safety Guide',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'Working Near Live Mains',
  heroPrefix: 'Working Near',
  heroHighlight: 'Live Mains',
  heroSuffix: '— Hazard Control for Electricians',
  heroSubtitle:
    'Working near live mains means working in close proximity to energised conductors or equipment where there is a real risk of inadvertent contact, induction or arc-flash exposure. This guide explains how to identify the hazard, choose proportionate control measures, comply with the Electricity at Work Regulations 1989, and document the residual risk in a defensible RAMS — without ever crossing the line into live working.',
  keyTakeaways: [
    '"Working near live mains" is not the same as live working. The conductors stay energised but the work itself is on adjacent equipment — for example, a new circuit added inside an occupied switchgear cabinet, a board change adjacent to live tails, or excavation near buried cables.',
    'The default position under EAWR 1989 Regulation 14 is dead working. If the live parts cannot be isolated, the duty holder must demonstrate it is unreasonable to do so, and apply suitable precautions.',
    'Common sources of risk: shared switchgear cabinets, overhead lines (HSE GS6 clearances), buried cables (HSE HSG47, CAT4 + Genny survey), cables concealed in walls (cable detector, RCD-protected supply).',
    'Control measures follow the standard hierarchy: identify, eliminate (isolate), substitute (re-route), engineer (barriers, insulating mats, screens), administer (permit, supervision), and finally PPE (BS EN 60900 insulated tools, gloves, eye protection, arc-rated clothing where the incident energy warrants it).',
    'Safe approach distances under HSE GS6 are the legal minimum for overhead lines — typical headroom for general access under 11 kV is 6.5 m, with greater clearances at higher voltages and dedicated barriered exclusion zones for plant.',
    'A documented method statement, supported by a RAMS and (where applicable) a permit to work, is the evidence that hazard control was planned in advance — not improvised on the day.',
  ],
  sections: [
    {
      id: 'definition',
      heading: 'What "Working Near Live Mains" Means',
      tocLabel: 'Definition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'In the UK electrical industry, "working near live mains" is a category of task carried out in close proximity to energised conductors or equipment where the conductors themselves are not the object of the work — but where the proximity creates a foreseeable risk of inadvertent contact, induction, or arc-flash exposure. Typical examples include installing a new circuit inside an occupied switchgear cabinet, replacing a consumer unit adjacent to live cut-out tails, or excavating in the vicinity of buried distribution cables.',
        },
        {
          type: 'paragraph',
          text:
            'This is a separate concept from live working. Live working — covered by HSE GS38, BS EN 50110-1 and BS 7671 Chapter 14 — is reserved for tasks that cannot be performed in any other way, such as fault diagnosis on an energised circuit. Working near live mains, by contrast, assumes that the work itself is undertaken dead but the surrounding environment remains live. The hazard control problem is therefore one of separation, barriers and discipline rather than insulated tooling alone.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Why the distinction matters',
          text:
            'Confusing "near live" with "live working" leads to under-specified RAMS. A live-work permit may be unnecessary for proximity work — but the proximity itself still demands documented control measures, competent supervision, and a justification under Regulation 14 of the Electricity at Work Regulations 1989. See the [live working method statement](/guides/method-statement-live-working) for the parallel framework.',
        },
      ],
    },
    {
      id: 'sources-of-risk',
      heading: 'Where the Hazard Comes From',
      tocLabel: 'Sources of risk',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Hazardous proximity to live mains arises in four distinct settings on UK sites. Each has its own dominant control measure and its own published HSE guidance.',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Shared switchgear cabinets — adding outgoing ways to an occupied distribution board, terminating into a live busbar chamber, or working alongside energised meter tails. The dominant control is isolation of the worked-on section + physical barrier (insulating screen, terminal cover) between the operative and the live remainder.',
            'Overhead lines — work beneath or near overhead conductors creates a strike-or-flashover risk. HSE GS6 sets minimum clearances for vehicles, plant and structures passing under or working near overhead lines. The dominant control is barriered exclusion zones, goalposts at site access points, and competent banksmen.',
            'Buried cables — excavation and ground penetration in the vicinity of distribution cables. HSE HSG47 ("Avoiding danger from underground services") sets the standard: cable plans + cable avoidance tool (CAT4) + signal generator (Genny) survey + careful hand-dig confirmation before any machine excavation within 0.5 m of an indicated service.',
            'Cables concealed in walls — chasing, drilling or fixing in plaster, masonry or timber stud walls where existing wiring is present. Use a calibrated cable, pipe and metal detector; restrict drilling to the prescribed safe zones of BS 7671 Regulation 522.6 (within 150 mm of the top or vertical edges of a wall and in line with accessories), and supply the work from an RCD-protected source as an additional precaution.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Document the source — not just the consequence',
          text:
            'A defensible RAMS records WHICH of these four hazard sources is present and references the relevant HSE guidance by name. Generic "risk of electric shock" wording will not stand up under EAWR investigation. Use the [Elec-Mate RAMS Generator](/tools/rams-generator) to produce hazard-specific entries automatically.',
        },
      ],
    },
    {
      id: 'control-measures',
      heading: 'Control Measures and the Hierarchy',
      tocLabel: 'Control measures',
      blocks: [
        {
          type: 'paragraph',
          text:
            'UK health and safety law applies the standard hierarchy of control to every electrical hazard. For working near live mains the hierarchy is interpreted as follows:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Identification — drawings, as-installed records, cable plans, cable detectors (CAT4 / Genny), thermal imaging and a pre-work walk of the area. You cannot control what you have not first identified.',
            'Elimination — isolate the part of the system being worked on. Where possible, isolate the wider section as well to remove the proximity hazard altogether. See the [safe isolation method statement](/guides/method-statement-safe-isolation).',
            'Substitution — reroute the work to a different point on the installation where live exposure is lower (e.g. tap off downstream of an isolator rather than from a live busbar).',
            'Engineering controls — insulating mats, insulating screens between live and dead sections, locked-off isolators, temporary barriers, properly rated cable covers, and tested earth conductors.',
            'Administrative controls — a written permit to work for the specific task, competent supervision, a documented method statement, a toolbox talk before the task starts, and a lockout/tagout regime on the isolators concerned. See the [permit to work guide](/guides/permit-to-work-electrical-isolation) and the [lockout/tagout guide](/guides/lockout-tagout-loto-electricians).',
            'Personal protective equipment — insulated tools to BS EN 60900, Class 0 (or higher) electrical-insulating gloves where there is foreseeable contact potential, eye and face protection, and arc-rated clothing where the calculated incident energy warrants it. PPE is the last line of defence, never the first.',
          ],
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'The "two barriers" principle',
          text:
            'Wherever practicable, ensure that two independent barriers stand between the operative and live conductors during proximity work. Examples: an isolating mat plus an insulating screen; a locked-off isolator plus a physical terminal cover; a barriered exclusion zone plus the natural insulation of the overhead conductor. A single failure should never be enough to cause a contact.',
        },
      ],
    },
    {
      id: 'gs6-overhead-lines',
      heading: 'HSE GS6 — Overhead Lines and Safe Clearances',
      tocLabel: 'Overhead lines (GS6)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE guidance note GS6 ("Avoiding danger from overhead power lines") is the reference document for any work near overhead conductors. It sets out minimum vertical and horizontal clearances for plant, vehicles, scaffolding and temporary structures passing or working under overhead lines. The exact figures depend on the line voltage and the type of plant involved, but the published general-access guidance is typical:',
        },
        {
          type: 'list',
          items: [
            'For lines up to and including 11 kV — minimum vertical clearance of approximately 6.5 m for vehicles and general site access. (Refer to GS6 for the exact figure for your voltage and plant.)',
            'For higher-voltage lines (33 kV, 132 kV, 275 kV, 400 kV) — increasing minimum clearances, set out in GS6 Table 1.',
            'Where plant must operate within the published clearance, an exclusion zone must be marked at ground level with goalposts at site access points, and a banksman must control plant movement.',
            'No part of any plant, scaffold, ladder or load is permitted to enter the published exclusion zone without the lines being made dead by the DNO.',
            'For permanent work under or near overhead lines, consult the DNO at the design stage and obtain written confirmation of clearance arrangements before work begins.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'GS6 is the legal benchmark, not a starting point',
          text:
            'The clearances in GS6 are minimums. Where weather conditions, conductor sag or the type of plant create additional uncertainty, the practical clearance must be increased accordingly. Always consult the current published version of GS6 before planning work near overhead lines.',
        },
      ],
    },
    {
      id: 'hsg47-buried-cables',
      heading: 'HSE HSG47 — Buried Cables and Underground Services',
      tocLabel: 'Buried cables (HSG47)',
      blocks: [
        {
          type: 'paragraph',
          text:
            'HSE guidance HSG47 ("Avoiding danger from underground services") is the corresponding reference for any ground penetration on or near electrical infrastructure. The methodology is well established and should be followed in sequence on every excavation:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Obtain up-to-date cable plans from the DNO and any private network owner before the work is planned.',
            'Carry out an on-site survey with a calibrated cable avoidance tool (CAT4) in power-detect mode, then signal-trace using a Genny on every services entry point. Mark all indications on the ground.',
            'Hand-dig trial pits to confirm the route, depth and condition of every indicated service before any mechanical excavation begins.',
            'No mechanical excavation within 0.5 m of an indicated service — hand-dig only inside that envelope.',
            'Where a service is exposed, support it, do not strike it, and record its location for the as-built drawings.',
            'Maintain CAT4 and Genny calibration certificates on site and within the RAMS pack.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Survey results are not optional',
          text:
            'A defensible RAMS for excavation work near electrical services must attach the cable plan, the CAT4/Genny survey marks, and the calibration certificates of the instruments. Without these, the duty holder cannot demonstrate that HSG47 was followed.',
        },
      ],
    },
    {
      id: 'when-isolation-impossible',
      heading: 'When the Mains Cannot Be Made Dead',
      tocLabel: 'When isolation is impossible',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Some work environments make full isolation of the adjacent supply unreasonable — for example, adding outgoing ways inside an occupied switchgear cabinet that feeds critical care equipment, or extending a sub-main from a board serving a 24/7 process plant. Regulation 14 of the Electricity at Work Regulations 1989 anticipates this and sets a strict three-part test:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'It is unreasonable in all the circumstances for the conductor to be made dead.',
            'It is reasonable in all the circumstances for the person to be at work on or near that conductor while it is live.',
            'Suitable precautions (including, where necessary, the provision of suitable protective equipment) are taken to prevent injury.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'All three limbs must be satisfied — and the justification must be in writing. Typical "suitable precautions" for proximity work near unisolated mains include: a written permit to work; a competent person standing by; insulating screens between live and dead sections; insulated tools to BS EN 60900; insulating gloves rated for the working voltage; arc-rated clothing where the calculated incident energy warrants it; restricted access to the room while the work is in progress; and a stop rule that any deviation from the method statement halts the work.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Document the Regulation 14 justification',
          text:
            'If a Health and Safety Executive inspector asks why the mains were not isolated, "it would have been inconvenient" is not a Regulation 14 defence. The justification — including who decided, when, on what evidence, and what compensating precautions were applied — must appear in the RAMS pack or permit to work before the task begins.',
        },
      ],
    },
    {
      id: 'documentation',
      heading: 'Documentation, Competence and Lone Working',
      tocLabel: 'Documentation and competence',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A defensible safe-system-of-work pack for proximity to live mains contains the following elements, regardless of who the duty holder is:',
        },
        {
          type: 'list',
          items: [
            'Site-specific RAMS that names the four-category hazard (shared switchgear / overhead / buried / concealed in wall), the chosen control measures, the residual risk and the responsible person. See the [RAMS template guide](/guides/electrical-rams-template-uk).',
            'A permit to work where the residual risk justifies one — typically for any proximity work to unisolated LV switchgear, any work on HV-adjacent equipment, or any excavation within 0.5 m of an indicated service.',
            'A lockout/tagout register listing every isolator that has been locked off, with the holder of the key recorded.',
            'Competence evidence — qualifications (City & Guilds 2391, 2365, 2382), 18th Edition currency, voltage-test instrument competence, and any specific arc-flash awareness training where the environment justifies it.',
            'Lone-worker arrangements where the work is planned outside normal supervision — see the [lone working guide](/guides/lone-working-electricians).',
            'Where work is at height (e.g. on a pole, in a ceiling void, on a roof near service entry cables), the working-at-height controls — see the [working at height guide](/guides/working-at-height-electricians).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Build the pack once, reuse for the project',
          text:
            'A well-built RAMS pack for proximity work is reusable across a project — the site address, the operative names and the date change, but the hazard analysis and the control measures remain stable. The Elec-Mate RAMS Generator stores the pack and clones it for repeat tasks, keeping every issued version on file for audit.',
        },
      ],
    },
  ],
  howToHeading: 'How to plan proximity work step by step',
  howToDescription:
    'A repeatable sequence for any task that brings an operative within touching distance of energised mains.',
  howToSteps: [
    {
      name: 'Survey and identify the live parts',
      text:
        'Walk the area before any work is priced. Confirm the location of every live conductor — drawings, as-installed records, cable detector (CAT4 + Genny for buried), thermal imaging for warm joints. Photograph the area and mark up the drawings. Identify which of the four hazard categories applies (shared switchgear / overhead / buried / concealed).',
    },
    {
      name: 'Apply the control hierarchy in writing',
      text:
        'Decide what can be isolated and isolate it. Decide what cannot reasonably be isolated and write the Regulation 14 justification. Record the engineering controls (mats, screens, locks, barriers), the administrative controls (permit, supervision, exclusion zone) and the PPE specification. Generate the RAMS using the [Elec-Mate RAMS Generator](/tools/rams-generator).',
    },
    {
      name: 'Issue the permit and brief the team',
      text:
        'Issue a written permit to work where the residual risk justifies it. Hold a toolbox talk that walks the operatives through the RAMS, the permit conditions, the emergency procedure, and the stop rule. Confirm every signatory understands the live boundary and the exclusion zone.',
    },
    {
      name: 'Lock off, prove dead, double-prove',
      text:
        'Apply the safe-isolation procedure to every isolator that the RAMS requires to be locked off. Apply lockout/tagout. Prove dead with a GS38-compliant voltage indicator that has been verified against a known live source before and after testing. See the [safe isolation method statement](/guides/method-statement-safe-isolation).',
    },
    {
      name: 'Carry out the work with the live boundary in sight',
      text:
        'Maintain the engineering and administrative controls for the whole duration. The competent person on site has authority to stop the work if any control fails or any unforeseen condition appears. Photographic evidence of the boundary, the locks and the PPE in use forms part of the record.',
    },
    {
      name: 'Close out, restore and record',
      text:
        'On completion, remove tooling and temporary barriers, withdraw the permit, remove locks under the lockout/tagout procedure, and restore supplies in the reverse sequence to isolation. File the RAMS, the permit, the photos and the test results in the project record.',
    },
  ],
  faqs: [
    {
      question:
        'Is working near live mains the same as live working?',
      answer:
        'No. Live working is intervention on energised conductors themselves — for example, fault-finding on an energised circuit or hot-stick maintenance. Working near live mains is undertaking dead work in close proximity to energised conductors that remain energised throughout. The two have separate method statements, separate competence requirements and separate permits, although both must satisfy Regulation 14 of the Electricity at Work Regulations 1989.',
    },
    {
      question:
        'Does the Electricity at Work Regulations 1989 cover proximity work?',
      answer:
        'Yes. Regulation 4 imposes a general duty to construct, maintain and work on electrical systems so as to prevent danger. Regulation 14 specifically addresses work on or near live conductors, and applies whether the live exposure is direct (the conductor being worked on) or indirect (a nearby conductor that could be touched, struck or arced to). Proximity work falls squarely within Regulation 14, and the three-limb test in that regulation must be satisfied and documented.',
    },
    {
      question:
        'What is the minimum safe approach distance for an 11 kV overhead line?',
      answer:
        'HSE GS6 publishes the figures and they are the legal benchmark. For general vehicle and plant access under an 11 kV line, a vertical clearance of approximately 6.5 m is typical, with the precise figure and any horizontal exclusion zone depending on the plant and the line configuration. Always consult the current version of GS6 and, for permanent installations or sustained plant operations, consult the distribution network operator and obtain written confirmation of the arrangements.',
    },
    {
      question:
        'Can I machine-excavate close to a buried cable if my CAT4 survey is clear?',
      answer:
        'No. HSE HSG47 sets the methodology and it is sequential, not selective. A clear CAT4 survey alone does not authorise machine excavation. The published practice is: plans + CAT4/Genny survey + hand-dug trial pits to confirm location and depth + no mechanical excavation within 0.5 m of an indicated service. The 0.5 m hand-dig envelope is the last engineering barrier between a tracked excavator and a cable strike. Treat it as inviolate.',
    },
    {
      question:
        'What PPE is required for working near live LV switchgear?',
      answer:
        'PPE must be specified by a risk assessment of the specific task and environment, not by generic rule. For proximity work to LV switchgear it commonly includes: insulated hand tools to BS EN 60900; insulating gloves of an appropriate electrical class; eye and face protection rated for arc-flash if the calculated incident energy warrants it; and arc-rated clothing where the incident energy exceeds the threshold for ordinary workwear. Where the incident energy is significant, an arc-flash hazard analysis should be carried out and the PPE specified to the resulting category.',
    },
    {
      question:
        'When does proximity work need a permit to work?',
      answer:
        'A permit to work is the documented authorisation that the safe-system-of-work measures are in place and that named operatives may proceed. For proximity work, a permit is typically required where: the adjacent supply cannot reasonably be isolated; the work is on or adjacent to HV equipment; the work is inside an occupied switchgear cabinet feeding critical loads; or the residual risk after engineering and administrative controls remains significant. See the [permit to work guide](/guides/permit-to-work-electrical-isolation) for the full framework.',
    },
    {
      question:
        'Are the BS 7671 safe zones in walls a guarantee that no cables are present?',
      answer:
        'No. The safe zones in Regulation 522.6 are where cables should be installed in vertical walls — within 150 mm of the top of the wall or vertical edges, and in line with accessories. They are a likelihood, not a guarantee. Always use a calibrated cable, pipe and metal detector before drilling, supply the work from an RCD-protected source as an additional precaution, and treat any unexpected resistance during drilling as a potential cable strike until proven otherwise.',
    },
  ],
  relatedPages: [
    {
      href: '/tools/rams-generator',
      title: 'RAMS Generator',
      description:
        'Produce a site-specific Risk Assessment and Method Statement for proximity work, isolation, excavation or live tasks.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/method-statement-safe-isolation',
      title: 'Method Statement — Safe Isolation',
      description:
        'The canonical safe-isolation procedure for UK electricians, with GS38 voltage-indicator verification and lockout/tagout.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/method-statement-live-working',
      title: 'Method Statement — Live Working',
      description:
        'The parallel framework for tasks that genuinely cannot be made dead — competence, permits, PPE and stop rules.',
      icon: 'Zap',
      category: 'Guide',
    },
    {
      href: '/guides/permit-to-work-electrical-isolation',
      title: 'Permit to Work — Electrical Isolation',
      description:
        'When a permit is required, what it must contain, and how to issue and close one out under EAWR 1989.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/lockout-tagout-loto-electricians',
      title: 'Lockout/Tagout for UK Electricians',
      description:
        'Lock-off devices, multi-padlock hasps and tagout regimes that keep an isolator dead while proximity work proceeds.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/electrical-rams-template-uk',
      title: 'Electrical RAMS Template (UK)',
      description:
        'What a defensible RAMS contains for any UK electrical task — hazards, controls, residual risk, signatories.',
      icon: 'FileText',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Generate a proximity-work RAMS in minutes',
  ctaSubheading:
    'The Elec-Mate RAMS Generator builds a site-specific RAMS for working near live mains — naming the hazard category, the HSE guidance (GS6 / HSG47), the engineering and administrative controls, the PPE specification, the Regulation 14 justification where it applies, and the permit-to-work cross-reference. Aligned to BS 7671:2018+A4:2026 and EAWR 1989. 7-day free trial, cancel anytime.',
};
