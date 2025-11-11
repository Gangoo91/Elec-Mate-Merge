import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Target, ListChecks, AlertCircle, Zap, Shield, AlertTriangle, CheckSquare } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ProjectOverviewSectionProps {
  response?: string;
}

interface Section {
  title: string;
  icon: LucideIcon;
  content: string | string[];
  color: 'blue' | 'purple' | 'red' | 'amber' | 'green';
  type?: 'list' | 'checklist' | 'text';
}

const colorClasses = {
  blue: {
    border: 'border-l-4 border-blue-500',
    bg: 'bg-blue-500/10',
    icon: 'text-blue-400',
  },
  purple: {
    border: 'border-l-4 border-purple-500',
    bg: 'bg-purple-500/10',
    icon: 'text-purple-400',
  },
  red: {
    border: 'border-l-4 border-red-500',
    bg: 'bg-red-500/10',
    icon: 'text-red-400',
  },
  amber: {
    border: 'border-l-4 border-amber-500',
    bg: 'bg-amber-500/10',
    icon: 'text-amber-400',
  },
  green: {
    border: 'border-l-4 border-green-500',
    bg: 'bg-green-500/10',
    icon: 'text-green-400',
  },
};

const parseProjectOverview = (text: string): Section[] => {
  const sections: Section[] = [];

  // Business case section
  const businessCaseMatch = text.match(/Business case:([^.]*(?:\.[^.]*){0,2})/i);
  if (businessCaseMatch) {
    sections.push({
      title: 'Business Case',
      icon: Target,
      content: businessCaseMatch[1].trim(),
      color: 'blue',
      type: 'text'
    });
  }

  // Work breakdown
  const workMatch = text.match(/Work breakdown:([^]*?)(?=Critical path|Acceleration|Compliance|Risk register|$)/i);
  if (workMatch) {
    const workText = workMatch[1].trim();
    const phases = workText.split(/[,;]/).map(p => p.trim()).filter(p => p.length > 0 && !p.toLowerCase().includes('critical path'));
    sections.push({
      title: 'Work Breakdown',
      icon: ListChecks,
      content: phases,
      color: 'purple',
      type: 'list'
    });
  }

  // Critical path
  const criticalMatch = text.match(/Critical path:([^]*?)(?=Acceleration|Compliance|Risk register|$)/i);
  if (criticalMatch) {
    const criticalText = criticalMatch[1].trim().replace(/Acceleration.*$/i, '').trim();
    sections.push({
      title: 'Critical Path',
      icon: AlertCircle,
      content: criticalText,
      color: 'red',
      type: 'text'
    });
  }

  // Acceleration tips
  const accelMatch = text.match(/Acceleration tips?:([^]*?)(?=Compliance|Risk register|$)/i);
  if (accelMatch) {
    const tips = accelMatch[1].trim().split(/[,;]/).map(t => t.trim()).filter(t => t.length > 0 && !t.toLowerCase().includes('compliance'));
    sections.push({
      title: 'Acceleration Tips',
      icon: Zap,
      content: tips,
      color: 'amber',
      type: 'list'
    });
  }

  // Compliance milestones
  const complianceMatch = text.match(/Compliance milestones?:([^]*?)(?=Risk register|$)/i);
  if (complianceMatch) {
    const milestones = complianceMatch[1].trim().split(/[,;]/).map(m => m.trim()).filter(m => m.length > 0 && !m.toLowerCase().includes('risk register'));
    sections.push({
      title: 'Compliance Milestones',
      icon: Shield,
      content: milestones,
      color: 'green',
      type: 'checklist'
    });
  }

  // Risk register
  const riskMatch = text.match(/Risk register(?:\s+high)?\s*items?:([^]*?)$/i);
  if (riskMatch) {
    const risks = riskMatch[1].trim().split(/[,;]/).map(r => r.trim()).filter(r => r.length > 0);
    sections.push({
      title: 'Risk Register',
      icon: AlertTriangle,
      content: risks,
      color: 'red',
      type: 'list'
    });
  }

  return sections;
};

const ProjectOverviewSection = ({ response }: ProjectOverviewSectionProps) => {
  if (!response) return null;

  const sections = parseProjectOverview(response);

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-pink-400" />
          Project Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.length > 0 ? (
          sections.map((section, idx) => {
            const Icon = section.icon;
            const colors = colorClasses[section.color];
            
            return (
              <div 
                key={idx}
                className={`${colors.border} ${colors.bg} rounded-lg p-3`}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-4 w-4 ${colors.icon}`} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {section.title}
                  </span>
                </div>
                
                {/* Content */}
                {section.type === 'list' ? (
                  <ul className="space-y-1.5">
                    {(section.content as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed">
                        <span className={`${colors.icon} text-lg leading-none`}>•</span>
                        <span className="flex-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : section.type === 'checklist' ? (
                  <div className="space-y-1.5">
                    {(section.content as string[]).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckSquare className={`h-3.5 w-3.5 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        <span className="text-xs leading-relaxed flex-1">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs leading-relaxed">{section.content as string}</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{response}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectOverviewSection;
