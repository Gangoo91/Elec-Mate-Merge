
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Zap } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';
import { CircuitType } from '@/types/eicr';

interface CircuitQuickAddProps {
  onCircuitAdded?: (circuitRef: string) => void;
}

const CircuitQuickAdd = ({ onCircuitAdded }: CircuitQuickAddProps) => {
  const { addCircuit } = useEICR();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    ref: '',
    type: 'lighting' as CircuitType,
    description: '',
    rating: '',
    protective_device: 'MCB Type B'
  });

  const circuitTemplates = {
    lighting: {
      rating: '16',
      conductor_csa: '1.5',
      earthing_conductor: '1.5',
      max_zs: 2.87,
      protective_device: 'MCB Type B'
    },
    power: {
      rating: '32',
      conductor_csa: '2.5',
      earthing_conductor: '2.5',
      max_zs: 1.44,
      protective_device: 'MCB Type B'
    },
    cooker: {
      rating: '32',
      conductor_csa: '6.0',
      earthing_conductor: '6.0',
      max_zs: 0.72,
      protective_device: 'MCB Type C'
    },
    shower: {
      rating: '40',
      conductor_csa: '10.0',
      earthing_conductor: '10.0',
      max_zs: 1.15,
      protective_device: 'MCB Type C'
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ref || !formData.description) return;

    const template = circuitTemplates[formData.type as keyof typeof circuitTemplates] || circuitTemplates.lighting;
    
    const newCircuit = {
      ref: formData.ref,
      type: formData.type,
      description: formData.description,
      rating: formData.rating || template.rating,
      protective_device: formData.protective_device,
      conductor_csa: template.conductor_csa,
      earthing_conductor: template.earthing_conductor,
      max_zs: template.max_zs,
      overall_condition: 'satisfactory' as const
    };

    addCircuit(newCircuit);
    onCircuitAdded?.(formData.ref);
    
    // Reset form
    setFormData({
      ref: '',
      type: 'lighting',
      description: '',
      rating: '',
      protective_device: 'MCB Type B'
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Quick Add Circuit
      </Button>
    );
  }

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Zap className="h-4 w-4 text-elec-yellow" />
          Quick Add Circuit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="ref" className="text-xs">Reference</Label>
              <Input
                id="ref"
                value={formData.ref}
                onChange={(e) => setFormData({...formData, ref: e.target.value})}
                placeholder="L1, C1, etc."
                className="bg-elec-dark border-elec-yellow/20 h-8 text-sm"
                required
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-xs">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: CircuitType) => setFormData({...formData, type: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lighting">Lighting</SelectItem>
                  <SelectItem value="power">Power/Sockets</SelectItem>
                  <SelectItem value="cooker">Cooker</SelectItem>
                  <SelectItem value="shower">Shower</SelectItem>
                  <SelectItem value="immersion">Immersion</SelectItem>
                  <SelectItem value="heating">Heating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-xs">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Ground floor lighting"
              className="bg-elec-dark border-elec-yellow/20 h-8 text-sm"
              required
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
              Add Circuit
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CircuitQuickAdd;
