
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
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-elec-yellow" />
          <h2 className="text-base md:text-lg font-semibold text-white">AI-Enhanced CV Builder</h2>
        </div>
        <p className="text-xs md:text-sm text-gray-400">
          Use AI assistants throughout the form to generate professional, industry-specific content
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="personal" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <User className="h-3 w-3 md:h-4 md:w-4" />
            <span>Personal</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <Briefcase className="h-3 w-3 md:h-4 md:w-4" />
            <span>Experience</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <GraduationCap className="h-3 w-3 md:h-4 md:w-4" />
            <span>Education</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 text-xs md:text-sm py-2 md:py-3">
            <Award className="h-3 w-3 md:h-4 md:w-4" />
            <span>Skills</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-3 md:space-y-4 mt-4">
          <EnhancedPersonalInfoForm cvData={cvData} onChange={onChange} />
        </TabsContent>

        <TabsContent value="experience" className="space-y-3 md:space-y-4 mt-4">
          <EnhancedExperienceForm cvData={cvData} onChange={onChange} />
        </TabsContent>

        <TabsContent value="education" className="space-y-3 md:space-y-4 mt-4">
          <EducationForm cvData={cvData} onChange={onChange} />
        </TabsContent>

        <TabsContent value="skills" className="space-y-3 md:space-y-4 mt-4">
          <EnhancedSkillsForm cvData={cvData} onChange={onChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
