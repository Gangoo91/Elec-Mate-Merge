import { Card } from '@/components/ui/card';

interface ExampleScenario {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
}

interface ExampleProjectsGridProps {
  examples: ExampleScenario[];
  onSelect: (prompt: string) => void;
}

export const ExampleProjectsGrid = ({
  examples,
  onSelect
}: ExampleProjectsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {examples.map((example, idx) => {
        const IconComponent = example.icon;
        return (
          <Card 
            key={idx}
            className="p-3 sm:p-4 cursor-pointer hover:border-pink-400/40 transition-all hover:scale-[1.02] touch-manipulation"
            onClick={() => onSelect(example.prompt)}
          >
            <div className="flex items-start gap-2 mb-2">
              <IconComponent className="h-3 w-3 text-pink-400 mt-0.5 flex-shrink-0" />
              <h5 className="font-semibold text-sm leading-tight">{example.title}</h5>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {example.prompt}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
