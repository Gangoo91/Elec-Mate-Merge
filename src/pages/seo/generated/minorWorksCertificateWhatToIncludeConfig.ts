import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const minorWorksCertificateWhatToIncludeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/minor-works-certificate-what-to-include',
  title: 'Minor Works Certificate What to Include | Electrician Guide | Elec-Mate',
  description:
    'What a strong Minor Works certificate should include, from the job scope and test results to observations, notes, and client handover.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Guide',
  badgeIcon: 'ClipboardCheck',
  breadcrumbLabel: 'Minor Works Certificate',
  heroPrefix: 'Minor Works Certificate',
  heroHighlight: 'What to Include',
  heroSubtitle:
    'A simple guide to the details that make a Minor Works certificate complete, clear, and easy for the client to understand.',
  keyTakeaways: [
    'A strong Minor Works certificate should show what was done, where it was done, and why it was needed.',
    'The best certificates include the relevant test results, any observations, and any follow-up action that still needs attention.',
    'Clear descriptions matter as much as the form itself because the client needs to understand the work without decoding the notes.',
    'If the job is turning into larger remedials, it is better to separate the paperwork and move into the right certificate or quote flow.',
    'Elec-Mate helps keep the certificate, the readings, and the handover together in one mobile-first workflow.',
  ],
  sections: [
    {
      id: 'job-details',
      heading: 'Start with the job details',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A good Minor Works certificate should clearly say what was changed, added, repaired, or altered. The client should be able to read it later and understand the scope without calling you back for clarification.',
        },
        {
          type: 'paragraph',
          text:
            'That means the certificate should not just list a vague job title. It should name the circuit or area, explain the work completed, and show enough detail for the record to stand on its own.',
        },
      ],
    },
    {
      id: 'test-results',
      heading: 'Include the relevant test results',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the work was electrical, the certificate should include the test results that prove the work is safe and complete for its scope. The exact tests will vary by job, but the point is the same: the certificate should show the evidence, not just the conclusion.',
        },
        {
          type: 'paragraph',
          text:
            'If you need the wider testing structure as a reference, [schedule of test results](/guides/schedule-of-test-results) is a useful companion page.',
        },
      ],
    },
    {
      id: 'observations',
      heading: 'Record any observations or limitations',
      blocks: [
        {
          type: 'list',
          items: [
            'Any defect or limitation that remains after the work should be written down clearly.',
            'If the certificate relates to a small remedial job, note what was not part of the scope.',
            'If access, isolation, or existing damage affected the work, say so plainly.',
            'If the job has triggered a larger issue, the certificate should make that clear enough for the client to act on it.',
          ],
        },
      ],
    },
    {
      id: 'handover',
      heading: 'Make the handover easy to follow',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The certificate should be readable by the client, not just by another electrician. That means plain language, clear notes, and a layout that makes the important points easy to find when the document is opened on a phone.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Keep the next step obvious',
          text:
            'If the minor work is leading into a bigger job, the handover should point the client in the right direction. For pricing or follow-on work, [electrical quoting](/electrical-quoting-app) is the next natural step.',
        },
      ],
    },
    {
      id: 'when-to-upgrade',
      heading: 'When the paperwork should become something larger',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Not every job stays minor for long. If the work expands into deeper testing, a fuller inspection, or a larger remedial package, the paperwork should change with it. That keeps the record accurate and avoids forcing one small certificate to cover a bigger scope than it should.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What should be on a Minor Works certificate?',
      answer:
        'It should show the job details, the relevant test results, any observations or limitations, and enough clear information for the client to understand what was done.',
    },
    {
      question: 'Does a Minor Works certificate need test results?',
      answer:
        'Yes, where testing is relevant to the work completed. The certificate should show the evidence that supports the work being signed off.',
    },
    {
      question: 'Can a Minor Works certificate cover larger remedials?',
      answer:
        'Only if the work genuinely stays within that scope. If the job grows, the paperwork should be updated so it still matches the actual work done.',
    },
    {
      question: 'What is the most common mistake?',
      answer:
        'The most common mistake is writing too little detail. A certificate that is vague or hard to read is much less useful later when the client needs the record.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When is EIC Required',
      description: 'See when the work needs a full electrical installation certificate.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Check how test results should be set out in the record.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete certificates and readings in one clean flow.',
      icon: 'FileText',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Move from minor works into pricing and follow-on jobs.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Keep Minor Works certificates clear and complete',
  ctaSubheading:
    'Capture the job, the tests, and the handover in one mobile-first flow that is easier to finish on site.',
};
