import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Target, ListChecks, AlertCircle, Zap, Shield, AlertTriangle, CheckSquare, ChevronDown } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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

// Utility function to clean text and remove stray "?" characters
const cleanText = (text: string): string => {
  return text
    .replace(/^\?\s*/gm, '') // Remove ? at start of lines
    .replace(/\s+\?(?=\s|$)/g, '') // Remove stray ? with spaces
    .replace(/\?\s*([A-Z])/g, '. $1') // Replace ? before capital letters with period
    .trim();
};

const parseStructuredCriticalPath = (text: string): CriticalPathBlock[] => {
  if (!text) return [];
  
  const cleanedText = cleanText(text);
  const paragraphs = cleanedText.split(/\n\n+/).filter(p => p.trim());
  
  return paragraphs.map(para => {
    const trimmed = para.trim();
    
    if (/(?:Day \d+-\d+|Phase \d+):/i.test(trimmed)) {
      return { type: 'phase-header' as const, content: cleanText(trimmed) };
    }
    
    const lines = trimmed.split('\n');
    if (lines.length > 1 && lines.some(l => /^[-*•]\s/.test(l.trim()))) {
      const items = lines
        .filter(l => /^[-*•]\s/.test(l.trim()))
        .map(l => cleanText(l.replace(/^[-*•]\s+/, '').trim()));
      return { type: 'list' as const, items };
    }
    
    return { type: 'paragraph' as const, content: cleanText(trimmed) };
  });
};

const parseProjectOverview = (text: string): Section[] => {
  const sections: Section[] = [];
  const cleanedText = cleanText(text);

  const businessCaseMatch = cleanedText.match(/Business case:([^.]*(?:\.[^.]*){0,2})/i);
  if (businessCaseMatch) {
    sections.push({
      title: 'Business Case',
      icon: Target,
      content: cleanText(businessCaseMatch[1]),
      color: 'blue',
      type: 'text'
    });
  }

  const workMatch = cleanedText.match(/Work breakdown:([^]*?)(?=Critical path|Acceleration|Compliance|Risk register|$)/i);
  if (workMatch) {
    const workText = workMatch[1].trim();
    const phases = workText.split(/[,;]/).map(p => cleanText(p)).filter(p => p.length > 0 && !p.toLowerCase().includes('critical path'));
    sections.push({
      title: 'Work Breakdown',
      icon: ListChecks,
      content: phases,
      color: 'purple',
      type: 'list'
    });
  }

  const criticalMatch = cleanedText.match(/Critical path:([^]*?)(?=Acceleration|Compliance|Risk register|$)/i);
  if (criticalMatch) {
    const criticalText = cleanText(criticalMatch[1].replace(/Acceleration.*$/i, '').trim());
    sections.push({
      title: 'Critical Path',
      icon: AlertCircle,
      content: criticalText,
      color: 'red',
      type: 'critical-path'
    });
  }

  const accelMatch = cleanedText.match(/Acceleration tips?:([^]*?)(?=Compliance|Risk register|$)/i);
  if (accelMatch) {
    const tips = accelMatch[1].trim().split(/[,;]/).map(t => cleanText(t)).filter(t => t.length > 0 && !t.toLowerCase().includes('compliance'));
    sections.push({
      title: 'Acceleration Tips',
      icon: Zap,
      content: tips,
      color: 'amber',
      type: 'list'
    });
  }

  const complianceMatch = cleanedText.match(/Compliance milestones?:([^]*?)(?=Risk register|$)/i);
  if (complianceMatch) {
    const milestones = complianceMatch[1].trim().split(/[,;]/).map(m => cleanText(m)).filter(m => m.length > 0 && !m.toLowerCase().includes('risk register'));
    sections.push({
      title: 'Compliance Milestones',
      icon: Shield,
      content: milestones,
      color: 'green',
      type: 'checklist'
    });
  }

  const riskMatch = cleanedText.match(/Risk register(?:\s+high)?\s*items?:([^]*?)$/i);
  if (riskMatch) {
    const risks = riskMatch[1].trim().split(/[,;]/).map(r => cleanText(r)).filter(r => r.length > 0);
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
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true });

  if (!response) return null;

  const cleanedResponse = cleanText(response);
  const sections = parseProjectOverview(cleanedResponse);
  
  const businessCase = useMemo(() => {
    const match = cleanedResponse.match(/(?:business case|project overview|scope)[:\s]*(.+?)(?=\n\n[A-Z][a-z]+:|$)/is);
    if (match) {
      return cleanText(match[1]);
    }
    const paragraphs = cleanedResponse.split('\n\n').filter(p => p.trim().length > 50);
    return cleanText(paragraphs[0] || cleanedResponse.substring(0, 300));
  }, [cleanedResponse]);

  return (
    <div className="space-y-4">
      {/* Executive Summary - Always visible */}
      <Card className="border-l-4 border-elec-yellow">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <Target className="h-5 w-5 text-elec-yellow" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-relaxed text-white text-left">{businessCase}</p>
        </CardContent>
      </Card>

      {/* Collapsible Sections */}
      {sections.map((section, idx) => {
        const Icon = section.icon;
        const colors = colorClasses[section.color];
        const isOpen = openSections[idx];
        
        return (
          <Collapsible
            key={idx}
            open={isOpen}
            onOpenChange={(open) => setOpenSections(prev => ({ ...prev, [idx]: open }))}
          >
            <Card className={`${colors.border} ${colors.bg}`}>
              <CollapsibleTrigger className="w-full text-left">
                <CardHeader className="pb-3 cursor-pointer hover:bg-white/5 transition-colors rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-base text-white justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                      {section.title}
                    </div>
                    <ChevronDown className={`h-4 w-4 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {/* Content */}
                  {section.type === 'critical-path' ? (
                    <div className="space-y-4 text-left">
                      {parseStructuredCriticalPath(section.content as string).map((block, i) => {
                        if (block.type === 'phase-header') {
                          return (
                            <div key={i} className="bg-red-500/10 rounded-md p-3 border border-red-500/20">
                              <h4 className="font-semibold text-sm text-white leading-relaxed">
                                {block.content}
                              </h4>
                            </div>
                          );
                        }
                        
                        if (block.type === 'list' && block.items) {
                          return (
                            <ul key={i} className="space-y-2">
                              {block.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="text-sm text-white leading-relaxed flex items-start gap-2">
                                  <span className="text-red-400 text-lg leading-none mt-0.5">•</span>
                                  <span className="flex-1">{item}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        
                        return (
                          <p key={i} className="text-sm text-white leading-relaxed">
                            {block.content}
                          </p>
                        );
                      })}
                    </div>
                  ) : section.type === 'list' ? (
                    <ul className="space-y-2 text-left">
                      {(section.content as string[]).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                          <span className={`${colors.icon} text-lg leading-none mt-0.5`}>•</span>
                          <span className="flex-1 text-white">{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : section.type === 'checklist' ? (
                    <div className="space-y-2 text-left">
                      {(section.content as string[]).map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckSquare className={`h-4 w-4 ${colors.icon} mt-0.5 flex-shrink-0`} />
                          <span className="text-sm leading-relaxed flex-1 text-white">{item}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-white text-left">{section.content as string}</p>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        );
      })}
    </div>
  );
};

export default ProjectOverviewSection;
