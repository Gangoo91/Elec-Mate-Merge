
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, User, Briefcase, GraduationCap, Award } from "lucide-react";
import { CVData } from "./types";
import { EnhancedPersonalInfoForm } from "./forms/EnhancedPersonalInfoForm";
import { EnhancedExperienceForm } from "./forms/EnhancedExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { EnhancedSkillsForm } from "./forms/EnhancedSkillsForm";

interface EnhancedCVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const EnhancedCVForm: React.FC<EnhancedCVFormProps> = ({ cvData, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
          <h2 className="text-lg font-semibold text-white">AI-Enhanced CV Builder</h2>
        </div>
        <p className="text-sm text-gray-400">
          Use AI assistants throughout the form to generate professional, industry-specific content
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Skills
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <EnhancedPersonalInfoForm cvData={cvData} onChange={onChange} />
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <EnhancedExperienceForm cvData={cvData} onChange={onChange} />
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <EducationForm cvData={cvData} onChange={onChange} />
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <EnhancedSkillsForm cvData={cvData} onChange={onChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
