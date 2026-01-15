
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar, ChevronDown, ChevronRight, Building, Clock, Settings, MapPin, CheckCircle2 } from 'lucide-react';
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

const InstallationDetailsSection: React.FC<InstallationDetailsSectionProps> = ({ formData, onUpdate }) => {
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
      timeline: ['constructionDate']
    };
    
    const fields = requiredFields[sectionId] || [];
    return fields.every(field => formData[field]);
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
      isComplete: getSectionCompletion('basic')
    },
    {
      id: 'technical',
      title: 'Technical Details',
      icon: <Settings className="h-4 w-4" />,
      fields: ['numberOfCircuits', 'installationMethod'],
      isComplete: getSectionCompletion('technical')
    },
    {
      id: 'environment',
      title: 'Environment & Location',
      icon: <MapPin className="h-4 w-4" />,
      fields: ['locationType'],
      isComplete: getSectionCompletion('environment')
    },
    {
      id: 'timeline',
      title: 'Timeline & Age',
      icon: <Clock className="h-4 w-4" />,
      fields: ['constructionDate'],
      isComplete: getSectionCompletion('timeline')
    }
  ];

  const completedSections = sections.filter(s => s.isComplete).length;
  const totalSections = sections.length;

  return (
    <Card className="elec-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Installation Details
          </CardTitle>
          <Badge variant={completedSections === totalSections ? "default" : "secondary"} className="text-xs">
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
                  {section.isComplete && (
                    <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                  )}
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
                      <Label htmlFor="installationType" className="text-sm font-medium flex items-center gap-1">
                        Installation Type *
                        <span className="text-destructive">*</span>
                      </Label>
                      <MobileSelectPicker
                        value={formData.installationType || ''}
                        onValueChange={(value) => onUpdate('installationType', value)}
                        options={[
                          { value: 'domestic', label: 'Domestic Dwelling' },
                          { value: 'commercial', label: 'Commercial Premises' },
                          { value: 'industrial', label: 'Industrial Installation' },
                          { value: 'agricultural', label: 'Agricultural Building' },
                          { value: 'temporary', label: 'Temporary Installation' },
                          { value: 'other', label: 'Other (Specify in Notes)' },
                        ]}
                        placeholder="Select installation type"
                        title="Installation Type"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="installationDate" className="text-sm font-medium flex items-center gap-1">
                        Installation Date *
                        <span className="text-destructive">*</span>
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
                      <MobileSelectPicker
                        value={formData.installationPurpose || ''}
                        onValueChange={(value) => onUpdate('installationPurpose', value)}
                        options={[
                          { value: 'lighting', label: 'Lighting Circuits' },
                          { value: 'power', label: 'Power Circuits' },
                          { value: 'heating', label: 'Heating Systems' },
                          { value: 'mixed', label: 'Mixed Installation' },
                          { value: 'specialised', label: 'Specialised Equipment' },
                        ]}
                        placeholder="Select purpose"
                        title="Installation Purpose"
                      />
                    </div>
                  </>
                )}

                {section.id === 'technical' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfCircuits" className="text-sm font-medium flex items-center gap-1">
                        Number of Circuits *
                        <span className="text-destructive">*</span>
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
                      <Label htmlFor="installationMethod" className="text-sm font-medium flex items-center gap-1">
                        Installation Method *
                        <span className="text-destructive">*</span>
                      </Label>
                      <MobileSelectPicker
                        value={formData.installationMethod || ''}
                        onValueChange={(value) => onUpdate('installationMethod', value)}
                        options={[
                          { value: 'surface', label: 'Surface Mounted' },
                          { value: 'concealed', label: 'Concealed/Embedded' },
                          { value: 'mixed', label: 'Mixed Methods' },
                          { value: 'conduit', label: 'Conduit System' },
                          { value: 'trunking', label: 'Trunking System' },
                        ]}
                        placeholder="Select method"
                        title="Installation Method"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="installationExtent" className="text-sm font-medium">
                        Installation Extent
                      </Label>
                      <MobileSelectPicker
                        value={formData.installationExtent || ''}
                        onValueChange={(value) => onUpdate('installationExtent', value)}
                        options={[
                          { value: 'complete', label: 'Complete Installation (100%)' },
                          { value: 'partial', label: 'Partial Installation' },
                          { value: 'sample', label: 'Sample Testing Only' },
                          { value: 'specific', label: 'Specific Areas Only' },
                        ]}
                        placeholder="Select extent"
                        title="Installation Extent"
                      />
                    </div>
                  </>
                )}

                {section.id === 'environment' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="locationType" className="text-sm font-medium flex items-center gap-1">
                        Location Type *
                        <span className="text-destructive">*</span>
                      </Label>
                      <MobileSelectPicker
                        value={formData.locationType || ''}
                        onValueChange={(value) => onUpdate('locationType', value)}
                        options={[
                          { value: 'indoor-dry', label: 'Indoor - Dry Conditions' },
                          { value: 'indoor-damp', label: 'Indoor - Damp Conditions' },
                          { value: 'outdoor', label: 'Outdoor Installation' },
                          { value: 'bathroom', label: 'Bathroom/Wet Room' },
                          { value: 'kitchen', label: 'Kitchen Areas' },
                          { value: 'garage', label: 'Garage/Outbuilding' },
                          { value: 'special', label: 'Special Location (BS 7671 Part 7)' },
                        ]}
                        placeholder="Select location"
                        title="Location Type"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="environmentalConditions" className="text-sm font-medium">
                        Environmental Conditions
                      </Label>
                      <MobileSelectPicker
                        value={formData.environmentalConditions || ''}
                        onValueChange={(value) => onUpdate('environmentalConditions', value)}
                        options={[
                          { value: 'normal', label: 'Normal Conditions' },
                          { value: 'dusty', label: 'Dusty Environment' },
                          { value: 'corrosive', label: 'Corrosive Atmosphere' },
                          { value: 'high-temp', label: 'High Temperature' },
                          { value: 'vibration', label: 'Subject to Vibration' },
                          { value: 'mechanical-damage', label: 'Risk of Mechanical Damage' },
                        ]}
                        placeholder="Select conditions"
                        title="Environmental Conditions"
                      />
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
                        className="min-h-[80px] resize-none"
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
                      <MobileSelectPicker
                        value={formData.previousRecords || ''}
                        onValueChange={(value) => onUpdate('previousRecords', value)}
                        options={[
                          { value: 'yes-complete', label: 'Yes - Complete Records' },
                          { value: 'yes-partial', label: 'Yes - Partial Records' },
                          { value: 'no', label: 'No Records Available' },
                          { value: 'unknown', label: 'Unknown' },
                        ]}
                        placeholder="Select availability"
                        title="Previous Records Available"
                      />
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
