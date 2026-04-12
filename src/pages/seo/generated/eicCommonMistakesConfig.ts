import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const eicCommonMistakesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eic-common-mistakes',
  title: 'EIC Common Mistakes | Electrical Installation Certificate Guide | Elec-Mate',
  description:
    'The common mistakes that weaken an Electrical Installation Certificate, from missing readings to vague handover notes, and how to avoid them on site.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'EIC Common Mistakes',
  heroPrefix: 'EIC',
  heroHighlight: 'Common Mistakes',
  heroSubtitle:
    'A practical guide to the errors that make an Electrical Installation Certificate harder to trust, slower to hand over, and more likely to need fixing later.',
  keyTakeaways: [
    'Weak EICs usually come from rushed details, missing readings, or paperwork that no longer matches the work on site.',
    'The certificate should clearly show what was inspected, what was tested, and what was left for follow-up.',
    'The best reports are easy to read on a phone, easy to explain to the client, and easy to turn into the next job.',
    'Good handover notes reduce callbacks because the client can see what matters and what still needs attention.',
    'Elec-Mate helps keep the certificate, the schedule of test results, and the follow-on quote together in one workflow.',
  ],
  sections: [
    {
      id: 'what-weakens-an-eic',
      heading: 'What usually weakens an EIC',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An Electrical Installation Certificate should read like a finished record of the work, not a rough set of notes. If the installation details are incomplete, the scope is vague, or the certificate was filled in too late, the whole document loses strength before the client even reads the observations.',
        },
        {
          type: 'paragraph',
          text:
            'The same thing happens when the wording on the certificate does not match the job in front of you. A client can usually tell when a report has been copied forward or rushed, and that is the quickest way to make a good installation look uncertain.',
        },
      ],
    },
    {
      id: 'common-mistakes',
      heading: 'Common mistakes to avoid',
      blocks: [
        {
          type: 'list',
          items: [
            'Leaving out the exact installation details, so the certificate does not clearly show what was completed.',
            'Recording readings or remarks in a way that does not match the actual work on site.',
            'Forgetting to explain limitations, deviations, or anything that still needs follow-up.',
            'Handing over a certificate without a clear client summary of what was done and what happens next.',
            'Splitting the paperwork between notes, photos, and loose messages instead of keeping it together.',
          ],
        },
      ],
    },
    {
      id: 'how-to-keep-it-clean',
      heading: 'How to keep the certificate clean and usable',
      blocks: [
        {
          type: 'list',
          tone: 'success',
          items: [
            'Complete the certificate while the job is still fresh, not after the site details have blurred together.',
            'Keep the readings, observations, and sign-off notes aligned with the actual circuit or equipment worked on.',
            'Make sure the certificate and the schedule of test results tell the same story.',
            'Use plain wording the client can understand when you explain what was done and what still needs attention.',
            'Send the finished paperwork promptly so the handover does not feel uncertain or half-complete.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If you want a clearer view of the supporting evidence, [schedule of test results](/guides/schedule-of-test-results) is the right companion page. If you need to work out whether the job should have an EIC at all, [when is an EIC required](/guides/when-is-eic-required) keeps that conversation simple.',
        },
      ],
    },
    {
      id: 'what-to-do-next',
      heading: 'What to do when the work leads to more work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Sometimes the certificate reveals more than the original brief expected. If that happens, do not leave the client guessing. Keep the remedial work, the next steps, and the cost of that extra work clear so the handover still feels controlled.',
        },
        {
          type: 'paragraph',
          text:
            'That is where a good quote matters. If the EIC turns into a larger repair or upgrade, the [electrical quoting app](/electrical-quoting-app) helps you turn the findings into a proper follow-on price without starting from scratch.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What are the biggest mistakes on an EIC?',
      answer:
        'The biggest mistakes are usually missing details, readings that do not line up with the work, vague follow-up notes, and a handover that does not clearly show what was completed.',
    },
    {
      question: 'Can a certificate be weak even if the work was done properly?',
      answer:
        'Yes. Good work can still be undermined by poor paperwork. If the certificate is unclear, incomplete, or hard to follow, it weakens the value of the job record.',
    },
    {
      question: 'Should the schedule of test results match the EIC exactly?',
      answer:
        'It should support the same story. The readings, observations, and sign-off should all point to the same job and the same outcome.',
    },
    {
      question: 'What should I do if the job grows beyond the original EIC?',
      answer:
        'Record the change clearly, explain the extra work, and quote the follow-on items properly so the client knows what is included and what is not.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When Is an EIC Required',
      description: 'Keep the job on the right certificate from the start.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Make the readings and certificate match cleanly.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Keep the certificate, readings, and handover together.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn follow-on work into a clear price quickly.',
      icon: 'Calculator',
      category: 'App',
    },
  ],
  ctaHeading: 'Finish EIC paperwork cleanly and keep the handover clear',
  ctaSubheading:
    'Use a mobile-first workflow to keep the certificate, test results, and follow-on quote aligned from the start.',
};
