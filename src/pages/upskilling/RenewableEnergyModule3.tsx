import {
  Sun,
  Calculator,
  HardHat,
  Cable,
  Zap,
  Plug,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'Irradiance, orientation, tilt & shading',
    icon: Sun,
    description:
      'UK solar resource, azimuth and tilt effects on yield, shade analysis tools, PVGIS modelling, the performance ratio concept and what real-world yield looks like vs theoretical.',
  },
  {
    id: 2,
    title: 'PV system sizing — kWp, modules, inverter matching',
    icon: Calculator,
    description:
      'The kWp specification process, module count selection, inverter MPPT matching against the three voltage rules, and the MCS MIS 3002 design pack content that captures the design.',
  },
  {
    id: 3,
    title: 'Roof safety, mounting & structural integration',
    icon: HardHat,
    description:
      'Working at height, structural assessment, fixings per roof type (tile / slate / metal), the 70–100 mm standoff discipline, flashings and waterproofing, PWI common mounting mistakes.',
  },
  {
    id: 4,
    title: 'DC cable sizing, protection & fire',
    icon: Cable,
    description:
      'Iz ≥ Isc_max cable thermal rating, gPV fuse selection per Reg 712.431.101 / 712.431.102, BS EN 60269-6, and Reg 712.421 protection against fire caused by electrical equipment on the DC side.',
  },
  {
    id: 5,
    title: 'Functional bonding, DC earthing & lightning',
    icon: Zap,
    description:
      'Reg 712.542.102 functional bonding arrangements on the DC side, galvanic isolation conditions, single-point bonding, and Reg 712.521.102 lightning loop minimisation (DC and equipotential bonding conductors side by side).',
  },
  {
    id: 6,
    title: 'AC-side design & DNO export sign-off',
    icon: Plug,
    description:
      'AC cable sizing per Reg 712.433.104, Reg 551.7.1(d) source connection rules, dedicated RCBO with the right RCD type per Reg 712.531.3.5.1, AC SPDs, and the EREC G98 / G99 / G100 DNO application workflow.',
  },
  {
    id: 7,
    title: 'BS EN 62446-1 commissioning & test results',
    icon: CheckCircle2,
    description:
      'The commissioning evidence pack: continuity, polarity, IV-curve, insulation resistance, functional test of isolators and protective devices, the Schedule of Test Results, baseline records for future diagnostic reference.',
  },
  {
    id: 8,
    title: 'Section 712 in plain language — the integrated reading',
    icon: BookOpen,
    description:
      'Putting it all together — every Section 712 clause mapped to the design and install workflow, the cert evidence bundle structure, and how the IET CoP for Grid-Connected Solar PV Installations operationalises the regulation.',
  },
];

export default function RenewableEnergyModule3() {
  useSEO({
    title:
      'Module 3: Solar PV — design & installation | Renewable Energy Systems | BS 7671:2018+A4:2026',
    description:
      'Solar PV design and installation from site assessment through commissioning. Irradiance / shading, sizing, mounting, DC and AC sides, lightning and fire protection, BS EN 62446-1 commissioning, and the cert evidence bundle.',
  });

  return (
    <ModuleShell
      backTo="../renewable-energy-course"
      backLabel="Renewable energy systems"
      moduleNumber={3}
      title="Solar PV: design & installation"
      description="Site assessment, system sizing, mounting, DC and AC design, fire and lightning protection, BS EN 62446-1 commissioning — the full install workflow from survey to handover."
      tone="yellow"
      sectionsCount={sections.length}
      duration="130 mins"
      nextModuleHref="../renewable-energy-module-4"
      nextModuleLabel="Solar PV: diverters, off-grid & hybrid"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../renewable-energy-module-3-section-${section.id}`}
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
