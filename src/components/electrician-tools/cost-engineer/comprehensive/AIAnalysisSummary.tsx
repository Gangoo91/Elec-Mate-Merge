import { ChevronDown } from "lucide-react";
import { parseAgentResponse } from "@/utils/agentTextProcessor";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AIAnalysisSummaryProps {
  jobDescription?: string;
}

const AIAnalysisSummary = ({ jobDescription }: AIAnalysisSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!jobDescription) return null;

  const sections = parseAgentResponse(jobDescription);
  const shouldCollapse = jobDescription.length > 1200;

  return (
    <div className="space-y-4">
      {/* Content */}
      <div>
        <div className={cn(
          "space-y-4",
          !isExpanded && shouldCollapse && "max-h-[300px] overflow-hidden relative"
        )}>
          {sections.map((section, idx) => {
            if (section.type === 'header') {
              return (
                <h4 key={idx} className="text-sm sm:text-base font-bold text-elec-yellow mt-4 mb-2 first:mt-0">
                  {section.content}
                </h4>
              );
            }

            if (section.type === 'paragraph') {
              return (
                <p key={idx} className="text-sm sm:text-base text-white leading-relaxed">
                  {section.content}
                </p>
              );
            }

            if (section.type === 'list' && section.items) {
              return (
                <ul key={idx} className="space-y-2 ml-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-base text-white">
                      <span className="text-elec-yellow font-bold mt-0.5">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (section.type === 'calculation') {
              return (
                <div key={idx} className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-xl p-4 font-mono text-xs sm:text-sm text-white">
                  {section.content}
                </div>
              );
            }

            if (section.type === 'citation') {
              return (
                <div key={idx} className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-xs sm:text-sm text-blue-300">
                  📖 {section.content}
                </div>
              );
            }

            return null;
          })}

          {/* Gradient fade when collapsed */}
          {!isExpanded && shouldCollapse && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none" />
          )}
        </div>

        {shouldCollapse && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-elec-yellow text-sm font-semibold mt-4 min-h-[44px] py-2 transition-transform active:scale-95 touch-manipulation"
          >
            <ChevronDown className={cn(
              "h-5 w-5 transition-transform duration-200",
              isExpanded && "rotate-180"
            )} />
            {isExpanded ? 'Show Less' : 'Read Full Analysis'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AIAnalysisSummary;
