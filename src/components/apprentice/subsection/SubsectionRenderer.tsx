
import { renderSection1 } from "./sections/Section1Renderer";
import { renderSection2 } from "./sections/Section2Renderer";
import { renderSection3 } from "./sections/Section3Renderer";
import { renderSection4 } from "./sections/Section4Renderer";
import { renderSection5 } from "./sections/Section5Renderer";
import { renderSection6To10 } from "./sections/Section6To10Renderer";
import { Card } from "@/components/ui/card";

interface SubsectionRendererProps {
  subsectionId: string;
  isCompleted: boolean;
  markAsComplete: () => void;
  isElectricalTheory?: boolean;
}

const SubsectionRenderer = ({ 
  subsectionId, 
  isCompleted, 
  markAsComplete,
  isElectricalTheory = false
}: SubsectionRendererProps) => {
  console.log("SubsectionRenderer called with ID:", subsectionId);
  
  // Get section part from subsectionId
  let sectionPart: string = "1";
  let sectionFromUrl: string | null = null;
  
  // Check URL for section ID
  const urlPath = window.location.pathname;
  const sectionMatch = urlPath.match(/\/section\/(\d+)/);
  if (sectionMatch) {
    sectionFromUrl = sectionMatch[1];
    console.log("Section from URL:", sectionFromUrl);
  }
  
  // For subsections with dot notation (e.g., "1.1")
  if (subsectionId.includes(".")) {
    sectionPart = subsectionId.split(".")[0];
    console.log("Processing subsection with dot notation. Section part:", sectionPart);
  } 
  // For simple numeric subsections (e.g., "1")
  else if (sectionFromUrl) {
    sectionPart = sectionFromUrl;
    console.log("Processing simple numeric subsection with section from URL:", sectionPart);
  }
  
  // Render content based on section part
  console.log("Rendering Section", sectionPart, "content for", subsectionId);
  
  // Add wrapper with consistent styling
  const renderContent = () => {
    switch (sectionPart) {
      case "1":
        return renderSection1({ subsectionId, isCompleted, markAsComplete, isElectricalTheory });
      case "2":
        return renderSection2({ subsectionId, isCompleted, markAsComplete });
      case "3":
        return renderSection3({ subsectionId, isCompleted, markAsComplete });
      case "4":
        return renderSection4({ subsectionId, isCompleted, markAsComplete });
      case "5":
        return renderSection5({ subsectionId, isCompleted, markAsComplete });
      case "6":
      case "7": 
      case "8":
      case "9":
      case "10":
        return renderSection6To10({ subsectionId, isCompleted, markAsComplete });
      default:
        return <div>Content for section {sectionPart} is not available.</div>;
    }
  };
  
  return (
    <div className="bg-elec-dark border border-elec-yellow/20 rounded-lg p-6 shadow-lg animate-fade-in">
      {renderContent()}
    </div>
  );
};

export default SubsectionRenderer;
