import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const eicrExampleAndTemplateConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-example-and-template',
  title: 'EICR Example and Template | Electrician Guide | Elec-Mate',
  description:
    'What a strong EICR example or template should include, how to keep the schedule and limitations clear, and how to move cleanly into a finished report.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'EICR Example and Template',
  heroPrefix: 'EICR',
  heroHighlight: 'Example and Template',
  heroSubtitle:
    'A clear guide to what a good example or template should show, how to keep it readable on site, and how to turn it into a finished certificate without missing the important parts.',
  keyTakeaways: [
    'A good EICR template should make the client details, installation scope, and limitations obvious before the findings begin.',
    'The schedule of test results, observations, and overall outcome should read like one joined-up report.',
    'A strong example includes enough structure to speed you up, but not so much clutter that the report feels hard to finish on site.',
    'If the report is going to be handed over properly, the wording needs to stay clear, plain, and consistent from top to bottom.',
    'A mobile workflow makes it easier to complete the report, export it, and keep the paperwork together in one place.',
  ],
  sections: [
    {
      id: 'what-a-good-template-shows',
      heading: 'What a good EICR template should show',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A useful EICR example is not just a blank form with headings. It shows the shape of a report that someone can actually complete on site without losing the thread. The client, installation, extent of inspection, and any agreed limitations should be obvious before the inspection findings start.',
        },
        {
          type: 'paragraph',
          text:
            'If you want a cleaner checklist for the report sections themselves, [what to include on an EICR](/guides/eicr-what-to-include) is the best companion page to read alongside this one.',
        },
      ],
    },
    {
      id: 'keep-the-report-joined-up',
      heading: 'Keep the report joined up from readings to handover',
      blocks: [
        {
          type: 'list',
          items: [
            'The schedule of test results should match the installation you actually tested.',
            'Observations should be written so the client understands the defect and the consequence.',
            'Any limitation should be stated plainly, not hidden in a vague note.',
            'The final outcome should make sense when the client reads it back later.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If the values and the wording do not agree, the report starts to look rushed. That is why the [schedule of test results](/guides/schedule-of-test-results) matters so much when you are building the final document.',
        },
      ],
    },
    {
      id: 'what-to-avoid',
      heading: 'What to avoid in a template',
      blocks: [
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Copied-forward wording that does not match the current installation.',
            'Blank spaces where a limitation should be explained properly.',
            'Too many headings with not enough useful content under them.',
            'Observations that are too vague for the client to act on.',
            'A layout that forces you to rebuild the same report twice before you can send it.',
          ],
        },
      ],
    },
    {
      id: 'turn-template-into-report',
      heading: 'Turn the template into a report the client can trust',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The best templates do not just save typing. They help you finish the job with less friction, fewer missed fields, and a cleaner handover. That matters whether the report comes back satisfactory, unsatisfactory, or limited in scope.',
        },
        {
          type: 'paragraph',
          text:
            'If you are trying to keep the whole workflow together, [digital EICR certificates](/tools/eicr-certificate) make it easier to complete the report, keep the observations aligned, and move on to the next job without rebuilding the paperwork.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What should a good EICR example include?',
      answer:
        'It should include the installation details, the extent of inspection, any limitations, the test results, the observations, and the final outcome in a way that reads naturally from top to bottom.',
    },
    {
      question: 'Is a template supposed to be a finished report?',
      answer:
        'No. A template should give you the structure for a proper report, but it still needs to reflect the actual installation, findings, and limitations from the job in front of you.',
    },
    {
      question: 'Why does the schedule matter so much?',
      answer:
        'Because the schedule of test results is the evidence that supports the report. If it does not match the observations or the outcome, the report feels weak and harder to trust.',
    },
    {
      question: 'Can a digital workflow help with EICR quality?',
      answer:
        'Yes. A good digital workflow helps keep the readings, observations, limitations, and handover together so you are not rebuilding the same report twice.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-what-to-include',
      title: 'What to Include on an EICR',
      description: 'A practical checklist for the sections every report should cover.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-common-mistakes',
      title: 'EICR Common Mistakes',
      description: 'Avoid the errors that weaken the report or confuse the client.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-limitations',
      title: 'EICR Limitations',
      description: 'Handle limitations clearly when the inspection scope is restricted.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Keep the measurements aligned with the report and observations.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete the report and handover in one mobile-friendly workflow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: 'Complete cleaner EICRs without rebuilding the paperwork',
  ctaSubheading:
    'Use a mobile-first workflow to keep the template, readings, observations, and handover in one place from the start.',
};
