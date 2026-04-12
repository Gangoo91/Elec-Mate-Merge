import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const fullRewireCostGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/full-rewire-cost-guide',
  title: 'Full Rewire Cost Guide | Electrical Rewire Pricing | Elec-Mate',
  description:
    'A clear guide to full rewire pricing for homeowners and electricians, including the main cost drivers, what changes the quote, and how to explain the price simply.',
  datePublished: published,
  dateModified: modified,
  readingTime: 10,
  badge: 'Cost Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Full Rewire Cost',
  heroPrefix: 'Full Rewire',
  heroHighlight: 'Cost Guide',
  heroSubtitle:
    'A practical guide to how full rewires are priced, what pushes the total up or down, and how to explain the quote in a way clients can follow on a phone.',
  keyTakeaways: [
    'Full rewire prices usually depend on property size, access, number of circuits, finishes, making good, and the amount of testing needed.',
    'The biggest price changes often come from chasing routes, difficult access, occupancy during the work, and any extra upgrades needed to make the installation right.',
    'A clear quote should separate labour, materials, testing, certification, and any optional extras so the client can see what is included.',
    'If the rewire becomes part of a bigger project, the quote should also show where the electrical work stops and the follow-on work begins.',
    'Elec-Mate helps keep the estimate, invoice, and certificate workflow together so the handover stays clear from first price to final sign-off.',
  ],
  sections: [
    {
      id: 'what-determines-price',
      heading: 'What determines the price of a full rewire',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A full rewire is rarely priced from a single figure. The final number depends on the size of the property, how easy it is to run cables, how much of the installation is being renewed, and how much time is needed to test and finish the job properly. A small flat with straightforward access is not the same as a larger house with awkward loft routes, thick walls, or limited working hours.',
        },
        {
          type: 'paragraph',
          text:
            'For a wider view of how rewires are usually costed, [rewire cost UK](/guides/rewire-cost-uk) is the best companion page. If the job is more of a consumer-unit-led upgrade than a full installation replacement, [consumer unit replacement cost](/guides/consumer-unit-replacement-cost) is the better starting point.',
        },
      ],
    },
    {
      id: 'main-cost-drivers',
      heading: 'Main cost drivers on a full rewire',
      blocks: [
        {
          type: 'list',
          items: [
            'Property size and layout, including the number of rooms, floors, and consumer circuits.',
            'Ease of access for cable routes, especially in older or heavily finished properties.',
            'How much decoration or making-good is needed after the electrical work is complete.',
            'The amount of testing, certification, and client handover needed at the end of the job.',
            'Whether the work has to be done around occupants, furniture, or other trades already on site.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not hide the awkward parts',
          text:
            'If the job has difficult access, temporary power needs, or extra time for making good, include that in the quote. A cheap-looking quote that omits the hard parts usually creates problems later.',
        },
      ],
    },
    {
      id: 'how-to-structure-a-quote',
      heading: 'How to structure the quote clearly',
      blocks: [
        {
          type: 'list',
          tone: 'success',
          items: [
            'Separate labour, materials, testing, certification, and any optional extras.',
            'State what is included in the rewire and what is not.',
            'Show any assumptions about access, occupancy, making good, or supply changes.',
            'Explain whether the quote covers a like-for-like rewire or a wider upgrade package.',
            'Keep the wording simple enough for a customer to read on a phone without needing a second explanation.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If the quote also needs a board change, the [consumer unit upgrade cost guide](/guides/consumer-unit-upgrade-cost-guide) helps you separate the rewire from the board upgrade. That stops the customer seeing one large figure with no explanation behind it.',
        },
      ],
    },
    {
      id: 'when-the-job-grows',
      heading: 'When the job grows beyond the original estimate',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Full rewires often uncover extra issues once walls are opened up or old circuits are removed. If that happens, keep the change clear. Add the extra scope, update the price, and explain why the revised figure is higher so the customer can see the reason rather than just the total.',
        },
        {
          type: 'paragraph',
          text:
            'Once the work is agreed, the [electrical quoting app](/electrical-quoting-app) helps turn the estimate into a tidy, itemised quote. When the job is complete, the [electrician invoice app](/electrician-invoice-app) keeps the billing side just as clear.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How much does a full rewire usually cost?',
      answer:
        'The price depends on the property and the amount of work involved. Smaller, simpler properties cost less than larger or harder-to-access homes, and extra making-good, testing, and upgrades can move the price up quickly.',
    },
    {
      question: 'Why do full rewire quotes vary so much?',
      answer:
        'Quotes vary because the job is never exactly the same twice. Access, property layout, the level of finish expected, and whether occupants stay in the property all affect the time and materials needed.',
    },
    {
      question: 'Should a rewire quote include testing and certification?',
      answer:
        'Yes. Testing and certification are part of a proper electrical job, so the customer should be able to see that those items are included rather than discovering them later.',
    },
    {
      question: 'What should I do if the rewire needs extra work halfway through?',
      answer:
        'Update the scope and explain the change before carrying on. A clear price revision is better than leaving the customer unsure about what the final bill will be.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'Compare the full rewire price with other common electrical jobs.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'See how a board upgrade changes the overall project price.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost Guide',
      description: 'Break down the price when the board change sits beside a rewire.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build a clear rewire quote with labour, materials, and extras separated.',
      icon: 'Wrench',
      category: 'App',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Keep the billing side of the job simple after the work is complete.',
      icon: 'FileCheck2',
      category: 'App',
    },
  ],
  ctaHeading: 'Quote rewires clearly and keep the customer confident',
  ctaSubheading:
    'Use a mobile-first workflow to price the job, explain the scope, and move cleanly into the finished invoice and paperwork.',
};
