
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Filter, 
  Brain, 
  Sliders,
  X,
  Sparkles
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilters {
  keywords: string;
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin: string;
  salaryMax: string;
  skills: string[];
  aiEnhanced: boolean;
}

interface EnhancedJobSearchProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
  suggestedSkills?: string[];
  totalResults?: number;
}

const EnhancedJobSearch: React.FC<EnhancedJobSearchProps> = ({ 
  onSearch, 
  isLoading,
  suggestedSkills = [],
  totalResults = 0
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    keywords: "electrical,electrician,electrical engineer",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    skills: [],
    aiEnhanced: true
  });
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const addSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      addSkill(skillInput.trim());
    }
  };

  const clearFilters = () => {
    setFilters({
      keywords: "electrical,electrician,electrical engineer",
      location: "",
      jobType: "",
      experienceLevel: "",
      salaryMin: "",
      salaryMax: "",
      skills: [],
      aiEnhanced: true
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray shadow-sm">
      <CardContent className="p-4">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Main Search Row */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Job keywords (e.g., Electrician, Engineer, Technician)"
                value={filters.keywords}
                onChange={(e) => setFilters(prev => ({ ...prev, keywords: e.target.value }))}
                className="pl-10"
                aria-label="Search keywords"
              />
            </div>
            
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location (e.g., London, Manchester)"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="pl-10"
                aria-label="Search location"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90" 
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search Jobs"}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="border-elec-yellow/20"
              >
                <Sliders className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* AI Enhancement Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.aiEnhanced}
                  onChange={(e) => setFilters(prev => ({ ...prev, aiEnhanced: e.target.checked }))}
                  className="rounded border-gray-300 text-elec-yellow focus:ring-elec-yellow"
                />
                <span className="text-sm font-medium flex items-center gap-1">
                  <Brain className="h-4 w-4 text-elec-yellow" />
                  AI Enhanced Search
                </span>
              </label>
              <Badge variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow">
                <Sparkles className="h-3 w-3 mr-1" />
                Smart
              </Badge>
            </div>
            
            {totalResults > 0 && (
              <p className="text-sm text-muted-foreground">
                {totalResults} jobs found
              </p>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-4 pt-4 border-t border-elec-yellow/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Select value={filters.jobType} onValueChange={(value) => setFilters(prev => ({ ...prev, jobType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="apprenticeship">Apprenticeship</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filters.experienceLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead/Management</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min Salary"
                    value={filters.salaryMin}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryMin: e.target.value }))}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max Salary"
                    value={filters.salaryMax}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryMax: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <label className="block text-sm font-medium mb-2">Required Skills</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    placeholder="Add skill (e.g., 18th Edition, PAT Testing)"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addSkill(skillInput.trim())}
                    disabled={!skillInput.trim()}
                  >
                    Add
                  </Button>
                </div>
                
                {/* Current Skills */}
                {filters.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {filters.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                
                {/* Suggested Skills */}
                {suggestedSkills.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestedSkills.filter(skill => !filters.skills.includes(skill)).slice(0, 5).map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="cursor-pointer hover:bg-elec-yellow/10 text-xs"
                          onClick={() => addSkill(skill)}
                        >
                          + {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedJobSearch;
