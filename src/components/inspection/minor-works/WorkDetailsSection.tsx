import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, MapPin, User, FileText, AlertTriangle, Shield, Zap } from 'lucide-react';

interface WorkDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const workTypeCategories = {
  addition: {
    label: 'Addition of New Circuit',
    subcategories: [
      'New socket outlet circuit',
      'New lighting circuit',
      'New cooker circuit',
      'New shower circuit',
      'New outdoor circuit',
    ],
  },
  alteration: {
    label: 'Alteration to Existing Circuit',
    subcategories: [
      'Circuit extension',
      'Change of protective device',
      'Cable route alteration',
      'Load increase modification',
    ],
  },
  replacement: {
    label: 'Replacement Work',
    subcategories: [
      'Like-for-like accessory replacement',
      'Consumer unit replacement',
      'Cable replacement',
      'Protective device replacement',
    ],
  },
  accessory: {
    label: 'Accessory Installation',
    subcategories: [
      'Additional socket outlets',
      'Additional lighting points',
      'Switches and controls',
      'Outdoor installations',
    ],
  },
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
                  className="text-base touch-manipulation min-h-[120px]"
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
                  className="h-11 text-base touch-manipulation"
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
                    className="h-11 text-base touch-manipulation pl-10"
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
                  className="h-11 text-base touch-manipulation"
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
              <Select
                value={formData.workType || ''}
                onValueChange={(value) => {
                  onUpdate('workType', value);
                  onUpdate('workSubcategory', ''); // Reset subcategory
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary work category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(workTypeCategories).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCategory && (
              <div>
                <Label htmlFor="workSubcategory" className="text-sm font-medium">
                  Specific Work Type *
                </Label>
                <Select
                  value={formData.workSubcategory || ''}
                  onValueChange={(value) => onUpdate('workSubcategory', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specific work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory.subcategories.map((sub, index) => (
                      <SelectItem key={index} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              className="text-base touch-manipulation min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* BS 7671 Compliance Details - IET Required */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            BS 7671 Compliance Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="departuresFromBs7671" className="text-sm font-medium">
              Details of any departures from BS 7671:2018 (Reg 120.3, 133.1.3 and 133.5)
            </Label>
            <Textarea
              id="departuresFromBs7671"
              placeholder="Enter details of any departures from BS 7671, or state 'None' if not applicable..."
              value={formData.departuresFromBs7671 || ''}
              onChange={(e) => onUpdate('departuresFromBs7671', e.target.value)}
              className="min-h-[120px] touch-manipulation text-base"
            />
          </div>

          <div>
            <Label htmlFor="permittedExceptions" className="text-sm font-medium">
              Details of permitted exceptions (Regulation 411.3.3)
            </Label>
            <Textarea
              id="permittedExceptions"
              placeholder="Enter details of any permitted exceptions under Reg 411.3.3, or state 'None' if not applicable..."
              value={formData.permittedExceptions || ''}
              onChange={(e) => onUpdate('permittedExceptions', e.target.value)}
              className="min-h-[120px] touch-manipulation text-base"
            />
          </div>

          <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-muted/30">
            <Checkbox
              id="riskAssessmentAttached"
              checked={formData.riskAssessmentAttached || false}
              onCheckedChange={(checked) => onUpdate('riskAssessmentAttached', checked)}
              className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
            />
            <Label
              htmlFor="riskAssessmentAttached"
              className="text-base font-medium cursor-pointer"
            >
              Risk assessment attached
            </Label>
          </div>

          <div>
            <Label htmlFor="commentsOnExistingInstallation" className="text-sm font-medium">
              Comments on existing installation (Regulation 644.1.2)
            </Label>
            <Textarea
              id="commentsOnExistingInstallation"
              placeholder="Enter any comments regarding the condition of the existing installation that may affect the safety of the new work..."
              value={formData.commentsOnExistingInstallation || ''}
              onChange={(e) => onUpdate('commentsOnExistingInstallation', e.target.value)}
              className="min-h-[120px] touch-manipulation text-base"
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
                className="h-11 text-base touch-manipulation"
              />
            </div>

            <div>
              <Label htmlFor="supplyVoltage" className="text-sm font-medium">
                Supply Voltage
              </Label>
              <Select
                value={formData.supplyVoltage || ''}
                onValueChange={(value) => onUpdate('supplyVoltage', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select voltage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230V">230V Single Phase</SelectItem>
                  <SelectItem value="400V">400V Three Phase</SelectItem>
                  <SelectItem value="110V">110V Reduced Low Voltage</SelectItem>
                </SelectContent>
              </Select>
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
                className="h-11 text-base touch-manipulation"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="earthingArrangement" className="text-sm font-medium">
                Earthing Arrangement *
              </Label>
              <Select
                value={formData.earthingArrangement || ''}
                onValueChange={(value) => onUpdate('earthingArrangement', value)}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select earthing system" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S (Separate neutral and earth)</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME/CNE)</SelectItem>
                  <SelectItem value="TT">TT (Earth electrode)</SelectItem>
                  <SelectItem value="IT">IT (Isolated/impedance earthed)</SelectItem>
                </SelectContent>
              </Select>
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
                className="h-11 touch-manipulation text-base"
              />
            </div>
          </div>

          {/* Earthing & Bonding - IET Part 2 */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h4 className="font-semibold text-sm">Earthing & Bonding (Reg 132.16)</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zdb" className="text-sm font-medium">
                  Zdb - Earth fault loop impedance at DB (Ω)
                </Label>
                <Input
                  id="zdb"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 0.35"
                  value={formData.zdb || ''}
                  onChange={(e) => onUpdate('zdb', e.target.value)}
                  className="h-11 touch-manipulation text-base"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Earth fault loop impedance measured at the distribution board
                </p>
              </div>

              <div className="flex items-center space-x-3 p-4 min-h-[48px] rounded-lg bg-muted/30 self-start">
                <Checkbox
                  id="earthingConductorPresent"
                  checked={formData.earthingConductorPresent || false}
                  onCheckedChange={(checked) => onUpdate('earthingConductorPresent', checked)}
                  className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                />
                <Label
                  htmlFor="earthingConductorPresent"
                  className="text-base font-medium cursor-pointer"
                >
                  Earthing conductor present
                </Label>
              </div>
            </div>

            {/* Main Protective Bonding */}
            <div className="mt-4">
              <Label className="text-sm font-medium mb-2 block">
                Main protective bonding conductor(s) to:
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                <div className="flex items-center space-x-2 p-3 min-h-[44px] rounded-lg bg-muted/30">
                  <Checkbox
                    id="bondingWater"
                    checked={formData.bondingWater || false}
                    onCheckedChange={(checked) => onUpdate('bondingWater', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="bondingWater" className="text-sm font-medium cursor-pointer">
                    Water
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 min-h-[44px] rounded-lg bg-muted/30">
                  <Checkbox
                    id="bondingGas"
                    checked={formData.bondingGas || false}
                    onCheckedChange={(checked) => onUpdate('bondingGas', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="bondingGas" className="text-sm font-medium cursor-pointer">
                    Gas
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 min-h-[44px] rounded-lg bg-muted/30">
                  <Checkbox
                    id="bondingOil"
                    checked={formData.bondingOil || false}
                    onCheckedChange={(checked) => onUpdate('bondingOil', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="bondingOil" className="text-sm font-medium cursor-pointer">
                    Oil
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 min-h-[44px] rounded-lg bg-muted/30">
                  <Checkbox
                    id="bondingSteel"
                    checked={formData.bondingSteel || false}
                    onCheckedChange={(checked) => onUpdate('bondingSteel', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="bondingSteel" className="text-sm font-medium cursor-pointer">
                    Steel
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-3 min-h-[44px] rounded-lg bg-muted/30">
                  <Checkbox
                    id="bondingOther"
                    checked={formData.bondingOther || false}
                    onCheckedChange={(checked) => onUpdate('bondingOther', checked)}
                    className="h-5 w-5 border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow touch-manipulation"
                  />
                  <Label htmlFor="bondingOther" className="text-sm font-medium cursor-pointer">
                    Other
                  </Label>
                </div>
              </div>
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
              <Select
                value={formData.partPRequired || ''}
                onValueChange={(value) => onUpdate('partPRequired', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select requirement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes - Notifiable work</SelectItem>
                  <SelectItem value="no">No - Non-notifiable work</SelectItem>
                  <SelectItem value="self-cert">Self-certification scheme</SelectItem>
                </SelectContent>
              </Select>
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
                  className="h-11 text-base touch-manipulation"
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
                Work covered under competent person self-certification scheme. Building control
                notification will be handled automatically.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkDetailsSection;
