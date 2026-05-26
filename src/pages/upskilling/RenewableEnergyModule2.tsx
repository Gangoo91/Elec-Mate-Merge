import {
  Atom,
  PanelTop,
  Layers3,
  Activity,
  Cpu,
  Building2,
  GitBranch,
  FileText,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Cells — the photovoltaic effect',
    icon: Atom,
    description:
      'Silicon physics, the p-n junction, monocrystalline / polycrystalline / amorphous cell types and the foundation of how a photon becomes electricity.',
  },
  {
    id: 2,
    title: 'Modules — from cells to module',
    icon: PanelTop,
    description:
      'Series cell strings, bypass diodes, electrical characteristics (V_oc, I_sc, V_mp, I_mp, P_max), efficiency and temperature coefficients.',
  },
  {
    id: 3,
    title: 'Strings and arrays',
    icon: Layers3,
    description:
      'Series / parallel topology, voltage stacking, current addition, string mismatch losses, shading impact and Reg 712.431 string protection logic.',
  },
  {
    id: 4,
    title: 'MPPT — Maximum Power Point Tracking',
    icon: Activity,
    description:
      'I-V and P-V curves, the maximum power point, irradiance and temperature shift, perturb-and-observe vs incremental conductance algorithms.',
  },
  {
    id: 5,
    title: 'Inverter topologies',
    icon: Cpu,
    description:
      'String inverters vs microinverters vs power optimisers vs hybrid — where each wins, when to combine, how Section 712 and 551 land on each.',
  },
  {
    id: 6,
    title: 'PV system architectures',
    icon: Building2,
    description:
      'On-roof, in-roof, ground mount, BIPV (building-integrated PV) — shading topology, structural considerations and the 70–100 mm standoff rule.',
  },
  {
    id: 7,
    title: 'DC vs AC coupling on hybrid PV + BESS',
    icon: GitBranch,
    description:
      'Where the energy lives, conversion-loss arithmetic, retrofit vs new-build coupling decisions and the Chapter 82 PEI system framing.',
  },
  {
    id: 8,
    title: 'Reading a PV single-line diagram',
    icon: FileText,
    description:
      'The SLD as the design artefact, what every symbol means, how to read protection and isolation, and how to spec one for a domestic and commercial install.',
  },
];

export default function RenewableEnergyModule2() {
  useSEO({
    title: 'Module 2: Solar PV — how it works | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Solar PV from first principles — cells, modules, strings, MPPT, inverter topologies, system architectures, DC vs AC coupling, and reading a PV single-line diagram. Grounded in BS 7671 Section 712 and the IET Code of Practice for Grid-Connected Solar Photovoltaic Installations.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={2}
      title="Solar PV: how it works"
      description="Solar PV from first principles — cells, modules, strings, MPPT, inverter topologies, system architectures, DC vs AC coupling, and reading a PV single-line diagram."
      tone="yellow"
      sectionsCount={sections.length}
      duration="120 mins"
      nextModuleHref="../renewable-energy-module-3"
      nextModuleLabel="Solar PV: design & installation"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-2-section-${section.id}`}
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
