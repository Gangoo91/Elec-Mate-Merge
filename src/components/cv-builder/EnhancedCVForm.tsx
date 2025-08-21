
import React, { useState } from "react";
import { User, Briefcase, GraduationCap, Award } from "lucide-react";
import { CVData } from "./types";
import { EnhancedPersonalInfoForm } from "./forms/EnhancedPersonalInfoForm";
import { EnhancedExperienceForm } from "./forms/EnhancedExperienceForm";
import { EducationForm } from "./forms/EducationForm";
import { EnhancedSkillsForm } from "./forms/EnhancedSkillsForm";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

interface EnhancedCVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

interface FormTab {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const formTabs: FormTab[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    icon: <User className="h-5 w-5" />
  },
  {
    id: 'experience',
    title: 'Experience',
    icon: <Briefcase className="h-5 w-5" />
  },
  {
    id: 'education',
    title: 'Education',
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: <Award className="h-5 w-5" />
  }
];

export const EnhancedCVForm: React.FC<EnhancedCVFormProps> = ({ cvData, onChange }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const { isMobile } = useMobileEnhanced();

  const isTabCompleted = (tabId: string): boolean => {
    switch (tabId) {
      case 'personal':
        return cvData.personalInfo.fullName !== '' && cvData.personalInfo.email !== '';
      case 'experience':
        return cvData.experience.length > 0;
      case 'education':
        return cvData.education.length > 0;
      case 'skills':
        return cvData.skills.length > 0;
      default:
        return false;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <EnhancedPersonalInfoForm cvData={cvData} onChange={onChange} />;
      case 'experience':
        return <EnhancedExperienceForm cvData={cvData} onChange={onChange} />;
      case 'education':
        return <EducationForm cvData={cvData} onChange={onChange} />;
      case 'skills':
        return <EnhancedSkillsForm cvData={cvData} onChange={onChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Tab Navigation */}
      <div className="border-2 border-elec-gray/50 rounded-xl p-4 sm:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-elec-light">AI-Enhanced CV Builder</h2>
            <p className="text-elec-light/60 text-xs sm:text-sm">Complete each section with AI assistance</p>
          </div>
        </div>
        
        {/* Tab indicator */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2">
          {formTabs.map((tab, index) => (
            <div key={tab.id} className="flex items-center flex-shrink-0">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 rounded-lg whitespace-nowrap transition-all ${
                  isMobile ? 'px-2 py-1.5' : 'px-3 py-2'
                } ${
                  tab.id === activeTab 
                    ? 'bg-elec-yellow text-black' 
                    : isTabCompleted(tab.id)
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                      : 'bg-elec-gray/50 text-elec-light/60 hover:bg-elec-gray/70'
                }`}
              >
                <div className="flex-shrink-0">{tab.icon}</div>
                <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
                  {isMobile && tab.title.includes(' ') ? tab.title.split(' ')[0] : tab.title}
                </span>
              </button>
              {index < formTabs.length - 1 && (
                <div className={`bg-elec-gray/60 mx-1 sm:mx-2 ${isMobile ? 'w-2 h-px' : 'w-4 h-px'} flex-shrink-0`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-elec-gray p-4 sm:p-6 rounded-xl">
        {renderTabContent()}
      </div>
    </div>
  );
};
