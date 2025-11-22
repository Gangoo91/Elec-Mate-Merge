import { Card } from '@/components/ui/card';
import { Home, Building2, Factory } from 'lucide-react';

interface QuickFillExample {
  type: 'domestic' | 'commercial' | 'industrial';
  title: string;
  description: string;
}

interface QuickFillExamplesGridProps {
  onSelect: (type: 'domestic' | 'commercial' | 'industrial') => void;
}

const EXAMPLES: QuickFillExample[] = [
  {
    type: 'domestic',
    title: 'Domestic Example',
    description: 'Consumer unit in residential property'
  },
  {
    type: 'commercial',
    title: 'Commercial Example',
    description: '3-phase distribution board in office'
  },
  {
    type: 'industrial',
    title: 'Industrial Example',
    description: 'Industrial distribution with motor protection'
  }
];

const ICONS = {
  domestic: Home,
  commercial: Building2,
  industrial: Factory
};

export const QuickFillExamplesGrid = ({
  onSelect
}: QuickFillExamplesGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {EXAMPLES.map((example) => {
        const IconComponent = ICONS[example.type];
        return (
          <Card 
            key={example.type}
            className="p-3 sm:p-4 cursor-pointer hover:border-yellow-400/40 transition-all hover:scale-[1.02] touch-manipulation"
            onClick={() => onSelect(example.type)}
          >
            <div className="flex items-start gap-2 mb-2">
              <IconComponent className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              <h5 className="font-semibold text-sm leading-tight">{example.title}</h5>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {example.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
