import { Cable, Globe, Wifi, Shield } from 'lucide-react';
import { ModuleCard } from '@/components/apprentice-courses/ModuleCard';
import { SectionShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const subsections = [
    {
      number: '5.6.1',
      title: 'Fieldbus and profibus systems',
      description: 'Fieldbus protocols, Profibus networks and device integration',
      icon: Cable,
      href: '/study-centre/apprentice/m-o-e-t-module5-section6-1',
    },
    {
      number: '5.6.2',
      title: 'Industrial ethernet',
      description: 'Ethernet protocols, network topology and industrial applications',
      icon: Globe,
      href: '/study-centre/apprentice/m-o-e-t-module5-section6-2',
    },
    {
      number: '5.6.3',
      title: 'Wireless and IoT in industry',
      description: 'Wireless technologies, IoT devices and Industry 4.0 concepts',
      icon: Wifi,
      href: '/study-centre/apprentice/m-o-e-t-module5-section6-3',
    },
    {
      number: '5.6.4',
      title: 'Cybersecurity in industrial networks',
      description: 'Network security, firewalls and protection strategies',
      icon: Shield,
      href: '/study-centre/apprentice/m-o-e-t-module5-section6-4',
    },
  ];


const MOETModule5Section6 = () => {
  useSEO(
    'Section 5.6: Networking and Industrial Communication - MOET Module 5',
    'Fieldbus, industrial Ethernet, wireless IoT and cybersecurity in industrial networks'
  );

  return (
    <SectionShell
      backTo="/study-centre/apprentice/m-o-e-t-module5"
      backLabel="Module 5"
      moduleNumber={5}
      sectionNumber={6}
      title="Networking and industrial communication"
      description="Fieldbus, industrial Ethernet, wireless IoT and cybersecurity in industrial networks."
      tone="orange"
      subsectionsCount={subsections.length}
    >
      {subsections.map((subsection, index) => (
        <ModuleCard
          key={index}
          number={subsection.number}
          title={subsection.title}
          description={subsection.description}
          icon={subsection.icon}
          href={subsection.href}
        />
      ))}
    </SectionShell>
  );
};

export default MOETModule5Section6;
