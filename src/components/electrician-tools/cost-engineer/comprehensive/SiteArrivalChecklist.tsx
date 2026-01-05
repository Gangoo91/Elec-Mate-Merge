import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardCheck, Check } from "lucide-react";
import { useState, useMemo } from "react";

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

  const totalItems = useMemo(() => {
    return (checklist.critical?.length || 0) + (checklist.important?.length || 0);
  }, [checklist]);

  return (
    <Card className="border-0 sm:border border-elec-yellow/20 rounded-none sm:rounded-xl">
      <CardHeader className="px-4 py-4 sm:px-6 sm:py-5">
        <CardTitle className="text-xl sm:text-lg font-bold text-foreground flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Site Arrival Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6 space-y-4">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between p-3 sm:p-2.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/30">
          <span className="text-foreground font-medium text-base sm:text-sm">Progress</span>
          <span className="text-elec-yellow font-bold text-base sm:text-sm">{checkedItems.size} of {totalItems} complete</span>
        </div>

        {/* Critical Checks */}
        {checklist.critical && checklist.critical.length > 0 && (
          <div>
            <div className="text-base sm:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              🔴 Critical (Must-Do Before Starting)
            </div>
            <div className="space-y-2">
              {checklist.critical.map((item: string, idx: number) => (
                <div 
                  key={idx} 
                  onClick={() => toggleItem(`critical-${idx}`)}
                  className={`flex items-start gap-3 p-4 sm:p-3 rounded-lg border cursor-pointer transition-all ${
                    checkedItems.has(`critical-${idx}`)
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-background/50 border-border/30 hover:bg-background/70'
                  }`}
                >
                  <Checkbox
                    id={`critical-${idx}`}
                    checked={checkedItems.has(`critical-${idx}`)}
                    onCheckedChange={() => toggleItem(`critical-${idx}`)}
                    className="mt-0.5 h-6 w-6 sm:h-5 sm:w-5 pointer-events-none"
                  />
                  <label
                    htmlFor={`critical-${idx}`}
                    className={`text-base sm:text-sm text-foreground flex-1 leading-relaxed pointer-events-none ${
                      checkedItems.has(`critical-${idx}`) ? 'line-through text-foreground/60' : ''
                    }`}
                  >
                    {item}
                  </label>
                  {checkedItems.has(`critical-${idx}`) && (
                    <Check className="h-5 w-5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Checks */}
        {checklist.important && checklist.important.length > 0 && (
          <div>
            <div className="text-base sm:text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              🟡 Important Considerations
            </div>
            <div className="space-y-2">
              {checklist.important.map((item: string, idx: number) => (
                <div 
                  key={idx}
                  onClick={() => toggleItem(`important-${idx}`)}
                  className={`flex items-start gap-3 p-4 sm:p-3 rounded-lg border cursor-pointer transition-all ${
                    checkedItems.has(`important-${idx}`)
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-background/50 border-border/30 hover:bg-background/70'
                  }`}
                >
                  <Checkbox
                    id={`important-${idx}`}
                    checked={checkedItems.has(`important-${idx}`)}
                    onCheckedChange={() => toggleItem(`important-${idx}`)}
                    className="mt-0.5 h-6 w-6 sm:h-5 sm:w-5 pointer-events-none"
                  />
                  <label
                    htmlFor={`important-${idx}`}
                    className={`text-base sm:text-sm text-foreground flex-1 leading-relaxed pointer-events-none ${
                      checkedItems.has(`important-${idx}`) ? 'line-through text-foreground/60' : ''
                    }`}
                  >
                    {item}
                  </label>
                  {checkedItems.has(`important-${idx}`) && (
                    <Check className="h-5 w-5 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                  )}
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
