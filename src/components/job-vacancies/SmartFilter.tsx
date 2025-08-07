import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Filter, 
  ChevronDown, 
  ChevronUp,
  MapPin, 
  PoundSterling, 
  Award,
  Briefcase,
  User,
  Settings
} from "lucide-react";

export interface SmartFilterData {
  experience: string;
  skills: string[];
  certifications: string[];
  location: string;
  salaryMin: string;
  salaryMax: string;
  jobTypes: string[];
  workMode: string[];
  radius: number;
}

interface SmartFilterProps {
  filters: SmartFilterData;
  onFiltersChange: (filters: SmartFilterData) => void;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

const SmartFilter: React.FC<SmartFilterProps> = ({
  filters,
  onFiltersChange,
  isExpanded = false,
  onToggleExpanded
}) => {
  const [skillInput, setSkillInput] = useState("");

  const commonSkills = [
    "Electrical Installation", "Testing & Inspection", "18th Edition", "PAT Testing",
    "EICR", "Solar Installation", "EV Charging", "Commercial Electrical",
    "Domestic Electrical", "Industrial Electrical", "Maintenance", "Fault Finding"
  ];

  const commonCertifications = [
    "City & Guilds 2365", "City & Guilds 2382-18", "AM2", "JIB Gold Card",
    "NICEIC Approved", "Part P Qualified", "IPAF", "SSSTS"
  ];

  const jobTypes = [
    "Electrician", "Electrical Engineer", "Maintenance Electrician",
    "Electrical Supervisor", "Electrical Tester", "Installation Electrician"
  ];

  const workModes = [
    "On-site", "Remote", "Hybrid", "Travel required", "Local work only"
  ];

  const handleInputChange = (field: keyof SmartFilterData, value: any) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      handleInputChange('skills', [...filters.skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    handleInputChange('skills', filters.skills.filter(s => s !== skill));
  };

  const toggleArrayItem = (field: 'certifications' | 'jobTypes' | 'workMode', item: string) => {
    const currentArray = filters[field];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    handleInputChange(field, newArray);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <div className="p-2 bg-elec-yellow/10 rounded-lg">
              <Filter className="h-4 w-4 text-elec-yellow" />
            </div>
            Smart Filters
          </CardTitle>
          {onToggleExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpanded}
              className="text-muted-foreground hover:text-elec-yellow"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Core Preferences - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <div className="space-y-2">
            <Label className="text-elec-yellow flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              placeholder="e.g. London, Manchester"
              value={filters.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 text-elec-light"
            />
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-elec-yellow flex items-center gap-2">
              <User className="h-4 w-4" />
              Experience
            </Label>
            <Input
              placeholder="e.g. 5 years, Apprentice"
              value={filters.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 text-elec-light"
            />
          </div>
        </div>

        {/* Salary Range */}
        <div className="space-y-2">
          <Label className="text-elec-yellow flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            Salary Range
          </Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min salary"
              value={filters.salaryMin}
              onChange={(e) => handleInputChange('salaryMin', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 text-elec-light"
            />
            <Input
              placeholder="Max salary"
              value={filters.salaryMax}
              onChange={(e) => handleInputChange('salaryMax', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 text-elec-light"
            />
          </div>
        </div>

        {/* Quick Skills */}
        <div className="space-y-2">
          <Label className="text-elec-yellow flex items-center gap-2">
            <Award className="h-4 w-4" />
            Key Skills
          </Label>
          <div className="flex flex-wrap gap-2">
            {commonSkills.slice(0, 6).map(skill => (
              <Badge
                key={skill}
                variant={filters.skills.includes(skill) ? "default" : "outline"}
                className={filters.skills.includes(skill) 
                  ? "bg-elec-yellow text-elec-dark cursor-pointer text-xs" 
                  : "border-elec-yellow/30 text-elec-yellow cursor-pointer hover:bg-elec-yellow/10 text-xs"
                }
                onClick={() => filters.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expanded Filters */}
        <Collapsible open={isExpanded}>
          <CollapsibleContent className="space-y-6 pt-4 border-t border-elec-yellow/20">
            {/* Custom Skills */}
            <div className="space-y-3">
              <Label className="text-elec-yellow">All Skills & Expertise</Label>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill(skillInput)}
                  className="bg-elec-gray border-elec-yellow/30 text-elec-light"
                />
                <Button 
                  onClick={() => addSkill(skillInput)}
                  variant="outline"
                  className="border-elec-yellow/30 text-elec-yellow"
                >
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {commonSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? "default" : "outline"}
                    className={filters.skills.includes(skill) 
                      ? "bg-elec-yellow text-elec-dark cursor-pointer text-xs" 
                      : "border-elec-yellow/30 text-elec-yellow cursor-pointer hover:bg-elec-yellow/10 text-xs"
                    }
                    onClick={() => filters.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {filters.skills.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Your Skills:</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.skills.map(skill => (
                      <Badge
                        key={skill}
                        className="bg-elec-yellow text-elec-dark cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <Label className="text-elec-yellow">Certifications</Label>
              <div className="grid grid-cols-2 gap-2">
                {commonCertifications.map(cert => (
                  <div key={cert} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.certifications.includes(cert)}
                      onCheckedChange={() => toggleArrayItem('certifications', cert)}
                    />
                    <label className="text-sm text-muted-foreground cursor-pointer">
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Types */}
            <div className="space-y-3">
              <Label className="text-elec-yellow flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Types
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {jobTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.jobTypes.includes(type)}
                      onCheckedChange={() => toggleArrayItem('jobTypes', type)}
                    />
                    <label className="text-sm text-muted-foreground cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Mode */}
            <div className="space-y-3">
              <Label className="text-elec-yellow">Work Mode Preference</Label>
              <div className="flex flex-wrap gap-2">
                {workModes.map(mode => (
                  <Badge
                    key={mode}
                    variant={filters.workMode.includes(mode) ? "default" : "outline"}
                    className={filters.workMode.includes(mode) 
                      ? "bg-elec-yellow text-elec-dark cursor-pointer text-xs" 
                      : "border-elec-yellow/30 text-elec-yellow cursor-pointer hover:bg-elec-yellow/10 text-xs"
                    }
                    onClick={() => toggleArrayItem('workMode', mode)}
                  >
                    {mode}
                  </Badge>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default SmartFilter;