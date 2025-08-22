import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { CVData, Education } from "../types";

interface EducationFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ cvData, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      qualification: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      grade: ""
    };

    onChange({
      ...cvData,
      education: [...cvData.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    onChange({
      ...cvData,
      education: cvData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Education</h3>
        <Button
          onClick={addEducation}
          className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {cvData.education.map((edu, index) => (
        <Card key={edu.id} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Education {index + 1}</CardTitle>
            <Button
              onClick={() => removeEducation(edu.id)}
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
                <Label htmlFor={`qualification-${edu.id}`} className="text-white">Qualification *</Label>
                <Input
                  id={`qualification-${edu.id}`}
                  value={edu.qualification}
                  onChange={(e) => updateEducation(edu.id, 'qualification', e.target.value)}
                  className="bg-card border-elec-yellow/20 text-white min-h-[48px] mt-2"
                  placeholder="Level 3 Electrical Installation"
                />
              </div>

              <div>
                <Label htmlFor={`institution-${edu.id}`} className="text-white">Institution *</Label>
                <Input
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="bg-card border-elec-yellow/20 text-white min-h-[48px] mt-2"
                  placeholder="Local College"
                />
              </div>

              <div>
                <Label htmlFor={`location-${edu.id}`} className="text-white">Location</Label>
                <Input
                  id={`location-${edu.id}`}
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  className="bg-card border-elec-yellow/20 text-white min-h-[48px] mt-2"
                  placeholder="London, UK"
                />
              </div>

              <div>
                <Label htmlFor={`grade-${edu.id}`} className="text-white">Grade</Label>
                <Input
                  id={`grade-${edu.id}`}
                  value={edu.grade}
                  onChange={(e) => updateEducation(edu.id, 'grade', e.target.value)}
                  className="bg-card border-elec-yellow/20 text-white min-h-[48px] mt-2"
                  placeholder="Merit / Distinction"
                />
              </div>

              <div>
                <Label htmlFor={`startDate-${edu.id}`} className="text-white">Start Date</Label>
                <Input
                  id={`startDate-${edu.id}`}
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="bg-card border-elec-yellow/20 text-white min-h-[48px] mt-2"
                />
              </div>

              <div>
                <Label htmlFor={`endDate-${edu.id}`} className="text-white">End Date</Label>
                <Input
                  id={`endDate-${edu.id}`}
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="bg-card border-elec-yellow/20 text-white min-h-[48px] mt-2"
                  disabled={edu.current}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${edu.id}`}
                  checked={edu.current}
                  onCheckedChange={(checked) => {
                    updateEducation(edu.id, 'current', checked);
                    if (checked) {
                      updateEducation(edu.id, 'endDate', '');
                    }
                  }}
                />
                <Label htmlFor={`current-${edu.id}`} className="text-white">Currently Studying</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {cvData.education.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="text-center py-8">
            <p className="text-gray-400 mb-4">No education added yet</p>
            <Button
              onClick={addEducation}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Qualification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
