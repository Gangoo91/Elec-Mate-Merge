import React, { useEffect } from "react";
import { SubsectionProps } from "../types";
import HealthSafetySubsection from "./health-safety/HealthSafetySubsection";
import { renderElectricalTheorySection1 } from "./electrical-theory/ElectricalTheoryContent";
import ElectricalTheorySection from "@/components/apprentice/section/ElectricalTheorySection";
import { Card, CardContent } from "@/components/ui/card";

export const renderSection1 = ({ subsectionId, isCompleted, markAsComplete, isElectricalTheory: propIsElectricalTheory }: SubsectionProps) => {
  useEffect(() => {
    console.log("Section1Renderer - Effect with ID:", subsectionId, "isCompleted:", isCompleted);
  }, [subsectionId, isCompleted]);

  console.log("Section1Renderer - Rendering subsection with ID:", subsectionId);
  
  // Get unit slug from URL to determine which content to render
  const urlPath = window.location.pathname;
  const unitMatch = urlPath.match(/\/unit\/([^/]+)/);
  const unitSlug = unitMatch ? unitMatch[1] : null;
  
  // Determine if we're in the electrical theory unit
  // Check both the prop and the URL to be sure
  const isElectricalTheory = propIsElectricalTheory || unitSlug === 'elec2-04' || urlPath.includes('electrical-theory') || urlPath.includes('/elec2-04');
  
  console.log("Section1Renderer - Is Electrical Theory:", isElectricalTheory, "Unit:", unitSlug);
  
  // Handle electrical theory content
  if (isElectricalTheory) {
    console.log("Section1Renderer - Rendering electrical theory section with ID:", subsectionId);
    
    // Check if we're on the section overview (no subsection) or a numeric ID that represents section 1
    if (subsectionId === "1" || subsectionId === "1.0") {
      console.log("Section1Renderer - Rendering electrical theory section overview");
      return (
        <div className="animate-fade-in">
          <ElectricalTheorySection sectionId="1" isCompleted={isCompleted} markAsComplete={markAsComplete} />
        </div>
      );
    }
    
    // Otherwise render the specific subsection
    return (
      <div className="animate-fade-in">
        {renderElectricalTheorySection1(subsectionId, isCompleted, markAsComplete)}
      </div>
    );
  }
  
  // Original health & safety content (kept for backward compatibility)
  // Handle dot notation format (e.g., "1.1", "1.2", "1.3")
  const renderHealthSafetyContent = (id: string, type: string) => {
    return (
      <Card className="border-elec-yellow/20 bg-transparent shadow-none">
        <CardContent className="p-0">
          <HealthSafetySubsection
            subsectionId={id}
            isCompleted={isCompleted}
            markAsComplete={markAsComplete}
            subsectionType={type}
          />
        </CardContent>
      </Card>
    );
  };
  
  if (subsectionId === "1.1") {
    console.log("Section1Renderer - Rendering subsection 1.1");
    return renderHealthSafetyContent(subsectionId, "1_1");
  }
  
  if (subsectionId === "1.2") {
    console.log("Section1Renderer - Rendering subsection 1.2");
    return renderHealthSafetyContent(subsectionId, "1_2");
  }
  
  if (subsectionId === "1.3") {
    console.log("Section1Renderer - Rendering subsection 1.3");
    return renderHealthSafetyContent(subsectionId, "1_3");
  }
  
  // Handle simple numeric format (e.g., "1", "2", "3")
  // These map to the first subsection of each section
  if (subsectionId === "1") {
    console.log("Section1Renderer - Rendering subsection 1.1 via numeric ID 1");
    return renderHealthSafetyContent("1.1", "1_1");
  }
  
  if (subsectionId === "2") {
    console.log("Section1Renderer - Rendering subsection 1.2 via numeric ID 2");
    return renderHealthSafetyContent("1.2", "1_2");
  }
  
  if (subsectionId === "3") {
    console.log("Section1Renderer - Rendering subsection 1.3 via numeric ID 3");
    return renderHealthSafetyContent("1.3", "1_3");
  }
  
  console.log("Section1Renderer - No matching subsection found for:", subsectionId);
  return (
    <Card className="border-elec-yellow/20 bg-elec-dark/50">
      <CardContent className="p-6 text-center">
        <p className="text-muted-foreground">Content for subsection {subsectionId} is not yet available.</p>
      </CardContent>
    </Card>
  );
};
