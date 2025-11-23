import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { parseAgentResponse } from "@/utils/agentTextProcessor";
import { useState } from "react";

interface AIAnalysisSummaryProps {
  jobDescription?: string;
}

const AIAnalysisSummary = ({ jobDescription }: AIAnalysisSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!jobDescription) return null;

  const sections = parseAgentResponse(jobDescription);
  const shouldCollapse = jobDescription.length > 1200;
  
  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl bg-gradient-to-br from-elec-card to-elec-dark/50">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-elec-yellow/10 to-transparent border-b border-elec-yellow/20">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-2xl sm:text-xl font-bold text-white">
            📋 Analysis & Reasoning
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 py-5 sm:px-6 sm:py-6">
        <div className={`space-y-4 ${!isExpanded && shouldCollapse ? 'line-clamp-[12]' : ''}`}>
          {sections.map((section, idx) => {
            if (section.type === 'header') {
              return (
                <h4 key={idx} className="text-xl sm:text-lg font-bold text-elec-yellow mt-5 mb-2 first:mt-0">
                  {section.content}
                </h4>
              );
            }
            
            if (section.type === 'paragraph') {
              return (
                <p key={idx} className="text-base sm:text-base text-white leading-relaxed">
                  {section.content}
                </p>
              );
            }
            
            if (section.type === 'list' && section.items) {
              return (
                <ul key={idx} className="space-y-3 ml-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-white text-base sm:text-sm">
                      <span className="text-elec-yellow font-bold mt-1">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            
            if (section.type === 'calculation') {
              return (
                <div key={idx} className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4 font-mono text-sm sm:text-base text-white">
                  {section.content}
                </div>
              );
            }
            
            if (section.type === 'citation') {
              return (
                <div key={idx} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-sm sm:text-base text-blue-300">
                  📖 {section.content}
                </div>
              );
            }
            
            return null;
          })}
        </div>
        
        {shouldCollapse && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-elec-yellow text-sm font-semibold mt-4 hover:text-elec-yellow/80 transition-colors"
          >
            {isExpanded ? '▲ Show Less' : '▼ Read Full Analysis'}
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAnalysisSummary;
