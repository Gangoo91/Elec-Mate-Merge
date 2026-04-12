import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const fullRewirePriceBreakdownConfig: GeneratedGuideConfig = {
  pagePath: '/guides/full-rewire-price-breakdown',
  title: 'Full Rewire Price Breakdown | Electrician Guide | Elec-Mate',
  description:
    'A clear breakdown of what goes into a full rewire price, from labour and materials to testing, making good, and client handover.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Pricing Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Full Rewire Price Breakdown',
  heroPrefix: 'Full Rewire',
  heroHighlight: 'Price Breakdown',
  heroSubtitle:
    'A practical guide to pricing a full rewire clearly, so the customer understands what they are paying for and the quote covers the real work on site.',
  keyTakeaways: [
    'A proper rewire price should separate labour, materials, testing, making good, and any access or waste costs.',
    'The quote should reflect the size of the property, the state of the existing wiring, and the amount of making good needed.',
    'Testing and certification are part of the job, not an optional extra to be added later.',
    'The best quotes explain the price in plain language so the customer can compare value, not just the bottom line.',
    'Elec-Mate helps you keep the quote, the invoice, and the handover aligned from the start.',
  ],
  sections: [
    {
      id: 'what-the-price-covers',
      heading: 'What a full rewire price needs to cover',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A full rewire is not just cable and accessories. The price needs to cover labour, materials, circuit design, isolation, making safe, testing, certification, removals, and the time it takes to put the property back together properly.',
        },
        {
          type: 'paragraph',
          text:
            'If the quote only covers the visible install work, the job will usually feel thin later. A better price breakdown shows the customer exactly where the money goes and keeps you from losing time on the hidden parts of the job.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Do not forget the finishing work',
          text:
            'Making good, skips, access, dust protection, and the final test paperwork all take time. If you leave them out, the quote looks cheaper but the job becomes harder to finish profitably.',
        },
      ],
    },
    {
      id: 'main-cost-lines',
      heading: 'The main cost lines to split out',
      blocks: [
        {
          type: 'list',
          tone: 'pricing',
          items: [
            'Labour for stripping out, first fix, second fix, and final testing.',
            'Materials for cable, accessories, containment, board work, and fixings.',
            'Testing, certification, and time spent recording the final installation properly.',
            'Making good, redecorating allowances, and any repair work after chasing or cable removal.',
            'Waste removal, skip hire, parking, access, and any site-specific overheads.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If you need to compare the labour and material split against a wider project quote, the [electrical quoting app](/electrical-quoting-app) keeps the job in one place and makes the breakdown easier to explain.',
        },
      ],
    },
    {
      id: 'property-factors',
      heading: 'What changes the price the most',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Two properties can both need a full rewire and still land at very different prices. Access, property size, number of floors, finished surfaces, furniture, live occupancy, and the condition of the existing wiring all change the amount of time needed.',
        },
        {
          type: 'paragraph',
          text:
            'A tight quote for one house may be wrong for another if the routeing is awkward, the ceilings are finished, or the amount of making good is higher than expected. That is why the site survey matters as much as the final number.',
        },
      ],
    },
    {
      id: 'quoting-cleanly',
      heading: 'How to explain the price cleanly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Customers usually want to know why the price is what it is. A good breakdown explains the size of the job, the scope of the work, what is included, what is excluded, and where the price may change if the property conditions are worse than expected.',
        },
        {
          type: 'paragraph',
          text:
            'If the rewire is part of a larger upgrade, the [consumer unit replacement cost guide](/guides/consumer-unit-replacement-cost) and [rewire cost UK guide](/guides/rewire-cost-uk) help you frame the quote around the whole project rather than just the cable run.',
        },
      ],
    },
    {
      id: 'invoice-and-handover',
      heading: 'Keep the invoice and handover aligned',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once the job is priced, delivered, and signed off, the invoice should reflect the same scope the customer agreed to. That avoids arguments about what was included and keeps the paperwork easy to follow.',
        },
        {
          type: 'paragraph',
          text:
            'For the final handover, use the same language in the quote, the invoice, and the certificate so the customer sees one joined-up job rather than three separate documents.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What should be included in a full rewire price?',
      answer:
        'Labour, materials, testing, certification, making good, and the site-specific costs that come with the job should all be in the price. If those pieces are separated, the quote is usually too thin.',
    },
    {
      question: 'Why do rewire prices vary so much?',
      answer:
        'Property size, access, condition of the existing installation, and how much making good is needed all change the time and cost. Two similar-looking jobs can still take very different amounts of effort.',
    },
    {
      question: 'Should testing and certification be included in the quote?',
      answer:
        'Yes. They are part of the job and should be shown in the price breakdown so the customer knows the work is fully completed and properly handed over.',
    },
    {
      question: 'How do I avoid underpricing a rewire?',
      answer:
        'Break the job into labour, materials, testing, making good, and overheads, then price the hidden work as carefully as the visible install. A good survey and a clear quote format help prevent missed costs.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/full-rewire-cost-guide',
      title: 'Full Rewire Cost Guide',
      description: 'A broader guide to pricing a full rewire job correctly.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'Useful context for UK rewire pricing and customer expectations.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'Handy when the rewire includes a board change or upgrade.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build and explain the price with the job details in one place.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/eic-what-to-include',
      title: 'What an EIC Should Include',
      description: 'Keep the certificate aligned with the work completed.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Send the invoice against the same scope the customer agreed to.',
      icon: 'FileText',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Price the rewire in a way the customer can follow',
  ctaSubheading:
    'Keep labour, materials, testing, and finishing work visible so the quote is clear, defendable, and easier to turn into signed work.',
};
