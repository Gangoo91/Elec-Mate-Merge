import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Factory } from "lucide-react";

interface ProjectType {
  id: 'domestic' | 'commercial' | 'industrial';
  label: string;
  description: string;
  icon: typeof Home;
  examples: string[];
  gradient: string;
}

const PROJECT_TYPES: ProjectType[] = [
  {
    id: 'domestic',
    label: 'Domestic',
    description: 'Residential & Home Projects',
    icon: Home,
    gradient: 'from-blue-500/20 to-blue-600/20',
    examples: [
      "Complete 3-bed house rewire with new 18th Edition consumer unit, upgraded bonding, LED downlights throughout all rooms",
      "Kitchen extension - 2x ring mains, 10.5kW shower circuit, 7kW EV charger installation, outdoor weatherproof sockets",
      "2 bathrooms with electric showers (9.5kW each), heated towel rails, extractor fans, garage sub-main supply",
      "Consumer unit upgrade from fusebox to 18th Edition split load board with surge protection and RCBO protection",
      "4-bed house - 50A range cooker circuit, utility room ring main, garden lighting system, CCTV security installation"
    ]
  },
  {
    id: 'commercial',
    label: 'Commercial',
    description: 'Office & Retail Spaces',
    icon: Building2,
    gradient: 'from-green-500/20 to-green-600/20',
    examples: [
      "Office fit-out 200m² - LED panels throughout, emergency lighting, 15x CAT6 data points, dedicated server room circuit",
      "Retail shop 80m² - track lighting system, till points, intruder alarm system, display socket outlets, shop front lighting",
      "Restaurant with commercial kitchen - 3-phase 30kW oven, extraction system, cold rooms, dining area lighting, bar circuits",
      "Warehouse 500m² - LED high bay lighting, loading bay 3-phase supply, office partition electrics, emergency lighting",
      "Gym facility - changing rooms, air conditioning circuits, equipment circuits, music system, reception area, emergency lights"
    ]
  },
  {
    id: 'industrial',
    label: 'Industrial',
    description: 'Manufacturing & Heavy Industry',
    icon: Factory,
    gradient: 'from-orange-500/20 to-orange-600/20',
    examples: [
      "Workshop 300m² - 3x 3-phase CNC machines (15kW each), welding bay, air compressor 22kW, overhead LED lighting",
      "Production line installation - conveyor motors, control panels, emergency stop systems, overhead gantry lighting",
      "Manufacturing unit - stamping press 50kW, assembly area electrics, extraction system, tool charging stations",
      "Factory floor - overhead crane 3-phase supply, multiple welding bays, machine tool circuits, high bay LED lighting",
      "Industrial unit - compressor room 3-phase, spray booth installation, roller shutter motors, distribution board upgrade"
    ]
  }
];

interface ProjectTypeSelectorProps {
  selectedType: 'domestic' | 'commercial' | 'industrial';
  onTypeChange: (type: 'domestic' | 'commercial' | 'industrial') => void;
  onExampleSelect: (example: string) => void;
}

const ProjectTypeSelector = ({ selectedType, onTypeChange, onExampleSelect }: ProjectTypeSelectorProps) => {
  const [expandedType, setExpandedType] = useState<'domestic' | 'commercial' | 'industrial' | null>(null);

  const handleTypeClick = (typeId: 'domestic' | 'commercial' | 'industrial') => {
    onTypeChange(typeId);
    setExpandedType(expandedType === typeId ? null : typeId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PROJECT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          const isExpanded = expandedType === type.id;

          return (
            <div key={type.id} className="space-y-3">
              <Button
                variant={isSelected ? "default" : "outline"}
                size="lg"
                onClick={() => handleTypeClick(type.id)}
                className={`
                  w-full h-auto py-4 px-4 flex flex-col items-start gap-2 touch-manipulation
                  transition-all duration-300
                  ${isSelected 
                    ? 'bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 border-elec-yellow' 
                    : 'border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-yellow/5'
                  }
                `}
              >
                <div className="flex items-center gap-2 w-full">
                  <Icon className={`h-5 w-5 ${isSelected ? 'text-elec-dark' : 'text-elec-yellow'}`} />
                  <span className="font-bold text-base">{type.label}</span>
                </div>
                <span className={`text-xs ${isSelected ? 'text-elec-dark/70' : 'text-muted-foreground'}`}>
                  {type.description}
                </span>
                <span className={`text-xs font-medium ${isSelected ? 'text-elec-dark/60' : 'text-elec-yellow/70'}`}>
                  {isExpanded ? '↑ Hide Examples' : '↓ Show 5 Examples'}
                </span>
              </Button>

              {isExpanded && (
                <Card className="border-elec-yellow/20 bg-elec-card/50 animate-accordion-down">
                  <CardContent className="p-4 space-y-2">
                    <p className="text-xs font-semibold text-elec-yellow uppercase tracking-wider mb-3">
                      Click any example to use it
                    </p>
                    <div className="space-y-2">
                      {type.examples.map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => onExampleSelect(example)}
                          className="
                            w-full text-left p-3 rounded-lg
                            bg-elec-dark/40 hover:bg-elec-yellow/10
                            border border-elec-yellow/10 hover:border-elec-yellow/30
                            transition-all duration-200
                            hover:scale-[1.02] active:scale-[0.98]
                            touch-manipulation
                            group
                          "
                          style={{
                            animationDelay: `${idx * 50}ms`,
                            animation: 'fade-in 0.3s ease-out forwards'
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-elec-yellow font-bold text-sm shrink-0 mt-0.5">
                              {idx + 1}.
                            </span>
                            <span className="text-sm text-foreground/90 group-hover:text-foreground leading-relaxed">
                              {example}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTypeSelector;
