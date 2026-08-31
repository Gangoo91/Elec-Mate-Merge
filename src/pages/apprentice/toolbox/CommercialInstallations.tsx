import { Building, FileText, ClipboardList, Zap, TestTube, BookOpen } from 'lucide-react';
import InstallationGuidePageShell from '@/components/apprentice/installation-guides/InstallationGuidePageShell';
import type { ToggleCardDef } from '@/types/installation-guides';
import CommercialOverviewCards from '@/components/apprentice/installation-guides/commercial/CommercialOverviewCards';
import CommercialPlanningSection from '@/components/apprentice/installation-guides/commercial/CommercialPlanningSection';
import CommercialCircuitGuide from '@/components/apprentice/installation-guides/commercial/CommercialCircuitGuide';
import CommercialTestingGuide from '@/components/apprentice/installation-guides/commercial/CommercialTestingGuide';
import CommercialReferenceGuide from '@/components/apprentice/installation-guides/commercial/CommercialReferenceGuide';

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
      return <CommercialOverviewCards />;
    case 'planning':
      return <CommercialPlanningSection />;
    case 'circuits':
      return <CommercialCircuitGuide />;
    case 'testing':
      return <CommercialTestingGuide />;
    case 'reference':
      return <CommercialReferenceGuide />;
    default:
      return null;
  }
};

const CommercialInstallations = () => (
  <InstallationGuidePageShell
    title="Commercial installations"
    eyebrow="Apprentice · Commercial"
    backRoute="/apprentice/toolbox"
    description="Offices, retail, hospitality. Three-phase distribution, emergency lighting, fire alarm interfaces, BS 7671 Section 537 isolation — what changes once you step out of housing."
    icon={Building}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: 'Commercial Installation Requirements',
      points: [
        {
          title: 'Emergency Systems',
          content:
            'Emergency lighting and fire alarm systems must be installed to current British Standards and tested regularly.',
        },
        {
          title: 'Three-Phase Supplies',
          content:
            'Ensure proper phase rotation and balanced loading. Use appropriate protection devices for motor circuits.',
        },
        {
          title: 'Maintenance Requirements',
          content:
            'Establish regular testing schedules and provide comprehensive documentation for building management.',
        },
      ],
    }}
  />
);

export default CommercialInstallations;
