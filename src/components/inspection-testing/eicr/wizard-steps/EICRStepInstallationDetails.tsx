
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Home } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';

interface EICRStepInstallationDetailsProps {
  onComplete: () => void;
}

const EICRStepInstallationDetails = ({ onComplete }: EICRStepInstallationDetailsProps) => {
  const { eicrSession, initializeEICR } = useEICR();
  
  const [formData, setFormData] = useState({
    address: '',
    description: '',
    estimatedAge: '',
    alterations: false,
    earthing: '',
    supply: '230V/400V, 50Hz, 3-phase',
    mainSwitch: '',
    mainEarth: '',
    mainBonding: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eicrSession?.eicr_report?.installation_details) {
      const details = eicrSession.eicr_report.installation_details;
      setFormData({
        address: details.address || '',
        description: details.description || '',
        estimatedAge: details.estimated_age || '',
        alterations: details.evidence_of_alterations || false,
        earthing: details.earthing_arrangements || '',
        supply: details.supply_characteristics || '230V/400V, 50Hz, 3-phase',
        mainSwitch: details.main_switch_rating || '',
        mainEarth: details.main_earthing_conductor || '',
        mainBonding: details.main_bonding_conductors || '',
      });
    }
  }, [eicrSession]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.address.trim()) newErrors.address = 'Installation address is required';
    if (!formData.description.trim()) newErrors.description = 'Installation description is required';
    if (!formData.earthing) newErrors.earthing = 'Earthing arrangements must be specified';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (!eicrSession) {
      initializeEICR(formData, { name: '', qualification: '' });
    }
    
    onComplete();
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-elec-yellow" />
          Installation Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="address">Installation Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Full property address including postcode"
              className={`bg-elec-dark border-elec-yellow/20 ${errors.address ? 'border-red-500' : ''}`}
              rows={3}
            />
            {errors.address && <p className="text-sm text-red-400 mt-1">{errors.address}</p>}
          </div>

          <div>
            <Label htmlFor="description">Installation Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="e.g., Domestic dwelling, Commercial office, etc."
              className={`bg-elec-dark border-elec-yellow/20 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-sm text-red-400 mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estimatedAge">Estimated Age</Label>
              <Select value={formData.estimatedAge} onValueChange={(value) => handleInputChange('estimatedAge', value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-5">Less than 5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10-20">10-20 years</SelectItem>
                  <SelectItem value="20-plus">20+ years</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="earthing">Earthing Arrangements *</Label>
              <Select value={formData.earthing} onValueChange={(value) => handleInputChange('earthing', value)}>
                <SelectTrigger className={`bg-elec-dark border-elec-yellow/20 ${errors.earthing ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Select earthing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
              {errors.earthing && <p className="text-sm text-red-400 mt-1">{errors.earthing}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="supply">Supply Characteristics</Label>
            <Input
              id="supply"
              value={formData.supply}
              onChange={(e) => handleInputChange('supply', e.target.value)}
              className="bg-elec-dark border-elec-yellow/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mainSwitch">Main Switch Rating (A)</Label>
              <Input
                id="mainSwitch"
                type="number"
                value={formData.mainSwitch}
                onChange={(e) => handleInputChange('mainSwitch', e.target.value)}
                placeholder="100"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="mainEarth">Main Earthing Conductor (mm²)</Label>
              <Input
                id="mainEarth"
                type="number"
                value={formData.mainEarth}
                onChange={(e) => handleInputChange('mainEarth', e.target.value)}
                placeholder="16"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div>
              <Label htmlFor="mainBonding">Main Bonding Conductors (mm²)</Label>
              <Input
                id="mainBonding"
                value={formData.mainBonding}
                onChange={(e) => handleInputChange('mainBonding', e.target.value)}
                placeholder="10"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="alterations"
              checked={formData.alterations}
              onCheckedChange={(checked) => handleInputChange('alterations', checked)}
            />
            <Label htmlFor="alterations">Evidence of alterations or additions since original installation</Label>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Save className="h-4 w-4 mr-2" />
          Save Installation Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EICRStepInstallationDetails;
