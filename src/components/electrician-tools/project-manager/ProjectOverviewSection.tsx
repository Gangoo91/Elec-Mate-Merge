import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Target, ListChecks, AlertCircle, Zap, Shield, AlertTriangle, CheckSquare } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useMemo } from "react";

interface ProjectOverviewSectionProps {
  response?: string;
}

interface Section {
  title: string;
  icon: LucideIcon;
  content: string | string[];
  color: 'blue' | 'purple' | 'red' | 'amber' | 'green';
  type?: 'list' | 'checklist' | 'text' | 'critical-path';
}

interface CriticalPathBlock {
  type: 'phase-header' | 'list' | 'paragraph';
  content?: string;
  items?: string[];
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

const parseStructuredCriticalPath = (text: string): CriticalPathBlock[] => {
  if (!text) return [];
  
  // Split by double newlines for paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
  
  return paragraphs.map(para => {
    const trimmed = para.trim();
    
    // Detect phase headers: "Day X-Y:" or "Phase X:"
    if (/(?:Day \d+-\d+|Phase \d+):/i.test(trimmed)) {
      return { type: 'phase-header' as const, content: trimmed };
    }
    
    // Detect list items (multiple lines starting with -, *, or •)
    const lines = trimmed.split('\n');
    if (lines.length > 1 && lines.some(l => /^[-*•]\s/.test(l.trim()))) {
      const items = lines
        .filter(l => /^[-*•]\s/.test(l.trim()))
        .map(l => l.replace(/^[-*•]\s+/, '').trim());
      return { type: 'list' as const, items };
    }
    
    // Regular paragraph
    return { type: 'paragraph' as const, content: trimmed };
  });
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
      type: 'critical-path'
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
  const businessCase = useMemo(() => {
    const match = response.match(/(?:business case|project overview|scope)[:\s]*(.+?)(?=\n\n[A-Z][a-z]+:|$)/is);
    if (match) {
      return match[1].trim();
    }
    const paragraphs = response.split('\n\n').filter(p => p.trim().length > 50);
    return paragraphs[0] || response.substring(0, 300);
  }, [response]);

  return (
    <div className="space-y-4">
      {/* Business Case - FULL CONTENT */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-pink-400" />
            Business Case & Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-3 whitespace-pre-wrap">
            {businessCase.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx}>{paragraph.trim()}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Structured Sections */}
      {sections.length > 0 && (
        <Card className="bg-muted/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-pink-400" />
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
        {sections.length > 0 ? (
          sections.map((section, idx) => {
            const Icon = section.icon;
            const colors = colorClasses[section.color];
            
            return (
              <div 
                key={idx}
                className={`${colors.border} ${colors.bg} rounded-lg p-4 sm:p-5`}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`h-4 w-4 ${colors.icon}`} />
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-100">
                    {section.title}
                  </span>
                </div>
                
                {/* Content */}
                {section.type === 'critical-path' ? (
                  <div className="space-y-4">
                    {parseStructuredCriticalPath(section.content as string).map((block, i) => {
                      if (block.type === 'phase-header') {
                        return (
                          <div key={i} className="bg-red-500/5 rounded-md p-3 border border-red-500/20">
                            <h4 className="font-semibold text-sm text-red-100 leading-relaxed">
                              {block.content}
                            </h4>
                          </div>
                        );
                      }
                      
                      if (block.type === 'list' && block.items) {
                        return (
                          <ul key={i} className="space-y-2 ml-4">
                            {block.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                                <span className="text-red-400 text-lg leading-none mt-0.5">•</span>
                                <span className="flex-1">{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      return (
                        <p key={i} className="text-sm text-gray-300 leading-relaxed">
                          {block.content}
                        </p>
                      );
                    })}
                  </div>
                ) : section.type === 'list' ? (
                  <ul className="space-y-2">
                    {(section.content as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                        <span className={`${colors.icon} text-lg leading-none mt-0.5`}>•</span>
                        <span className="flex-1 text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : section.type === 'checklist' ? (
                  <div className="space-y-2">
                    {(section.content as string[]).map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckSquare className={`h-3.5 w-3.5 ${colors.icon} mt-0.5 flex-shrink-0`} />
                        <span className="text-sm leading-relaxed flex-1 text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed text-gray-300">{section.content as string}</p>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-sm whitespace-pre-wrap leading-relaxed text-gray-300">{response}</p>
        )}
          </CardContent>
        </Card>
      )}

      {/* Full AI Response */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <FileText className="h-5 w-5 text-pink-400" />
            Complete Project Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
            {response.split('\n\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx}>{paragraph.trim()}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectOverviewSection;
