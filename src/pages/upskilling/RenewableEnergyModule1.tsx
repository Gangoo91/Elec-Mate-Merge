import {
  TrendingUp,
  Map,
  BookOpen,
  Award,
  Plug,
  ClipboardList,
  Building2,
  FileText,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Why renewables now — UK grid, policy & the installer market',
    icon: TrendingUp,
    description:
      'The net-zero trajectory, the LCT installer market and where BS 7671:2018+A4:2026 fits in the UK regulatory stack.',
  },
  {
    id: 2,
    title: 'The LCT chapter map in BS 7671:2018+A4:2026',
    icon: Map,
    description:
      'Sections 551, 712, 715, 722, 730 and the new Chapter 57 — how the regulations split low-carbon technology by system type.',
  },
  {
    id: 3,
    title: 'On-Site Guide & Guidance Note 3 — how they apply to LCT',
    icon: BookOpen,
    description:
      'Where OSG and GN3 add the practical detail BS 7671 leaves to guidance, and which sections of each apply to PV, BESS and EV.',
  },
  {
    id: 4,
    title: 'MCS, MIS standards & the competent-person umbrella',
    icon: Award,
    description:
      'MCS, MIS 3002–3008, IET Codes of Practice and the commercial reality of being an MCS-registered installer.',
  },
  {
    id: 5,
    title: 'G98, G99 & EREC G100 — DNO conversation and timing',
    icon: Plug,
    description:
      'When to apply, when to wait for approval, what counts toward the threshold and how export limitation under G100 changes the answer.',
  },
  {
    id: 6,
    title: 'Site survey first principles for LCT',
    icon: ClipboardList,
    description:
      'Load profile, supply characteristics, earthing arrangement, structural and access — the survey that prevents the commissioning surprise.',
  },
  {
    id: 7,
    title: 'Building Regulations Part L, Part P & Building Control',
    icon: Building2,
    description:
      'Where Building Regulations bite on LCT — Part L energy efficiency, Part P notifiable work, Part S EV infrastructure, plus Scottish and Welsh equivalents.',
  },
  {
    id: 8,
    title: 'Notifications, certs & the paperwork trail',
    icon: FileText,
    description:
      'DNO notifications, MCS certificates, Building Control, EIC entries and the model-form additions that A4:2026 brought to LCT installations.',
  },
];

export default function RenewableEnergyModule1() {
  useSEO({
    title:
      'Module 1: Renewables in the UK landscape | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Where low-carbon technology sits in the UK regulatory and market landscape — BS 7671:2018+A4:2026 LCT chapter map, MCS, DNO, Building Regulations and the installer paperwork trail.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={1}
      title="Renewables in the UK landscape"
      description="Policy, MCS, OSG/GN3 for low-carbon tech, G98/G99, site survey, Building Regulations and the paperwork trail."
      tone="yellow"
      sectionsCount={sections.length}
      duration="90 mins"
      nextModuleHref="../renewable-energy-module-2"
      nextModuleLabel="Solar PV: how it works"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-1-section-${section.id}`}
          sectionNumber={section.id}
          title={section.title}
          description={section.description}
          icon={section.icon}
          index={index}
        />
      ))}
    </ModuleShell>
  );
}
