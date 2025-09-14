import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, FileText, MapPin, Users, Clock } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface DetailsStepProps {
  data: MethodStatementData;
  onDataChange: (updates: Partial<MethodStatementData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DetailsStep = ({ data, onDataChange, onNext, onBack }: DetailsStepProps) => {
  const workTypes = [
    'Installation Work',
    'Maintenance',
    'Testing & Inspection',
    'Repair Work',
    'Emergency Response',
    'Upgrade/Modification',
    'Fault Finding',
    'Commissioning'
  ];

  const riskLevels = [
    { value: 'low', label: 'Low Risk', color: 'text-green-300' },
    { value: 'medium', label: 'Medium Risk', color: 'text-yellow-300' },
    { value: 'high', label: 'High Risk', color: 'text-red-300' }
  ];

  const isFormValid = () => {
    return data.jobTitle && data.location && data.contractor && data.supervisor && data.workType;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Method Statement Details
          </CardTitle>
          <p className="text-muted-foreground">
            Provide the basic information for your method statement.
          </p>
        </CardHeader>
      </Card>

      {/* Job Information */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-4">
          <CardTitle className="text-elec-yellow text-lg font-semibold">Job Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Primary Job Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Job Title *
              </Label>
              <Input
                id="jobTitle"
                value={data.jobTitle}
                onChange={(e) => onDataChange({ jobTitle: e.target.value })}
                placeholder="e.g., Consumer Unit Replacement"
                className="h-11"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <MapPin className="h-4 w-4 text-elec-yellow" />
                Site Location *
              </Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => onDataChange({ location: e.target.value })}
                placeholder="Full site address"
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Company and Personnel Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="contractor" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Contractor Company *
              </Label>
              <Input
                id="contractor"
                value={data.contractor}
                onChange={(e) => onDataChange({ contractor: e.target.value })}
                placeholder="Company name"
                className="h-11"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="supervisor" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                Site Supervisor *
              </Label>
              <Input
                id="supervisor"
                value={data.supervisor}
                onChange={(e) => onDataChange({ supervisor: e.target.value })}
                placeholder="Supervisor name"
                className="h-11"
                required
              />
            </div>
          </div>

          {/* Work Type and Duration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="workType" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Type of Work *
              </Label>
              <Select 
                value={data.workType} 
                onValueChange={(value) => onDataChange({ workType: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  {workTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                Estimated Duration
              </Label>
              <Input
                id="duration"
                value={data.duration}
                onChange={(e) => onDataChange({ duration: e.target.value })}
                placeholder="e.g., 2 days"
                className="h-11"
              />
            </div>
          </div>

          {/* Team and Risk Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="teamSize" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                Team Size
              </Label>
              <Input
                id="teamSize"
                value={data.teamSize}
                onChange={(e) => onDataChange({ teamSize: e.target.value })}
                placeholder="Number of personnel"
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="overallRiskLevel" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Overall Risk Level
              </Label>
              <Select 
                value={data.overallRiskLevel} 
                onValueChange={(value: 'low' | 'medium' | 'high') => onDataChange({ overallRiskLevel: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <span className={level.color}>{level.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job Description - Full Width */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <FileText className="h-4 w-4 text-elec-yellow" />
              Job Description
            </Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => onDataChange({ description: e.target.value })}
              placeholder="Provide a detailed description of the work to be carried out"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Review Date */}
          <div className="space-y-2">
            <Label htmlFor="reviewDate" className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <CalendarIcon className="h-4 w-4 text-elec-yellow" />
              Review Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full lg:w-80 h-11 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.reviewDate ? format(new Date(data.reviewDate), 'PPP') : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={data.reviewDate ? new Date(data.reviewDate) : undefined}
                  onSelect={(date) => onDataChange({ reviewDate: date?.toISOString() || '' })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-300">Smart Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Based on your work type, consider these recommendations:
            </p>
            {data.workType === 'Installation Work' && (
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <ul className="text-sm space-y-1">
                  <li>• Ensure Part P notification requirements are met</li>
                  <li>• Consider 18th Edition compliance requirements</li>
                  <li>• Plan for installation testing and certification</li>
                </ul>
              </div>
            )}
            {data.workType === 'Testing & Inspection' && (
              <div className="bg-blue-500/10 p-3 rounded-lg">
                <ul className="text-sm space-y-1">
                  <li>• Ensure testing equipment is calibrated</li>
                  <li>• Plan for safe isolation procedures</li>
                  <li>• Consider EICR reporting requirements</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Validation */}
      {!isFormValid() && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="text-yellow-300 text-sm font-medium">
              Please complete all required fields (*) before proceeding.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Continue Button */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4">
        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          className="flex items-center justify-center gap-2 h-11 w-full sm:w-auto sm:min-w-[160px]"
        >
          Continue to Steps
        </Button>
      </div>
    </div>
  );
};

export default DetailsStep;