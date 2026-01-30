import React from 'react';
import { Phone, MapPin, UserCheck, Shield, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MethodStatementData } from '@/types/method-statement';

interface EmergencyContactsCardProps {
  methodData: MethodStatementData;
}

interface ContactRowProps {
  role: string;
  name?: string;
  phone?: string;
  icon: React.ReactNode;
}

const ContactRow: React.FC<ContactRowProps> = ({ role, name, phone, icon }) => {
  if (!name && !phone) return null;

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{role}</p>
          <p className="text-sm font-semibold text-white truncate">{name || 'TBC'}</p>
        </div>
      </div>
      {phone && (
        <a
          href={`tel:${phone}`}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-elec-yellow/10 text-elec-yellow text-sm font-semibold touch-manipulation active:scale-95 transition-transform"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Call</span>
        </a>
      )}
    </div>
  );
};

export function EmergencyContactsCard({ methodData }: EmergencyContactsCardProps) {
  const hasAnyContact = methodData.siteManagerName || methodData.firstAiderName ||
    methodData.safetyOfficerName || methodData.assemblyPoint;

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-white">Emergency Contacts</h3>
        </div>
        <Badge className="bg-amber-500/10 text-amber-500 border-0 text-[10px]">
          Safety Critical
        </Badge>
      </div>

      {/* Contacts List */}
      <div className="px-4">
        <ContactRow
          role="Site Manager"
          name={methodData.siteManagerName}
          phone={methodData.siteManagerPhone}
          icon={<UserCheck className="h-4 w-4 text-elec-yellow" />}
        />

        <ContactRow
          role="First Aider"
          name={methodData.firstAiderName}
          phone={methodData.firstAiderPhone}
          icon={<Shield className="h-4 w-4 text-green-400" />}
        />

        <ContactRow
          role="Safety Officer"
          name={methodData.safetyOfficerName}
          phone={methodData.safetyOfficerPhone}
          icon={<Shield className="h-4 w-4 text-amber-400" />}
        />
      </div>

      {/* Emergency Services - Always visible */}
      <div className="mx-4 mb-4 mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Phone className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-red-400/70 font-medium">Emergency Services</p>
              <p className="text-lg font-bold text-red-400">999</p>
            </div>
          </div>
          <a
            href="tel:999"
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-bold touch-manipulation active:scale-95 transition-transform"
          >
            Call 999
          </a>
        </div>
      </div>

      {/* Assembly Point */}
      {methodData.assemblyPoint && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-400/70 font-medium">Assembly Point</p>
              <p className="text-sm font-semibold text-white">{methodData.assemblyPoint}</p>
            </div>
          </div>
        </div>
      )}

      {!hasAnyContact && (
        <div className="px-4 pb-4">
          <p className="text-xs text-white/40 text-center py-2">
            Complete emergency contact details before starting work
          </p>
        </div>
      )}
    </div>
  );
}
