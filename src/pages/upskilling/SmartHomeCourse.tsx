import { BookOpen, Wifi, Lightbulb, Thermometer, Shield, Smartphone, Wrench, ClipboardCheck } from 'lucide-react';
import { ModuleCard } from '@/components/upskilling/cards';
import { CourseShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const modules = [
  { moduleNumber: 1, title: 'Introduction to smart home systems', description: 'Smart home fundamentals, components, architectures and retrofit vs new build.', icon: BookOpen, duration: '40 mins', link: '../smart-home-module-1' },
  { moduleNumber: 2, title: 'Smart protocols: Zigbee, Z-Wave, Wi-Fi and more', description: 'Wireless protocols, mesh networks, Matter and hub vs hubless ecosystems.', icon: Wifi, duration: '55 mins', link: '../smart-home-module-2' },
  { moduleNumber: 3, title: 'Smart lighting and scene programming', description: 'Lighting types, scene control, dimming, RGBW and motion-based logic.', icon: Lightbulb, duration: '50 mins', link: '../smart-home-module-3' },
  { moduleNumber: 4, title: 'Heating, HVAC and environmental control', description: 'Smart thermostats, heat pumps, environmental sensors and BMS integration.', icon: Thermometer, duration: '60 mins', link: '../smart-home-module-4' },
  { moduleNumber: 5, title: 'Access control, CCTV and security integration', description: 'Smart locks, CCTV, contact sensors, remote alerts and network security.', icon: Shield, duration: '55 mins', link: '../smart-home-module-5' },
  { moduleNumber: 6, title: 'Smart hubs, voice assistants and interoperability', description: 'Hub types, voice assistants, routine logic and bridging legacy devices.', icon: Smartphone, duration: '45 mins', link: '../smart-home-module-6' },
  { moduleNumber: 7, title: 'Installation, testing and safety requirements', description: 'Wiring, commissioning, RF verification, BS 7671 alignment and handover.', icon: Wrench, duration: '50 mins', link: '../smart-home-module-7' },
  { moduleNumber: 8, title: 'Mock exam', description: 'Comprehensive assessment covering every smart home module.', icon: ClipboardCheck, duration: '60 mins', link: '../smart-home-module-8', isExam: true },
];

export default function SmartHomeCourse() {
  useSEO({
    title: 'Smart Home Technology | Professional Upskilling | Elec-Mate',
    description:
      'Home automation, IoT integration and intelligent building systems — protocols, lighting, heating, security, hubs and installation.',
  });

  return (
    <CourseShell
      backTo="/electrician/upskilling"
      backLabel="Professional upskilling"
      eyebrow="Professional upskilling"
      title="Smart home technology"
      description="Home automation, IoT integration and intelligent building systems for the modern installer."
      tone="cyan"
      level="Intermediate"
      modulesCount={modules.length}
      pagesCount="200+"
      totalDuration="6h 35m"
    >
      {modules.map((mod, index) => (
        <ModuleCard
          key={mod.moduleNumber}
          to={mod.link}
          moduleNumber={mod.moduleNumber}
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
