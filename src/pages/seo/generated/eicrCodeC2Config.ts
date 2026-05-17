import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-05-17';
const modified = '2026-05-17';

export const eicrCodeC2Config: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-code-c2-potentially-dangerous',
  title:
    'EICR Code C2 — Potentially Dangerous | Urgent Remedial Action | Elec-Mate',
  description:
    'EICR code C2 explained: when to use it (and when not to), real-world examples from UK installations, why C2 makes the EICR "unsatisfactory", and what the responsible person must do. BS 7671:2018+A4:2026 and IET GN3 aligned.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'EICR Observation Code',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'EICR Code C2',
  heroPrefix: 'EICR Code',
  heroHighlight: 'C2',
  heroSuffix: '— Potentially Dangerous',
  heroSubtitle:
    'C2 is the most common "unsatisfactory" classification on UK EICRs. It means the condition is potentially dangerous and urgent remedial action is necessary — but danger is not yet present. This guide explains exactly when to assign C2, the most-coded C2 defects in real homes, and what landlords and duty holders must do once a C2 lands on their report.',
  keyTakeaways: [
    'C2 means "Potentially dangerous — urgent remedial action is necessary." The condition is dangerous in principle but not actively harming anyone at the moment of inspection.',
    'C2 makes the overall EICR assessment "unsatisfactory" — same legal effect as a C1, just less immediate.',
    'C2 is the most commonly assigned classification on UK domestic EICRs — missing bonding, plastic consumer units in HMOs, missing RCD protection on socket-outlet circuits are typical C2 territory.',
    'For private rented properties, the PRS Electrical Safety Regs (England) 2020 require C2 remedial work to be completed and written confirmation provided to the tenant and local authority within 28 days.',
    'C2 must not be downgraded to C3 if the evidence supports C2 — BS 7671 / GN3 require the higher classification when both could apply.',
    'A C2 observation should describe both the defect AND the potential consequence (e.g., "missing main protective bonding could result in dangerous voltages on extraneous-conductive-parts under fault conditions").',
  ],
  sections: [
    {
      id: 'c2-definition',
      heading: 'What C2 Means',
      tocLabel: 'Definition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'C2 is defined as: "Potentially dangerous — urgent remedial action is necessary." This classification indicates an observed condition that is potentially dangerous and requires prompt remedial action to remove the hazard. The key word is "potentially" — the condition has the capacity to cause harm under foreseeable circumstances, but the harm is not yet occurring.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Same EICR outcome as C1, different timeline',
          text:
            'Where any observation attracts a code of C1 or C2, the overall assessment of the Electrical Installation Condition Report shall be recorded as "unsatisfactory". The difference is operational: C1 requires immediate action before the inspector leaves; C2 requires urgent action on a documented timeline.',
        },
      ],
    },
    {
      id: 'common-c2-defects',
      heading: 'The Most-Coded C2 Defects in UK Homes',
      tocLabel: 'Common C2 defects',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Across thousands of UK domestic EICRs, the same handful of defects account for the majority of C2 codes. Recognising them on sight is a core competency for an inspecting electrician:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Missing or inadequate main protective bonding to extraneous-conductive-parts (gas, water, oil) — Regulation 411.3.1.2 and 544.1.1.',
            'Plastic consumer unit in a domestic dwelling (especially HMO or rented) — non-compliant with Regulation 421.1.201 since 2016.',
            'Missing RCD protection on socket-outlet circuits intended for general use — Regulation 411.3.3.',
            'No supplementary equipotential bonding in older bathroom installations where required by previous editions.',
            'Inadequate disconnection time / Zs above maximum permitted — Regulation 411.3.2 and Table 41.2/41.3.',
            'Loose terminals at consumer unit (visible heat damage, signs of arcing) — Regulation 526.1.',
            'Cables not adequately supported, prone to premature collapse in fire — Regulation 521.10.202.',
            'Borrowed neutral between circuits sharing a final circuit destination — Regulation 314 / 521.8.',
            'Damaged but contained cable sheath where bare conductors are not exposed but the protective sheath is compromised.',
            'Missing earth conductor on a circuit (visible at consumer unit, not yet causing fault).',
          ],
        },
      ],
    },
    {
      id: 'c2-decision-rule',
      heading: 'The C1 / C2 / C3 Decision Rule',
      tocLabel: 'When C2 vs C1 vs C3',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Choosing between C1, C2 and C3 is the most consequential decision an inspector makes. BS 7671 and GN3 set a strict hierarchy:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'C1 — danger is present right now. Someone can be hurt before the inspector finishes the report.',
            'C2 — danger could become present under foreseeable conditions (a fault, a maintenance activity, a child accessing equipment, a flood). Urgent action is needed, but danger is not yet active.',
            'C3 — the condition departs from BS 7671 but does not create danger now or under foreseeable conditions. An improvement is recommended.',
            'FI — the inspector cannot determine which code applies without further investigation or testing.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Acceptance criterion',
          text:
            'C3 ("Improvement recommended") shall be attributed only where C1 ("Danger present") or C2 (potentially dangerous / non-compliant) do not apply. Practitioners shall not use C3 if evidence supports C1 or C2 classifications.',
        },
      ],
    },
    {
      id: 'c2-recording',
      heading: 'How to Record a C2 on the EICR',
      tocLabel: 'How to record',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A C2 observation needs more than a one-line note — it must give the responsible person enough information to commission remedial work without further site visits.',
        },
        {
          type: 'list',
          items: [
            'Record in Section K ("Observations") of the EICR with the classification code "C2".',
            'Describe the defect factually: what was observed, where in the installation, the regulation cited.',
            'State the potential consequence (e.g., "could result in dangerous voltage on extraneous-conductive-parts under fault conditions").',
            'Cross-reference the relevant BS 7671:2018+A4:2026 regulation number where applicable.',
            'Recommend specific remedial action (e.g., "install 10 mm² main protective bonding conductor to gas / water service").',
            'Provide a photograph where possible.',
          ],
        },
      ],
    },
    {
      id: 'c2-prs-regs',
      heading: 'C2 in Rented Properties — PRS Regs 2020',
      tocLabel: 'Rented properties',
      blocks: [
        {
          type: 'paragraph',
          text:
            'For private rented dwellings in England, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020 made EICR compliance legally binding on landlords. A C2 on the report triggers a clear 28-day timeline:',
        },
        {
          type: 'list',
          items: [
            'Landlord receives the EICR with C2 classification.',
            'Remedial work must be carried out by a qualified person within 28 days of the EICR (or earlier if the report specifies a shorter period).',
            'Written confirmation of the remedial work — typically an EIC or Minor Works Certificate — must be provided to the tenant within 28 days of completion.',
            'A copy must also be supplied to the local authority on request.',
            'Failure to comply can result in financial penalties of up to £30,000 per breach.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Welsh, Scottish and NI variations',
          text:
            'Wales, Scotland and Northern Ireland have parallel but distinct private rented sector regimes. The 28-day C2 remedial window is specific to England 2020 — check the local jurisdiction\'s electrical safety regulations for the equivalent timeline.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is a plastic consumer unit always a C2?',
      answer:
        'Not always, but usually in modern dwellings. Regulation 421.1.201 (introduced January 2016 in BS 7671:2008+A3, retained through A4:2026) requires consumer units in domestic premises to have non-combustible enclosures. A plastic consumer unit installed before that date is generally a C3 ("improvement recommended") on departure-from-current-standards grounds — but where the consumer unit is in a rented HMO, has signs of heat damage, is positioned under a wooden staircase (escape route), or where the local fire authority has specific guidance, C2 is appropriate. Document the rationale clearly.',
    },
    {
      question: 'Should missing main bonding always be a C2?',
      answer:
        'Almost always, yes. Missing main protective bonding to extraneous-conductive-parts (gas, water, oil services) is a textbook C2 because under fault conditions, dangerous voltage could appear on those services — which are accessible throughout the dwelling. The exception is where the structure has no extraneous-conductive-parts (e.g., all-plastic plumbing, no metallic gas) — but the inspector must verify and document that.',
    },
    {
      question: 'How long does the responsible person have to fix a C2?',
      answer:
        'For private rented properties in England under the 2020 regulations: 28 days from the date of the EICR (or shorter if specified). For owner-occupied properties: there\'s no statutory timeline, but professional good practice and PII expect remedial work within weeks, not months. The EICR copy must record any extended remediation timeline the responsible person commits to in writing.',
    },
    {
      question: 'Can I assign C2 to a defect that has existed for years without harm?',
      answer:
        'Yes — duration of existence is not a defence against C2 classification. The classification is based on whether the condition is potentially dangerous under foreseeable circumstances, not whether harm has occurred. A 30-year-old installation with missing bonding has been "lucky" — the C2 still applies and remedial work is still required.',
    },
    {
      question: 'What if my C2 turns out to have been C1 once I dig deeper?',
      answer:
        'This is exactly why the FI ("Further investigation required") code exists. If during initial inspection you believe a defect is C2 but suspect it might escalate to C1, code it FI with a note explaining what additional testing or inspection is needed. Once you\'ve done the further investigation, issue a supplementary observation with the final classification. Do not retrospectively change a coded observation without explicit re-issue documentation.',
    },
    {
      question: 'Do C2 observations stay "live" through the recommended periodic interval?',
      answer:
        'No. A C2 represents a condition needing urgent remedial action. The recommended periodic inspection interval (typically 5 or 10 years for domestic) assumes the installation is satisfactory at the point of inspection. A C2 EICR is "unsatisfactory" — the next EICR is needed once remedial work has been completed and a new "satisfactory" report can be issued, not 5 years from the C2 date.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-code-c1-danger-present',
      title: 'EICR Code C1 — Danger Present',
      description: 'The most serious classification — immediate remedial action before the inspector leaves.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c3-improvement-recommended',
      title: 'EICR Code C3 — Improvement Recommended',
      description: 'For departures from BS 7671 that don\'t make the EICR "unsatisfactory".',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-fi-further-investigation',
      title: 'EICR Code FI — Further Investigation Required',
      description: 'When the inspector cannot conclude without additional testing or inspection.',
      icon: 'Search',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR with BS 7671 A4:2026 + GN3 cross-references and full C1/C2/C3/FI workflow.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/eicr-no-main-protective-bonding',
      title: 'Missing Main Protective Bonding (the classic C2)',
      description: 'Why missing bonding is almost always C2 and how to specify the remedial conductor.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-plastic-consumer-unit-hmo',
      title: 'Plastic Consumer Unit in an HMO',
      description: 'When a plastic consumer unit becomes a C2 rather than a C3, and the remedial pathway.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Issue compliant C2 observations in seconds',
  ctaSubheading:
    'Elec-Mate\'s digital EICR app includes a curated C2 observation library — pick from the most common C2 defects, auto-populate the regulation cite, attach a photo, and convert to a remedial quote. 7-day free trial.',
};
