import type { GeneratedGuideConfig } from '@/pages/seo/generated/GeneratedGuidePage';

const published = '2026-04-12';
const modified = '2026-06-10';

export const eicrExampleAndTemplateConfig: GeneratedGuideConfig = {
  pagePath: '/guides/eicr-example-and-template',
  title: 'EICR Example and Template | Electrician Guide | Elec-Mate',
  description:
    'What a strong EICR example or template should include, how to keep the schedule and limitations clear, and how to move cleanly into a finished report.',
  datePublished: published,
  dateModified: modified,
  readingTime: 8,
  badge: 'Certificate Guide',
  badgeIcon: 'FileCheck2',
  breadcrumbLabel: 'EICR Example and Template',
  heroPrefix: 'EICR',
  heroHighlight: 'Example and Template',
  heroSubtitle:
    'A clear guide to what a good example or template should show, how to keep it readable on site, and how to turn it into a finished certificate without missing the important parts.',
  keyTakeaways: [
    'A good EICR template should make the client details, installation scope, and limitations obvious before the findings begin.',
    'Every EICR must be issued with both the Schedule of Circuit Details and the Schedule of Test Results — issuing the report without these schedules means the documentation is incomplete (GN3 Reg 5.7).',
    'The schedule of test results, observations, and overall outcome should read like one joined-up report.',
    'A strong example includes enough structure to speed you up, but not so much clutter that the report feels hard to finish on site.',
    'If the report is going to be handed over properly, the wording needs to stay clear, plain, and consistent from top to bottom.',
    'A mobile workflow makes it easier to complete the report, export it, and keep the paperwork together in one place.',
  ],
  sections: [
    {
      id: 'what-a-good-template-shows',
      heading: 'What a good EICR template should show',
      blocks: [
        {
          type: 'paragraph',
          text: 'A complete EICR must contain: client details, the extent of inspection, any agreed limitations, the Condition Report Schedule of Inspections, the Schedule(s) of Circuit Details, the Schedule(s) of Test Results, Section K observations each coded with a single C1, C2, C3 or (exceptionally) FI code, and the overall outcome — satisfactory, unsatisfactory, or limited in scope. Issuing the report without all three schedule types means the documentation is incomplete (GN3 Reg 3.11). The overall outcome must be recorded as unsatisfactory wherever any observation carries a C1 or C2 code (GN3 Reg 3.11).',
        },
        {
          type: 'paragraph',
          text: 'A useful EICR example is not just a blank form with headings. It shows the shape of a report that someone can actually complete on site without losing the thread. The client, installation, extent of inspection, and any agreed limitations should be obvious before the inspection findings start.',
        },
        {
          type: 'paragraph',
          text: 'If you want a cleaner checklist for the report sections themselves, [what to include on an EICR](/guides/eicr-what-to-include) is the best companion page to read alongside this one.',
        },
      ],
    },
    {
      id: 'keep-the-report-joined-up',
      heading: 'Keep the report joined up from readings to handover',
      blocks: [
        {
          type: 'list',
          items: [
            'The schedule of test results should match the installation you actually tested.',
            'Observations should be written so the client understands the defect and the consequence.',
            'Any limitation should be stated plainly, not hidden in a vague note.',
            'The final outcome must be recorded as satisfactory, unsatisfactory, or limited in scope — never left blank. Any C1 or C2 observation makes the overall outcome unsatisfactory; this is mandatory, not discretionary (GN3 Reg 3.11).',
          ],
        },
        {
          type: 'paragraph',
          text: 'If the values and the wording do not agree, the report starts to look rushed. That is why the [schedule of test results](/guides/schedule-of-test-results) matters so much when you are building the final document.',
        },
      ],
    },
    {
      id: 'what-to-avoid',
      heading: 'What to avoid in a template',
      blocks: [
        {
          type: 'list',
          tone: 'warning',
          items: [
            'Copied-forward wording that does not match the current installation.',
            'Blank spaces where a limitation should be explained properly.',
            'Too many headings with not enough useful content under them.',
            'Observations that are too vague for the client to act on.',
            'A layout that forces you to rebuild the same report twice before you can send it.',
            'Issuing an Electrical Installation Certificate for periodic inspection work — always use the EICR. Using the wrong certificate type is one of the most common documentation mistakes in practice.',
            'Sending the EICR without the accompanying Schedule(s) of Circuit Details — GN3 Reg 5.7 requires both the Schedule of Circuit Details and the Schedule of Test Results to be issued with every EICR.',
          ],
        },
      ],
    },
    {
      id: 'turn-template-into-report',
      heading: 'Turn the template into a report the client can trust',
      blocks: [
        {
          type: 'paragraph',
          text: 'The best templates do not just save typing. They help you finish the job with less friction, fewer missed fields, and a cleaner handover. That matters whether the report comes back satisfactory, unsatisfactory, or limited in scope.',
        },
        {
          type: 'paragraph',
          text: 'If you are trying to keep the whole workflow together, [digital EICR certificates](/tools/eicr-certificate) make it easier to complete the report, keep the observations aligned, and move on to the next job without rebuilding the paperwork.',
        },
        {
          type: 'paragraph',
          text: 'A4:2026 note: BS 7671:2018+A4:2026 introduced Reg 421.1.7, which recommends the installation of arc fault detection devices (AFDDs) on AC final circuits of a fixed installation to mitigate the risk of fire from arc fault currents. The regulation is recommendatory rather than mandatory. On post-October 2026 EICRs, absence of AFDDs where the recommendation applies may warrant a C3 observation — record it consistently if you note it on one circuit.',
        },
      ],
    },
    {
      id: 'using-the-template-on-site',
      heading: 'Using the template properly on a live site',
      blocks: [
        {
          type: 'paragraph',
          text: 'An EICR template is only as good as the data going into it. The boxes on the form are not the work — they are the record of the work. If you fill in the template before you finish testing, or copy values forward from a previous report, the document weakens immediately. Treat each section as a checkpoint: complete the testing, record the result, move on.',
        },
        {
          type: 'paragraph',
          text: 'The most common mistake with templates is using them as a script for the inspection itself. The template should follow the testing sequence, not lead it. Open the supply, prove dead, complete continuity and insulation resistance, take the loop impedance readings, then sit down with the template and translate the results into the right boxes. That order keeps the inspection honest.',
        },
        {
          type: 'list',
          items: [
            'Complete the test schedule first, then transcribe values into the EICR boxes — never the other way round.',
            'Number every circuit consistently between the template, the schedule of test results, and any photos.',
            'Use the observation codes (C1, C2, C3, FI) literally — do not soften them to keep the client happy.',
            'Assign exactly one code to each observation — C1, C2, C3 or (exceptionally) FI. Do not combine codes or leave any observation unclassified. Where a single observation could attract more than one severity, record the single code that best represents the overall safety significance (GN3 Reg 3.11).',
            'Sign off only when every box is filled in or explicitly noted as a limitation with a clear reason — never leave a box blank without explaining why the test or inspection item could not be carried out.',
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: 'What should a good EICR example include?',
      answer:
        'It should include the installation details, the extent of inspection, any limitations, the test results, the observations, and the final outcome in a way that reads naturally from top to bottom.',
    },
    {
      question: 'Is a template supposed to be a finished report?',
      answer:
        'No. A template should give you the structure for a proper report, but it still needs to reflect the actual installation, findings, and limitations from the job in front of you.',
    },
    {
      question: 'Why does the schedule matter so much?',
      answer:
        'Because the schedule of test results is the evidence that supports the report. If it does not match the observations or the outcome, the report feels weak and harder to trust.',
    },
    {
      question: 'Can a digital workflow help with EICR quality?',
      answer:
        'Yes. A good digital workflow helps keep the readings, observations, limitations, and handover together so you are not rebuilding the same report twice.',
    },
  ],
  relatedPages: [
    {
      href: '/guides/eicr-what-to-include',
      title: 'What to Include on an EICR',
      description: 'A practical checklist for the sections every report should cover.',
      icon: 'ClipboardCheck',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-common-mistakes',
      title: 'EICR Common Mistakes',
      description: 'Avoid the errors that weaken the report or confuse the client.',
      icon: 'AlertTriangle',
      category: 'Guide',
    },
    {
      href: '/guides/eicr-limitations',
      title: 'EICR Limitations',
      description: 'Handle limitations clearly when the inspection scope is restricted.',
      icon: 'FileText',
      category: 'Guide',
    },
    {
      href: '/guides/schedule-of-test-results',
      title: 'Schedule of Test Results',
      description: 'Keep the measurements aligned with the report and observations.',
      icon: 'Gauge',
      category: 'Guide',
    },
    {
      href: '/tools/eicr-certificate',
      title: 'Digital EICR Certificates',
      description: 'Complete the report and handover in one mobile-friendly workflow.',
      icon: 'FileCheck2',
      category: 'Certificate',
    },
  ],
  ctaHeading: 'Complete cleaner EICRs without rebuilding the paperwork',
  ctaSubheading:
    'Use a mobile-first workflow to keep the template, readings, observations, and handover in one place from the start.',
};
