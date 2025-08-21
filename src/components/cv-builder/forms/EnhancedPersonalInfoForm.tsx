
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
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Full Name *
            </label>
            <input
              type="text"
              value={cvData.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="w-full h-12 bg-background border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus-visible:outline-none focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Email Address *
              </label>
               <input
                 type="email"
                 value={cvData.personalInfo.email}
                 onChange={(e) => updatePersonalInfo('email', e.target.value)}
                 className="w-full h-12 bg-background border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus-visible:outline-none focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                 placeholder="your.email@example.com"
               />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Phone Number *
              </label>
               <input
                 type="tel"
                 value={cvData.personalInfo.phone}
                 onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                 className="w-full h-12 bg-background border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus-visible:outline-none focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
                 placeholder="07700 123456"
               />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Address
            </label>
             <input
               type="text"
               value={cvData.personalInfo.address}
               onChange={(e) => updatePersonalInfo('address', e.target.value)}
               className="w-full h-12 bg-background border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus-visible:outline-none focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
               placeholder="123 High Street, City"
             />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
              <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
              Postcode
            </label>
             <input
               type="text"
               value={cvData.personalInfo.postcode}
               onChange={(e) => updatePersonalInfo('postcode', e.target.value)}
               className="w-full h-12 bg-background border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus-visible:outline-none focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium px-4"
               placeholder="SW1A 1AA"
             />
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
                <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
                Professional Summary
              </label>
               <textarea
                 value={cvData.personalInfo.professionalSummary}
                 onChange={(e) => updatePersonalInfo('professionalSummary', e.target.value)}
                 className="w-full h-32 bg-background border-2 border-elec-gray/50 rounded-xl text-elec-light hover:border-elec-yellow/40 focus-visible:outline-none focus:border-elec-yellow transition-all duration-200 placeholder:text-elec-light/60 text-base font-medium p-4 resize-none"
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
