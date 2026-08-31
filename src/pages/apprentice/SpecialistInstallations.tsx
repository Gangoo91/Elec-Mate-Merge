import {
  Sparkles,
  FileText,
  MapPin,
  Sun,
  Car,
  Waves,
  Zap,
  TestTube,
  Shield,
  BookOpen,
} from 'lucide-react';
import InstallationGuidePageShell from '@/components/apprentice/installation-guides/InstallationGuidePageShell';
import type { ToggleCardDef } from '@/types/installation-guides';
import SpecialistOverviewCards from '@/components/apprentice/installation-guides/specialist/SpecialistOverviewCards';
import SpecialLocationsGuide from '@/components/apprentice/installation-guides/specialist/SpecialLocationsGuide';
import SolarPVGuide from '@/components/apprentice/installation-guides/specialist/SolarPVGuide';
import EVChargingGuide from '@/components/apprentice/installation-guides/specialist/EVChargingGuide';
import SwimmingPoolGuide from '@/components/apprentice/installation-guides/specialist/SwimmingPoolGuide';
import SpecialistCircuitsPanel from '@/components/apprentice/installation-guides/specialist/SpecialistCircuitsPanel';
import SpecialistTestingGuide from '@/components/apprentice/installation-guides/specialist/SpecialistTestingGuide';
import SpecialistCompliancePanel from '@/components/apprentice/installation-guides/specialist/SpecialistCompliancePanel';
import SpecialistReferenceGuide from '@/components/apprentice/installation-guides/specialist/SpecialistReferenceGuide';

const cards: ToggleCardDef[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: FileText,
  },
  {
    id: 'locations',
    label: 'Locations',
    icon: MapPin,
  },
  {
    id: 'solar',
    label: 'Solar PV',
    icon: Sun,
  },
  {
    id: 'ev',
    label: 'EV Charging',
    icon: Car,
  },
  {
    id: 'pools',
    label: 'Pools',
    icon: Waves,
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
    id: 'compliance',
    label: 'Compliance',
    icon: Shield,
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
      return <SpecialistOverviewCards />;
    case 'locations':
      return <SpecialLocationsGuide />;
    case 'solar':
      return <SolarPVGuide />;
    case 'ev':
      return <EVChargingGuide />;
    case 'pools':
      return <SwimmingPoolGuide />;
    case 'circuits':
      return <SpecialistCircuitsPanel />;
    case 'testing':
      return <SpecialistTestingGuide />;
    case 'compliance':
      return <SpecialistCompliancePanel />;
    case 'reference':
      return <SpecialistReferenceGuide />;
    default:
      return null;
  }
};

const SpecialistInstallations = () => (
  <InstallationGuidePageShell
    title="Specialist installations"
    eyebrow="Apprentice · Specialist"
    description="EV charging, solar PV, heat pumps, swimming pools and saunas. Part P notifiable work in special locations under BS 7671 Part 7."
    icon={Sparkles}
    cards={cards}
    renderPanel={renderPanel}
    safetyNotice={{
      title: 'Critical Special Location Safety Requirements',
      points: [
        {
          title: 'Part 7 Compliance is Mandatory',
          content:
            'Where BS 7671 Part 7 requirements apply, they MUST be followed. Part 7 requirements supplement and take precedence over general requirements.',
        },
        {
          title: 'Specialist Training Required',
          content:
            'Many special locations require additional training and certification (e.g., MCS for solar, medical locations training for hospitals). Never attempt specialist work without proper qualifications.',
        },
        {
          title: 'Enhanced Protection Measures',
          content:
            'Special locations have enhanced protection requirements including SELV systems, enhanced bonding, specific RCD types, and stricter disconnection times.',
        },
        {
          title: 'Consult IET Guidance Note 7',
          content:
            'IET Guidance Note 7 provides essential detailed guidance on all Part 7 special locations. It is an essential reference for any specialist installation work.',
        },
      ],
    }}
  />
);

export default SpecialistInstallations;
