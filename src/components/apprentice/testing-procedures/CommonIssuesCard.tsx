
import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Issue = {
  title: string;
  description: string;
  solution: string;
  additionalInfo?: string;
};

const CommonIssuesCard = () => {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  
  const issuesList: Issue[] = [
    {
      title: "High resistance readings",
      description: "Readings significantly above expected values during continuity testing",
      solution: "Check for loose connections or damaged conductors. Inspect terminations for proper torque settings and look for signs of corrosion. Verify test leads are making good contact.",
      additionalInfo: "High resistance in protective conductors can prevent fault current from flowing, causing protective devices to fail to operate in fault conditions."
    },
    {
      title: "Inconsistent readings",
      description: "Values that fluctuate or vary between tests",
      solution: "Check for corrosion or poor contact at test points. Clean contact surfaces and ensure proper pressure is applied during tests. Verify test equipment calibration and battery condition.",
      additionalInfo: "Temperature fluctuations can also affect readings. Allow for temperature stabilisation before recording final values."
    },
    {
      title: "Zero or very low readings",
      description: "No value or unexpectedly low values registering on the test equipment",
      solution: "Check for inadvertent short circuits in the test setup. Verify that the test equipment is functioning correctly with a known good circuit. Ensure correct test range is selected.",
      additionalInfo: "In insulation resistance testing, very low readings often indicate failed insulation or moisture ingress that requires immediate investigation."
    },
    {
      title: "RCDs tripping during testing",
      description: "RCD protection devices activating during testing procedures",
      solution: "Use low current test settings when available or temporarily bridge the RCD when performing continuity tests. For loop impedance testing, use non-tripping test methods.",
      additionalInfo: "Modern test equipment often includes specific 'no-trip' test functions designed to prevent RCD operation during testing."
    },
    {
      title: "Polarity issues in lighting circuits",
      description: "Switches not functioning correctly or unexpected live parts",
      solution: "Verify all single-pole switches are in the line conductor. Check wiring at light fittings, especially with two-way switching arrangements. Correct any line-neutral reversals.",
      additionalInfo: "Two-way and intermediate switching arrangements are particularly prone to polarity errors during installation."
    }
  ];
  
  const toggleIssue = (index: number) => {
    setExpandedIssue(expandedIssue === index ? null : index);
  };
  
  return (
    <div className="bg-blue-950/30 border border-blue-500/30 rounded-md p-4">
      <div className="flex items-center gap-2 mb-3">
        <Info className="text-blue-300 h-5 w-5" />
        <h3 className="text-blue-200 font-medium">Common Testing Issues & Solutions</h3>
      </div>
      
      <ul className="text-sm text-blue-100/80 space-y-3">
        {issuesList.map((issue, index) => (
          <li key={index} className="border-b border-blue-500/20 pb-3">
            <button 
              onClick={() => toggleIssue(index)} 
              className="flex justify-between items-center w-full text-left hover:text-blue-200 transition-colors group"
            >
              <span className="font-medium">{issue.title}</span>
              <ChevronRight 
                className={cn(
                  "h-4 w-4 transition-transform duration-300 text-blue-400/70 group-hover:text-blue-300", 
                  expandedIssue === index && "rotate-90"
                )} 
              />
            </button>
            
            {expandedIssue === index && (
              <div className="mt-2 pl-4 border-l-2 border-blue-500/30 animate-fade-in">
                <p className="text-blue-100/70 mb-2">{issue.description}</p>
                <div className="space-y-2">
                  <p className="text-blue-200 font-medium text-xs">Solution:</p>
                  <p className="text-blue-100/90">{issue.solution}</p>
                  
                  {issue.additionalInfo && (
                    <div className="mt-2 bg-blue-950/40 p-2 rounded border border-blue-600/20 text-xs">
                      <p className="text-blue-200/90">{issue.additionalInfo}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      <div className="mt-4 pt-3 border-t border-blue-500/20 text-center">
        <Button 
          variant="outline" 
          size="sm"
          className="text-xs border-blue-500/40 hover:bg-blue-800/20"
          onClick={() => window.open("#", "_blank")}
        >
          View Full Troubleshooting Guide
        </Button>
      </div>
    </div>
  );
};

export default CommonIssuesCard;
