
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface ElectricalTheorySubsectionProps {
  title: string;
  content: string;
  keyPoints: string[];
  isCompleted: boolean;
  markAsComplete: () => void;
  subsectionId: string;
}

const ElectricalTheorySubsection = ({ 
  title, 
  content, 
  keyPoints, 
  isCompleted, 
  markAsComplete,
  subsectionId
}: ElectricalTheorySubsectionProps) => {
  const navigate = useNavigate();
  const { sectionId } = useParams();

  // Handle back to section navigation - fixed the navigation path
  const handleBackToSection = () => {
    // Navigate directly to the electrical theory section page with the correct path
    const path = `/apprentice/study/eal/level-2-diploma/unit/elec2-04/section/${sectionId || '1'}`;
    console.log("Navigating to:", path);
    navigate(path);
  };
  
  // Override title for subsection 1.1 to display correct content about Health and Safety at Work Act
  const displayTitle = subsectionId === "1.1" 
    ? "Health and Safety at Work Act 1974"
    : title;

  // Adjust content for subsection 1.1
  const displayContent = subsectionId === "1.1"
    ? "Understanding the Health and Safety at Work Act 1974, which outlines the duties of employers and employees to maintain a safe working environment."
    : content;

  // Adjust key points for subsection 1.1
  const displayKeyPoints = subsectionId === "1.1"
    ? [
        "Employer and employee responsibilities under HSWA 1974",
        "Powers of HSE inspectors and enforcement mechanisms",
        "Risk assessment requirements and documentation"
      ]
    : keyPoints;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 mb-6">
        <Button
          variant="outline"
          onClick={handleBackToSection}
          className="self-start border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Section
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-elec-yellow">{displayTitle}</h1>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-base md:text-lg leading-relaxed">{displayContent}</p>
        
        <h2 className="text-lg md:text-xl font-semibold mt-6 mb-3 text-white">Key Points</h2>
        <ul className="space-y-2">
          {displayKeyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2 text-base">
              <span className="text-elec-yellow mt-1">•</span>
              <span className="leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-5 border-t border-elec-yellow/30">
          <Button
            onClick={markAsComplete}
            disabled={isCompleted}
            className={`w-full py-2 h-auto text-base ${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          >
            {isCompleted ? 'Subsection Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElectricalTheorySubsection;
