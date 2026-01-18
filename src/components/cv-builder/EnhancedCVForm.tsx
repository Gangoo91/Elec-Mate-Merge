
import React, { useState } from "react";
import { User, Briefcase, GraduationCap, Award, Camera, CreditCard, FolderKanban, Users } from "lucide-react";
import { CVData } from "./types";
import { EnhancedPersonalInfoForm } from "./forms/EnhancedPersonalInfoForm";
import { PhotoUploadForm } from "./forms/PhotoUploadForm";
import { ProfessionalCardsForm } from "./forms/ProfessionalCardsForm";
import { EnhancedExperienceForm } from "./forms/EnhancedExperienceForm";
import { KeyProjectsForm } from "./forms/KeyProjectsForm";
import { EducationForm } from "./forms/EducationForm";
import { EnhancedSkillsForm } from "./forms/EnhancedSkillsForm";
import { ReferencesForm } from "./forms/ReferencesForm";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

interface EnhancedCVFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

interface FormTab {
  id: string;
  title: string;
  shortTitle: string;
  icon: React.ReactNode;
}

const formTabs: FormTab[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    shortTitle: 'Personal',
    icon: <User className="h-5 w-5" />
  },
  {
    id: 'photo',
    title: 'Photo',
    shortTitle: 'Photo',
    icon: <Camera className="h-5 w-5" />
  },
  {
    id: 'cards',
    title: 'Professional Cards',
    shortTitle: 'Cards',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: 'experience',
    title: 'Experience',
    shortTitle: 'Work',
    icon: <Briefcase className="h-5 w-5" />
  },
  {
    id: 'projects',
    title: 'Key Projects',
    shortTitle: 'Projects',
    icon: <FolderKanban className="h-5 w-5" />
  },
  {
    id: 'education',
    title: 'Education',
    shortTitle: 'Education',
    icon: <GraduationCap className="h-5 w-5" />
  },
  {
    id: 'skills',
    title: 'Skills',
    shortTitle: 'Skills',
    icon: <Award className="h-5 w-5" />
  },
  {
    id: 'references',
    title: 'References',
    shortTitle: 'Refs',
    icon: <Users className="h-5 w-5" />
  }
];

export const EnhancedCVForm: React.FC<EnhancedCVFormProps> = ({ cvData, onChange }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const { isMobile } = useMobileEnhanced();

  const isTabCompleted = (tabId: string): boolean => {
    switch (tabId) {
      case 'personal':
        return cvData.personalInfo.fullName !== '' && cvData.personalInfo.email !== '';
      case 'photo':
        return !!cvData.personalInfo.photoUrl;
      case 'cards':
        return !!cvData.professionalCards.ecsCardType || cvData.professionalCards.drivingLicence.length > 0;
      case 'experience':
        return cvData.experience.length > 0;
      case 'projects':
        return cvData.keyProjects.length > 0;
      case 'education':
        return cvData.education.length > 0;
      case 'skills':
        return cvData.skills.length > 0;
      case 'references':
        return cvData.references.length > 0;
      default:
        return false;
    }
  };

  const currentIndex = formTabs.findIndex(t => t.id === activeTab);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < formTabs.length - 1;

  const goToTab = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && canGoBack) {
      setActiveTab(formTabs[currentIndex - 1].id);
    } else if (direction === 'next' && canGoForward) {
      setActiveTab(formTabs[currentIndex + 1].id);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <EnhancedPersonalInfoForm cvData={cvData} onChange={onChange} />;
      case 'photo':
        return <PhotoUploadForm cvData={cvData} onChange={onChange} />;
      case 'cards':
        return <ProfessionalCardsForm cvData={cvData} onChange={onChange} />;
      case 'experience':
        return <EnhancedExperienceForm cvData={cvData} onChange={onChange} />;
      case 'projects':
        return <KeyProjectsForm cvData={cvData} onChange={onChange} />;
      case 'education':
        return <EducationForm cvData={cvData} onChange={onChange} />;
      case 'skills':
        return <EnhancedSkillsForm cvData={cvData} onChange={onChange} />;
      case 'references':
        return <ReferencesForm cvData={cvData} onChange={onChange} />;
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

        {/* Tab indicator - scrollable */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 -mx-1 px-1">
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
                  {isMobile ? tab.shortTitle : tab.title}
                </span>
              </button>
              {index < formTabs.length - 1 && (
                <div className={`bg-elec-gray/60 mx-1 sm:mx-2 ${isMobile ? 'w-2 h-px' : 'w-4 h-px'} flex-shrink-0`} />
              )}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-elec-gray/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 transition-all duration-300"
              style={{ width: `${((formTabs.filter(t => isTabCompleted(t.id)).length) / formTabs.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-elec-light/60 flex-shrink-0">
            {formTabs.filter(t => isTabCompleted(t.id)).length}/{formTabs.length}
          </span>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-elec-gray p-4 sm:p-6 rounded-xl">
        {renderTabContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => goToTab('prev')}
          disabled={!canGoBack}
          className="flex-1 sm:flex-none px-6 py-3 min-h-[48px] rounded-lg bg-elec-gray border border-elec-light/20 text-elec-light font-medium touch-manipulation active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          onClick={() => goToTab('next')}
          disabled={!canGoForward}
          className="flex-1 sm:flex-none px-6 py-3 min-h-[48px] rounded-lg bg-elec-yellow text-black font-medium touch-manipulation active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};
