import { Home, FileText, ClipboardList, Zap, TestTube, BookOpen } from 'lucide-react';
import InstallationGuidePageShell from '@/components/apprentice/installation-guides/InstallationGuidePageShell';
import type { ToggleCardDef } from '@/types/installation-guides';
import DomesticOverviewCards from '@/components/apprentice/installation-guides/domestic/DomesticOverviewCards';
import DomesticPlanningSection from '@/components/apprentice/installation-guides/domestic/DomesticPlanningSection';
import DomesticCircuitGuide from '@/components/apprentice/installation-guides/domestic/DomesticCircuitGuide';
import DomesticTestingGuide from '@/components/apprentice/installation-guides/domestic/DomesticTestingGuide';
import DomesticReferenceGuide from '@/components/apprentice/installation-guides/domestic/DomesticReferenceGuide';

const cards: ToggleCardDef[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: FileText,
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: ClipboardList,
  },
  {
    id: 'circuits',
    label: 'Circuits',
    icon: Zap,
  },
  {
    id: 'testing',
    label: 'Testing',
    icon: TestTube,
  },
  {
    id: 'reference',
    label: 'Reference',
    icon: BookOpen,
  },
];

const renderPanel = (cardId: string) => {
  switch (cardId) {
    case 'overview':
      return <DomesticOverviewCards />;
    case 'planning':
      return <DomesticPlanningSection />;
    case 'circuits':
      return <DomesticCircuitGuide />;
    case 'testing':
      return <DomesticTestingGuide />;
    case 'reference':
      return <DomesticReferenceGuide />;
    default:
      return null;
  }
};

const DomesticInstallations = () => (
  <InstallationGuidePageShell
    title="Domestic installations"
    eyebrow="Apprentice · Domestic"
    description="Houses, flats, extensions and rewires. Part P, RCD requirements, ring finals, lighting, bathroom zones — everything you'll meet in a domestic property."
    icon={Home}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: 'Critical Safety Requirements',
      points: [
        {
          title: 'Part P Building Regulations Compliance',
          content:
            'Most domestic electrical work is notifiable under Part P. Use a registered competent person scheme or notify Building Control before starting work.',
        },
        {
          title: 'RCD Protection Requirements',
          content:
            'All domestic socket outlets must have 30mA RCD protection as per BS 7671:2018+A4:2026. Bathroom circuits require additional protection measures.',
        },
        {
          title: 'Testing and Certification Mandatory',
          content:
            'Complete inspection and testing is legally required. Provide appropriate certification upon completion with detailed test results.',
        },
        {
          title: 'Competence and Registration',
          content:
            'Only qualified and registered electricians should carry out domestic electrical work. Ensure appropriate competent person scheme membership.',
        },
      ],
    }}
  />
);

export default DomesticInstallations;
