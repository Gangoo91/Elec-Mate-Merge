
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, User, Building, Clock } from 'lucide-react';
import { ReportType } from './DigitalEICRForm';

interface ReportTypeSelectorProps {
  selectedType: ReportType;
  onTypeSelect: (type: ReportType) => void;
  formData: any;
  onFormDataChange: (data: any) => void;
}

const ReportTypeSelector = ({ selectedType, onTypeSelect, formData, onFormDataChange }: ReportTypeSelectorProps) => {
  const reportTypes = [
    {
      id: 'eicr' as ReportType,
      title: 'EICR - Electrical Installation Condition Report',
      description: 'Periodic inspection and testing of existing electrical installations',
      duration: '2-4 hours',
      requirements: ['BS 7671:2018+A2:2022', 'IET Guidance Note 3', '18th Edition compliance'],
    },
    {
      id: 'initial-verification' as ReportType,
      title: 'Initial Verification',
      description: 'Testing and inspection of new electrical installations before first use',
      duration: '3-6 hours',
      requirements: ['BS 7671:2018+A2:2022', 'IET Guidance Note 3', 'Complete installation testing'],
    },
    {
      id: 'minor-works' as ReportType,
      title: 'Minor Electrical Installation Works Certificate',
      description: 'Simple additions or alterations to existing installations',
      duration: '30-60 minutes',
      requirements: ['BS 7671:2018+A2:2022', 'Limited testing required'],
    },
  ];

  const updateFormData = (field: string, value: any) => {
    onFormDataChange((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateInstallation = (field: string, value: string) => {
    onFormDataChange((prev: any) => ({
      ...prev,
      installation: {
        ...prev.installation,
        [field]: value,
      },
    }));
  };

  const updateInspector = (field: string, value: string) => {
    onFormDataChange((prev: any) => ({
      ...prev,
      inspector: {
        ...prev.inspector,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Select Report Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reportTypes.map((type) => (
            <div
              key={type.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedType === type.id
                  ? 'border-elec-yellow bg-elec-yellow/10'
                  : 'border-elec-yellow/20 hover:border-elec-yellow/40'
              }`}
              onClick={() => onTypeSelect(type.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{type.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {type.duration}
                  </Badge>
                  {selectedType === type.id && (
                    <Badge className="bg-elec-yellow text-black">Selected</Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {type.requirements.map((req, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Installation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Installation Address *</Label>
              <Textarea
                id="address"
                value={formData.installation.address}
                onChange={(e) => updateInstallation('address', e.target.value)}
                placeholder="Full installation address including postcode..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Installation Description *</Label>
              <Textarea
                id="description"
                value={formData.installation.description}
                onChange={(e) => updateInstallation('description', e.target.value)}
                placeholder="Type and use of installation..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="age">Estimated Age</Label>
              <Input
                id="age"
                value={formData.installation.age}
                onChange={(e) => updateInstallation('age', e.target.value)}
                placeholder="e.g., 15-20 years"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="earthing">Earthing System</Label>
              <Select
                value={formData.installation.earthingSystem}
                onValueChange={(value) => updateInstallation('earthingSystem', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select earthing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S (Separate earth)</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TT">TT (Earth electrode)</SelectItem>
                  <SelectItem value="IT">IT (Isolated)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supply">Supply Type</Label>
              <Select
                value={formData.installation.supply}
                onValueChange={(value) => updateInstallation('supply', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single-phase">Single-phase (230V)</SelectItem>
                  <SelectItem value="three-phase">Three-phase (400V)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspector Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-elec-yellow" />
            Inspector Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inspector-name">Name *</Label>
              <Input
                id="inspector-name"
                value={formData.inspector.name}
                onChange={(e) => updateInspector('name', e.target.value)}
                placeholder="Full name"
                className="bg-elec-dark border-elec-yellow/20"
                required
              />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification *</Label>
              <Select
                value={formData.inspector.qualification}
                onValueChange={(value) => updateInspector('qualification', value)}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="City & Guilds 2391-52">City & Guilds 2391-52</SelectItem>
                  <SelectItem value="City & Guilds 2394/2395">City & Guilds 2394/2395</SelectItem>
                  <SelectItem value="EAL 600/4338/4">EAL 600/4338/4</SelectItem>
                  <SelectItem value="NICEIC Qualified">NICEIC Qualified</SelectItem>
                  <SelectItem value="NAPIT Qualified">NAPIT Qualified</SelectItem>
                  <SelectItem value="STROMA Qualified">STROMA Qualified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="registration">Registration Number</Label>
              <Input
                id="registration"
                value={formData.inspector.registration}
                onChange={(e) => updateInspector('registration', e.target.value)}
                placeholder="NICEIC/NAPIT/STROMA etc. number"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="organisation">Organisation</Label>
              <Input
                id="organisation"
                value={formData.inspector.organisation}
                onChange={(e) => updateInspector('organisation', e.target.value)}
                placeholder="Company or organisation name"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportTypeSelector;
