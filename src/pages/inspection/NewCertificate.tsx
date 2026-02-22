import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileCheck,
  FileText,
  Wrench,
  Bell,
  Zap,
  Lightbulb,
  Sun,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CertificateType {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  borderColor: string;
  standard?: string;
  isNew?: boolean;
}

interface CertificateGroup {
  title: string;
  description: string;
  certificates: CertificateType[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 30 },
  },
};

export default function NewCertificate() {
  const navigate = useNavigate();

  const certificateGroups: CertificateGroup[] = [
    {
      title: 'Electrical Installation',
      description: 'BS 7671 certificates for electrical installations',
      certificates: [
        {
          id: 'eicr',
          title: 'EICR — Condition Report',
          description: 'Periodic inspection and testing of existing installations',
          icon: FileCheck,
          iconColor: 'text-blue-400',
          iconBg: 'bg-blue-500/12',
          borderColor: 'border-l-blue-400',
          standard: 'BS 7671',
        },
        {
          id: 'eic',
          title: 'EIC — Installation Certificate',
          description: 'New installations or major alterations and additions',
          icon: FileText,
          iconColor: 'text-green-400',
          iconBg: 'bg-green-500/12',
          borderColor: 'border-l-green-400',
          standard: 'BS 7671',
        },
        {
          id: 'minor-works',
          title: 'Minor Works Certificate',
          description: 'Small additions to existing circuits',
          icon: Wrench,
          iconColor: 'text-orange-400',
          iconBg: 'bg-orange-500/12',
          borderColor: 'border-l-orange-400',
          standard: 'BS 7671',
        },
      ],
    },
    {
      title: 'Fire & Safety Systems',
      description: 'Fire alarm and emergency lighting certificates',
      certificates: [
        {
          id: 'fire-alarm',
          title: 'Fire Alarm System Certificate',
          description: 'Installation, commissioning, and periodic testing',
          icon: Bell,
          iconColor: 'text-red-400',
          iconBg: 'bg-red-500/12',
          borderColor: 'border-l-red-400',
          standard: 'BS 5839',
          isNew: true,
        },
        {
          id: 'emergency-lighting',
          title: 'Emergency Lighting Certificate',
          description: 'Installation and periodic inspection',
          icon: Lightbulb,
          iconColor: 'text-amber-400',
          iconBg: 'bg-amber-500/12',
          borderColor: 'border-l-amber-400',
          standard: 'BS 5266',
          isNew: true,
        },
      ],
    },
    {
      title: 'Specialist Certificates',
      description: 'EV charging and solar PV installations',
      certificates: [
        {
          id: 'ev-charging',
          title: 'EV Charging Point Certificate',
          description: 'Electric vehicle charger installation',
          icon: Zap,
          iconColor: 'text-emerald-400',
          iconBg: 'bg-emerald-500/12',
          borderColor: 'border-l-emerald-400',
          standard: 'IET CoP',
          isNew: true,
        },
        {
          id: 'solar-pv',
          title: 'Solar PV Installation Certificate',
          description: 'MCS-certified solar panel installations',
          icon: Sun,
          iconColor: 'text-yellow-400',
          iconBg: 'bg-yellow-500/12',
          borderColor: 'border-l-yellow-400',
          standard: 'MCS / BS EN 62446',
          isNew: true,
        },
      ],
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="border-b border-white/[0.06] sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6">
          <Button
            variant="ghost"
            className="text-white hover:text-foreground p-0 mb-3 h-11 touch-manipulation active:scale-[0.98]"
            onClick={() => navigate('/electrician/inspection-testing')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-elec-yellow/12 flex items-center justify-center">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">New Certificate</h1>
              <p className="text-sm text-white mt-0.5">Choose the type of certificate to create</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 pb-24 sm:pb-8">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {certificateGroups.map((group) => (
            <motion.div key={group.title} variants={itemVariants}>
              {/* Group Header */}
              <div className="mb-4">
                <h2 className="text-base font-semibold text-white">{group.title}</h2>
                <p className="text-sm text-white mt-0.5">{group.description}</p>
              </div>

              {/* Certificates */}
              <div className="space-y-3">
                {group.certificates.map((cert) => (
                  <motion.button
                    key={cert.id}
                    variants={itemVariants}
                    onClick={() => navigate(`/electrician/inspection-testing/${cert.id}/new`)}
                    className={cn(
                      'group w-full text-left p-4 sm:p-5 rounded-2xl transition-all touch-manipulation',
                      'bg-white/[0.06] border border-white/[0.08] border-l-[3px]',
                      cert.borderColor,
                      'hover:bg-white/[0.09] hover:border-white/[0.1]',
                      'active:scale-[0.98]'
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={cn(
                          'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                          cert.iconBg
                        )}
                      >
                        <cert.icon className={cn('h-6 w-6', cert.iconColor)} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-white group-hover:text-elec-yellow transition-colors">
                            {cert.title}
                          </h3>
                          {cert.isNew && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-elec-yellow/20 text-elec-yellow flex-shrink-0">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white mb-2">{cert.description}</p>
                        {cert.standard && (
                          <span className="text-[10px] font-semibold text-white bg-white/[0.06] px-2 py-0.5 rounded">
                            {cert.standard}
                          </span>
                        )}
                      </div>

                      {/* Chevron */}
                      <ChevronRight className="w-5 h-5 text-white flex-shrink-0 group-hover:text-elec-yellow transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-5 rounded-2xl bg-white/[0.06] border border-white/[0.08]"
        >
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-elec-yellow" />
            Quick Tips
          </h3>
          <ul className="text-sm text-white space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
              All certificates auto-save as drafts
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
              Use your saved inspector profile to pre-fill details
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
              Generate PDFs and create quotes/invoices directly
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
