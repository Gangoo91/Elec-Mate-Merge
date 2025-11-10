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
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Site Arrival Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Critical Checks */}
        {checklist.critical && checklist.critical.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2 flex items-center gap-2">
              🔴 Critical (Must-Do Before Starting)
            </div>
            <div className="space-y-2">
              {checklist.critical.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-background/50">
                  <Checkbox
                    id={`critical-${idx}`}
                    checked={checkedItems.has(`critical-${idx}`)}
                    onCheckedChange={() => toggleItem(`critical-${idx}`)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`critical-${idx}`}
                    className="text-sm flex-1 cursor-pointer leading-relaxed"
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
            <div className="text-sm font-medium mb-2 flex items-center gap-2">
              🟡 Important Considerations
            </div>
            <div className="space-y-2">
              {checklist.important.map((item: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg hover:bg-background/50">
                  <Checkbox
                    id={`important-${idx}`}
                    checked={checkedItems.has(`important-${idx}`)}
                    onCheckedChange={() => toggleItem(`important-${idx}`)}
                    className="mt-0.5"
                  />
                  <label
                    htmlFor={`important-${idx}`}
                    className="text-sm flex-1 cursor-pointer leading-relaxed"
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
