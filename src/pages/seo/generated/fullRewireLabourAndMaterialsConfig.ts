import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const fullRewireLabourAndMaterialsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/full-rewire-labour-and-materials',
  title: 'Full Rewire Labour and Materials | Electrician Guide | Elec-Mate',
  description:
    'How electricians break down full rewire labour and materials, what changes the price, and how to explain the cost clearly to clients.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Pricing Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Full Rewire Labour and Materials',
  heroPrefix: 'Full Rewire',
  heroHighlight: 'Labour and Materials',
  heroSubtitle:
    'A practical guide to pricing a full rewire properly, separating labour from materials, and explaining the total in a way clients can understand straight away.',
  keyTakeaways: [
    'Labour and materials should be priced separately so the quote is easier to explain and easier to adjust.',
    'Labour is usually driven by access, property size, number of circuits, and how much making good is needed.',
    'Materials vary with cable lengths, accessories, the consumer unit, fire stopping, and any specialist items required.',
    'A clear breakdown helps the client see what they are paying for and reduces the chance of disputes later.',
    'Elec-Mate helps you turn the survey into a clear quote and invoice without rebuilding the job twice.',
  ],
  sections: [
    {
      id: 'start-here',
      heading: 'Start with the scope of the job',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Before you split out labour and materials, you need a clear scope. A full rewire is not just new cable. It usually includes first fix, second fix, accessories, the consumer unit, testing, certification, and making the installation ready for use.',
        },
        {
          type: 'paragraph',
          text:
            'If you need the wider cost context first, the [full rewire cost guide](/guides/full-rewire-cost-guide) is the best place to start. This page focuses on how the price is built up rather than the overall figure alone.',
        },
      ],
    },
    {
      id: 'labour',
      heading: 'What labour usually covers',
      blocks: [
        {
          type: 'list',
          items: [
            'Survey time, measuring up, and checking the route for the new wiring.',
            'First fix labour, including chasing, lifting floorboards, and running the new circuits.',
            'Second fix labour, including sockets, switches, lights, and final connections.',
            'Testing, certification, and final client handover.',
            'Time spent on making good where the job includes it.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Labour is where experience matters most. Two properties with the same floor area can take very different amounts of time if one has easy access, modern construction, and straightforward routes, while the other has tight voids, damaged plaster, or awkward existing alterations.',
        },
      ],
    },
    {
      id: 'materials',
      heading: 'What materials usually include',
      blocks: [
        {
          type: 'list',
          items: [
            'Cable, containment, fixings, glands, and trunking where required.',
            'Sockets, switches, lights, isolators, and other accessories.',
            'The consumer unit, protective devices, labels, and circuit schedule materials.',
            'Consumables and sundries that are part of the job rather than a separate extra.',
            'Any special materials needed for fire stopping, IP-rated areas, or site-specific conditions.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Materials can look small on paper and still move the final price a lot once the full list is counted. A rewire with more sockets, lighting points, or a higher-spec finish will naturally carry a bigger materials line than a basic like-for-like replacement.',
        },
      ],
    },
    {
      id: 'how-to-price',
      heading: 'How to price it clearly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The simplest way to price a full rewire is to estimate the labour separately from the materials, then add any extras that the client has specifically asked for. That gives you a quote that is easier to defend if the job changes partway through.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Break it down before you send it',
          text:
            'If a client asks why one quote is higher than another, you want to be able to explain the difference without rewriting the whole job. Labour, materials, testing, and finishing work should all be visible in the final price.',
        },
        {
          type: 'paragraph',
          text:
            'If the installation is complex or the scope is still moving, build the quote in the [electrical quoting app](/electrical-quoting-app) so you can adjust the estimate as the survey gets clearer.',
        },
      ],
    },
    {
      id: 'invoice',
      heading: 'Keep the invoice aligned with the quote',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once the work is complete, the invoice should still reflect the same split between labour and materials. That keeps the billing easy to understand and reduces questions after the job is finished.',
        },
        {
          type: 'paragraph',
          text:
            'If you are sending the final bill after a rewire, the [electrician invoice app](/electrician-invoice-app) keeps the pricing, job notes, and billing together so you do not have to recreate the job from scratch.',
        },
        {
          type: 'paragraph',
          text:
            'For the wider cost context, the [rewire cost UK guide](/guides/rewire-cost-uk) and the [consumer unit replacement cost guide](/guides/consumer-unit-replacement-cost) are useful companion pages when the client is comparing different options.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Should labour and materials always be shown separately?',
      answer:
        'Usually yes, because it makes the quote easier to explain, easier to compare, and easier to adjust if the scope changes.',
    },
    {
      question: 'What affects labour on a full rewire the most?',
      answer:
        'Access, property type, the number of circuits, how much making good is needed, and whether the property is occupied during the work.',
    },
    {
      question: 'What makes materials higher on one rewire than another?',
      answer:
        'More accessories, longer cable runs, better specification finishes, a new consumer unit, and any specialist fire or environmental requirements.',
    },
    {
      question: 'Can a full rewire quote turn into a staged invoice?',
      answer:
        'Yes. The quote can be built around labour and materials first, then the invoice can follow the same structure once the work is complete.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/full-rewire-cost-guide',
      title: 'Full Rewire Cost Guide',
      description: 'The wider price guide for full rewires before you break it down.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'National rewire pricing and what usually changes the total.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'Useful when the board change is part of the wider rewire scope.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build and adjust the labour and materials split on site.',
      icon: 'Calculator',
      category: 'App',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Keep the final bill aligned with the work that was actually completed.',
      icon: 'FileText',
      category: 'App',
    },
  ],
  ctaHeading: 'Price the rewire with less guesswork',
  ctaSubheading:
    'Keep labour, materials, quote, and invoice aligned so the client sees a clear breakdown and you keep the job easy to defend later.',
};
