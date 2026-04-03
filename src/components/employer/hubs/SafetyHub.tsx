import BusinessCard from '@/components/business-hub/BusinessCard';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  BookOpen,
  GraduationCap,
  ClipboardList,
  Handshake,
} from 'lucide-react';

interface SafetyHubProps {
  onNavigate: (section: Section) => void;
}

export function SafetyHub({ onNavigate }: SafetyHubProps) {
  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      {/* Safety & Compliance */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Safety & Compliance
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="RAMS"
            description="Risk assessments & method statements"
            icon={ShieldCheck}
            onClick={() => onNavigate('rams')}
            accentColor="from-emerald-500 via-emerald-400 to-green-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
          />
          <BusinessCard
            title="Incidents"
            description="Report & investigate"
            icon={AlertTriangle}
            onClick={() => onNavigate('incidents')}
            accentColor="from-orange-500 via-amber-400 to-red-400"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
          />
          <BusinessCard
            title="Briefings"
            description="Pre-job safety briefs"
            icon={ClipboardList}
            onClick={() => onNavigate('briefings')}
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
          />
          <BusinessCard
            title="Compliance"
            description="Checklists & audits"
            icon={FileText}
            onClick={() => onNavigate('compliance')}
            accentColor="from-elec-yellow via-amber-400 to-orange-400"
            iconColor="text-elec-yellow"
            iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
          />
        </div>
      </section>

      {/* Documentation & Training */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Documentation & Training
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Policies"
            description="Templates & library"
            icon={BookOpen}
            onClick={() => onNavigate('policies')}
            accentColor="from-purple-500 via-violet-400 to-indigo-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Training"
            description="Records & courses"
            icon={GraduationCap}
            onClick={() => onNavigate('training')}
            accentColor="from-cyan-500 via-blue-400 to-blue-500"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
          />
          <BusinessCard
            title="Contracts"
            description="Manage & track"
            icon={Handshake}
            onClick={() => onNavigate('contracts')}
            accentColor="from-rose-500 via-pink-400 to-red-400"
            iconColor="text-rose-400"
            iconBg="bg-rose-500/10 border border-rose-500/20"
          />
        </div>
      </section>
    </div>
  );
}
