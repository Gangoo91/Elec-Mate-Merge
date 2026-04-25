import { Award, UserCheck, Upload, Archive } from 'lucide-react';
import { SectionCard } from '@/components/upskilling/cards';
import { ModuleShell } from '@/components/study-centre/shells';
import useSEO from '@/hooks/useSEO';

const sections = [
  {
    id: 1,
    title: 'OZEV and Workplace Charging Scheme explained',
    icon: Award,
    description: 'Understanding government incentives and the OZEV charging schemes.',
  },
  {
    id: 2,
    title: 'Approved installer registration process',
    icon: UserCheck,
    description: 'Becoming an OZEV-approved EV charging installer.',
  },
  {
    id: 3,
    title: 'Uploading documents and claiming grants',
    icon: Upload,
    description: 'Grant application processes and document submission requirements.',
  },
  {
    id: 4,
    title: 'Audit-readiness and record-keeping best practice',
    icon: Archive,
    description: 'Maintaining records for compliance and audit purposes.',
  },
];

export default function EVChargingModule7() {
  useSEO({
    title: 'Module 7: Government Incentives & Certification | EV Charging | Elec-Mate',
    description:
      'OZEV, Workplace Charging Scheme, approved installer registration, grant claims and audit-readiness.',
  });

  return (
    <ModuleShell
      backTo="../ev-charging-course"
      backLabel="EV charging installation"
      moduleNumber={7}
      title="Government incentives and certification (OZEV, etc.)"
      description="Understanding grants, certification and compliance requirements for EV installers."
      tone="green"
      sectionsCount={sections.length}
      duration="35 mins"
      prevModuleHref="../ev-charging-module-6"
      prevModuleLabel="Installation, inspection and testing procedures"
    >
      {sections.map((section, index) => (
        <SectionCard
          key={section.id}
          to={`../ev-charging-module-7-section-${section.id}`}
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
