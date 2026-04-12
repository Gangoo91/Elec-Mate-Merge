import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const semi1930sElectricalRequirementsConfig: GeneratedGuideConfig = {
  pagePath: '/guides/1930s-semi-electrical-requirements',
  title: '1930s Semi Electrical Requirements | Survey and Upgrade Guide | Elec-Mate',
  description:
    'Common electrical requirements and survey issues in a 1930s semi, including the signs that point to upgrades, rewire work, and a clearer next step.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'Property Guide',
  badgeIcon: 'Home',
  breadcrumbLabel: '1930s Semi Requirements',
  heroPrefix: '1930s Semi',
  heroHighlight: 'Electrical Requirements',
  heroSubtitle:
    'A practical guide to the electrical issues that often show up in 1930s semi-detached homes, and how to explain the next step clearly to a customer.',
  keyTakeaways: [
    '1930s semis often have a mix of older wiring, later alterations, and board changes that do not always line up neatly.',
    'Survey issues usually include limited access, outdated consumer units, mixed cable types, and signs that the installation has been altered over time.',
    'A good report should separate what is urgent, what is likely, and what can wait until the customer decides the budget.',
    'If the property needs more than a small upgrade, a full rewire quote is often easier to understand than a long list of disconnected remedials.',
    'Elec-Mate helps turn the survey into a clean mobile workflow for notes, quotes, certificates, and handover.',
  ],
  sections: [
    {
      id: 'what-to-expect',
      heading: 'What a 1930s semi often needs',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A 1930s semi can be a straightforward property to work in, but it often hides a mix of old and new electrical work. It is common to find later extensions, partial upgrades, altered lighting, mixed accessories, and a consumer unit that no longer reflects the way the house is actually used.',
        },
        {
          type: 'paragraph',
          text:
            'The right response is usually not to guess. A proper survey should show whether the house needs a consumer unit upgrade, a larger remedial package, or a full rewire. If the work is already looking substantial, [rewire cost UK](/guides/rewire-cost-uk) is the best companion guide. If the board is the main weak point, [consumer unit upgrade cost guide](/guides/consumer-unit-upgrade-cost-guide) gives the clearer starting point.',
        },
      ],
    },
    {
      id: 'common-survey-issues',
      heading: 'Common survey issues in these homes',
      blocks: [
        {
          type: 'list',
          items: [
            'Outdated consumer units, often with older protective arrangements or poor labeling.',
            'Mixed wiring history from different periods of alteration and extension.',
            'Signs of wear in sockets, switches, light fittings, and wiring accessories.',
            'Limited access to lofts, floor voids, or chased routes that makes the installation harder to assess.',
            'Evidence that the property has had multiple small fixes rather than one joined-up upgrade.',
          ],
        },
      ],
    },
    {
      id: 'how-to-explain-the-next-step',
      heading: 'How to explain the next step to the customer',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Customers usually want one thing: a clear answer about what is safe, what is outdated, and what should happen next. Avoid giving them a long list of technical points without a conclusion. If the survey shows a few small issues, explain them plainly. If it shows wider wear, say that a larger upgrade is probably the cleaner option.',
        },
        {
          type: 'list',
          tone: 'success',
          items: [
            'Say whether the priority is the board, the cabling, or the accessories.',
            'Explain whether the property needs a staged upgrade or a fuller renewal.',
            'Separate immediate safety concerns from improvements that can be priced later.',
            'Give the customer one simple next action rather than several disconnected ones.',
          ],
        },
      ],
    },
    {
      id: 'what-to-quote',
      heading: 'What to quote when the job needs more than a survey',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the survey points to a wider upgrade, the quote should follow the shape of the property, not just the shape of the paperwork. A 1930s semi often needs a consumer unit update, circuit improvements, extra testing, or a larger rewire package depending on what the survey finds.',
        },
        {
          type: 'paragraph',
          text:
            'The [consumer unit upgrade](/guides/consumer-unit-upgrade) guide is useful when the board is the main issue. If the work is broader, the [electrical quoting app](/electrical-quoting-app) keeps the price, scope, and follow-up easy to present. For inspection-led handover, [digital EICR certificates](/tools/eicr-certificate) help keep the survey findings and the next step in one place.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Are 1930s semis usually hard to upgrade?',
      answer:
        'Not always, but they often need a careful survey because later alterations, mixed wiring, and limited access can make the job more involved than it first looks.',
    },
    {
      question: 'When does a 1930s semi need a rewire rather than a small upgrade?',
      answer:
        'If the survey shows widespread older wiring, repeated alterations, or too many weak points to solve neatly, a full rewire is often the cleaner and easier-to-explain option.',
    },
    {
      question: 'Should the customer get a full quote after the survey?',
      answer:
        'Yes, if the property needs more than a small fix. A clear quote helps the customer see the difference between a board upgrade, staged remedials, and a full rewire.',
    },
    {
      question: 'Can an EICR help decide what to do next?',
      answer:
        'Yes. An inspection report can show the condition of the installation and make it easier to decide whether the next step is a limited upgrade or a larger project.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'See when a board change is enough and when more work is needed.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost Guide',
      description: 'Break down the price when the consumer unit is the main issue.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
    {
      href: '/guides/rewire-cost-uk',
      title: 'Rewire Cost UK',
      description: 'Check the likely cost if the survey points to a full rewire.',
      icon: 'Calculator',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Keep the survey findings and certificate workflow together.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn the survey into a clear, mobile-friendly quote.',
      icon: 'Wrench',
      category: 'App',
    },
  ],
  ctaHeading: 'Turn survey findings into a clear next step',
  ctaSubheading:
    'Use a mobile-first workflow to keep the notes, quote, certificate, and handover easy to read and easy to send.',
};
