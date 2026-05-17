import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// C1/C2/C3/FI classification rules and procedures match GN3 Section 3.

const published = '2026-05-17';
const modified = '2026-05-17';

export const eicrCodeC1Config: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-code-c1-danger-present',
  title:
    'EICR Code C1 — Danger Present | Immediate Remedial Action | Elec-Mate',
  description:
    'EICR code C1 explained: when to use it, real-world examples, what happens to the overall report assessment, and what the responsible person must do next. BS 7671:2018+A4:2026 and IET GN3 aligned.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'EICR Observation Code',
  badgeIcon: 'AlertTriangle',
  breadcrumbLabel: 'EICR Code C1',
  heroPrefix: 'EICR Code',
  heroHighlight: 'C1',
  heroSuffix: '— Danger Present',
  heroSubtitle:
    'C1 is the most serious EICR observation classification. It means a person is in immediate danger and the installation requires immediate remedial action — or isolation — before the inspector leaves. This guide explains exactly when to use C1, real defects that warrant it, and the consequences for the EICR overall assessment.',
  keyTakeaways: [
    'C1 means "Danger present. Risk of injury. Immediate remedial action is necessary." The condition presents a real, present hazard to persons or property.',
    'A C1 finding makes the overall EICR assessment "unsatisfactory" automatically — irrespective of how many other observations are recorded.',
    'C1 observations must be recorded in Section K of the Electrical Installation Condition Report, with the classification code clearly stated.',
    'The inspector should not leave the installation in a dangerous condition. Where immediate remedial action is not possible at the time of inspection, the affected circuit or installation should be made safe by isolation and documented.',
    'C1 takes precedence over C2 and C3. If a defect could be classified as C1, the inspector shall not downgrade it to C2 or C3 because of inconvenience.',
    'Common C1 defects: exposed live conductors accessible to touch, broken or missing covers exposing terminals, lethal voltage on accessible metalwork due to a fault, fire damage to live equipment with no isolation in place.',
  ],
  sections: [
    {
      id: 'c1-definition',
      heading: 'What C1 Means',
      tocLabel: 'Definition',
      blocks: [
        {
          type: 'paragraph',
          text:
            'C1 is defined in IET Guidance Note 3 (Inspection & Testing) as: "Danger present. Risk of injury. Immediate remedial action is necessary." This classification indicates an observed condition where a dangerous situation exists and immediate remedial works are required to remove the danger to persons or property.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'C1 = the inspector should not walk away',
          text:
            'Where a C1 condition is found during inspection, the inspector\'s professional obligation is to remove the danger before leaving site — either by carrying out immediate remedial work, by isolating the affected circuit, or by ensuring the responsible person isolates it under instruction.',
        },
      ],
    },
    {
      id: 'c1-vs-c2-vs-c3',
      heading: 'The C1 / C2 / C3 Decision Rule',
      tocLabel: 'C1 vs C2 vs C3',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671:2018+A4:2026 and IET GN3 set a strict hierarchy for observation coding. The decision rule is unambiguous:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'If the condition presents a real present danger to persons or property → C1.',
            'If the condition is potentially dangerous (but not immediately so) and urgent remedial action is needed → C2.',
            'If neither C1 nor C2 applies but the condition departs from BS 7671 in a way that an improvement would address → C3.',
            'If the condition can\'t be classified without further inspection or testing → FI.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Acceptance criterion from BS 7671 / GN3',
          text:
            'C3 ("Improvement recommended") shall be attributed only where C1 ("Danger present") or C2 ("Potentially dangerous / non-compliant") do not apply. Practitioners shall not use C3 if evidence supports C1 or C2 classifications.',
        },
        {
          type: 'paragraph',
          text:
            'Only one classification code is recorded against each observation. The inspector cannot assign both C1 and C2 to the same defect.',
        },
      ],
    },
    {
      id: 'c1-examples',
      heading: 'Real-World C1 Examples',
      tocLabel: 'Common C1 examples',
      blocks: [
        {
          type: 'paragraph',
          text:
            'C1 is reserved for conditions where someone is, or could readily be, harmed before remedial work can be scheduled. Common examples seen during EICR inspection include:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Exposed live conductors accessible to touch — broken switchplate exposing terminals, missing cover on a junction box with live terminals visible.',
            'Lethal voltage on accessible metalwork — for example, broken earth conductor causing exposed metal of a casing to sit at supply potential.',
            'Damaged consumer unit with melted or burnt terminals where live parts are no longer enclosed.',
            'Cable with damaged sheath exposing bare copper in an accessible location (children, livestock, customers).',
            'Submerged electrical equipment in standing water with live parts exposed.',
            'Fire-damaged installation where the affected circuit has not been isolated and live parts may be compromised.',
            'Make-shift "repair" with twisted bare conductors, no insulation, no enclosure.',
            'Hand-held electrical equipment with damaged insulation that has not been removed from service.',
          ],
        },
      ],
    },
    {
      id: 'c1-recording',
      heading: 'How to Record a C1 on the EICR',
      tocLabel: 'How to record',
      blocks: [
        {
          type: 'paragraph',
          text:
            'BS 7671 specifies exactly where and how observations are recorded on the Electrical Installation Condition Report:',
        },
        {
          type: 'list',
          items: [
            'Record the observation in Section K ("Observations") of the EICR.',
            'Assign the single classification code "C1" against that observation.',
            'Describe the condition factually — what was observed, where, and why it is dangerous.',
            'Record what immediate action was taken (isolation, lock-off, made safe) and by whom.',
            'Notify the responsible person in writing and obtain their acknowledgement.',
            'Photograph the defect for evidence (industry good practice — not a BS 7671 requirement, but supports the report).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mandatory: overall assessment becomes "unsatisfactory"',
          text:
            'Where any observation attracts a code of C1 or C2, the overall assessment of the Electrical Installation Condition Report shall be recorded as "unsatisfactory". This is mandatory for the final overall opinion.',
        },
      ],
    },
    {
      id: 'c1-what-next',
      heading: 'What Must Happen After a C1',
      tocLabel: 'What happens next',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A C1 observation triggers a specific chain of action — the responsible person, the inspector, and any duty holder (landlord, employer, agent) all have obligations under the Electricity at Work Regulations 1989 and, for rented accommodation, the Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Immediate isolation of the dangerous part of the installation (lock-off if practicable).',
            'Written notice to the responsible person — typically a remedial quote follows within 24 hours.',
            'Remedial work completed by a competent electrician; a Minor Works Certificate or EIC issued for the remedial work.',
            'Re-inspection of the remediated part to confirm the C1 has been cleared.',
            'For rented properties (PRS Regs 2020): copy of the EICR and remedial certificate provided to the local authority on request, and to the tenant within 28 days of completion.',
          ],
        },
      ],
    },
    {
      id: 'c1-legal-context',
      heading: 'Legal Context for C1 Findings',
      tocLabel: 'Legal context',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A C1 observation is not just a BS 7671 technical classification — it has legal consequences in three regulatory frameworks:',
        },
        {
          type: 'list',
          items: [
            'Electricity at Work Regulations 1989 — duty holders must maintain electrical systems "so far as is reasonably practicable" to prevent danger. A documented C1 puts the duty holder on notice.',
            'PRS Electrical Safety Regs (England) 2020 — for private rented properties, an EICR with a C1 means the landlord must complete remedial work and provide written confirmation within 28 days, or earlier if the EICR specifies it.',
            'CDM 2015 — on construction projects, a C1 found during pre-handover testing triggers principal-contractor / client notification, and the work cannot be handed over until the C1 is cleared.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Can a C1 ever be left to remedial action later?',
      answer:
        'No. The defining feature of C1 is that danger is present. If the inspector judges that the defect can wait — even by a day — the correct classification is C2, not C1. C1 means "immediate remedial action is necessary." If immediate repair is not practicable, the affected part must be isolated and made safe before the inspector leaves.',
    },
    {
      question: 'Does a single C1 make the whole EICR fail?',
      answer:
        'Yes. Where any observation attracts a code of C1 or C2, the overall assessment of the EICR shall be recorded as "unsatisfactory" — irrespective of how many other observations are present. The overall opinion is binary: satisfactory or unsatisfactory, with any C1 or C2 forcing the latter.',
    },
    {
      question: 'Who can issue a C1 on an EICR?',
      answer:
        'The inspector signing the EICR must be a competent person — typically a qualified electrician registered with NICEIC, NAPIT, ELECSA, SELECT or equivalent, holding the appropriate experience and the 2391 (or equivalent) inspection and testing qualification. The competent person carries the legal responsibility for the classification decision.',
    },
    {
      question: 'What if the tenant won\'t let me isolate a C1 circuit?',
      answer:
        'The inspector\'s professional obligation under EAWR 1989 is to remove the danger or have it removed. If isolation is refused, the inspector should: (a) record the refusal on the report, (b) notify the landlord/responsible person in writing immediately, (c) photograph the defect with the refusal noted, and (d) for rented properties, notify the local authority. The inspector should not silently leave the property with a known C1.',
    },
    {
      question: 'Can I downgrade a C1 to C2 if my landlord asks me to?',
      answer:
        'No. Downgrading a classification to suit a client is professional misconduct. The inspector\'s classification is a technical opinion based on observed evidence and BS 7671 / GN3 criteria. If a duty holder pressures an inspector to misclassify, the inspector should refuse and, if necessary, report the matter to their registration body. The classification code "C1" shall be applied where evidence supports C1, regardless of the commercial consequences.',
    },
    {
      question: 'How is C1 different from FI ("Further Investigation")?',
      answer:
        'C1 means the inspector has identified a defect AND determined it presents immediate danger. FI means the inspector cannot make a final determination without further inspection or testing — typically because access was restricted, equipment was in service and could not be isolated, or symptoms were ambiguous. FI is also a mandatory "unsatisfactory" outcome for the overall report assessment when it relates to a potential safety issue.',
    },
    {
      question: 'Should I take photos of a C1 observation?',
      answer:
        'Industry good practice says yes — photographs strengthen the EICR record, support remedial-quote conversations, and protect the inspector if the finding is later disputed. BS 7671 does not mandate photography, but every modern digital EICR app (including Elec-Mate) supports per-observation photos that travel with the report. Use them.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description: 'The other "unsatisfactory" classification — urgent but not immediate remedial action needed.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c3-improvement-recommended',
      title: 'EICR Code C3 — Improvement Recommended',
      description: 'Departures from BS 7671 that don\'t affect the overall "satisfactory" assessment.',
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
      description: 'Digital EICR aligned to BS 7671:2018+A4:2026, A4 schedule of test results, full C1/C2/C3/FI workflow.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) Summary',
      description: 'What changed in A4:2026 — including new model form columns affecting EICR observation recording.',
      icon: 'BookOpen',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes — All Codes',
      description: 'Overview of the C1, C2, C3 and FI classification system with examples from real inspections.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Issue compliant EICRs in minutes',
  ctaSubheading:
    'Elec-Mate\'s digital EICR app handles C1/C2/C3/FI classification with built-in BS 7671:2018+A4:2026 + GN3 cross-reference, per-observation photos, remedial quote conversion and PDF export. 7-day free trial, cancel anytime.',
};
