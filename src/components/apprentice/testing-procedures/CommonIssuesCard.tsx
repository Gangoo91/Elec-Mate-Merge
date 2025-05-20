
import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type Issue = {
  title: string;
  description: string;
  solution: string;
};

const CommonIssuesCard = () => {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  
  const issuesList: Issue[] = [
    {
      title: "High readings",
      description: "Readings significantly above expected values",
      solution: "Check for loose connections or damaged conductors. Inspect terminations for proper torque settings and look for signs of corrosion."
    },
    {
      title: "Inconsistent readings",
      description: "Values that fluctuate or vary between tests",
      solution: "Check for corrosion or poor contact at test points. Clean contact surfaces and ensure proper pressure is applied during tests."
    },
    {
      title: "Zero readings",
      description: "No value registering on the test equipment",
      solution: "Check for inadvertent short circuits in the test setup. Verify that the test equipment is functioning correctly with a known good circuit."
    }
  ];
  
  const toggleIssue = (index: number) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };
  
  return (
    <div className="bg-blue-950/30 border border-blue-500/30 rounded-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="text-blue-300 h-5 w-5" />
        <h3 className="text-blue-200 font-medium">Common Issues & Solutions</h3>
      </div>
      
      <ul className="text-sm text-blue-100/80 space-y-3">
        {issuesList.map((issue, index) => (
          <li key={index} className="border-b border-blue-500/20 pb-2">
            <button 
              onClick={() => toggleIssue(index)} 
              className="flex justify-between items-center w-full text-left hover:text-blue-200 transition-colors"
            >
              <span className="font-medium">{issue.title}:</span>
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform", 
                  expandedIssue === index && "rotate-90"
                )} 
              />
            </button>
            
            {expandedIssue === index && (
              <div className="mt-2 pl-4 border-l-2 border-blue-500/30 animate-fade-in">
                <p className="text-blue-100/70 mb-1">{issue.description}</p>
                <p className="text-blue-200 font-medium mt-1 text-xs">Solution:</p>
                <p className="text-blue-100/90">{issue.solution}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonIssuesCard;
