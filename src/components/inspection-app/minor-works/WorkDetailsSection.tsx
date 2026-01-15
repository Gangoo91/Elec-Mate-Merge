import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, FileText, AlertTriangle } from 'lucide-react';

interface WorkDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const workTypeCategories = {
  'addition': {
    label: 'Addition of New Circuit',
    subcategories: [
      'New socket outlet circuit',
      'New lighting circuit',
      'New cooker circuit',
      'New shower circuit',
      'New outdoor circuit'
    ]
  },
  'alteration': {
    label: 'Alteration to Existing Circuit',
    subcategories: [
      'Circuit extension',
      'Change of protective device',
      'Cable route alteration',
      'Load increase modification'
    ]
  },
  'replacement': {
    label: 'Replacement Work',
    subcategories: [
      'Like-for-like accessory replacement',
      'Consumer unit replacement',
      'Cable replacement',
      'Protective device replacement'
    ]
  },
  'accessory': {
    label: 'Accessory Installation',
    subcategories: [
      'Additional socket outlets',
      'Additional lighting points',
      'Switches and controls',
      'Outdoor installations'
    ]
  }
};

const WorkDetailsSection = ({ formData, onUpdate }: WorkDetailsSectionProps) => {
  const selectedCategory = workTypeCategories[formData.workType as keyof typeof workTypeCategories];

  return (
    <div className="space-y-6">
      {/* Installation Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5 text-primary" />
            Installation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="propertyAddress" className="text-sm font-medium">
                  Property Address *
                </Label>
                <Textarea
                  id="propertyAddress"
                  placeholder="Enter complete property address including postcode"
                  value={formData.propertyAddress || ''}
                  onChange={(e) => onUpdate('propertyAddress', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="clientName" className="text-sm font-medium">
                  Client Name *
                </Label>
                <Input
                  id="clientName"
                  placeholder="Client or responsible person"
                  value={formData.clientName || ''}
                  onChange={(e) => onUpdate('clientName', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="workDate" className="text-sm font-medium">
                  Date of Work *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="workDate"
                    type="date"
                    value={formData.workDate || ''}
                    onChange={(e) => onUpdate('workDate', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="workOrderNumber" className="text-sm font-medium">
                  Work Order Number
                </Label>
                <Input
                  id="workOrderNumber"
                  placeholder="Internal reference number"
                  value={formData.workOrderNumber || ''}
                  onChange={(e) => onUpdate('workOrderNumber', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Classification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Work Classification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <Label htmlFor="workType" className="text-sm font-medium">
                Primary Work Category *
              </Label>
              <MobileSelectPicker
                value={formData.workType || ''}
                onValueChange={(value) => {
                  onUpdate('workType', value);
                  onUpdate('workSubcategory', ''); // Reset subcategory
                }}
                options={Object.entries(workTypeCategories).map(([key, category]) => ({
                  value: key,
                  label: category.label,
                }))}
                placeholder="Select primary work category"
                title="Primary Work Category"
              />
            </div>

            {selectedCategory && (
              <div>
                <Label htmlFor="workSubcategory" className="text-sm font-medium">
                  Specific Work Type *
                </Label>
                <MobileSelectPicker
                  value={formData.workSubcategory || ''}
                  onValueChange={(value) => onUpdate('workSubcategory', value)}
                  options={selectedCategory.subcategories.map((sub) => ({
                    value: sub,
                    label: sub,
                  }))}
                  placeholder="Select specific work type"
                  title="Specific Work Type"
                />
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="workDescription" className="text-sm font-medium">
              Detailed Description of Work *
            </Label>
              <Textarea
                id="workDescription"
                placeholder="Provide comprehensive description including locations, quantities, and specific details..."
                value={formData.workDescription || ''}
                onChange={(e) => onUpdate('workDescription', e.target.value)}
              />
          </div>
        </CardContent>
      </Card>

      {/* Circuit Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Circuit & Supply Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="circuitDesignation" className="text-sm font-medium">
                Circuit Designation
              </Label>
              <Input
                id="circuitDesignation"
                placeholder="e.g., Ring Main - Ground Floor"
                value={formData.circuitDesignation || ''}
                onChange={(e) => onUpdate('circuitDesignation', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="supplyVoltage" className="text-sm font-medium">
                Supply Voltage
              </Label>
              <MobileSelectPicker
                value={formData.supplyVoltage || ''}
                onValueChange={(value) => onUpdate('supplyVoltage', value)}
                options={[
                  { value: '230V', label: '230V Single Phase' },
                  { value: '400V', label: '400V Three Phase' },
                  { value: '110V', label: '110V Reduced Low Voltage' },
                ]}
                placeholder="Select voltage"
                title="Supply Voltage"
              />
            </div>
            
            <div>
              <Label htmlFor="frequency" className="text-sm font-medium">
                Frequency
              </Label>
              <Input
                id="frequency"
                placeholder="50 Hz"
                value={formData.frequency || '50'}
                onChange={(e) => onUpdate('frequency', e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="earthingArrangement" className="text-sm font-medium">
                Earthing Arrangement *
              </Label>
              <MobileSelectPicker
                value={formData.earthingArrangement || ''}
                onValueChange={(value) => onUpdate('earthingArrangement', value)}
                options={[
                  { value: 'TN-S', label: 'TN-S (Separate neutral and earth)' },
                  { value: 'TN-C-S', label: 'TN-C-S (PME/CNE)' },
                  { value: 'TT', label: 'TT (Earth electrode)' },
                  { value: 'IT', label: 'IT (Isolated/impedance earthed)' },
                ]}
                placeholder="Select earthing system"
                title="Earthing Arrangement"
              />
            </div>
            
            <div>
              <Label htmlFor="supplyCharacteristics" className="text-sm font-medium">
                Supply Characteristics
              </Label>
              <Input
                id="supplyCharacteristics"
                placeholder="e.g., AC, 50Hz, 230/400V"
                value={formData.supplyCharacteristics || ''}
                onChange={(e) => onUpdate('supplyCharacteristics', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part P Notification Requirements */}
      <Card className="border-amber-200 bg-amber-50/30 dark:border-amber-800 dark:bg-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-amber-700 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
            Building Regulations (Part P)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="partPRequired" className="text-sm font-medium">
                Part P Notification Required
              </Label>
              <MobileSelectPicker
                value={formData.partPRequired || ''}
                onValueChange={(value) => onUpdate('partPRequired', value)}
                options={[
                  { value: 'yes', label: 'Yes - Notifiable work' },
                  { value: 'no', label: 'No - Non-notifiable work' },
                  { value: 'self-cert', label: 'Self-certification scheme' },
                ]}
                placeholder="Select requirement"
                title="Part P Notification"
              />
            </div>
            
            {formData.partPRequired === 'yes' && (
              <div>
                <Label htmlFor="buildingControl" className="text-sm font-medium">
                  Building Control Authority
                </Label>
                <Input
                  id="buildingControl"
                  placeholder="Local authority or approved inspector"
                  value={formData.buildingControl || ''}
                  onChange={(e) => onUpdate('buildingControl', e.target.value)}
                />
              </div>
            )}
          </div>
          
          {formData.partPRequired === 'self-cert' && (
            <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <Badge variant="secondary" className="mb-2">
                Self-Certification Scheme
              </Badge>
              <p className="text-sm text-green-700 dark:text-green-400">
                Work covered under competent person self-certification scheme. 
                Building control notification will be handled automatically.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkDetailsSection;