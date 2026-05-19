import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

// Grounded in BS 7671:2018+A4:2026 (18th Edition), IET Guidance Note 3
// (Inspection & Testing, 9th Edition) and the IET On-Site Guide.
// FI classification rules and procedures match GN3 Section 3.

const published = '2026-05-17';
const modified = '2026-05-19';

export const eicrCodeFIConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-code-fi-further-investigation',
  title: 'EICR Code FI — Further Investigation Required | When to Use',
  description:
    'EICR code FI explained: when "further investigation required" is the right classification, and how to scope the follow-up work clearly.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'EICR Observation Code',
  badgeIcon: 'Search',
  breadcrumbLabel: 'EICR Code FI',
  heroPrefix: 'EICR Code',
  heroHighlight: 'FI',
  heroSuffix: '— Further Investigation Required',
  heroSubtitle:
    'FI is the EICR code that says "I can\'t determine the correct classification without more work." It\'s used when access, equipment in service, or ambiguous symptoms prevent the inspector from confirming whether a defect is C1, C2 or C3. This guide explains exactly when FI is the correct call and how to scope the follow-up so it actually gets done.',
  keyTakeaways: [
    'FI means "Further investigation required without delay." The inspector has identified a potential issue but cannot determine the correct classification without additional inspection or testing.',
    'FI observations make the overall EICR assessment "unsatisfactory" when they relate to a potential safety issue — same legal effect as C1/C2 for the purposes of PRS Regs 2020.',
    'FI is used sparingly. Every observation should be assigned C1, C2 or C3 where evidence supports it — FI is for cases where evidence is genuinely incomplete.',
    'Common FI scenarios: live circuit prevented testing, hidden cable run, suspected fault behind permanent fixtures, audible signs of an issue with no visible defect, intermittent symptoms reported by occupants.',
    'A properly written FI specifies WHAT needs investigating, WHAT tests or inspections are needed, and WHO is competent to perform the follow-up.',
    'FI observations are recorded in Section K of the EICR alongside any C1/C2/C3 observations.',
  ],
  sections: [
    {
      id: 'fi-definition',
      heading: 'What FI Means',
      tocLabel: 'Definition',
      blocks: [
        {
          type: 'paragraph',
          text: 'FI is defined as "Further investigation required without delay." The classification indicates the inspector has identified a potential defect or non-compliance but cannot confirm the appropriate classification (C1, C2, or C3) without additional inspection or testing that was not possible during the EICR visit.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'FI is a deferred classification, not "no defect"',
          text: 'FI is not "I think there might be something." FI is "there\'s evidence of a potential defect that I cannot fully investigate today — and this needs follow-up before a safety conclusion can be drawn." If you cannot articulate WHAT to investigate, FI is the wrong code.',
        },
      ],
    },
    {
      id: 'when-to-use-fi',
      heading: 'When FI is the Correct Code',
      tocLabel: 'When to use FI',
      blocks: [
        {
          type: 'paragraph',
          text: 'FI is reserved for scenarios where the inspector cannot make a final classification within the scope of the current visit. Common legitimate uses:',
        },
        {
          type: 'list',
          items: [
            'Live equipment that could not be isolated for testing during the inspection visit (e.g., 24-hour-essential medical equipment, occupied operating theatre, life-safety system that cannot be powered down).',
            'Cable runs hidden behind permanent finishes (lath-and-plaster, panelled walls, accessible-only-with-destructive-access ducting) where visible symptoms suggest a fault.',
            'Audible signs (humming consumer unit, sporadic arcing sounds) with no visible defect during the inspection window.',
            'Occupant-reported intermittent symptoms (tripping breakers, flickering lights, smell of burning) that the inspector did not witness during testing.',
            'Test results outside expected range with no immediately apparent cause (insulation resistance dropping over the test period, Zs values fluctuating).',
            'Suspected borrowed neutral or shared CPC where definitive identification requires a circuit-by-circuit isolation sequence that was not possible.',
            'Concealed appliance behind a fitted kitchen unit where the appliance circuit is showing fault symptoms.',
          ],
        },
      ],
    },
    {
      id: 'fi-overall-assessment',
      heading: 'Effect on the Overall EICR Assessment',
      tocLabel: 'Effect on the report',
      blocks: [
        {
          type: 'paragraph',
          text: 'FI is treated as an "unsatisfactory" trigger when the potential issue relates to safety. Practically, this means:',
        },
        {
          type: 'list',
          tone: 'warning',
          items: [
            'If the FI investigation could reasonably reveal a C1 or C2 condition, the overall report assessment shall be "unsatisfactory" — same as C1/C2.',
            'If the FI is purely about a C3-level concern (improvement context), some inspectors record the overall assessment as "satisfactory subject to further investigation" — but the conservative and increasingly common practice is to default to "unsatisfactory" for any FI.',
            'For PRS Regs 2020 purposes (England private rented sector), an FI triggers the same 28-day remedial timeline as a C1/C2 — the further investigation must be completed and a follow-up report or certificate issued within the window.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: "Don't use FI to delay a decision",
          text: 'FI is not a "tomorrow problem" escape hatch. If the evidence at the time of inspection supports C1 or C2, use that classification — even if the inspector would like more data. FI is for genuine evidence gaps, not commercial convenience.',
        },
      ],
    },
    {
      id: 'writing-good-fi',
      heading: 'How to Write an FI That Actually Gets Done',
      tocLabel: 'Writing good FI',
      blocks: [
        {
          type: 'paragraph',
          text: 'A vague FI ("further investigation recommended on socket circuit") is almost useless — the follow-up electrician has no scope, the responsible person can\'t commission the work, and the original inspector has provided no value. A good FI specifies four things:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'WHAT was observed (the symptom or condition that triggered the FI).',
            'WHAT cannot be determined without further work (the specific gap in evidence).',
            'WHAT tests or inspections are needed to close the gap (insulation resistance after isolation, thermographic survey, lift-and-inspect specific fitting, etc).',
            'WHO is competent to do the follow-up (a qualified electrician with relevant experience; in some cases a specialist contractor — e.g., a thermographer for thermal-imaging surveys).',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Example of a good FI observation',
          text: '"Consumer unit at meter cupboard shows audible humming under load. No visible damage to enclosure or terminals during visual inspection. Insulation resistance test could not be performed as the property was in occupation and prior notice of isolation was not given. Further investigation required: isolate the installation overnight, perform full insulation resistance test at 500 V, inspect all consumer unit terminals for tightness and signs of overheating, and remove and inspect main switch. Work to be carried out by a competent electrician with EICR experience within 28 days."',
        },
      ],
    },
    {
      id: 'after-fi',
      heading: 'What Happens After an FI',
      tocLabel: 'After an FI',
      blocks: [
        {
          type: 'paragraph',
          text: 'Once the further investigation is complete, the inspector (or follow-up electrician) issues a supplementary observation document that converts the FI into its final classification:',
        },
        {
          type: 'list',
          items: [
            'If investigation reveals a C1 condition → immediate remedial action / isolation, supplementary observation recorded.',
            'If investigation reveals a C2 condition → urgent remedial action on the PRS 28-day timeline (rented) or as agreed (owner-occupied).',
            'If investigation reveals only a C3 issue → improvement recommendation logged, overall assessment can be revised to "satisfactory" if no other C1/C2 observations exist.',
            'If investigation finds no defect → FI is closed; original report assessment may be revised to "satisfactory" pending no other C1/C2.',
            'The supplementary observation is retained alongside the original EICR for the duration of the certificate validity.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Does an FI make the EICR "unsatisfactory"?',
      answer:
        'When the FI relates to a potential safety issue, yes — the overall assessment is recorded as "unsatisfactory" because the inspector cannot confirm safety without further investigation. Some inspectors permit "satisfactory subject to further investigation" where the FI clearly relates only to C3-level concerns, but the conservative practice is to default to "unsatisfactory" for any FI to align with the 28-day PRS Regs 2020 remedial expectation.',
    },
    {
      question: 'Can I use FI just because I ran out of time?',
      answer:
        'No. FI is for genuine evidence gaps — typically caused by access restrictions, occupied equipment, hidden runs, or ambiguous symptoms — not by inspector time pressure. If you ran out of time, the correct response is to either complete the inspection in a follow-up visit (and not yet issue the EICR), or to record the limitation explicitly in the report\'s "Extent and Limitations" section.',
    },
    {
      question: 'What\'s the difference between an FI and a "limitation" in the report?',
      answer:
        'A limitation is something the inspector and responsible person agreed would not be inspected (e.g., loft cables not accessible, sealed inaccessible junction box). It is recorded in the "Extent and Limitations" section, not Section K. An FI is something the inspector started to inspect but couldn\'t conclude on — there is positive evidence of a potential defect, just not enough to classify. FIs always go in Section K with an FI code.',
    },
    {
      question: 'How long does the responsible person have to complete an FI investigation?',
      answer:
        'For private rented properties in England under the 2020 regs: 28 days from the date of the EICR (same as C1/C2). For owner-occupied properties: no statutory timeline, but professional good practice expects the follow-up within weeks. The original EICR remains "unsatisfactory" until the FI is closed by a supplementary observation.',
    },
    {
      question: 'Can I write "FI — investigate further" with no detail?',
      answer:
        'You can — but you shouldn\'t. A vague FI gives the responsible person nothing to commission and the follow-up electrician nothing to scope. A good FI specifies WHAT was observed, WHAT cannot be determined, WHAT tests/inspections are needed, and WHO is competent to do them. If you write a vague FI, the inspection effectively ends with an unactionable "unsatisfactory" that may sit unresolved for months.',
    },
    {
      question: 'Should I issue a new EICR after the FI is closed, or supplement the original?',
      answer:
        'Industry practice varies. Some inspectors issue a supplementary observation document that attaches to the original EICR (preserving the inspection date and original observations). Others re-issue a full EICR once the investigation is complete. Either is acceptable provided the audit trail is clear and the responsible person, tenant (where applicable) and local authority can see both the original and the conclusion. The PRS Regs require written confirmation of remedial / follow-up work in either form.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-code-c1-danger-present',
      title: 'EICR Code C1 — Danger Present',
      description: 'The most serious classification — immediate remedial action.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c2-potentially-dangerous',
      title: 'EICR Code C2 — Potentially Dangerous',
      description: 'Urgent remedial action needed — makes the EICR "unsatisfactory".',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-code-c3-improvement-recommended',
      title: 'EICR Code C3 — Improvement Recommended',
      description: "For departures from BS 7671 that don't affect the overall assessment.",
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Digital EICR with built-in FI workflow and supplementary observation tracking.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
    {
      href: '/guides/eicr-observation-codes-explained',
      title: 'EICR Observation Codes — All Codes',
      description: 'Overview of the C1, C2, C3 and FI classification system with worked examples.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/bs-7671-amendment-4-2026',
      title: 'BS 7671 Amendment 4 (2026) Summary',
      description:
        'What changed in A4:2026 — affects EICR observation recording and schedule of tests.',
      icon: 'BookOpen',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Track FI follow-up to completion',
  ctaSubheading:
    "Elec-Mate's digital EICR app supports supplementary observation tracking — original FI, follow-up work, and final classification all in one audit trail. 7-day free trial.",
};
