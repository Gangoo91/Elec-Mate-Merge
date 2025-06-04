
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, User } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';

interface EICRStepInspectorDetailsProps {
  onComplete: () => void;
}

const EICRStepInspectorDetails = ({ onComplete }: EICRStepInspectorDetailsProps) => {
  const { eicrSession } = useEICR();
  
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eicrSession?.eicr_report?.inspector_details) {
      const details = eicrSession.eicr_report.inspector_details;
      setFormData({
        name: details.name || '',
        qualification: details.qualification || '',
      });
    }
  }, [eicrSession]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Inspector name is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onComplete();
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-elec-yellow" />
          Inspector Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Inspector Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Full name of the competent person"
              className={`bg-elec-dark border-elec-yellow/20 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="qualification">Qualification *</Label>
            <Input
              id="qualification"
              value={formData.qualification}
              onChange={(e) => handleInputChange('qualification', e.target.value)}
              placeholder="e.g., City & Guilds 2391-52, C&G 2391-50"
              className={`bg-elec-dark border-elec-yellow/20 ${errors.qualification ? 'border-red-500' : ''}`}
            />
            {errors.qualification && <p className="text-sm text-red-400 mt-1">{errors.qualification}</p>}
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h4 className="font-medium text-green-200 mb-2">Competency Requirements</h4>
          <ul className="text-sm text-green-300 space-y-1">
            <li>• Must be electrically competent for EICR work</li>
            <li>• Appropriate qualifications (e.g., C&G 2391-52)</li>
            <li>• Current knowledge of BS 7671 wiring regulations</li>
            <li>• Experience in inspection and testing procedures</li>
          </ul>
        </div>

        <Button onClick={handleSave} className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Save className="h-4 w-4 mr-2" />
          Save Inspector Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EICRStepInspectorDetails;
