import BusinessCard from '@/components/business-hub/BusinessCard';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  FileText,
  Sparkles,
  Zap,
  ShieldCheck,
  ClipboardList,
  Package,
} from 'lucide-react';

interface SmartDocsHubProps {
  onNavigate: (section: Section) => void;
}

export function SmartDocsHub({ onNavigate }: SmartDocsHubProps) {
  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      {/* AI Document Generation */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          AI Document Generation
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="AI Quotes"
            description="Auto-generate from job scope"
            icon={FileText}
            onClick={() => onNavigate('aiquote')}
            accentColor="from-emerald-500 via-emerald-400 to-green-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
          />
          <BusinessCard
            title="AI Design Spec"
            description="Circuit design docs"
            icon={Zap}
            onClick={() => onNavigate('aidesignspec')}
            accentColor="from-elec-yellow via-amber-400 to-orange-400"
            iconColor="text-elec-yellow"
            iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
          />
          <BusinessCard
            title="AI RAMS"
            description="Risk assessments"
            icon={ShieldCheck}
            onClick={() => onNavigate('airams')}
            accentColor="from-orange-500 via-amber-400 to-red-400"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
          />
          <BusinessCard
            title="AI Method Statement"
            description="Work procedures"
            icon={ClipboardList}
            onClick={() => onNavigate('aimethodstatement')}
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
          />
          <BusinessCard
            title="AI Briefing Pack"
            description="Pre-job briefings"
            icon={Sparkles}
            onClick={() => onNavigate('aibriefingpack')}
            accentColor="from-purple-500 via-violet-400 to-indigo-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Job Packs"
            description="Scope, standards & safety"
            icon={Package}
            onClick={() => onNavigate('jobpacks')}
            accentColor="from-cyan-500 via-blue-400 to-blue-500"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
          />
        </div>
      </section>
    </div>
  );
}
