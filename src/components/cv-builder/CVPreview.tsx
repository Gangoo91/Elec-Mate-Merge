
import React from "react";
import { EnhancedCVPreview } from "./EnhancedCVPreview";
import { CVData } from "./types";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  return <EnhancedCVPreview cvData={cvData} theme="electrical" />;
};
