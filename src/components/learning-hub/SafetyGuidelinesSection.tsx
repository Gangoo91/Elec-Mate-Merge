
import React from 'react';
import InspectionTestingSafetySection from './inspection-testing-safety/InspectionTestingSafetySection';

interface SafetyGuidelinesSectionProps {
  onBack: () => void;
}

const SafetyGuidelinesSection = ({ onBack }: SafetyGuidelinesSectionProps) => {
  return <InspectionTestingSafetySection onBack={onBack} />;
};

export default SafetyGuidelinesSection;
