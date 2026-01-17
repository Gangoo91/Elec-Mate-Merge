import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Receipt, ClipboardCheck, IdCard, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileFooterProps {
  hasCompanyProfile: boolean;
  hasInspectorProfile: boolean;
  hasElecId: boolean;
}

const ProfileFooter: React.FC<ProfileFooterProps> = ({
  hasCompanyProfile,
  hasInspectorProfile,
  hasElecId,
}) => {
  const navigate = useNavigate();

  const items = [
    {
      icon: ClipboardCheck,
      label: 'EICR & EIC Certificates',
      description: 'Inspector details, signature, qualifications',
      ready: hasInspectorProfile,
      iconBg: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      route: '/inspection',
    },
    {
      icon: FileText,
      label: 'Quotes & Estimates',
      description: 'Company name, address, logo, contact',
      ready: hasCompanyProfile,
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      route: '/quote-builder',
    },
    {
      icon: Receipt,
      label: 'Invoices',
      description: 'Company details, bank info, branding',
      ready: hasCompanyProfile,
      iconBg: 'bg-green-500/15',
      iconColor: 'text-green-400',
      route: '/invoices',
    },
    {
      icon: IdCard,
      label: 'Elec-ID Card',
      description: 'Verified identity for Talent Pool',
      ready: hasElecId,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      route: '/settings?tab=elec-id',
    },
  ];

  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span className="font-semibold text-[15px] text-white">Where Your Details Appear</span>
        </div>
        <p className="text-[13px] text-white/50 mt-1 ml-4">
          Your profile pre-fills these documents
        </p>
      </div>

      {/* Items */}
      <div>
        {items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === items.length - 1;

          return (
            <motion.button
              key={item.label}
              onClick={() => navigate(item.route)}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 active:bg-white/[0.04] transition-colors touch-manipulation text-left ${!isLast ? 'border-b border-white/[0.04]' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`h-4 w-4 ${item.iconColor}`} />
              </div>

              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-medium text-white">{item.label}</p>
                  {item.ready ? (
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  )}
                </div>
                <p className="text-[13px] text-white/50 mt-0.5">{item.description}</p>
              </div>

              <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileFooter;
