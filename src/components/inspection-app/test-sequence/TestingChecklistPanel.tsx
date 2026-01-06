
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckSquare } from 'lucide-react';

interface TestingChecklistPanelProps {
  checklist: string[];
  checkedItems: { [key: string]: boolean };
  onItemChange: (item: string, checked: boolean) => void;
  completion: number;
}

const TestingChecklistPanel = ({ 
  checklist, 
  checkedItems, 
  onItemChange, 
  completion 
}: TestingChecklistPanelProps) => {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-elec-yellow" />
          Testing Best Practices Checklist
          <Badge className={`ml-auto ${
            completion === 100 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          }`}>
            {completion}% Complete
          </Badge>
        </CardTitle>
        <CardDescription className="text-white/70">
          Follow these best practices throughout your testing sequence
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-card/50">
              <Checkbox
                id={`checklist-${index}`}
                checked={checkedItems[item] || false}
                onCheckedChange={(checked) => onItemChange(item, checked as boolean)}
                className="mt-1"
              />
              <label
                htmlFor={`checklist-${index}`}
                className={`text-sm leading-relaxed ${checkedItems[item] ? 'text-green-400' : 'text-white/80'} cursor-pointer`}
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TestingChecklistPanel;
