
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
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-elec-yellow" />
          Personal Information
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light">
              Full Name *
            </label>
            <input
              type="text"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="flex min-h-[48px] w-full rounded-md border border-input bg-elec-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Email Address *
              </label>
               <input
                 type="email"
                 value={cvData.personalInfo.email}
                 onChange={(e) => updatePersonalInfo('email', e.target.value)}
                 className="flex min-h-[48px] w-full rounded-md border border-input bg-elec-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                 placeholder="your.email@example.com"
               />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Phone Number *
              </label>
               <input
                 type="tel"
                 value={cvData.personalInfo.phone}
                 onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                 className="flex min-h-[48px] w-full rounded-md border border-input bg-elec-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                 placeholder="07700 123456"
               />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light">
              Address
            </label>
             <input
               type="text"
               value={cvData.personalInfo.address}
               onChange={(e) => updatePersonalInfo('address', e.target.value)}
               className="flex min-h-[48px] w-full rounded-md border border-input bg-elec-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
               placeholder="123 High Street, City"
             />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light">
              Postcode
            </label>
             <input
               type="text"
               value={cvData.personalInfo.postcode}
               onChange={(e) => updatePersonalInfo('postcode', e.target.value)}
               className="flex min-h-[48px] w-full rounded-md border border-input bg-elec-card px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
               placeholder="SW1A 1AA"
             />
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Professional Summary
              </label>
               <textarea
                 value={cvData.personalInfo.professionalSummary}
                 onChange={(e) => updatePersonalInfo('professionalSummary', e.target.value)}
                 className="flex min-h-[80px] w-full rounded-md border border-input bg-elec-card px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none mt-2"
                 placeholder="Brief description of your electrical experience and career goals..."
                 rows={4}
               />
              <p className="text-xs text-elec-light/70 flex items-center gap-1">
                <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
                Describe your electrical expertise and career objectives
              </p>
            </div>

            <SmartContentAssistant
              type="professional_summary"
              context={getAIContext()}
              onContentGenerated={handleAIContent}
              currentContent={cvData.personalInfo.professionalSummary}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
