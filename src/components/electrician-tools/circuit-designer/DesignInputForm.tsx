import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CircuitInput, DesignInputs } from '@/types/installation-design';
import { CircuitBuilderCard } from './CircuitBuilderCard';
import { Plus, Zap, Home, Building, Factory } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface DesignInputFormProps {
  onGenerate: (inputs: DesignInputs) => void;
  isProcessing: boolean;
}

export const DesignInputForm = ({ onGenerate, isProcessing }: DesignInputFormProps) => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [clientName, setClientName] = useState('');
  const [electricianName, setElectricianName] = useState('');
  const [propertyType, setPropertyType] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [voltage, setVoltage] = useState(230);
  const [phases, setPhases] = useState<'single' | 'three'>('single');
  const [ze, setZe] = useState(0.35);
  const [earthingSystem, setEarthingSystem] = useState<'TN-S' | 'TN-C-S' | 'TT'>('TN-S');
  const [circuits, setCircuits] = useState<CircuitInput[]>([]);
  const [additionalPrompt, setAdditionalPrompt] = useState('');

  const addCircuit = () => {
    const newCircuit: CircuitInput = {
      id: uuidv4(),
      name: `Circuit ${circuits.length + 1}`,
      loadType: 'socket',
      phases: 'single',
      specialLocation: 'none'
    };
    setCircuits([...circuits, newCircuit]);
  };

  const updateCircuit = (id: string, updated: CircuitInput) => {
    setCircuits(circuits.map(c => c.id === id ? updated : c));
  };

  const deleteCircuit = (id: string) => {
    setCircuits(circuits.filter(c => c.id !== id));
  };

  const loadPreset = (preset: 'house-rewire' | 'kitchen' | 'ev-charger') => {
    if (preset === 'house-rewire') {
      setCircuits([
        { id: uuidv4(), name: 'Kitchen Ring', loadType: 'socket', phases: 'single', specialLocation: 'kitchen' },
        { id: uuidv4(), name: 'Living Room Sockets', loadType: 'socket', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Upstairs Sockets', loadType: 'socket', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Downstairs Lights', loadType: 'lighting', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Upstairs Lights', loadType: 'lighting', phases: 'single', specialLocation: 'none' },
        { id: uuidv4(), name: 'Cooker', loadType: 'cooker', loadPower: 9200, phases: 'single', specialLocation: 'kitchen' },
        { id: uuidv4(), name: 'Shower', loadType: 'shower', loadPower: 10000, cableLength: 15, phases: 'single', specialLocation: 'bathroom' },
        { id: uuidv4(), name: 'Immersion Heater', loadType: 'immersion', phases: 'single', specialLocation: 'none' }
      ]);
    } else if (preset === 'kitchen') {
      setCircuits([
        { id: uuidv4(), name: 'Kitchen Ring', loadType: 'socket', phases: 'single', specialLocation: 'kitchen' },
        { id: uuidv4(), name: 'Cooker', loadType: 'cooker', loadPower: 9200, phases: 'single', specialLocation: 'kitchen' }
      ]);
    } else if (preset === 'ev-charger') {
      setCircuits([
        { id: uuidv4(), name: 'EV Charger', loadType: 'ev-charger', loadPower: 7400, cableLength: 20, phases: 'single', specialLocation: 'outdoor' }
      ]);
    }
  };

  const handleSubmit = () => {
    if (!projectName || circuits.length === 0) {
      return;
    }

    const inputs: DesignInputs = {
      projectName,
      location,
      clientName,
      electricianName,
      propertyType,
      voltage,
      phases,
      ze,
      earthingSystem,
      circuits,
      additionalPrompt
    };

    onGenerate(inputs);
  };

  return (
    <div className="space-y-6">
      {/* Project Information */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Project Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Project Name *</Label>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., 123 High Street Rewire"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Manchester"
            />
          </div>
          <div>
            <Label>Client Name</Label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Optional"
            />
          </div>
          <div>
            <Label>Electrician Name</Label>
            <Input
              value={electricianName}
              onChange={(e) => setElectricianName(e.target.value)}
              placeholder="Your name"
            />
          </div>
        </div>
      </Card>

      {/* Incoming Supply */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Incoming Supply Details</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={(v: any) => setPropertyType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="domestic">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Domestic
                  </div>
                </SelectItem>
                <SelectItem value="commercial">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Commercial
                  </div>
                </SelectItem>
                <SelectItem value="industrial">
                  <div className="flex items-center gap-2">
                    <Factory className="h-4 w-4" />
                    Industrial
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Voltage / Phases</Label>
            <Select
              value={`${voltage}-${phases}`}
              onValueChange={(v) => {
                const [volt, phase] = v.split('-');
                setVoltage(Number(volt));
                setPhases(phase as 'single' | 'three');
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="230-single">230V Single Phase</SelectItem>
                <SelectItem value="400-three">400V Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Earthing System</Label>
            <Select value={earthingSystem} onValueChange={(v: any) => setEarthingSystem(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TN-S">TN-S</SelectItem>
                <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                <SelectItem value="TT">TT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Ze (Ω)</Label>
            <Input
              type="number"
              step="0.01"
              value={ze}
              onChange={(e) => setZe(Number(e.target.value))}
            />
          </div>
        </div>
      </Card>

      {/* Circuit Builder */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Circuit Builder</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => loadPreset('house-rewire')}>
              House Rewire
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPreset('kitchen')}>
              Kitchen
            </Button>
            <Button variant="outline" size="sm" onClick={() => loadPreset('ev-charger')}>
              EV Charger
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {circuits.map((circuit, index) => (
            <CircuitBuilderCard
              key={circuit.id}
              circuit={circuit}
              circuitNumber={index + 1}
              onUpdate={(updated) => updateCircuit(circuit.id, updated)}
              onDelete={() => deleteCircuit(circuit.id)}
            />
          ))}

          <Button
            variant="outline"
            className="w-full"
            onClick={addCircuit}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Circuit
          </Button>
        </div>
      </Card>

      {/* Additional Context */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Additional Requirements (Optional)</h2>
        <Textarea
          value={additionalPrompt}
          onChange={(e) => setAdditionalPrompt(e.target.value)}
          placeholder="e.g., Use fire-rated cable, Client wants AFDDs, Old installation has no RCD..."
          rows={3}
        />
      </Card>

      {/* Generate Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleSubmit}
        disabled={!projectName || circuits.length === 0 || isProcessing}
      >
        <Zap className="h-5 w-5 mr-2" />
        {isProcessing ? 'Designing...' : `Generate Design (${circuits.length} circuits)`}
      </Button>
    </div>
  );
};
