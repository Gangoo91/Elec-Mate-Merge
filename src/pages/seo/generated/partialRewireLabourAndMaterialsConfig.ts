import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const partialRewireLabourAndMaterialsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/partial-rewire-labour-and-materials',
  title: 'Partial Rewire Labour and Materials | Pricing Guide | Elec-Mate',
  description:
    'How electricians can separate labour and materials on a partial rewire, explain the price clearly, and keep the job easy for the client to understand.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Partial Rewire Labour and Materials',
  heroPrefix: 'Partial Rewire',
  heroHighlight: 'Labour and Materials',
  heroSuffix: 'explained clearly',
  heroSubtitle:
    'A simple guide to pricing a partial rewire in a way that separates the work properly and makes the quote easier to read.',
  keyTakeaways: [
    'Labour and materials should be separated clearly so the client can see where the money is going.',
    'Partial rewires often need more labour than people expect because of access, containment, testing, and making good.',
    'Materials are only one part of the price. Time on site, protection work, and finishing details can change the final number quickly.',
    'A clear quote is easier to trust when the scope, allowances, and exclusions are easy to see.',
    'Elec-Mate helps keep the pricing, invoice, and job details together from first quote to final handover.',
  ],
  sections: [
    {
      id: 'labour-vs-materials',
      heading: 'What labour and materials really cover',
      blocks: [
        {
          type: 'paragraph',
          text:
            'On a partial rewire, materials are only part of the cost. Labour covers the time to strip out, run new circuits, make good, test, clean up, and deal with the awkward parts of the job that never show up in a parts list.',
        },
        {
          type: 'paragraph',
          text:
            'That is why two jobs that look similar on paper can land very differently in practice. The materials may be close, but the labour can swing a lot depending on access, floor type, finish level, and how much of the existing installation must stay live while the work happens.',
        },
      ],
    },
    {
      id: 'how-to-split-price',
      heading: 'How to split the price clearly',
      blocks: [
        {
          type: 'list',
          items: [
            'Show the labour line so the client can see the time element of the job.',
            'Show the materials line so the cost of board gear, cable, accessories, and sundries is visible.',
            'Add any allowances for making good, access, or extra testing if the job is not fully defined yet.',
            'State what is included and what is excluded so the quote does not need a long follow-up conversation later.',
          ],
        },
      ],
    },
    {
      id: 'what-changes-cost',
      heading: 'What usually changes the labour cost',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A partial rewire can become expensive because the labour grows even when the materials stay steady. Tight access, older construction, plaster repair, moving furniture, occupied properties, and careful protection of finished areas all add time.',
        },
        {
          type: 'paragraph',
          text:
            'If you need a broader comparison point, [partial rewire cost guide](/guides/partial-rewire-cost-guide) is a useful companion page.',
        },
      ],
    },
    {
      id: 'materials-angle',
      heading: 'Why materials are easy to underprice',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Materials are often the simplest part to list, which is why they are sometimes underpriced. Boards, protective devices, cable, accessories, labels, and consumables can add up quickly once the scope is properly written out.',
        },
        {
          type: 'paragraph',
          text:
            'If the job also involves a consumer unit change, it may help to compare the figures with a [consumer unit replacement cost](/guides/consumer-unit-replacement-cost) page so the client can understand where the extra spend comes from.',
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
            'The quote should flow into the invoice without the numbers changing shape halfway through the job. That is easier when the labour and materials are recorded properly from the start and the scope is clear enough to stand up later.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Useful when the job needs to be priced and billed cleanly',
          text:
            'For a fuller cost comparison, [rewire cost UK](/guides/rewire-cost-uk) is a helpful reference. If you need to turn the figures into a live quote or final invoice, [electrical quoting](/electrical-quoting-app) and the [electrician invoice app](/electrician-invoice-app) keep the job moving.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Should labour and materials always be split on a partial rewire?',
      answer:
        'Usually yes. Separating them makes the quote easier to read and helps the client see where the total price comes from.',
    },
    {
      question: 'Why does labour matter more than materials on some jobs?',
      answer:
        'Because the time on site, access, making good, and testing can cost more than the parts themselves, especially on occupied or awkward properties.',
    },
    {
      question: 'Can I give one price instead?',
      answer:
        'You can, but splitting the labour and materials usually makes the quote clearer and reduces questions later.',
    },
    {
      question: 'What is the most common mistake?',
      answer:
        'The most common mistake is underestimating the labour and treating the material list as if it is the whole job. A partial rewire usually needs more time than that.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/partial-rewire-cost-guide',
      title: 'Partial Rewire Cost Guide',
      description: 'See the wider cost picture before splitting labour and materials.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'Compare partial rewire pricing with full rewire pricing.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'Useful when the job also includes board work.',
      icon: 'FileCheck2',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build a clear quote from labour, materials, and scope.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Turn the quote into a clean invoice once the work is done.',
      icon: 'FileText',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Price the partial rewire in a way that makes sense to the client',
  ctaSubheading:
    'Keep labour, materials, and scope visible so the quote is easier to trust and easier to invoice later.',
};
