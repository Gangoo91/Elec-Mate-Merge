import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const eicDigitalVsPaperConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eic-digital-vs-paper',
  title: 'Digital vs Paper EIC | Which Workflow Works Better? | Elec-Mate',
  description:
    'Compare digital and paper EIC workflows for electricians, including speed, accuracy, client handover, and what works best on site.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'Digital vs Paper EIC',
  heroPrefix: 'Digital vs',
  heroHighlight: 'Paper EIC',
  heroSuffix: 'for electricians',
  heroSubtitle:
    'A clear comparison of paper forms and digital workflows, so you can choose the process that saves time, reduces errors, and keeps the handover simple for the client.',
  keyTakeaways: [
    'Digital EIC workflows are usually faster to complete, easier to review, and less likely to lose readings or signatures.',
    'Paper can still work on site, but it often creates re-keying, missing fields, and slower handover later.',
    'The best workflow is the one that keeps the test results, observations, and client sign-off in one place.',
    'If you also need quoting or follow-on remedials, a digital workflow keeps the job moving without repeating the same details.',
    'Elec-Mate is built to keep the EIC process clean from testing through to certificate and handover.',
  ],
  sections: [
    {
      id: 'digital-vs-paper',
      heading: 'What changes when you go digital',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Paper EIC forms can work, but they usually depend on neat handwriting, careful filing, and a second pass later to turn notes into a finished certificate. A digital workflow keeps the readings, observations, photos, and certificate details together while the job is still fresh.',
        },
        {
          type: 'paragraph',
          text:
            'That matters on busy jobs. If you are moving between circuits, talking to the client, and pricing remedials at the same time, a digital process is easier to keep accurate because you are not trying to remember what belongs on which sheet once you get back to the van.',
        },
      ],
    },
    {
      id: 'site-speed',
      heading: 'Speed on site and after the job',
      blocks: [
        {
          type: 'list',
          items: [
            'Digital saves time because you enter each reading once instead of copying it later.',
            'Paper can be quick at the point of test, but it usually costs time back in the office.',
            'A digital EIC is easier to review before issue, so missing fields are caught sooner.',
            'When the client wants the certificate quickly, digital usually gets it out faster.',
          ],
        },
      ],
    },
    {
      id: 'accuracy',
      heading: 'Accuracy and fewer avoidable mistakes',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most avoidable certificate issues come from small things: skipped fields, unreadable notes, wrong circuit names, or readings copied into the wrong place. Digital reduces those mistakes because the form structure guides the workflow as you go.',
        },
        {
          type: 'paragraph',
          text:
            'If you want to see the certificate side of the process in more detail, [digital EICR certificates](/tools/eicr-certificate) show how a structured workflow keeps the paperwork tied to the job itself.',
        },
      ],
    },
    {
      id: 'client-handover',
      heading: 'Client handover feels cleaner too',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The end result should be easy for the client to understand. A digital EIC gives you a neater handover, clearer remedial notes, and a better record if questions come back later. It also makes it easier to follow up with quotes for further work without starting from scratch.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Best when the job needs more than a certificate',
          text:
            'If the inspection leads straight into remedials or a quote, a digital workflow keeps the handover, pricing, and next step connected. That is especially useful when you need to move from inspection to [electrical quoting](/electrical-quoting-app) quickly.',
        },
      ],
    },
    {
      id: 'when-paper-still-works',
      heading: 'When paper still makes sense',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Paper is not useless. Some electricians still prefer it for very small jobs, short visits, or sites where connectivity is poor. But once the paperwork needs to be shared, stored, or followed up, the paper version usually creates more admin than it saves.',
        },
      ],
    },
    {
      id: 'what-to-use',
      heading: 'A simple rule for choosing the workflow',
      blocks: [
        {
          type: 'list',
          tone: 'success',
          items: [
            'Use digital when you want fewer errors and quicker issue times.',
            'Use digital when the job may lead to remedials, quotes, or follow-up work.',
            'Use digital when the certificate needs to be shared with clients or managers.',
            'Use paper only when the job is very small or the site conditions genuinely make digital awkward.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is a digital EIC valid?',
      answer:
        'Yes. The important part is that the certificate is accurate, complete, and issued correctly. Digital is just the workflow; the legal and technical quality still depends on the content being right.',
    },
    {
      question: 'Why do electricians move away from paper forms?',
      answer:
        'Because digital usually reduces re-keying, keeps test results and notes together, and makes the final certificate easier to issue and store.',
    },
    {
      question: 'What if there is no signal on site?',
      answer:
        'The best digital systems still let you capture the job first and complete the handover later if needed. The workflow should support the job, not slow it down.',
    },
    {
      question: 'Does digital help with quoting as well?',
      answer:
        'Yes. If the inspection turns into remedials, a digital workflow makes it easier to move into quoting without retyping the job details.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When is EIC Required',
      description: 'Check when a full electrical installation certificate is needed.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'See how test results fit into the certificate workflow.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete certificates, readings, and handover in one place.',
      icon: 'FileText',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn inspection findings into a quote without starting over.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Make the EIC workflow easier to finish and easier to send',
  ctaSubheading:
    'Keep readings, notes, certificate details, and follow-on work in one clean mobile-first flow.',
};
