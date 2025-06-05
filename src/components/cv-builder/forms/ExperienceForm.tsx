
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { CVData, WorkExperience } from "../types";

interface ExperienceFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ cvData, onChange }) => {
  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };

    onChange({
      ...cvData,
      experience: [...cvData.experience, newExperience]
    });
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...cvData,
      experience: cvData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...cvData,
      experience: cvData.experience.filter(exp => exp.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Work Experience</h3>
        <Button
          onClick={addExperience}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {cvData.experience.map((exp, index) => (
        <Card key={exp.id} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Experience {index + 1}</CardTitle>
            <Button
              onClick={() => removeExperience(exp.id)}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400 hover:bg-red-400/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`jobTitle-${exp.id}`} className="text-white">Job Title *</Label>
                <Input
                  id={`jobTitle-${exp.id}`}
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                  placeholder="Electrical Apprentice"
                />
              </div>

              <div>
                <Label htmlFor={`company-${exp.id}`} className="text-white">Company *</Label>
                <Input
                  id={`company-${exp.id}`}
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                  placeholder="ABC Electrical Ltd"
                />
              </div>

              <div>
                <Label htmlFor={`location-${exp.id}`} className="text-white">Location</Label>
                <Input
                  id={`location-${exp.id}`}
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                  placeholder="London, UK"
                />
              </div>

              <div>
                <Label htmlFor={`startDate-${exp.id}`} className="text-white">Start Date</Label>
                <Input
                  id={`startDate-${exp.id}`}
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${exp.id}`} className="text-white">End Date</Label>
                <Input
                  id={`endDate-${exp.id}`}
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="bg-elec-dark border-elec-yellow/20 text-white"
                  disabled={exp.current}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onCheckedChange={(checked) => {
                    updateExperience(exp.id, 'current', checked);
                    if (checked) {
                      updateExperience(exp.id, 'endDate', '');
                    }
                  }}
                />
                <Label htmlFor={`current-${exp.id}`} className="text-white">Current Position</Label>
              </div>
            </div>

            <div>
              <Label htmlFor={`description-${exp.id}`} className="text-white">Job Description</Label>
              <Textarea
                id={`description-${exp.id}`}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white min-h-24"
                placeholder="Describe your key responsibilities, achievements, and skills used..."
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {cvData.experience.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-8">
            <p className="text-gray-400 mb-4">No work experience added yet</p>
            <Button
              onClick={addExperience}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
