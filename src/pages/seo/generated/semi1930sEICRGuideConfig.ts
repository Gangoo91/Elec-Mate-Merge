import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-04-12';

export const semi1930sEICRGuideConfig: GeneratedGuideConfig = {
  pagePath: '/guides/1930s-semi-eicr-guide',
  title: '1930s Semi EICR Guide | What Electricians Check | Elec-Mate',
  description:
    'What electricians look for on an EICR in a 1930s semi, which issues are common, and how the findings are usually explained to clients.',
  datePublished: published,
  dateModified: modified,
  readingTime: 9,
  badge: 'EICR Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: '1930s Semi EICR',
  heroPrefix: '1930s Semi',
  heroHighlight: 'EICR Guide',
  heroSubtitle:
    'A practical guide to the checks electricians make in a 1930s semi, the issues that often show up, and how to explain the report clearly to the client.',
  keyTakeaways: [
    'A 1930s semi often needs careful checking because original wiring, later alterations, and partial upgrades can all coexist in the same property.',
    'Electricians look closely at earthing, bonding, circuit protection, insulation condition, and the quality of any past changes.',
    'A clear EICR should explain the result in plain language, not just list codes.',
    'If defects are found, the report should show what needs attention first and what can wait.',
    'Elec-Mate helps keep the readings, observations, and handover together in one workflow.',
  ],
  sections: [
    {
      id: 'what-to-expect',
      heading: 'What makes a 1930s semi different',
      blocks: [
        {
          type: 'paragraph',
          text:
            'A 1930s semi often sits in the middle ground between very old wiring and modern additions. You may find original circuits that have been altered over time, a later consumer unit, newer kitchen circuits, or an extension that does not match the rest of the installation.',
        },
        {
          type: 'paragraph',
          text:
            'That mix is why the EICR matters. It helps the electrician see whether the wiring still matches the way the property is used now, and whether any parts of the installation need urgent work or a fuller upgrade.',
        },
      ],
    },
    {
      id: 'main-checks',
      heading: 'What electricians usually check',
      blocks: [
        {
          type: 'list',
          items: [
            'The consumer unit and whether it gives the right level of protection for the property.',
            'Earthing and bonding, especially at the gas and water services.',
            'Signs of older or damaged cable, poor joints, or altered circuits.',
            'Sockets, switches, lights, and accessories in places where wear or moisture is common.',
            'Whether any extensions, kitchen work, or later changes were wired properly and tested.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'If you want a wider overview of the property type itself, the [1930s semi electrical requirements guide](/guides/1930s-semi-electrical-requirements) is a useful companion page.',
        },
      ],
    },
    {
      id: 'common-findings',
      heading: 'Common findings in this type of property',
      blocks: [
        {
          type: 'list',
          items: [
            'Older wiring that is still present in some parts of the house.',
            'A consumer unit that has been updated, while older circuits remain in service.',
            'Missing or weak bonding to services or out-of-date protective arrangements.',
            'DIY alterations that were never properly tested or documented.',
            'Circuits that are safe enough to continue for now but need improvement or monitoring.',
          ],
        },
        {
          type: 'paragraph',
          text:
            'Not every note in an EICR means the house needs a full rewire. Some issues can be addressed with a targeted repair, while others point to a larger upgrade or a better planned follow-on job.',
        },
      ],
    },
    {
      id: 'reporting',
      heading: 'How the report should be explained',
      blocks: [
        {
          type: 'paragraph',
          text:
            'The report should tell the client what the result means in real terms. If the installation is satisfactory, that should be stated clearly. If there are observations or limitations, they should be easy to understand without decoding the whole certificate.',
        },
        {
          type: 'paragraph',
          text:
            'If you need a cleaner checklist for the report itself, the [EICR what to include guide](/guides/eicr-what-to-include) is the best companion page. It helps explain the parts of the report that should be present and why they matter.',
        },
        {
          type: 'paragraph',
          text:
            'For jobs that turn up more than one issue, the [EICR common mistakes guide](/guides/eicr-common-mistakes) is a useful reminder that the paperwork should stay clear, traceable, and consistent.',
        },
      ],
    },
    {
      id: 'next-step',
      heading: 'What happens if the report is not satisfactory',
      blocks: [
        {
          type: 'paragraph',
          text:
            'If the inspection shows defects, the next step may be a quote for remedial work, a consumer unit upgrade, or a fuller discussion with the client about what should be done first. The important thing is that the handover makes the next step obvious.',
        },
        {
          type: 'paragraph',
          text:
            'When the findings turn into work, the [digital EICR certificate workflow](/tools/eicr-certificate) keeps the readings, observations, and follow-on actions together so nothing gets lost between site and office.',
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'Is a 1930s semi automatically unsafe?',
      answer:
        'No. Many 1930s semis have had partial upgrades over the years. The EICR is there to show what is still satisfactory, what needs attention, and what should be improved next.',
    },
    {
      question: 'What is the most common issue in a 1930s semi?',
      answer:
        'Older wiring, poor bonding, and mixed-quality alterations are common themes, but the exact result depends on how much of the original installation is still in service.',
    },
    {
      question: 'Does an EICR always mean a rewire is needed?',
      answer:
        'No. Some properties only need targeted remedials or a consumer unit upgrade. The report should show the real condition, not assume the same answer for every house.',
    },
    {
      question: 'Should landlords pay special attention to this kind of report?',
      answer:
        'Yes. Landlords need the report to be clear about risk, limitations, and any follow-on work so they can keep the property safe and compliant.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/1930s-semi-electrical-requirements',
      title: '1930s Semi Electrical Requirements',
      description: 'See what a 1930s semi usually needs before or alongside an EICR.',
      icon: 'Home',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-what-to-include',
      title: 'EICR What To Include',
      description: 'A simple checklist for what a clear report should contain.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-common-mistakes',
      title: 'EICR Common Mistakes',
      description: 'Avoid the errors that make a report harder for clients to trust.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-for-landlords',
      title: 'EICR for Landlords',
      description: 'Landlord-focused advice for inspections, actions, and handover.',
      icon: 'ShieldCheck',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete the inspection, readings, and certificate on site.',
      icon: 'FileText',
      category: 'Certificate',
    },
  ],
  ctaHeading: 'Keep the report clear from the start',
  ctaSubheading:
    'Show the client what was checked, what was found, and what needs to happen next without making the handover harder than it needs to be.',
};
