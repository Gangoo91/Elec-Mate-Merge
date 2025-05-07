
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface BalanceChecklistProps {
  initialChecklist?: Record<string, boolean>;
}

const BalanceChecklist = ({ initialChecklist }: BalanceChecklistProps) => {
  const [checklist, setChecklist] = useState(initialChecklist || {
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
  });

  const handleChecklistChange = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));

    if (!checklist[key]) {
      toast.success("Item added to your balance checklist");
    }
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;
  const totalItems = Object.keys(checklist).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Balance Checklist</h3>
        <span className="text-sm text-muted-foreground">
          {completedItems} of {totalItems} complete
        </span>
      </div>
      <Card className="border-green-500/20">
        <CardContent className="p-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="item1" 
                checked={checklist.item1} 
                onCheckedChange={() => handleChecklistChange("item1")}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="item1">Establish a consistent work routine</Label>
                <p className="text-sm text-muted-foreground">
                  Create a predictable schedule for workdays and client visits
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="item2" 
                checked={checklist.item2} 
                onCheckedChange={() => handleChecklistChange("item2")}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="item2">Schedule dedicated admin time</Label>
                <p className="text-sm text-muted-foreground">
                  Block out specific hours for quoting, invoicing and paperwork
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="item3" 
                checked={checklist.item3} 
                onCheckedChange={() => handleChecklistChange("item3")}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="item3">Plan leisure activities</Label>
                <p className="text-sm text-muted-foreground">
                  Make time for hobbies, exercise, and social connections
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="item4" 
                checked={checklist.item4} 
                onCheckedChange={() => handleChecklistChange("item4")}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="item4">Set device boundaries</Label>
                <p className="text-sm text-muted-foreground">
                  Limit client calls and work messages during personal time
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="item5" 
                checked={checklist.item5} 
                onCheckedChange={() => handleChecklistChange("item5")}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="item5">Prioritise sufficient rest</Label>
                <p className="text-sm text-muted-foreground">
                  Aim for 7-9 hours of quality sleep each night to recover from physical work
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="sm"
            onClick={() => toast.success("Your balance checklist has been saved")}
          >
            Save Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceChecklist;
