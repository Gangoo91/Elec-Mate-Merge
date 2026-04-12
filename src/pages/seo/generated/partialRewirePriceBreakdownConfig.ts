import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const partialRewirePriceBreakdownConfig: GeneratedGuideConfig = {
  pagePath: '/guides/partial-rewire-price-breakdown',
  title: 'Partial Rewire Price Breakdown | Guide | Elec-Mate',
  description:
    'A clear breakdown of partial rewire pricing for electricians and customers, including labour, materials, testing, and common cost drivers.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Price Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Price Breakdown',
  heroPrefix: 'Partial Rewire',
  heroHighlight: 'Price Breakdown',
  heroSubtitle:
    'Understand where the price comes from, what changes the total, and how to explain a partial rewire estimate clearly to the customer.',
  keyTakeaways: [
    'Partial rewire pricing usually depends on the size of the area, access, cable runs, making good, and how much of the existing installation is being replaced.',
    'Labour is often the biggest part of the cost, but materials, testing, and follow-up paperwork also need to be included in the price.',
    'A clear breakdown helps customers see what they are paying for and helps electricians avoid underquoting the job.',
    'If the work grows beyond a partial rewire, the scope and the price should be reset rather than forced into the original estimate.',
    'Elec-Mate helps keep the quote, invoice, and job notes in one place so the pricing is easier to explain and send.',
  ],
  sections: [
    {
      id: 'what-drives-the-price',
      heading: 'What drives the price',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A partial rewire is rarely priced as one simple lump sum. The total usually depends on how many rooms are involved, how easy the cables are to route, whether walls and ceilings need opening up, and how much making good will be needed afterwards.',
        },
        {
          type: 'list',
          items: [
            'Number of rooms, circuits, and accessories being replaced.',
            'How much of the existing wiring can stay in place.',
            'Whether the job is open plan, occupied, or difficult to access.',
            'How much testing, certification, and handover is needed at the end.',
          ],
        },
      ],
    },
    {
      id: 'labour-costs',
      heading: 'Labour is usually the largest part',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Most partial rewires are labour-heavy jobs. The time goes into safe isolation, pulling new cable routes, replacing accessories, testing the finished circuits, and dealing with the details that only show up once the work starts. If the property is occupied, the labour time often increases because the work has to be phased carefully.',
        },
        {
          type: 'callout',
          tone: 'pricing',
          title: 'Do not underprice the time on site',
          text:
            'If you only price the visible work, you will usually miss the time spent tracing existing circuits, making good, and checking the final installation. A proper quote should reflect the real time needed to complete the job safely.',
        },
      ],
    },
    {
      id: 'materials-and-testing',
      heading: 'Materials and testing',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Materials can include cable, accessories, protective devices, fixings, containment, and any new consumer unit parts needed to support the altered circuits. Testing also matters because the job is not complete until the installation has been checked and the results recorded.',
        },
        {
          type: 'paragraph',
          text:
            'If the work connects to a larger project, you may also want to compare the scope against [partial rewire cost guidance](/guides/partial-rewire-cost-guide) and [full rewire costs in the UK](/guides/rewire-cost-uk) so the customer understands the difference between partial and full replacement.',
        },
      ],
    },
    {
      id: 'customer-explanation',
      heading: 'How to explain the breakdown to the customer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Customers usually want one thing first: a clear reason for the number. Break the price into labour, materials, testing, and any likely extras, then explain what could change if hidden defects are found once work starts. That makes the quote easier to trust and easier to approve.',
        },
        {
          type: 'paragraph',
          text:
            'If the job later turns into a consumer unit replacement or a larger scope change, use [consumer unit replacement cost](/guides/consumer-unit-replacement-cost) or update the price through your [electrical quoting app](/electrical-quoting-app) so the customer sees the revised total clearly.',
        },
      ],
    },
    {
      id: 'stay-in-control',
      heading: 'Keep the job and invoice aligned',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The best pricing pages do not just explain the estimate. They help you keep the job aligned through to invoice. If the scope changes, update the quote, record the extra work, and make sure the final invoice matches what was actually completed.',
        },
        {
          type: 'callout',
          tone: 'success',
          title: 'Make the pricing easy to finish',
          text:
            'Elec-Mate helps electricians keep the quote, invoice, and handover together so the customer gets one clear version of the job from start to finish.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is included in a partial rewire price?',
      answer:
        'A partial rewire price should normally include labour, materials, testing, and a sensible allowance for making good. If the scope is unclear, the estimate should say what is included and what may change the final price.',
    },
    {
      question: 'Why can a partial rewire be so expensive?',
      answer:
        'Because the work often involves a lot of labour for a limited visible result. Opening routes, pulling cable, checking existing circuits, and restoring finishes can take more time than customers expect.',
    },
    {
      question: 'Should I separate labour and materials on the quote?',
      answer:
        'Yes. A breakdown makes the quote easier to understand and gives the customer a clearer view of where the cost comes from.',
    },
    {
      question: 'What if the partial rewire grows into a bigger job?',
      answer:
        'The scope should be reset and the price updated. It is better to revise the job than to squeeze extra work into the original estimate.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/partial-rewire-cost-guide',
      title: 'Partial Rewire Cost Guide',
      description: 'A broader guide to the costs involved in a partial rewire.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'Compare partial and full rewire pricing for larger jobs.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'See how consumer unit changes affect the overall job price.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build a clean quote and keep the customer-facing price clear.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Turn the approved job into a clear invoice without rewriting details.',
      icon: 'FileCheck2',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Quote the job clearly from the start',
  ctaSubheading:
    'Use Elec-Mate to keep the estimate, scope, and final invoice aligned so the price is easier to explain and send.',
};

