import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const rcboKeepsTrippingCommonCausesConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rcbo-keeps-tripping-common-causes',
  title: 'RCBO Keeps Tripping Common Causes | Electrician Guide | Elec-Mate',
  description:
    'The most common reasons an RCBO keeps tripping, how to narrow the cause down quickly, and what to check before turning it into a quote or certificate.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Fault Guide',
  badgeIcon: 'ShieldCheck',
  breadcrumbLabel: 'RCBO Common Causes',
  heroPrefix: 'RCBO Keeps Tripping',
  heroHighlight: 'Common Causes',
  heroSubtitle:
    'A practical guide to the faults electricians see most often, the checks that save time on site, and the fixes that lead naturally into clear paperwork and proper handover.',
  keyTakeaways: [
    'An RCBO usually points you to one circuit, one load, or one damaged point rather than a whole board problem.',
    'The most common causes are overload, leakage to earth, damaged accessories, moisture ingress, and recent alteration work.',
    'Read the trip pattern first. Instant trips, load-related trips, and intermittent trips usually need a different test path.',
    'If the fix is bigger than a local repair, record that clearly and move the job toward a quote or further inspection.',
    'Elec-Mate helps you move from fault, to quote, to certificate, without losing the details in the middle.',
  ],
  sections: [
    {
      id: 'start-here',
      heading: 'Start with the way it trips',
      blocks: [
        {
          type: 'paragraph',
          text:
            'An RCBO that trips instantly usually behaves differently from one that trips only under load or only after a few minutes. That simple detail often tells you whether you are dealing with a hard fault, leakage, or a circuit that is being asked to carry more than it should.',
        },
        {
          type: 'paragraph',
          text:
            'If the same circuit keeps failing after a reset, work from the symptom outward. Check what was running, what changed recently, and whether the issue follows a particular appliance, accessory, or area of the property.',
        },
      ],
    },
    {
      id: 'common-causes',
      heading: 'The common causes electricians see',
      blocks: [
        {
          type: 'list',
          items: [
            'Overload from too many loads or a circuit being used harder than it was intended to be used.',
            'Leakage to earth from a shower, immersion, fixed appliance, or damaged cable on the circuit.',
            'Moisture ingress on outdoor sockets, garden circuits, plant rooms, or high-condensation areas.',
            'Loose terminations, heat damage, and worn accessories that only fail once the circuit is under demand.',
            'Alteration work that has left a borrowed neutral, bad junction, or other hidden wiring issue behind.',
          ],
        },
      ],
    },
    {
      id: 'what-to-check',
      heading: 'What to check before you write it up',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Check the obvious items first: the connected load, any recent changes, outdoor accessories, and anything that gets hot, wet, or heavily used. If the fault is showing up on one circuit after another on the same board, the problem may be wider than the first symptom suggests.',
        },
        {
          type: 'callout',
          tone: 'info',
          title: 'Do not leave the client with a vague answer',
          text:
            'If the circuit needs further investigation, say so clearly. A proper note about what was found, what was tested, and what remains unresolved is better than a quick guess that will not stand up later.',
        },
        {
          type: 'paragraph',
          text:
            'If the issue is pointing toward a bigger condition problem rather than one simple repair, the [EICR limitations guide](/guides/eicr-limitations) is a useful companion when you need to explain why further work is being recommended.',
        },
      ],
    },
    {
      id: 'next-step',
      heading: 'When the fix is not just a reset',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A small local repair may be enough, but repeated trips often mean the installation needs a better long-term solution. That can mean repairing the damaged point, separating a heavy load, upgrading a weak circuit, or recommending a fuller change to the consumer unit arrangement.',
        },
        {
          type: 'paragraph',
          text:
            'When the job becomes a formal report or a follow-on remedial visit, move the paperwork into the [digital EICR certificate flow](/tools/eicr-certificate) or turn it into a clear [consumer unit upgrade quote](/guides/consumer-unit-upgrade-cost-guide) rather than leaving it as a loose note.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is an RCBO trip always a single-circuit problem?',
      answer:
        'Usually, yes. The device protects one circuit, so the fault is normally on that circuit or in the connected load, not across the whole board.',
    },
    {
      question: 'Can moisture really trip an RCBO?',
      answer:
        'Yes. Outdoor fittings, damp spaces, and seasonal condensation are common reasons for intermittent tripping on a single circuit.',
    },
    {
      question: 'Should I replace the RCBO first?',
      answer:
        'Only if the evidence points to the device itself. In most cases the cause is wiring, load, or an accessory on the circuit.',
    },
    {
      question: 'What should I do if the same circuit keeps returning?',
      answer:
        'Record the repeated fault clearly, check for a wider circuit issue, and recommend the next proper step rather than leaving the client with a temporary reset.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rcbo-keeps-tripping-guide',
      title: 'RCBO Keeps Tripping Guide',
      description: 'A broader guide to the fault family and how to narrow it down.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/guides/rcd-keeps-tripping',
      title: 'RCD Keeps Tripping',
      description: 'Useful when the problem affects a whole bank rather than one circuit.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'When the board layout itself is part of the problem.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Capture the fault, the findings, and the handover in one place.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: 'Turn the fault into clear next steps',
  ctaSubheading:
    'Record the cause, the test result, and the follow-on work in one workflow so the job is easier to explain, price, and hand over.',
};
