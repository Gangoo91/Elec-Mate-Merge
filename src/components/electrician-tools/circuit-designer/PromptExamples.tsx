import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface PromptExamplesProps {
  installationType: 'domestic' | 'commercial' | 'industrial';
  onSelectExample: (example: string) => void;
}

export const PromptExamples = ({ installationType, onSelectExample }: PromptExamplesProps) => {
  const examples = {
    domestic: [
      '3-bed house complete rewire with new consumer unit',
      'Kitchen extension with integrated appliances and EV charger',
      '2 bathrooms with 10.5kW showers, outdoor sockets, garage supply',
      '4-bed house with range cooker, utility room, and garden lighting'
    ],
    commercial: [
      'Office fit-out for 15 desks, meeting rooms, server room with UPS',
      'Retail shop with display lighting, till points, security system',
      'Restaurant with commercial kitchen, 3-phase oven, extraction',
      'Small warehouse with loading bay, office area, emergency lighting'
    ],
    industrial: [
      'Workshop with 3 x CNC machines, welding bay, air compressor',
      'Production line with conveyors, motors, control panels',
      'Manufacturing unit with stamping press, assembly area, extraction',
      'Factory floor with overhead crane, welding, machine tools'
    ]
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
        <span className="text-xs sm:text-sm">Example prompts - click to use:</span>
      </div>
      <div className="grid gap-2">
        {examples[installationType].map((example, idx) => (
          <Button
            key={idx}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onSelectExample(example)}
            className="h-auto py-2 px-3 text-left justify-start whitespace-normal hover:bg-accent touch-manipulation min-h-[44px]"
          >
            <span className="text-xs sm:text-sm leading-relaxed">{example}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
