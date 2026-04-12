import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const minorWorksCertificateHowToFillInConfig: GeneratedGuideConfig = {
  pagePath: '/guides/minor-works-certificate-how-to-fill-in',
  title: 'Minor Works Certificate How to Fill In | Electrician Guide | Elec-Mate',
  description:
    'How to fill in a Minor Works certificate properly, keep the readings and description clear, and complete the paperwork cleanly from site.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'Minor Works Certificate',
  heroPrefix: 'Minor Works Certificate',
  heroHighlight: 'How to Fill In',
  heroSubtitle:
    'A practical guide to completing Minor Works certificates properly, keeping the description and readings aligned, and finishing the paperwork without a second pass later.',
  keyTakeaways: [
    'A good Minor Works certificate should describe the work clearly, match the actual installation, and show any important readings or limitations.',
    'If the job creates a new circuit, you usually need to look at [when an EIC is required](/guides/when-is-eic-required) instead of using a Minor Works certificate.',
    'The best forms are easy to read on a phone, quick to complete on site, and ready to hand over when the job is done.',
    'A clear schedule of test results helps support the certificate where readings are needed.',
    'A digital workflow can keep the certificate, follow-on quote, and handover together in one place.',
  ],
  sections: [
    {
      id: 'what-the-certificate-needs',
      heading: 'What the certificate needs to show',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A Minor Works certificate should tell the client what was done, where it was done, and what changed. The description should be specific enough that someone can understand the scope later without guessing.',
        },
        {
          type: 'paragraph',
          text:
            'That means clear client details, a sensible description of the work, the circuit or accessory affected, and any readings or notes that support the work carried out.',
        },
      ],
    },
    {
      id: 'how-to-fill-it-in',
      heading: 'How to fill it in properly',
      blocks: [
        {
          type: 'list',
          items: [
            'Write the work description as you go, not after the job details have gone stale.',
            'Use a clear circuit reference or location so the certificate can be traced later.',
            'Record the relevant test results or checks that support the work completed.',
            'Note any limitation, defect, or existing issue that matters to the client.',
            'Make sure the final wording matches the actual work, not a generic template phrase.',
          ],
        },
      ],
    },
    {
      id: 'when-to-use-eic-instead',
      heading: 'When you may need an EIC instead',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The big question is whether the work stayed as minor work on an existing circuit or became new installation work. If the job introduces a new circuit, it is usually time to look at [when an EIC is required](/guides/when-is-eic-required) rather than trying to force the job into a Minor Works form.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'If in doubt, match the document to the work',
          text:
            'The certificate should reflect the real scope of the job. If the work went beyond minor alterations, the paperwork should move with it instead of staying on the smaller form.',
        },
      ],
    },
    {
      id: 'use-test-results-well',
      heading: 'Use the test results to back up the work',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Where readings are required, make sure the schedule of test results supports the certificate and does not feel like a separate document. If you want a cleaner reference point for that part of the paperwork, [schedule of test results](/guides/schedule-of-test-results) explains the detail in more depth.',
        },
        {
          type: 'paragraph',
          text:
            'The goal is simple: one clear set of notes, one set of readings, one certificate that is ready to hand over.',
        },
      ],
    },
    {
      id: 'finish-and-send',
      heading: 'Finish it on site and move on',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The best workflow is the one that lets you complete the certificate while the job is still fresh. That means fewer missed fields, fewer late-night admin fixes, and a cleaner handover for the customer.',
        },
        {
          type: 'paragraph',
          text:
            'If the work leads straight into a quote or remedial discussion, a mobile workflow tied to the [electrical quoting app](/electrical-quoting-app) helps you keep the next step in the same place.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is the main purpose of a Minor Works certificate?',
      answer:
        'It records the minor electrical work carried out on an existing circuit so the work is described clearly and can be handed over properly.',
    },
    {
      question: 'Should the certificate describe the work in plain English?',
      answer:
        'Yes. The description should be specific and easy to understand so the client can see what was done without trying to decode a generic phrase.',
    },
    {
      question: 'When should I stop and use a different certificate?',
      answer:
        'If the work has turned into a new circuit or broader installation work, you should look at the correct certificate for that scope rather than forcing it into a Minor Works form.',
    },
    {
      question: 'Can I use software to finish the certificate faster?',
      answer:
        'Yes. A digital workflow helps keep the description, readings, and handover together so the job can be completed cleanly on site.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/when-is-eic-required',
      title: 'When Is an EIC Required?',
      description: 'Useful when the work looks bigger than a minor alteration.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Keep the readings clear and aligned with the paperwork.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'A mobile-first workflow for completing and exporting certificates.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Move from certificate work into a follow-on quote without retyping the job.',
      icon: 'Calculator',
      category: 'App',
    },
  ],
  ctaHeading: 'Complete Minor Works certificates faster and more cleanly',
  ctaSubheading:
    'Keep the description, readings, and handover in one mobile-first workflow so the paperwork is ready before you leave site.',
};
