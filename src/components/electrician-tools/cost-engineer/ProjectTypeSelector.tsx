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
      "4-bed house - 50A range cooker circuit, utility room ring main, garden lighting system, CCTV security installation",
      "Garage conversion - 2x double sockets, LED strip lighting, consumer unit upgrade with RCD protection, garden socket",
      "Loft conversion - dedicated lighting circuit, power outlets, smoke detectors, heating controls integration",
      "Bathroom renovation - extractor fan, shaver socket, heated mirror, underfloor heating controls, IP-rated downlights"
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
      "Gym facility - changing rooms, air conditioning circuits, equipment circuits, music system, reception area, emergency lights",
      "Restaurant kitchen - dedicated cooker circuits, extraction fan control, cold room electrics, till points, hand dryers",
      "Gym facility - dedicated circuits for treadmills, air conditioning, audio system, changing room lighting, emergency lighting",
      "Small warehouse - 3-phase distribution, LED high bay lighting, roller shutter controls, office area fit-out, CCTV power"
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
      "Industrial unit - compressor room 3-phase, spray booth installation, roller shutter motors, distribution board upgrade",
      "Factory automation - PLC installation, motor control centres, sensor networks, safety interlock systems",
      "Cold storage facility - 3-phase refrigeration units, alarm systems, emergency heating circuits, loading bay lighting",
      "Manufacturing facility - spray booth electrics, dust extraction, overhead crane power, machine shop distribution"
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
      {/* Three Project Type Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PROJECT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          const isExpanded = expandedType === type.id;

          return (
            <Button
              key={type.id}
              variant={isSelected ? "default" : "outline"}
              onClick={() => handleTypeClick(type.id)}
              className={`
                w-full min-h-[110px] py-4 px-4 
                flex flex-col items-start justify-center gap-2 
                touch-manipulation text-left
                transition-all duration-300
                ${isSelected 
                  ? 'bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 border-elec-yellow' 
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-yellow/5'
                }
                ${isExpanded ? 'ring-2 ring-elec-yellow/50' : ''}
              `}
            >
              {/* Icon + Label Row */}
              <div className="flex items-center gap-2 w-full">
                <Icon className={`h-5 w-5 shrink-0 ${isSelected ? 'text-elec-dark' : 'text-elec-yellow'}`} />
                <span className="font-bold text-base">{type.label}</span>
              </div>
              
              {/* Description - wraps properly */}
              <span className={`text-xs leading-relaxed line-clamp-2 whitespace-normal ${isSelected ? 'text-elec-dark/70' : 'text-muted-foreground'}`}>
                {type.description}
              </span>
              
              {/* Show/Hide indicator */}
              <span className={`text-xs font-medium whitespace-nowrap ${isSelected ? 'text-elec-dark/60' : 'text-elec-yellow/70'}`}>
                {isExpanded ? '↑ Hide Examples' : '↓ Show 8 Examples'}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Full-Width Examples Section */}
      {expandedType && (
        <Card className="border-elec-yellow/20 bg-elec-card/50 animate-accordion-down">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center mb-4">
              <p className="text-sm font-semibold text-elec-yellow uppercase tracking-wider">
                Click any example to use it
              </p>
            </div>
            
            {/* Responsive Grid of Examples */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PROJECT_TYPES.find(t => t.id === expandedType)?.examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onExampleSelect(example);
                    onTypeChange(expandedType);
                  }}
                  className="
                    group text-left p-4 rounded-lg 
                    border border-elec-yellow/20 bg-elec-dark/50 
                    hover:bg-elec-yellow/5 hover:border-elec-yellow/40 
                    hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-200 
                    touch-manipulation 
                    min-h-[120px] flex flex-col
                  "
                  style={{
                    animationDelay: `${idx * 50}ms`,
                    animation: 'fade-in 0.3s ease-out forwards'
                  }}
                >
                  {/* Example Content */}
                  <div className="flex items-start gap-3 flex-1">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-sm leading-relaxed line-clamp-4 flex-1">
                      {example}
                    </p>
                  </div>
                  
                  {/* Hover Indicator */}
                  <div className="mt-2 text-xs text-elec-yellow opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to use →
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectTypeSelector;
