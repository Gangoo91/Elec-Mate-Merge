
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CVData } from "./types";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";

interface CVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const CVForm: React.FC<CVFormProps> = ({ cvData, onChange }) => {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="experience">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <PersonalInfoForm cvData={cvData} onChange={onChange} />
      </TabsContent>

      <TabsContent value="experience" className="space-y-4">
        <ExperienceForm cvData={cvData} onChange={onChange} />
      </TabsContent>

      <TabsContent value="education" className="space-y-4">
        <EducationForm cvData={cvData} onChange={onChange} />
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <SkillsForm cvData={cvData} onChange={onChange} />
      </TabsContent>
    </Tabs>
  );
};
