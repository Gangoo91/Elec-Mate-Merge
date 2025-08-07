import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Brain, 
  Star, 
  Settings, 
  User, 
  MapPin, 
  Briefcase,
  Award,
  Target,
  Sparkles,
  Filter
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  experience: string;
  skills: string[];
  certifications: string[];
  preferredLocation: string;
  preferredSalary: string;
  jobTypes: string[];
  workMode: string[];
}

interface AIJobMatcherProps {
  onProfileUpdate: (profile: UserProfile) => void;
  onGenerateMatches: () => void;
  isMatching: boolean;
}

const AIJobMatcher: React.FC<AIJobMatcherProps> = ({
  onProfileUpdate,
  onGenerateMatches,
  isMatching
}) => {
  const [profile, setProfile] = useState<UserProfile>({
    experience: "",
    skills: [],
    certifications: [],
    preferredLocation: "",
    preferredSalary: "",
    jobTypes: [],
    workMode: []
  });

  const [skillInput, setSkillInput] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const commonSkills = [
    "Electrical Installation",
    "Testing & Inspection",
    "18th Edition",
    "PAT Testing",
    "EICR",
    "Solar Installation",
    "EV Charging",
    "Commercial Electrical",
    "Domestic Electrical",
    "Industrial Electrical",
    "Maintenance",
    "Fault Finding",
    "Panel Building",
    "Motor Control",
    "LED Lighting"
  ];

  const commonCertifications = [
    "City & Guilds 2365",
    "City & Guilds 2382-18",
    "AM2",
    "JIB Gold Card",
    "NICEIC Approved",
    "Part P Qualified",
    "IPAF",
    "SSSTS",
    "First Aid",
    "Asbestos Awareness",
    "Working at Height"
  ];

  const jobTypes = [
    "Electrician",
    "Electrical Engineer", 
    "Maintenance Electrician",
    "Electrical Supervisor",
    "Electrical Tester",
    "Installation Electrician",
    "Electrical Designer",
    "Electrical Project Manager"
  ];

  const workModes = [
    "On-site",
    "Remote", 
    "Hybrid",
    "Travel required",
    "Local work only"
  ];

  const addSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      const updatedProfile = {
        ...profile,
        skills: [...profile.skills, skill]
      };
      setProfile(updatedProfile);
      onProfileUpdate(updatedProfile);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    const updatedProfile = {
      ...profile,
      skills: profile.skills.filter(s => s !== skill)
    };
    setProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
  };

  const toggleCertification = (cert: string) => {
    const updatedProfile = {
      ...profile,
      certifications: profile.certifications.includes(cert)
        ? profile.certifications.filter(c => c !== cert)
        : [...profile.certifications, cert]
    };
    setProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
  };

  const toggleJobType = (type: string) => {
    const updatedProfile = {
      ...profile,
      jobTypes: profile.jobTypes.includes(type)
        ? profile.jobTypes.filter(t => t !== type)
        : [...profile.jobTypes, type]
    };
    setProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
  };

  const toggleWorkMode = (mode: string) => {
    const updatedProfile = {
      ...profile,
      workMode: profile.workMode.includes(mode)
        ? profile.workMode.filter(m => m !== mode)
        : [...profile.workMode, mode]
    };
    setProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
    onProfileUpdate(updatedProfile);
  };

  return (
    <Card className="bg-gradient-to-br from-elec-card to-elec-card/80 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-elec-light">
          <div className="p-2 bg-elec-yellow/10 rounded-lg">
            <Brain className="h-5 w-5 text-elec-yellow" />
          </div>
          AI Job Matcher
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="ml-auto text-muted-foreground hover:text-elec-yellow"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Match Button */}
        <div className="text-center">
          <Button
            onClick={onGenerateMatches}
            disabled={isMatching}
            className="bg-gradient-to-r from-elec-yellow to-yellow-400 text-elec-dark hover:from-elec-yellow/90 hover:to-yellow-400/90 font-medium"
          >
            {isMatching ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Finding Matches...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Find AI Matched Jobs
              </>
            )}
          </Button>
        </div>

        {showSettings && (
          <div className="space-y-6 border-t border-elec-yellow/20 pt-6">
            {/* Experience Level */}
            <div className="space-y-2">
              <Label className="text-elec-yellow flex items-center gap-2">
                <User className="h-4 w-4" />
                Experience Level
              </Label>
              <Input
                placeholder="e.g., 5 years, Apprentice, Senior"
                value={profile.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="bg-elec-gray border-elec-yellow/30 text-elec-light"
              />
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <Label className="text-elec-yellow flex items-center gap-2">
                <Award className="h-4 w-4" />
                Skills & Expertise
              </Label>
              
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

              {/* Common Skills */}
              <div className="flex flex-wrap gap-2">
                {commonSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant={profile.skills.includes(skill) ? "default" : "outline"}
                    className={profile.skills.includes(skill) 
                      ? "bg-elec-yellow text-elec-dark cursor-pointer" 
                      : "border-elec-yellow/30 text-elec-yellow cursor-pointer hover:bg-elec-yellow/10"
                    }
                    onClick={() => profile.skills.includes(skill) ? removeSkill(skill) : addSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Selected Skills */}
              {profile.skills.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Your Skills:</Label>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map(skill => (
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
                      checked={profile.certifications.includes(cert)}
                      onCheckedChange={() => toggleCertification(cert)}
                    />
                    <label className="text-sm text-muted-foreground cursor-pointer">
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Preference */}
            <div className="space-y-2">
              <Label className="text-elec-yellow flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Preferred Location
              </Label>
              <Input
                placeholder="e.g., London, Manchester, Remote"
                value={profile.preferredLocation}
                onChange={(e) => handleInputChange('preferredLocation', e.target.value)}
                className="bg-elec-gray border-elec-yellow/30 text-elec-light"
              />
            </div>

            {/* Salary Expectation */}
            <div className="space-y-2">
              <Label className="text-elec-yellow">Salary Expectation</Label>
              <Input
                placeholder="e.g., £35,000 - £45,000"
                value={profile.preferredSalary}
                onChange={(e) => handleInputChange('preferredSalary', e.target.value)}
                className="bg-elec-gray border-elec-yellow/30 text-elec-light"
              />
            </div>

            {/* Job Types */}
            <div className="space-y-3">
              <Label className="text-elec-yellow flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Preferred Job Types
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {jobTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      checked={profile.jobTypes.includes(type)}
                      onCheckedChange={() => toggleJobType(type)}
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
                    variant={profile.workMode.includes(mode) ? "default" : "outline"}
                    className={profile.workMode.includes(mode) 
                      ? "bg-elec-yellow text-elec-dark cursor-pointer" 
                      : "border-elec-yellow/30 text-elec-yellow cursor-pointer hover:bg-elec-yellow/10"
                    }
                    onClick={() => toggleWorkMode(mode)}
                  >
                    {mode}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIJobMatcher;