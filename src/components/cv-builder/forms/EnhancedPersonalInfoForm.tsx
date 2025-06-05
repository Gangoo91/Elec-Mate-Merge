
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { CVData } from "../types";
import { SmartContentAssistant } from "../ai/SmartContentAssistant";

interface EnhancedPersonalInfoFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

export const EnhancedPersonalInfoForm: React.FC<EnhancedPersonalInfoFormProps> = ({ cvData, onChange }) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value
      }
    });
  };

  const handleAIContent = (content: string | string[]) => {
    if (typeof content === 'string') {
      updatePersonalInfo('professionalSummary', content);
    }
  };

  const getAIContext = () => ({
    jobTitle: cvData.experience[0]?.jobTitle || 'Electrician',
    experience: cvData.experience.length > 0 ? `${cvData.experience.length} roles` : 'Entry level',
    skills: cvData.skills,
    targetRole: cvData.experience[0]?.jobTitle || 'Electrician'
  });

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-elec-yellow" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName" className="text-white">Full Name *</Label>
              <Input
                id="fullName"
                value={cvData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
                placeholder="John Smith"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
                placeholder="john.smith@email.com"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">Phone Number *</Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
                placeholder="07700 123456"
              />
            </div>

            <div>
              <Label htmlFor="postcode" className="text-white">Postcode</Label>
              <Input
                id="postcode"
                value={cvData.personalInfo.postcode}
                onChange={(e) => updatePersonalInfo('postcode', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white"
                placeholder="SW1A 1AA"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address" className="text-white">Address</Label>
            <Input
              id="address"
              value={cvData.personalInfo.address}
              onChange={(e) => updatePersonalInfo('address', e.target.value)}
              className="bg-elec-dark border-elec-yellow/20 text-white"
              placeholder="123 High Street, London"
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="summary" className="text-white">Professional Summary</Label>
              <Textarea
                id="summary"
                value={cvData.personalInfo.professionalSummary}
                onChange={(e) => updatePersonalInfo('professionalSummary', e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 text-white min-h-24"
                placeholder="Brief description of your electrical experience and career goals..."
              />
            </div>

            <SmartContentAssistant
              type="professional_summary"
              context={getAIContext()}
              onContentGenerated={handleAIContent}
              currentContent={cvData.personalInfo.professionalSummary}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
