import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ExampleScenario {
  title: string;
  icon: LucideIcon;
  prompt: string;
}

interface ExampleScenariosGridProps {
  scenarios: ExampleScenario[];
  onSelect: (prompt: string) => void;
}

export const ExampleScenariosGrid = ({
  scenarios,
  onSelect
}: ExampleScenariosGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {scenarios.map((scenario, idx) => {
        const IconComponent = scenario.icon;
        return (
          <Card 
            key={idx}
            className="p-3 sm:p-4 cursor-pointer hover:border-orange-400/40 transition-all hover:scale-[1.02] touch-manipulation"
            onClick={() => onSelect(scenario.prompt)}
          >
            <div className="flex items-start gap-2 mb-2">
              <IconComponent className="h-3 w-3 text-orange-400 mt-0.5 flex-shrink-0" />
              <h5 className="font-semibold text-sm leading-tight">{scenario.title}</h5>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {scenario.prompt}
            </p>
          </Card>
        );
      })}
    </div>
  );
};