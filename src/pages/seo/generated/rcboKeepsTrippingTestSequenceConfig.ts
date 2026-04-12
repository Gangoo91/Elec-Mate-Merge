import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const rcboKeepsTrippingTestSequenceConfig: GeneratedGuideConfig = {
  pagePath: '/guides/rcbo-keeps-tripping-test-sequence',
  title: 'RCBO Keeps Tripping Test Sequence | Electrician Guide | Elec-Mate',
  description:
    'A practical test sequence for an RCBO that keeps tripping, with a simple order for isolating the fault, checking the circuit, and recording the fix.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Fault Guide',
  badgeIcon: 'Gauge',
  breadcrumbLabel: 'RCBO Test Sequence',
  heroPrefix: 'RCBO Keeps Tripping',
  heroHighlight: 'Test Sequence',
  heroSubtitle:
    'A clear, repeatable order for finding the fault fast, keeping the job tidy, and getting the customer to a proper fix instead of repeated resets.',
  keyTakeaways: [
    'Start with the trip pattern. An immediate trip usually points to a different fault than one that appears under load.',
    'Separate the circuit early so you know whether the problem sits on the RCBO, the wiring, or the connected load.',
    'Visual checks and dead testing should narrow the fault before you start swapping parts or guessing.',
    'Once the fault is found, record the repair clearly and retest before you leave the job.',
    'Elec-Mate helps you move from diagnosis to quote, certificate, and handover without rewriting the job.',
  ],
  sections: [
    {
      id: 'start-here',
      heading: 'Start with the trip pattern',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Before you touch the board, find out when the RCBO trips. Instant tripping, tripping after a load starts, and tripping only in wet weather all point you in different directions. That first question saves time and stops you chasing the wrong fault.',
        },
        {
          type: 'paragraph',
          text:
            'If the same circuit has been altered before, check what changed. A recent kitchen, bathroom, EV charger, shower, or outdoor circuit often explains why the issue only appears now.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not keep resetting it',
          text:
            'Repeated resets do not diagnose the fault. Clear the downstream side, work in a controlled order, and reintroduce circuits one at a time so you can see exactly where the problem returns.',
        },
      ],
    },
    {
      id: 'sequence',
      heading: 'A simple sequence that works',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Confirm the symptom and note when the RCBO trips.',
            'Switch off or disconnect the downstream load so you can test the circuit in a controlled way.',
            'Inspect obvious problem points first: outdoor accessories, damaged flexes, heat marks, and anything recently disturbed.',
            'Carry out the dead tests that fit the suspected fault before forcing live resets.',
            'Reintroduce the load or circuit sections one at a time and watch for the trip to return.',
            'Once you have found the fault, repair the circuit, then retest and confirm the result.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If you need a broader fault-finding order, the [RCBO keeps tripping guide](/guides/rcbo-keeps-tripping-guide) and [RCD keeps tripping guide](/guides/rcd-keeps-tripping) are the natural companion pages.',
        },
      ],
    },
    {
      id: 'common-causes',
      heading: 'What usually causes the trip',
      blocks: [
        {
          type: 'list',
          tone: 'default',
          items: [
            'Moisture entering outdoor lighting, sockets, or accessories exposed to condensation.',
            'Borrowed neutrals or mixed neutrals after alterations or partial rewires.',
            'A connected appliance leaking to earth under load.',
            'Damaged cable insulation, crushed flexes, or overheated accessories.',
            'A circuit arrangement that no longer suits the load on it, especially after upgrades.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If the trip keeps happening on an older installation, it is worth checking the wider condition of the circuit. Some jobs need a proper [EICR limitations review](/guides/eicr-limitations) before the right repair path is clear.',
        },
      ],
    },
    {
      id: 'after-the-fix',
      heading: 'Record the repair properly',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Once you have fixed the fault, retest the circuit and write down what you found. The customer needs a clear explanation of the cause, the repair, and the result after the repair. That keeps the job defendable and avoids loose notes that do not match the work completed.',
        },
        {
          type: 'paragraph',
          text:
            'If the repair leads to a quote for wider remedials, move straight into the [electrical quoting app](/electrical-quoting-app) so the fault, the fix, and the price all stay in one clean workflow.',
        },
      ],
    },
    {
      id: 'when-to-upgrade',
      heading: 'When the answer is a wider upgrade',
      blocks: [
        {
          type: 'paragraph',
          text:
            'Sometimes the RCBO is not the real problem. If the installation is crowded, badly separated, or repeatedly altered, the practical fix may be a cleaner board layout or a fuller remedial job rather than another temporary patch.',
        },
        {
          type: 'paragraph',
          text:
            'For those jobs, the [consumer unit upgrade guide](/guides/consumer-unit-upgrade) and [consumer unit upgrade cost guide](/guides/consumer-unit-upgrade-cost-guide) help you turn the fault into a proper quote and a sensible next step.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Why does an RCBO trip even when the circuit looks fine?',
      answer:
        'The fault may only appear under load, when a flex moves, or when moisture is present. A circuit can look normal at a glance and still fail when tested in the right order.',
    },
    {
      question: 'Should I replace the RCBO straight away?',
      answer:
        'Not usually. Find the reason it is tripping first. Replacing the device without checking the circuit can hide the fault and waste the visit.',
    },
    {
      question: 'What is the quickest way to narrow it down?',
      answer:
        'Separate the downstream side, test the circuit in a controlled order, and reintroduce loads one at a time. That usually shows whether the problem is the wiring, the accessory, or the connected load.',
    },
    {
      question: 'When does this become a certificate or remedial job?',
      answer:
        'If the repair goes beyond a quick fix and changes the installation or the circuit arrangement, it should be recorded properly and quoted properly. Use the paperwork that matches the actual work completed.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/rcbo-keeps-tripping-guide',
      title: 'RCBO Keeps Tripping',
      description: 'The main RCBO fault page for the same problem family.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/rcd-keeps-tripping',
      title: 'RCD Keeps Tripping',
      description: 'Use this when the whole protected group is tripping.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Capture the readings, observations, and handover properly.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
    {
      href: '/electrical-quoting-app',
      title: 'Electrical Quoting App',
      description: 'Turn the fault into a clean quote without rewriting the job.',
      icon: 'Calculator',
      category: 'Tool',
    },
    {
      href: '/guides/eicr-limitations',
      title: 'EICR Limitations',
      description: 'When the installation condition limits how far you can go on site.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade',
      title: 'Consumer Unit Upgrade',
      description: 'Use this when the board arrangement itself needs improving.',
      icon: 'Wrench',
      category: 'Guide',
    },
    {
      href: '/guides/consumer-unit-upgrade-cost-guide',
      title: 'Consumer Unit Upgrade Cost',
      description: 'A pricing guide for turning the fault into a quote.',
      icon: 'PoundSterling',
      category: 'Guide',
    },
  ],
  ctaHeading: 'Work the fault through to a proper next step',
  ctaSubheading:
    'Use the same flow for the diagnosis, the quote, the certificate, and the handover so the customer gets a clear result and you keep the job moving.',
};
