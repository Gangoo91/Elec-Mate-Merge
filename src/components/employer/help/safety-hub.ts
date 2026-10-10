import type { PageHelpContent } from '@/components/hub/PageHelp';

/** Employer Hub → Safety hub (ELE-2080). */
export const SAFETY_HUB_HELP: PageHelpContent = {
  id: 'employer-safetyhub',
  title: 'The safety hub',
  what: 'Everything that proves your sites are safe, one tap away. The line under the title says what needs doing first, and the figures open the page behind them.',
  steps: [
    {
      title: 'Before work starts',
      body: 'Job packs, Checklists and Site Safety: the RAMS, briefing and checks your crew signs before anyone starts.',
    },
    {
      title: 'When something happens',
      body: 'Incidents and Safety alerts: log accidents and near misses, follow them up and close them out.',
    },
    {
      title: 'Keep the paperwork in date',
      body: 'Policies, Contracts, Training records and Compliance, each with what has expired or is due soon.',
    },
  ],
  notes: [
    {
      title: 'What the colours mean',
      body: 'Red is a problem, such as an open incident or something expired. Yellow needs doing now, such as RAMS to sign off. Everything else is white.',
    },
  ],
};
