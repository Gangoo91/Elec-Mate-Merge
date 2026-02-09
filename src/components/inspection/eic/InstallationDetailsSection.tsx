import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Building,
  Clock,
  Settings,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import DateInputWithToday from './DateInputWithToday';
import { cn } from '@/lib/utils';

interface InstallationDetailsSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

interface SectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  fields: string[];
  isComplete: boolean;
}

const InstallationDetailsSection: React.FC<InstallationDetailsSectionProps> = ({
  formData,
  onUpdate,
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['basic']));

  // Calculate installation age
  const calculateAge = () => {
    if (formData.constructionDate && formData.installationDate) {
      const construction = new Date(formData.constructionDate);
      const installation = new Date(formData.installationDate);
      const years = installation.getFullYear() - construction.getFullYear();
      onUpdate('estimatedAge', years > 0 ? years : 0);
    }
  };

  // Quick date actions
  const setQuickDate = (field: string, yearsAgo: number) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - yearsAgo);
    onUpdate(field, date.toISOString().split('T')[0]);
  };

  // Check section completion
  const getSectionCompletion = (sectionId: string): boolean => {
    const requiredFields: Record<string, string[]> = {
      basic: ['installationType', 'installationDate'],
      technical: ['numberOfCircuits', 'installationMethod'],
      environment: ['locationType'],
      timeline: ['constructionDate'],
    };

    const fields = requiredFields[sectionId] || [];
    return fields.every((field) => formData[field]);
  };

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(sectionId)) {
      newOpenSections.delete(sectionId);
    } else {
      newOpenSections.add(sectionId);
    }
    setOpenSections(newOpenSections);
  };

  const sections: SectionData[] = [
    {
      id: 'basic',
      title: 'Basic Installation Info',
      icon: <Building className="h-4 w-4" />,
      fields: ['installationType', 'installationDate'],
      isComplete: getSectionCompletion('basic'),
    },
    {
      id: 'technical',
      title: 'Technical Details',
      icon: <Settings className="h-4 w-4" />,
      fields: ['numberOfCircuits', 'installationMethod'],
      isComplete: getSectionCompletion('technical'),
    },
    {
      id: 'environment',
      title: 'Environment & Location',
      icon: <MapPin className="h-4 w-4" />,
      fields: ['locationType'],
      isComplete: getSectionCompletion('environment'),
    },
    {
      id: 'timeline',
      title: 'Timeline & Age',
      icon: <Clock className="h-4 w-4" />,
      fields: ['constructionDate'],
      isComplete: getSectionCompletion('timeline'),
    },
  ];

  const completedSections = sections.filter((s) => s.isComplete).length;
  const totalSections = sections.length;

  return (
    <Card className="elec-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Installation Details
          </CardTitle>
          <Badge
            variant={completedSections === totalSections ? 'default' : 'secondary'}
            className="text-xs"
          >
            {completedSections}/{totalSections} Complete
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div
            className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSections / totalSections) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {sections.map((section) => (
          <Collapsible
            key={section.id}
            open={openSections.has(section.id)}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between w-full p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span className="font-medium text-sm">{section.title}</span>
                  {section.isComplete && <CheckCircle2 className="h-4 w-4 text-elec-yellow" />}
                </div>
                {openSections.has(section.id) ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pl-6">
                {section.id === 'basic' && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="installationType"
                        className="text-sm font-medium flex items-center gap-1"
                      >
                        Installation Type *<span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.installationType || ''}
                        onValueChange={(value) => onUpdate('installationType', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select installation type" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                          <SelectItem value="domestic">Domestic Dwelling</SelectItem>
                          <SelectItem value="commercial">Commercial Premises</SelectItem>
                          <SelectItem value="industrial">Industrial Installation</SelectItem>
                          <SelectItem value="agricultural">Agricultural Building</SelectItem>
                          <SelectItem value="temporary">Temporary Installation</SelectItem>
                          <SelectItem value="other">Other (Specify in Notes)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="installationDate"
                        className="text-sm font-medium flex items-center gap-1"
                      >
                        Installation Date *<span className="text-destructive">*</span>
                      </Label>
                      <DateInputWithToday
                        id="installationDate"
                        value={formData.installationDate || ''}
                        onChange={(value) => onUpdate('installationDate', value)}
                        placeholder="Select installation date"
                        className="h-11"
                      />
                      <div className="flex gap-1 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-7"
                          onClick={() => setQuickDate('installationDate', 0)}
                        >
                          Today
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-7"
                          onClick={() => setQuickDate('installationDate', 1)}
                        >
                          1yr ago
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-7"
                          onClick={() => setQuickDate('installationDate', 5)}
                        >
                          5yr ago
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="installationPurpose" className="text-sm font-medium">
                        Installation Purpose
                      </Label>
                      <Select
                        value={formData.installationPurpose || ''}
                        onValueChange={(value) => onUpdate('installationPurpose', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                          <SelectItem value="lighting">Lighting Circuits</SelectItem>
                          <SelectItem value="power">Power Circuits</SelectItem>
                          <SelectItem value="heating">Heating Systems</SelectItem>
                          <SelectItem value="mixed">Mixed Installation</SelectItem>
                          <SelectItem value="specialised">Specialised Equipment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {section.id === 'technical' && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="numberOfCircuits"
                        className="text-sm font-medium flex items-center gap-1"
                      >
                        Number of Circuits *<span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="numberOfCircuits"
                        type="number"
                        value={formData.numberOfCircuits || ''}
                        onChange={(e) => onUpdate('numberOfCircuits', e.target.value)}
                        placeholder="e.g., 12"
                        className="h-11"
                        min="1"
                        max="999"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="installationMethod"
                        className="text-sm font-medium flex items-center gap-1"
                      >
                        Installation Method *<span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.installationMethod || ''}
                        onValueChange={(value) => onUpdate('installationMethod', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                          <SelectItem value="surface">Surface Mounted</SelectItem>
                          <SelectItem value="concealed">Concealed/Embedded</SelectItem>
                          <SelectItem value="mixed">Mixed Methods</SelectItem>
                          <SelectItem value="conduit">Conduit System</SelectItem>
                          <SelectItem value="trunking">Trunking System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="installationExtent" className="text-sm font-medium">
                        Installation Extent
                      </Label>
                      <Select
                        value={formData.installationExtent || ''}
                        onValueChange={(value) => onUpdate('installationExtent', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select extent" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                          <SelectItem value="complete">Complete Installation (100%)</SelectItem>
                          <SelectItem value="partial">Partial Installation</SelectItem>
                          <SelectItem value="sample">Sample Testing Only</SelectItem>
                          <SelectItem value="specific">Specific Areas Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {section.id === 'environment' && (
                  <>
                    <div className="space-y-2">
                      <Label
                        htmlFor="locationType"
                        className="text-sm font-medium flex items-center gap-1"
                      >
                        Location Type *<span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.locationType || ''}
                        onValueChange={(value) => onUpdate('locationType', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                          <SelectItem value="indoor-dry">Indoor - Dry Conditions</SelectItem>
                          <SelectItem value="indoor-damp">Indoor - Damp Conditions</SelectItem>
                          <SelectItem value="outdoor">Outdoor Installation</SelectItem>
                          <SelectItem value="bathroom">Bathroom/Wet Room</SelectItem>
                          <SelectItem value="kitchen">Kitchen Areas</SelectItem>
                          <SelectItem value="garage">Garage/Outbuilding</SelectItem>
                          <SelectItem value="special">Special Location (BS 7671 Part 7)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="environmentalConditions" className="text-sm font-medium">
                        Environmental Conditions
                      </Label>
                      <Select
                        value={formData.environmentalConditions || ''}
                        onValueChange={(value) => onUpdate('environmentalConditions', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select conditions" />
                        </SelectTrigger>
                        <SelectContent className="bg-elec-gray border-elec-gray text-foreground z-50">
                          <SelectItem value="normal">Normal Conditions</SelectItem>
                          <SelectItem value="dusty">Dusty Environment</SelectItem>
                          <SelectItem value="corrosive">Corrosive Atmosphere</SelectItem>
                          <SelectItem value="high-temp">High Temperature</SelectItem>
                          <SelectItem value="vibration">Subject to Vibration</SelectItem>
                          <SelectItem value="mechanical-damage">
                            Risk of Mechanical Damage
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accessLimitations" className="text-sm font-medium">
                        Access Limitations
                      </Label>
                      <Textarea
                        id="accessLimitations"
                        value={formData.accessLimitations || ''}
                        onChange={(e) => onUpdate('accessLimitations', e.target.value)}
                        placeholder="Describe any areas not accessible during inspection..."
                        className="text-base touch-manipulation min-h-[120px] resize-none"
                        rows={3}
                      />
                    </div>
                  </>
                )}

                {section.id === 'timeline' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="constructionDate" className="text-sm font-medium">
                        Date of Construction
                      </Label>
                      <DateInputWithToday
                        id="constructionDate"
                        value={formData.constructionDate || ''}
                        onChange={(value) => {
                          onUpdate('constructionDate', value);
                          setTimeout(calculateAge, 100);
                        }}
                        placeholder="Select construction date"
                        className="h-11"
                      />
                      <div className="flex gap-1 mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-7"
                          onClick={() => setQuickDate('constructionDate', 10)}
                        >
                          10yr ago
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-7"
                          onClick={() => setQuickDate('constructionDate', 20)}
                        >
                          20yr ago
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs px-2 py-1 h-7"
                          onClick={() => setQuickDate('constructionDate', 30)}
                        >
                          30yr ago
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedAge" className="text-sm font-medium">
                        Estimated Installation Age
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="estimatedAge"
                          type="number"
                          value={formData.estimatedAge || ''}
                          onChange={(e) => onUpdate('estimatedAge', e.target.value)}
                          placeholder="Years"
                          className="h-11"
                          min="0"
                          max="100"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={calculateAge}
                          className="h-11 px-3"
                        >
                          Calculate
                        </Button>
                      </div>
                      {formData.estimatedAge && parseInt(formData.estimatedAge) > 25 && (
                        <p className="text-amber-600 text-xs mt-1">
                          ⚠️ Older installation - increased inspection requirements may apply
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previousRecords" className="text-sm font-medium">
                        Previous Records Available
                      </Label>
                      <Select
                        value={formData.previousRecords || ''}
                        onValueChange={(value) => onUpdate('previousRecords', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border z-50">
                          <SelectItem value="yes-complete">Yes - Complete Records</SelectItem>
                          <SelectItem value="yes-partial">Yes - Partial Records</SelectItem>
                          <SelectItem value="no">No Records Available</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default InstallationDetailsSection;
