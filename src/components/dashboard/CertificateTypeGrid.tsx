import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Zap,
  Settings,
  BookOpen,
  Bell,
  Lightbulb,
  Sun,
  Sparkles
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CertificateTypeGridProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
}

interface CertificateType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  isNew?: boolean;
  useRouter?: boolean;
  standard?: string;
}

interface CertificateGroup {
  title: string;
  certificates: CertificateType[];
}

const certificateGroups: CertificateGroup[] = [
  {
    title: 'Electrical Installation',
    certificates: [
      {
        id: 'eicr',
        title: 'EICR',
        subtitle: 'Condition Report',
        description: 'Periodic inspection & testing',
        icon: FileText,
        standard: 'BS 7671',
      },
      {
        id: 'eic',
        title: 'EIC',
        subtitle: 'Installation Certificate',
        description: 'New installation works',
        icon: Zap,
        standard: 'BS 7671',
      },
      {
        id: 'minor-works',
        title: 'Minor Works',
        subtitle: 'Certificate',
        description: 'Additions & alterations',
        icon: Settings,
        standard: 'BS 7671',
      },
    ],
  },
  {
    title: 'Fire & Safety',
    certificates: [
      {
        id: 'fire-alarm',
        title: 'Fire Alarm',
        subtitle: 'System Certificate',
        description: 'Installation & periodic testing',
        icon: Bell,
        isNew: true,
        useRouter: true,
        standard: 'BS 5839',
      },
      {
        id: 'emergency-lighting',
        title: 'Emergency Lighting',
        subtitle: 'Certificate',
        description: 'Installation & inspection',
        icon: Lightbulb,
        isNew: true,
        useRouter: true,
        standard: 'BS 5266',
      },
    ],
  },
  {
    title: 'Specialist',
    certificates: [
      {
        id: 'ev-charging',
        title: 'EV Charging',
        subtitle: 'Point Certificate',
        description: 'EVCP installation',
        icon: Zap,
        isNew: true,
        useRouter: true,
        standard: 'IET CoP',
      },
      {
        id: 'solar-pv',
        title: 'Solar PV',
        subtitle: 'Installation Certificate',
        description: 'MCS-certified solar installations',
        icon: Sun,
        isNew: true,
        useRouter: true,
        standard: 'MCS / BS EN 62446',
      },
    ],
  },
  {
    title: 'Resources',
    certificates: [
      {
        id: 'learning-hub',
        title: 'I&T Hub',
        subtitle: 'Reference',
        description: 'BS7671 guidance & resources',
        icon: BookOpen,
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }
};

const CertificateTypeGrid = ({ onNavigate }: CertificateTypeGridProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleClick = (cert: CertificateType) => {
    if (cert.useRouter) {
      navigate(`/electrician/inspection-testing/${cert.id}/new`);
    } else {
      onNavigate(cert.id);
    }
  };

  const renderCertCard = (cert: CertificateType) => (
    <motion.button
      key={cert.id}
      variants={cardVariants}
      onClick={() => handleClick(cert)}
      className={cn(
        "group relative text-left rounded-2xl p-4 transition-all duration-200 touch-manipulation",
        "bg-[#242428] border border-elec-yellow/30",
        "hover:bg-[#252528] hover:border-elec-yellow/50",
        "active:scale-[0.97]"
      )}
    >
      {cert.isNew && (
        <div className="absolute top-2.5 right-2.5">
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-0 text-[9px] px-1.5 py-0.5 h-auto font-semibold">
            <Sparkles className="w-2.5 h-2.5 mr-0.5" />
            New
          </Badge>
        </div>
      )}

      <div className="w-10 h-10 rounded-xl bg-elec-yellow/15 flex items-center justify-center mb-3 group-hover:bg-elec-yellow/25 transition-colors">
        <cert.icon className="w-5 h-5 text-elec-yellow" />
      </div>

      <h3 className="font-semibold text-white text-sm mb-0.5 group-hover:text-elec-yellow transition-colors">
        {cert.title}
      </h3>
      <p className="text-[11px] text-white/50 line-clamp-1">
        {cert.description}
      </p>

      {cert.standard && (
        <div className="mt-3">
          <span className="text-[9px] font-medium text-white/40 bg-white/5 px-2 py-1 rounded">
            {cert.standard}
          </span>
        </div>
      )}
    </motion.button>
  );

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {certificateGroups.map((group) => (
        <div key={group.title}>
          <div className="flex items-center gap-2 mb-2 px-0.5">
            <h3 className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
              {group.title}
            </h3>
            <div className="flex-1 h-px bg-white/5"></div>
          </div>

          <div className={cn(
            "grid gap-2",
            isMobile
              ? "grid-cols-2"
              : group.certificates.length === 1
                ? "grid-cols-1 max-w-[200px]"
                : group.certificates.length === 2
                  ? "grid-cols-2 max-w-md"
                  : "grid-cols-3"
          )}>
            {group.certificates.map(renderCertCard)}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default CertificateTypeGrid;
