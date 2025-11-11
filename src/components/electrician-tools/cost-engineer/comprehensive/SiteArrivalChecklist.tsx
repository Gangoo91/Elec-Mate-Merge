import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck } from "lucide-react";
import { useState } from "react";

interface SiteArrivalChecklistProps {
  checklist: any;
}

const SiteArrivalChecklist = ({ checklist }: SiteArrivalChecklistProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-white flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Site Arrival Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Critical Checks */}
        {checklist.critical && checklist.critical.length > 0 && (
          <div>
            <div className="text-base sm:text-sm font-medium text-white mb-2 flex items-center gap-2">
              🔴 Critical (Must-Do Before Starting)
            </div>
            <div className="space-y-2">
              {checklist.critical.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 sm:p-2 rounded-lg hover:bg-background/50">
                  <Checkbox
                    id={`critical-${idx}`}
                    checked={checkedItems.has(`critical-${idx}`)}
                    onCheckedChange={() => toggleItem(`critical-${idx}`)}
                    className="mt-0.5 h-5 w-5 sm:h-4 sm:w-4"
                  />
                  <label
                    htmlFor={`critical-${idx}`}
                    className="text-base sm:text-sm text-white flex-1 cursor-pointer leading-relaxed"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Checks */}
        {checklist.important && checklist.important.length > 0 && (
          <div>
            <div className="text-base sm:text-sm font-medium text-white mb-2 flex items-center gap-2">
              🟡 Important Considerations
            </div>
            <div className="space-y-2">
              {checklist.important.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-3 sm:p-2 rounded-lg hover:bg-background/50">
                  <Checkbox
                    id={`important-${idx}`}
                    checked={checkedItems.has(`important-${idx}`)}
                    onCheckedChange={() => toggleItem(`important-${idx}`)}
                    className="mt-0.5 h-5 w-5 sm:h-4 sm:w-4"
                  />
                  <label
                    htmlFor={`important-${idx}`}
                    className="text-base sm:text-sm text-white flex-1 cursor-pointer leading-relaxed"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SiteArrivalChecklist;
