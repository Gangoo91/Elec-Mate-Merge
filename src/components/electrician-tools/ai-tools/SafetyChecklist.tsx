import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldAlert, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const SafetyChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const safetyItems = [
    { id: 'isolated', label: 'Supply isolated at consumer unit' },
    { id: 'tested', label: 'Voltage tested and confirmed dead' },
    { id: 'ppe', label: 'Appropriate PPE available and worn' },
    { id: 'cable', label: 'Correct cable size calculated' },
    { id: 'protection', label: 'Protection device rating verified' },
    { id: 'rcd', label: 'RCD protection confirmed if required' }
  ];

  const allChecked = safetyItems.every(item => checkedItems[item.id]);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="bg-orange-500/5 border-orange-500/20">
      <CardHeader className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg text-orange-700 dark:text-orange-400 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 flex-shrink-0" />
            Pre-Work Safety Checklist
          </CardTitle>
          {allChecked && (
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {checkedCount}/{safetyItems.length} items checked
        </p>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2.5 text-left">
        {safetyItems.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2.5 sm:p-3 bg-background/50 rounded-lg border border-border/30 hover:border-orange-500/30 transition-colors cursor-pointer"
            onClick={() => toggleItem(item.id)}
          >
            <Checkbox
              id={item.id}
              checked={checkedItems[item.id] || false}
              onCheckedChange={() => toggleItem(item.id)}
              className="mt-0.5 border-orange-500/40 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label
              htmlFor={item.id}
              className="text-sm text-foreground cursor-pointer leading-relaxed flex-1"
            >
              {item.label}
            </label>
          </div>
        ))}

        {allChecked && (
          <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg animate-fade-in">
            <p className="text-xs sm:text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              All safety checks complete - safe to proceed
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SafetyChecklist;
