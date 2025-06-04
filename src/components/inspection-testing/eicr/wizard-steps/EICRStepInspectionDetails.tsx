
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Search } from 'lucide-react';
import { useEICR } from '@/contexts/EICRContext';

interface EICRStepInspectionDetailsProps {
  onComplete: () => void;
}

const EICRStepInspectionDetails = ({ onComplete }: EICRStepInspectionDetailsProps) => {
  const { eicrSession } = useEICR();
  
  const [formData, setFormData] = useState({
    extentOfInspection: '100% visual inspection, sample testing of circuits',
    limitations: '',
    departures: '',
    riskAssessment: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (eicrSession?.eicr_report?.inspection_details) {
      const details = eicrSession.eicr_report.inspection_details;
      setFormData({
        extentOfInspection: details.extent_of_inspection || '100% visual inspection, sample testing of circuits',
        limitations: details.limitations?.join(', ') || '',
        departures: details.departures_from_bs7671?.join(', ') || '',
        riskAssessment: details.risk_assessment_required || false,
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
    
    if (!formData.extentOfInspection.trim()) {
      newErrors.extentOfInspection = 'Extent of inspection must be specified';
    }
    
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
          <Search className="h-5 w-5 text-elec-yellow" />
          Inspection Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="extentOfInspection">Extent of Inspection *</Label>
            <Textarea
              id="extentOfInspection"
              value={formData.extentOfInspection}
              onChange={(e) => handleInputChange('extentOfInspection', e.target.value)}
              placeholder="Describe the scope of inspection performed"
              className={`bg-elec-dark border-elec-yellow/20 ${errors.extentOfInspection ? 'border-red-500' : ''}`}
              rows={3}
            />
            {errors.extentOfInspection && <p className="text-sm text-red-400 mt-1">{errors.extentOfInspection}</p>}
          </div>

          <div>
            <Label htmlFor="limitations">Limitations</Label>
            <Textarea
              id="limitations"
              value={formData.limitations}
              onChange={(e) => handleInputChange('limitations', e.target.value)}
              placeholder="Any areas not inspected or tested (e.g., under floors, behind fixed furniture)"
              className="bg-elec-dark border-elec-yellow/20"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              List any parts of the installation that could not be inspected
            </p>
          </div>

          <div>
            <Label htmlFor="departures">Departures from BS 7671</Label>
            <Textarea
              id="departures"
              value={formData.departures}
              onChange={(e) => handleInputChange('departures', e.target.value)}
              placeholder="Any identified departures from current wiring regulations"
              className="bg-elec-dark border-elec-yellow/20"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Note any non-compliance with BS 7671 wiring regulations
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="riskAssessment"
              checked={formData.riskAssessment}
              onCheckedChange={(checked) => handleInputChange('riskAssessment', checked)}
            />
            <Label htmlFor="riskAssessment">Risk assessment required for this installation</Label>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="font-medium text-blue-200 mb-2">Inspection Guidance</h4>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Visual inspection should cover accessible parts of the installation</li>
            <li>• Testing should include a representative sample of circuits</li>
            <li>• Document any areas that could not be inspected due to access limitations</li>
            <li>• Note any departures from current BS 7671 requirements</li>
          </ul>
        </div>

        <Button onClick={handleSave} className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Save className="h-4 w-4 mr-2" />
          Save Inspection Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default EICRStepInspectionDetails;
