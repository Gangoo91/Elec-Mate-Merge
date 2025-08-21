
import React from "react";
import { CVData } from "./types";
import { ProfessionalCVPreview } from "./ProfessionalCVPreview";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  return <ProfessionalCVPreview cvData={cvData} />;
};
