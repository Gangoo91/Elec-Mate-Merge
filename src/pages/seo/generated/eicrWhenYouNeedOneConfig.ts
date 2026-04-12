import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const eicrWhenYouNeedOneConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-when-you-need-one',
  title: 'When Do You Need an EICR? | EICR Guide | Elec-Mate',
  description:
    'A practical guide to when clients or electricians need an EICR, what usually triggers one, and how to explain the next step clearly.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'EICR Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'When You Need One',
  heroPrefix: 'When do you need',
  heroHighlight: 'an EICR?',
  heroSubtitle:
    'Use this guide to explain when an EICR is normally needed, when to recommend one, and how to move the client toward a clear next step.',
  keyTakeaways: [
    'Landlords often need an EICR for rented homes, but homeowners may also need one after concerns, alterations, or a failed inspection history.',
    'An EICR is usually the right call when the property is older, has had electrical changes, or shows signs of damage, overheating, or recurring faults.',
    'Electricians should recommend an EICR when they need a proper condition check before quoting remedials or signing work off.',
    'The report should explain the condition clearly, the observations should be easy to understand, and the next action should be obvious.',
    'Elec-Mate helps turn the inspection into a clean mobile workflow for notes, readings, certificates, and client handover.',
  ],
  sections: [
    {
      id: 'what-it-is',
      heading: 'What an EICR is for',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An EICR is a formal inspection and condition report for an electrical installation. It is used to check whether the wiring, accessories, protective devices, and earthing arrangements are in a safe and serviceable condition at the time of inspection.',
        },
        {
          type: 'paragraph',
          text:
            'Clients usually do not need the technical detail first. They need to know whether the report is being done to protect a rental property, support a sale or purchase, investigate recurring faults, or decide what remedial work should be quoted next.',
        },
      ],
    },
    {
      id: 'when-clients-need-one',
      heading: 'When clients usually need one',
      blocks: [
        {
          type: 'list',
          items: [
            'A landlord needs a current inspection for a rented property or is renewing an existing report.',
            'A homeowner has repeated nuisance trips, overheating accessories, or signs that the installation is not behaving normally.',
            'A property is being bought, sold, or refitted and someone wants a clearer view of the condition before work starts.',
            'The installation is older, has had several additions, or the client cannot say when it was last checked.',
            'An electrician needs a proper condition report before pricing remedials or deciding whether a more limited certificate is enough.',
          ],
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Keep the explanation simple',
          text:
            'Tell the client that an EICR is about proving the condition of the installation, not just ticking a box. If the property has known issues, that is often the point where the inspection becomes the safest next step.',
        },
      ],
    },
    {
      id: 'when-electricians-should-recommend-it',
      heading: 'When electricians should recommend it',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Electricians should suggest an EICR when the job needs more than a quick visual check. If there are signs of damaged accessories, inconsistent earthing, overloaded circuits, borrowed neutrals, or poor previous workmanship, the report gives everyone a clearer starting point.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'The property history is unclear and the existing paperwork is missing or out of date.',
            'The client wants to know whether remedial work is needed before renting, buying, or carrying out other works.',
            'The installation has been altered enough that the condition is no longer obvious from the outside.',
            'You need a report that can support a remedial quote with proper observations and test results.',
          ],
        },
      ],
    },
    {
      id: 'after-the-inspection',
      heading: 'What to do after the inspection',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once the inspection is complete, the report should make the next step obvious. If the result is satisfactory, the client should know what was checked and when they may need the next review. If the result is unsatisfactory, the observations should point clearly to the remedial work that needs quoting.',
        },
        {
          type: 'paragraph',
          text:
            'For more detail on the report itself, see [what to include in an EICR](/guides/eicr-what-to-include). If the client needs a landlord-focused version of the same conversation, [EICR for landlords](/guides/eicr-for-landlords) is the next best page to read.',
        },
      ],
    },
    {
      id: 'getting-the-work-moving',
      heading: 'How to keep the work moving',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The easiest way to lose momentum is to finish the inspection with no clear handover. The client should know what has been found, what needs more attention, and how quickly the next step should happen. That is where a clean mobile workflow matters: notes, readings, certificates, and follow-up can all stay together instead of being rewritten later.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Make the next step easy to accept',
          text:
            'If the inspection leads to remedials, put the quote and the supporting report together so the client is not left wondering what happens next. Elec-Mate is built to help electricians keep that process tidy from first inspection to signed-off paperwork.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Do all properties need an EICR?',
      answer:
        'Not always. The need depends on the property type, ownership, condition, and purpose of the inspection. Landlords are a common case, but homeowners and buyers may also need one when the installation history is unclear or there are known concerns.',
    },
    {
      question: 'How do I know when to recommend one to a client?',
      answer:
        'Recommend an EICR when you need a proper condition check rather than a quick look. Older wiring, repeated faults, missing history, or signs of poor workmanship are all good reasons to suggest one.',
    },
    {
      question: 'Is an EICR the same as a certificate for new work?',
      answer:
        'No. An EICR is a condition report for an existing installation. New work or remedial work may need a different certificate depending on what was completed.',
    },
    {
      question: 'What should the client get at the end?',
      answer:
        'They should get a clear report, a simple explanation of the result, and a straightforward next step if remedial work is needed.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-for-landlords',
      title: 'EICR for Landlords',
      description: 'The landlord-specific version of the same inspection conversation.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-limitations',
      title: 'EICR Limitations',
      description: 'What an EICR can and cannot tell you about an installation.',
      icon: 'Search',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-what-to-include',
      title: 'What to Include in an EICR',
      description: 'The main parts that should be covered in the report.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'EICR Certificate Tool',
      description: 'Create and send EICR paperwork from a clean mobile workflow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: 'Turn the inspection into a clear next step',
  ctaSubheading:
    'Use Elec-Mate to keep the inspection, notes, report, and follow-up in one place so the client can move straight from finding to action.',
};

