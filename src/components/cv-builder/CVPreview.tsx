
import React from "react";
import { EnhancedCVPreview } from "./EnhancedCVPreview";
import { TwoColumnCVPreview } from "./TwoColumnCVPreview";
import { CVData } from "./types";

interface CVPreviewProps {
  cvData: CVData;
  theme?: 'modern' | 'professional' | 'electrical' | 'two-column';
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData, theme = 'electrical' }) => {
  if (theme === 'two-column') {
    return <TwoColumnCVPreview cvData={cvData} theme="electrical" />;
  }
  
  return <EnhancedCVPreview cvData={cvData} theme={theme as 'modern' | 'professional' | 'electrical'} />;
};
