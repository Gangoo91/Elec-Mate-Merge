import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const semi1930sConsumerUnitUpgradeConfig: GeneratedGuideConfig = {
  pagePath: '/guides/1930s-semi-consumer-unit-upgrade',
  title: '1930s Semi Consumer Unit Upgrade | Electrician Guide | Elec-Mate',
  description:
    'What to expect when upgrading a consumer unit in a 1930s semi, including access, cable condition, earthing, testing, and common cost drivers.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: '1930s Semi Consumer Unit Upgrade',
  heroPrefix: '1930s Semi',
  heroHighlight: 'Consumer Unit Upgrade',
  heroSuffix: 'explained clearly',
  heroSubtitle:
    'A simple, customer-friendly guide to the checks, work, and paperwork involved when a 1930s semi needs a new consumer unit.',
  keyTakeaways: [
    'A consumer unit upgrade in a 1930s semi often needs more than a like-for-like board swap because earthing, cable condition, and circuit layout can all affect the job.',
    'The condition of the existing installation is usually the biggest factor in the price, not just the board itself.',
    'Good testing and clear notes matter because older properties often reveal extra issues once the board is opened up.',
    'A clear quote should explain what is included, what is not, and whether remedials might be needed before the upgrade can be completed safely.',
    'Elec-Mate helps keep the quote, test results, and certificate flow together in one mobile-first process.',
  ],
  sections: [
    {
      id: 'what-changes-in-1930s-semi',
      heading: 'Why a 1930s semi can be different',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A 1930s semi can look straightforward from the outside, but the electrical installation behind the scenes may tell a different story. Older earthing arrangements, mixed cable types, past alterations, and limited space around the board can all change how the upgrade is approached.',
        },
        {
          type: 'paragraph',
          text:
            'That is why the quote should not just be based on the price of the consumer unit itself. The real job is often about what needs checking, changing, and proving before the new board can be signed off properly.',
        },
      ],
    },
    {
      id: 'what-needs-checking',
      heading: 'What should be checked before the upgrade',
      blocks: [
        {
          type: 'list',
          items: [
            'The earthing and bonding arrangements.',
            'The condition of existing circuit cables and accessories.',
            'Whether the existing board layout still makes sense for the property.',
            'Any signs that past alterations were done in stages or by different people.',
            'Whether the upgrade is likely to trigger extra remedials before completion.',
          ],
        },
      ],
    },
    {
      id: 'cost-drivers',
      heading: 'What usually changes the price',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The board itself is only one part of the cost. Labour, testing, rewiring of awkward sections, labels, protection devices, making good, and any extra work needed to bring the installation up to a clean standard all affect the final figure.',
        },
        {
          type: 'paragraph',
          text:
            'For a wider price context, [consumer unit upgrade cost guide](/guides/consumer-unit-upgrade-cost-guide) is a useful companion page.',
        },
      ],
    },
    {
      id: 'paperwork',
      heading: 'Testing and paperwork should match the work done',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once the board is changed, the results need to be recorded clearly so the client has a proper record of what was done and how it was tested. The paperwork should show the work, the readings, and any follow-on action in a way that makes sense later.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Useful if the job also needs a certificate or a quote',
          text:
            'If the upgrade leads into a wider inspection or a quote for extra work, [digital EICR certificates](/tools/eicr-certificate) and [electrical quoting](/electrical-quoting-app) keep the next step simple.',
        },
      ],
    },
    {
      id: 'scope',
      heading: 'When the job becomes more than a board change',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the installation throws up bigger problems, the work may need to expand into remedials or a fuller inspection. In that case, the scope should be updated rather than pretending the original job still covers everything.',
        },
        {
          type: 'paragraph',
          text:
            'For homeowners, the most useful explanation is usually simple: the board upgrade is one part of making the electrics safer and easier to manage, but the condition of the rest of the installation still matters.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why is a 1930s semi different for a consumer unit upgrade?',
      answer:
        'Because older homes often have mixed wiring history, different earthing arrangements, and more unknowns behind the board than a newer property.',
    },
    {
      question: 'Does every consumer unit upgrade need extra work?',
      answer:
        'No. But older properties are more likely to reveal remedials, testing issues, or access problems that affect the final scope.',
    },
    {
      question: 'What is the biggest cost driver?',
      answer:
        'Usually the labour and any extra work needed to make the installation safe and complete, not just the price of the consumer unit itself.',
    },
    {
      question: 'Should the customer expect a certificate?',
      answer:
        'Yes, the work should be documented properly so the customer has a clear record of what was changed and how it was tested.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/1930s-semi-electrical-requirements',
      title: '1930s Semi Electrical Requirements',
      description: 'See the wider electrical considerations for this property type.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'A broader guide to board changes and what they involve.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost Guide',
      description: 'Understand the cost drivers before you quote.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Record test results and handover details cleanly.',
      icon: 'FileText',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn the scope into a clear quote without starting over.',
      icon: 'Calculator',
      category: 'Tool',
    },
  ],
  ctaHeading: 'Make a 1930s semi board upgrade easier to explain and easier to quote',
  ctaSubheading:
    'Keep the checks, price, testing, and paperwork together so the job feels clear from first visit to final handover.',
};
