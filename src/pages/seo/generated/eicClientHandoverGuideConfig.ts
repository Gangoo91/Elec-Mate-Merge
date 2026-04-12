import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const eicClientHandoverGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eic-client-handover-guide',
  title: 'EIC Client Handover Guide | Electrician Handover Advice | Elec-Mate',
  description:
    'How to hand over an Electrical Installation Certificate clearly, so clients understand what was done, what was tested, and what happens next.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'EIC Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'EIC Client Handover',
  heroPrefix: 'EIC Client',
  heroHighlight: 'Handover Guide',
  heroSubtitle:
    'A practical guide to explaining an Electrical Installation Certificate in plain language, keeping the schedule of test results clear, and making the handover feel professional on site or on screen.',
  keyTakeaways: [
    'The handover should explain the result first, then the evidence, then the next step.',
    'Clients need a simple summary of what was inspected, what was tested, and what matters now.',
    'The schedule of test results should support the certificate, not feel like a separate document.',
    'If the job creates follow-on work, the quote or remedial note should be easy to understand straight away.',
    'A clean handover reduces confusion, follow-up calls, and delays in getting paid.',
  ],
  sections: [
    {
      id: 'start-with-result',
      heading: 'Start with the result',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The first thing a client wants to know is simple: is the installation satisfactory, does it need remedial work, or is there a limitation they need to understand? Lead with that answer before you go into test values or technical detail.',
        },
        {
          type: 'paragraph',
          text:
            'If the job is a new installation, make sure the handover matches the reason the EIC was required in the first place. The [When Is an EIC Required? guide](/guides/when-is-eic-required) is useful background when you are explaining why the certificate matters at all.',
        },
      ],
    },
    {
      id: 'what-to-explain',
      heading: 'What to explain in plain language',
      blocks: [
        {
          type: 'list',
          items: [
            'What work was completed and which circuits or areas were included.',
            'Whether the certificate covers a new circuit, a rewire, or a larger alteration.',
            'What the main test results show in practical terms.',
            'Any observations, limitations, or follow-on items the client needs to act on.',
            'How the paperwork will be provided and where the client can find it later.',
          ],
        },
      ],
    },
    {
      id: 'test-results',
      heading: 'Keep the schedule of test results clear',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The schedule of test results is what proves the certificate was backed by real testing. If it is messy, incomplete, or hard to follow, the handover feels weak even if the work itself was sound.',
        },
        {
          type: 'paragraph',
          text:
            'Use the [schedule of test results guide](/guides/schedule-of-test-results) as the reference point for what those readings should support. The client does not need every technical detail explained line by line, but the values should still make sense to anyone checking the document later.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Keep the paperwork connected',
          text:
            'The certificate, the readings, and the handover note should all tell the same story. If the report says one thing and the summary says another, clients notice that straight away.',
        },
      ],
    },
    {
      id: 'next-step',
      heading: 'Make the next step obvious',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If no further work is needed, say that clearly. If remedials are needed, explain what the client should approve next and what the likely impact is. A good handover should reduce questions, not create more of them.',
        },
        {
          type: 'paragraph',
          text:
            'When the job moves into pricing or remedials, keep the follow-up simple by using the [electrical quoting app](/electrical-quoting-app) so the handover and the price stay aligned.',
        },
        {
          type: 'paragraph',
          text:
            'For full certificate completion, the [digital EICR certificate workflow](/tools/eicr-certificate) is the right place to keep the readings, observations, signatures, and PDF output together.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What should an EIC handover include?',
      answer:
        'It should include the result, a short explanation of the work completed, the main findings, any limitations or follow-on work, and the certificate or PDF the client needs to keep.',
    },
    {
      question: 'Do clients need the full technical detail?',
      answer:
        'Not always. They need enough information to understand what was done and what matters next, while the schedule of test results carries the technical record.',
    },
    {
      question: 'Can the handover include a quote for extra work?',
      answer:
        'Yes. If the inspection or installation has uncovered follow-on work, the handover should make the next step obvious and point the client to the quote or recommendation.',
    },
    {
      question: 'Why does the handover matter if the EIC is complete?',
      answer:
        'Because a clear handover helps the client understand the certificate, reduces confusion later, and makes the job feel finished rather than abruptly closed.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When Is an EIC Required?',
      description: 'A quick refresher on when the certificate is needed in the first place.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Keep the readings clear, traceable, and tied to the certificate.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete the certificate and handover on site in one workflow.',
      icon: 'FileText',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn follow-on work into a clear quote while the job is still fresh.',
      icon: 'Calculator',
      category: 'App',
    },
  ],
  ctaHeading: 'Finish the job clearly',
  ctaSubheading:
    'Keep the certificate, the readings, and the handover in one clean flow so the client knows exactly what happened and what to do next.',
};
