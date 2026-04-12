import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const partialRewireCostGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/partial-rewire-cost-guide',
  title: 'Partial Rewire Cost Guide | Electrician Pricing | Elec-Mate',
  description:
    'How to price a partial rewire clearly, what changes the cost, and how to keep the quote understandable for both electricians and customers.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Pricing Guide',
  badgeIcon: 'PoundSterling',
  breadcrumbLabel: 'Partial Rewire Cost Guide',
  heroPrefix: 'Partial Rewire',
  heroHighlight: 'Cost Guide',
  heroSubtitle:
    'A practical guide to pricing partial rewires properly, explaining the scope clearly, and turning the survey into a quote the customer can understand.',
  keyTakeaways: [
    'A partial rewire price should reflect the exact scope, not a rough guess based on the full house rewire headline.',
    'The biggest cost drivers are access, circuit condition, the number of rooms involved, making good, and whether the work needs follow-on certification or remedials.',
    'A clear quote separates included work from excluded work so the customer knows what is covered.',
    'Mobile quoting works better because the survey notes, pricing, and invoice can stay together in one workflow.',
    'If the partial rewire grows into a larger job, it may be worth comparing it with a [full rewire cost guide](/guides/full-rewire-cost-guide) before the quote goes out.',
  ],
  sections: [
    {
      id: 'what-counts',
      heading: 'What counts as a partial rewire?',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A partial rewire is usually a selective renewal of parts of an installation rather than a full strip-out and replacement. It might cover a kitchen, a loft conversion, a damaged lighting circuit, a group of sockets, or a section of older wiring that no longer makes sense to keep as it is.',
        },
        {
          type: 'paragraph',
          text:
            'The price depends on what is actually being changed. A job that only touches one or two circuits will price very differently from a partial rewire that also needs access work, making good, and extra testing.',
        },
      ],
    },
    {
      id: 'cost-drivers',
      heading: 'What changes the price the most',
      blocks: [
        {
          type: 'list',
          items: [
            'How much of the existing wiring is being removed or renewed.',
            'Whether ceilings, floors, and walls are easy to access.',
            'How many circuits, accessories, and rooms are included.',
            'Whether the work needs extra testing, certification, or follow-on remedials.',
            'How much making good, protection, or temporary provision is required.',
          ],
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
            'The cleanest way to price a partial rewire is to split the scope into visible parts: labour, materials, testing, making good, and anything excluded. That makes it easier for the customer to understand why the number is what it is, and easier for you to defend the quote later.',
        },
        {
          type: 'paragraph',
          text:
            'If you are pricing the job on the road, the [electrical quoting app](/electrical-quoting-app) helps keep the survey notes and the final quote together so you do not have to rebuild it from memory afterwards.',
        },
      ],
    },
    {
      id: 'compare-to-full-rewire',
      heading: 'When to compare it with a full rewire',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Sometimes a partial rewire stops making sense once the scope starts to spread. If the work is touching several rooms, multiple circuits, or a lot of the same old cable at once, it is worth comparing the job with a full rewire rather than stretching the smaller scope too far.',
        },
        {
          type: 'paragraph',
          text:
            'A good benchmark is the [rewire cost UK guide](/guides/rewire-cost-uk) and the [full rewire cost guide](/guides/full-rewire-cost-guide). Those pages help show whether the partial repair is still the right commercial answer.',
        },
      ],
    },
    {
      id: 'invoice-and-handover',
      heading: 'Keep the quote and invoice easy to follow',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Customers are much more comfortable when the quote is simple to read and the invoice matches the original scope. If the partial rewire turns into a bigger job, that change should be visible in the paperwork instead of hidden in the final total.',
        },
        {
          type: 'paragraph',
          text:
            'Once the work is agreed, a clean handover and the right billing flow matter just as much as the price itself. That is where the [electrician invoice app](/electrician-invoice-app) helps keep the job tidy from quote to payment.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'How is a partial rewire priced differently from a full rewire?',
      answer:
        'A partial rewire is priced around the exact rooms, circuits, access, and making good involved. A full rewire includes the whole installation, so the labour and materials picture is usually much larger.',
    },
    {
      question: 'Should I give a fixed price or a range?',
      answer:
        'If the scope is well defined, a fixed price is usually better. If there are unknowns such as hidden access issues or uncertain cable condition, a clear range or provisional element may be safer.',
    },
    {
      question: 'What makes a partial rewire quote look weak?',
      answer:
        'Vague scope notes, missing exclusions, and one-line pricing that does not explain what is included usually make the quote harder for the customer to trust.',
    },
    {
      question: 'Can software help with partial rewire pricing?',
      answer:
        'Yes. Software helps keep the survey notes, labour items, materials, and final quote in one place so the job is easier to price and invoice properly.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'The wider pricing guide when the job is closer to a full rewire.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/full-rewire-cost-guide',
      title: 'Full Rewire Cost Guide',
      description: 'Useful when the scope is large enough that a full rewire is the better comparison.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-replacement-cost',
      title: 'Consumer Unit Replacement Cost',
      description: 'Helpful where the partial rewire also leads to board upgrade pricing.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Build the quote from the survey without starting again later.',
      icon: 'Calculator',
      category: 'App',
    },
    {
      href: '/electrician-invoice-app',
      title: 'Electrician Invoice App',
      description: 'Keep the invoice aligned with the agreed scope and quote.',
      icon: 'FileCheck2',
      category: 'App',
    },
  ],
  ctaHeading: 'Price partial rewires clearly and get the paperwork right',
  ctaSubheading:
    'Keep the survey, quote, and invoice together in one mobile-first workflow so the customer sees a clean, confident job from the start.',
};
