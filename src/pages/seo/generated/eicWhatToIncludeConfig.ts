import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const eicWhatToIncludeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eic-what-to-include',
  title: 'What an EIC Should Include | Electrician Guide | Elec-Mate',
  description:
    'What a strong Electrical Installation Certificate should include, how to keep the paperwork clear, and how to hand the job over properly.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'EIC What to Include',
  heroPrefix: 'What an',
  heroHighlight: 'EIC Should Include',
  heroSubtitle:
    'A practical guide to the parts of an Electrical Installation Certificate that matter most on site, with a simple way to keep the form complete, legible, and ready to hand over.',
  keyTakeaways: [
    'The certificate should clearly show who did the work, what was done, and what the test results were.',
    'A good EIC matches the actual installation, not a vague template filled in after the job.',
    'Readings, protective device details, and schedule information need to line up with the circuit work completed.',
    'The handover should be clear enough for the client to understand what has been certified and what still needs attention.',
    'Elec-Mate keeps the certificate, the quote, and the handover in one clean workflow.',
  ],
  sections: [
    {
      id: 'core-parts',
      heading: 'The core parts of a proper EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A strong Electrical Installation Certificate should tell the story of the job without making the client guess. It needs the installation address, the person responsible for the work, the scope of the work, the circuit details, and the test results that support the certificate.',
        },
        {
          type: 'paragraph',
          text:
            'If the job involved new circuits, alterations, or a board change, the certificate should make that obvious. It should not read like a generic form that could apply to any job on any day.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Keep it legible and specific',
          text:
            'Use the certificate to record the actual work carried out, not just the headline description. Specific wording makes handover easier and reduces questions later.',
        },
      ],
    },
    {
      id: 'tests-and-readings',
      heading: 'What needs to be shown on the testing side',
      blocks: [
        {
          type: 'list',
          items: [
            'Circuit identification and the protective device used.',
            'Continuity, insulation resistance, polarity, and earth fault path details where relevant to the work.',
            'Any readings that support the safe completion of the installation.',
            'Notes for anything that could not be completed and why.',
            'A clear link between the test results and the scope of the work signed off.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If you need the test-record side to make sense step by step, the [schedule of test results](/guides/schedule-of-test-results) page is a useful companion.',
        },
      ],
    },
    {
      id: 'what-clients-need',
      heading: 'What the client actually needs to see',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The customer does not want a wall of unexplained numbers. They want to know that the work has been completed, the installation has been checked, and the certificate matches the job they paid for. Plain wording is usually better than overcomplicated language.',
        },
        {
          type: 'paragraph',
          text:
            'If the job is part of a bigger quote, keep the certificate aligned with the scope that was agreed. That is where a [clean electrical quoting workflow](/electrical-quoting-app) helps because the job description and the paperwork stay in step.',
        },
      ],
    },
    {
      id: 'when-eic-is-needed',
      heading: 'When an EIC is the right document',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An EIC is usually the right document when the work is more than a small repair. New circuits, substantial alterations, a consumer unit change, or a wider installation upgrade normally need the certificate to reflect that bigger scope.',
        },
        {
          type: 'paragraph',
          text:
            'If you are still checking whether the job should be an EIC or something lighter, the [when an EIC is required guide](/guides/when-is-eic-required) is the safest starting point.',
        },
      ],
    },
    {
      id: 'workflow',
      heading: 'Keep the certificate tied to the job',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The best paperwork is the paperwork that matches the actual site visit. If the certificate, the readings, and the quotation all live in different places, mistakes creep in. Keep the notes, the price, and the handover close together so the job is easier to finish and easier to explain.',
        },
        {
          type: 'paragraph',
          text:
            'For larger upgrades, the [consumer unit upgrade guide](/guides/consumer-unit-upgrade) and [consumer unit upgrade cost guide](/guides/consumer-unit-upgrade-cost-guide) help you keep the scope and the certificate aligned.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is the most important part of an EIC?',
      answer:
        'It should clearly show what work was done, who carried it out, and what test results support the certificate. If those three things are clear, the rest of the form is much easier to defend.',
    },
    {
      question: 'Can I use a generic description on the certificate?',
      answer:
        'You can, but it is better to be specific. The certificate should match the actual job and not read like a template copied from a different install.',
    },
    {
      question: 'Do I need to include every reading on every job?',
      answer:
        'Include the readings that are relevant to the work completed and the tests needed to support the certificate. If something could not be completed, note that clearly with the reason.',
    },
    {
      question: 'What if the job needs both a quote and a certificate?',
      answer:
        'Keep them aligned. The scope described in the quote should match the work shown on the certificate so the customer sees one clear story from start to finish.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When Is an EIC Required',
      description: 'Use this to decide whether the job needs a full EIC.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'A practical companion for the readings side of the certificate.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Record test results and handover in one tidy workflow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Keep the quote and the certificate aligned on the same job.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'Useful when the certificate relates to a bigger board change.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost',
      description: 'A pricing guide for the wider remedial or upgrade work.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Make the certificate match the job',
  ctaSubheading:
    'Keep the work, the readings, and the handover together so the certificate is clear for the client and clean for your records.',
};
