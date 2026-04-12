import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const minorWorksCertificateCommonMistakesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/minor-works-certificate-common-mistakes',
  title: 'Minor Works Certificate Common Mistakes | Guide | Elec-Mate',
  description:
    'Common mistakes made on Minor Works certificates, how to avoid them, and what to check before you issue the paperwork.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'Common Mistakes',
  heroPrefix: 'Minor Works Certificate',
  heroHighlight: 'Common Mistakes',
  heroSubtitle:
    'A practical guide to the mistakes that cause delays, rework, and awkward client conversations, plus the checks that keep the certificate clear and complete.',
  keyTakeaways: [
    'The most common mistakes are missing test results, vague descriptions, incomplete client details, and forgetting to match the paperwork to the actual scope of work.',
    'A Minor Works certificate should be clear enough for the client to understand and complete enough for another electrician to review later.',
    'If the work involved more than a minor alteration, the paperwork may need a different certificate or supporting report.',
    'Good certificate habits save time on site, reduce callbacks, and make handover easier for everyone.',
    'Elec-Mate helps keep the form, readings, and export together so the paperwork is easier to finish correctly first time.',
  ],
  sections: [
    {
      id: 'wrong-certificate',
      heading: 'Using the wrong certificate',
      blocks: [
        {
          type: 'paragraph',
          text:
            'One of the biggest mistakes is using a Minor Works certificate when the job was not a minor alteration. If the work added a new circuit or needed a different certificate type, the paperwork should match the actual work, not the convenient form that happens to be open.',
        },
        {
          type: 'paragraph',
          text:
            'If you are unsure which certificate is right, [when an EIC is required](/guides/when-is-eic-required) is a useful companion page before you finish the paperwork.',
        },
      ],
    },
    {
      id: 'missing-details',
      heading: 'Leaving key details out',
      blocks: [
        {
          type: 'list',
          items: [
            'Client name, installation address, or the exact location of the work is left incomplete.',
            'The circuit or distribution board is not described clearly enough.',
            'The work description is so brief that it does not show what was actually changed.',
            'The date, signature, or responsible person details are missing at handover.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Write it so it makes sense later',
          text:
            'A good certificate should still make sense months after the visit. Keep the description simple, specific, and tied to the actual alteration so the job can be understood without guesswork.',
        },
      ],
    },
    {
      id: 'test-results',
      heading: 'Recording test results badly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Another common mistake is entering readings without checking they belong to the circuit that was worked on. A Minor Works certificate should show the results that support the work completed, not a loose collection of readings copied from another job.',
        },
        {
          type: 'paragraph',
          text:
            'If the report includes supporting results or a follow-up record, [schedule of test results](/guides/schedule-of-test-results) is a good page to read alongside this one.',
        },
      ],
    },
    {
      id: 'handover',
      heading: 'Rushing the handover',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The certificate should not be left half-finished because the job is done and everyone wants to move on. The client needs a clean copy, the work needs to be traceable, and any recommendations should be clear enough to act on. If there is remedial work to quote, the certificate and quote should line up with each other.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Keep the paperwork and quote connected',
          text:
            'If the minor works uncovered extra problems, send the certificate and the follow-up quote together. That keeps the conversation clear and helps the client understand what has been completed and what still needs attention.',
        },
      ],
    },
    {
      id: 'working-smarter',
      heading: 'How to avoid the same mistakes next time',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most certificate errors come from doing the form in a rush or from rewriting the same job twice. A mobile-first workflow makes it easier to capture the details on site, check the readings once, and export the finished certificate without losing track of the job.',
        },
        {
          type: 'paragraph',
          text:
            'If the job is heading into remedials or a larger inspection, it can also help to move straight into [EICR certificate handling](/tools/eicr-certificate) or back into your [electrical quoting app](/electrical-quoting-app) so the next step is clear.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is the most common mistake on a Minor Works certificate?',
      answer:
        'The most common mistake is leaving out key details, especially the work description, circuit identification, or test results that prove the change was completed properly.',
    },
    {
      question: 'Do I always need to include readings?',
      answer:
        'Yes, if the work required testing, the relevant readings should be recorded so the certificate reflects the actual work carried out.',
    },
    {
      question: 'Can I use Minor Works for every small job?',
      answer:
        'No. The certificate must match the type of work completed. Some jobs need a different certificate, and some may need a fuller report instead.',
    },
    {
      question: 'Why does a client care if the certificate is incomplete?',
      answer:
        'Because incomplete paperwork makes the job harder to understand later and can create issues if the work is reviewed, sold, or audited.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When Is an EIC Required?',
      description: 'Check when the work has moved beyond Minor Works.',
      icon: 'Search',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Use the right supporting record when the job needs more detail.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'A clean mobile workflow for inspection paperwork and exports.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Move from findings to pricing without rewriting the job.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Finish the certificate cleanly first time',
  ctaSubheading:
    'Elec-Mate helps keep the details, readings, and export together so the paperwork is easier to complete, review, and send.',
};

