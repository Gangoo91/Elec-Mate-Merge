import {
  Sprout,
  Sun,
  PanelTop,
  Combine,
  Battery,
  Plug,
  Truck,
  Flame,
  Wind,
  Network,
  ShieldCheck,
  Wrench,
  GraduationCap,
} from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  {
    id: 1,
    title: 'Renewables in the UK landscape',
    description:
      'Policy, MCS, OSG/GN3 for low-carbon tech, G98/G99, site survey, Building Regulations and the paperwork trail.',
    duration: '90 mins',
    icon: Sprout,
    link: '../renewable-energy-module-1',
  },
  {
    id: 2,
    title: 'Solar PV: how it works',
    description:
      'Cells, modules, strings, MPPT, inverter topologies, system architectures, AC vs DC coupling and reading a PV single-line diagram.',
    duration: '85 mins',
    icon: Sun,
    link: '../renewable-energy-module-2',
  },
  {
    id: 3,
    title: 'Solar PV: design & installation',
    description:
      'Irradiance, orientation, DC sizing, Section 712 in plain language, BS EN 62446 commissioning evidence and roof safety.',
    duration: '90 mins',
    icon: PanelTop,
    link: '../renewable-energy-module-3',
  },
  {
    id: 4,
    title: 'Solar PV: diverters, off-grid & hybrid',
    description:
      'PV diverters (Eddi, iBoost), off-grid dwellings, marine and RV systems, hybrid retrofits and edge-case wiring decisions.',
    duration: '80 mins',
    icon: Combine,
    link: '../renewable-energy-module-4',
  },
  {
    id: 5,
    title: 'Battery storage (BESS)',
    description:
      'LFP, NMC and flow chemistries, DC vs AC coupling, BMS, Chapter 57 / Section 826, sizing, commissioning and emergency procedures.',
    duration: '95 mins',
    icon: Battery,
    link: '../renewable-energy-module-5',
  },
  {
    id: 6,
    title: 'EV charging — domestic & residential',
    description:
      'Modes 1–4, Section 722, single-phase circuits, the earthing decision tree and domestic chargepoint installation.',
    duration: '85 mins',
    icon: Plug,
    link: '../renewable-energy-module-6',
  },
  {
    id: 7,
    title: 'EV charging — commercial, workplace & DC fast',
    description:
      'Three-phase chargers, OCPP, load management, fleet depots, public CPO regulations and DC fast charging site engineering.',
    duration: '90 mins',
    icon: Truck,
    link: '../renewable-energy-module-7',
  },
  {
    id: 8,
    title: 'Heat pumps & electrified heat',
    description:
      'ASHP and GSHP cycles, electrical loading, soft-start, controls, integration with PV/BESS and MCS handover.',
    duration: '85 mins',
    icon: Flame,
    link: '../renewable-energy-module-8',
  },
  {
    id: 9,
    title: 'Wind, solar thermal, biomass, CHP & other LCT',
    description:
      'Micro and small wind (HAWT / VAWT), solar thermal, biomass control interfaces, CHP under Section 551, micro-hydro and the hydrogen direction.',
    duration: '80 mins',
    icon: Wind,
    link: '../renewable-energy-module-9',
  },
  {
    id: 10,
    title: 'Hybrid systems, EMS & smart export',
    description:
      'Multi-source coordination, smart meters, SEG, G99 export limiting, EREC G100, V2G and grid-forming inverters.',
    duration: '85 mins',
    icon: Network,
    link: '../renewable-energy-module-10',
  },
  {
    id: 11,
    title: 'Chapter 81, lightning & fault levels',
    description:
      'The new A4:2026 Chapter 81 on energy efficiency, BS EN 62305 lightning protection for PV / wind, fault current contribution and anti-islanding.',
    duration: '75 mins',
    icon: ShieldCheck,
    link: '../renewable-energy-module-11',
  },
  {
    id: 12,
    title: 'Testing, commissioning, periodic inspection & handover',
    description:
      'BS 7671 Part 6 applied to LCT, IV / IR / continuity on DC strings, BESS health, EV Mode 3 verification, PEN fault testing and MCS handover packs.',
    duration: '90 mins',
    icon: Wrench,
    link: '../renewable-energy-module-12',
  },
  {
    id: 13,
    title: 'Mock exam',
    description:
      'Comprehensive 60-question assessment covering every module of the renewable energy systems course.',
    duration: '120 mins',
    icon: GraduationCap,
    link: '../renewable-energy-mock-exam',
    isExam: true,
  },
];

export default function RenewableEnergyCourse() {
  useSEO({
    title: 'Renewable Energy Systems | Professional Upskilling | Elec-Mate',
    description:
      'Solar PV, battery storage, EV charging, heat pumps and the full low-carbon technology stack — grounded in BS 7671:2018+A4:2026, the On-Site Guide and Guidance Note 3.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling · Updated for A4:2026"
      title="Renewable energy systems"
      description="The full low-carbon technology stack — solar PV, battery storage, EV charging, heat pumps and grid integration — designed against BS 7671:2018+A4:2026."
      tone="yellow"
      level="Specialist"
      modulesCount={12}
      pagesCount="96 sections"
      totalDuration="18h"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.id}
          to={mod.link}
          moduleNumber={mod.id}
          title={mod.title}
          description={mod.description}
          icon={mod.icon}
          duration={mod.duration}
          isExam={mod.isExam}
          index={index}
        />
      ))}
    </CourseShell>
  );
}
