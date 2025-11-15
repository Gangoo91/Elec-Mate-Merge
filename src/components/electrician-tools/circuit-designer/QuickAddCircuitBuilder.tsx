import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Zap, Home, Building2, Factory } from "lucide-react";
import { CircuitInput } from "@/types/installation-design";

interface QuickAddCircuitBuilderProps {
  onAddCircuit: (circuit: Omit<CircuitInput, 'id'>) => void;
  circuitCount: number;
}

const domesticCircuits = [
  { name: 'Socket Ring', loadType: 'socket' as const, icon: '🔌' },
  { name: 'Lighting', loadType: 'lighting' as const, icon: '💡' },
  { name: 'Cooker', loadType: 'cooker' as const, icon: '🍳' },
  { name: 'Shower', loadType: 'shower' as const, icon: '🚿' },
  { name: 'EV Charger', loadType: 'ev-charger' as const, icon: '🔋' },
  { name: 'Immersion Heater', loadType: 'immersion' as const, icon: '♨️' },
];

const commercialCircuits = [
  { name: 'Office Sockets', loadType: 'office-sockets' as const, icon: '💼' },
  { name: 'Emergency Lighting', loadType: 'emergency-lighting' as const, icon: '🚨' },
  { name: 'HVAC System', loadType: 'hvac' as const, icon: '❄️' },
  { name: 'Server Room', loadType: 'server-room' as const, icon: '🖥️' },
  { name: 'Kitchen Equipment', loadType: 'kitchen-equipment' as const, icon: '🍽️' },
  { name: 'Fire Alarm', loadType: 'fire-alarm' as const, icon: '🔥' },
];

const industrialCircuits = [
  { name: '3-Phase Motor', loadType: 'three-phase-motor' as const, icon: '⚙️' },
  { name: 'Machine Tool', loadType: 'machine-tool' as const, icon: '🔧' },
  { name: 'Welding Equipment', loadType: 'welding' as const, icon: '⚡' },
  { name: 'Conveyor System', loadType: 'conveyor' as const, icon: '📦' },
  { name: 'Control Panel', loadType: 'control-panel' as const, icon: '🎛️' },
  { name: 'Compressor', loadType: 'compressor' as const, icon: '💨' },
];

export function QuickAddCircuitBuilder({ onAddCircuit, circuitCount }: QuickAddCircuitBuilderProps) {
  const [activeTab, setActiveTab] = useState('domestic');

  const handleQuickAdd = (loadType: string, name: string) => {
    onAddCircuit({
      name,
      loadType: loadType as any,
      phases: loadType.includes('three-phase') ? 'three' : 'single',
      specialLocation: 'none',
    });
  };

  const getCircuitList = () => {
    switch (activeTab) {
      case 'commercial': return commercialCircuits;
      case 'industrial': return industrialCircuits;
      default: return domesticCircuits;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Add Circuits
          </CardTitle>
          <Badge variant="secondary">
            {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="domestic" className="gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Domestic</span>
            </TabsTrigger>
            <TabsTrigger value="commercial" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Commercial</span>
            </TabsTrigger>
            <TabsTrigger value="industrial" className="gap-2">
              <Factory className="h-4 w-4" />
              <span className="hidden sm:inline">Industrial</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              {getCircuitList().map((circuit) => (
                <Button
                  key={circuit.loadType}
                  variant="outline"
                  className="justify-start gap-2 h-auto py-3"
                  onClick={() => handleQuickAdd(circuit.loadType, circuit.name)}
                >
                  <span className="text-lg">{circuit.icon}</span>
                  <span className="text-sm">{circuit.name}</span>
                  <Plus className="h-3 w-3 ml-auto" />
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
