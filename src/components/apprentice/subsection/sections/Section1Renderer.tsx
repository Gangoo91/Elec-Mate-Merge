import React, { useEffect } from "react";
import { SubsectionProps } from "../types";
import CourseContentSection from "../../CourseContentSection";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export const renderSection1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  useEffect(() => {
    console.log("Section1Renderer - Effect with ID:", subsectionId, "isCompleted:", isCompleted);
  }, [subsectionId, isCompleted]);

  console.log("Section1Renderer - Rendering subsection with ID:", subsectionId);
  
  // Get unit slug from URL to determine which content to render
  const urlPath = window.location.pathname;
  const unitMatch = urlPath.match(/\/unit\/([^/]+)/);
  const unitSlug = unitMatch ? unitMatch[1] : null;
  
  // Determine if we're in the electrical theory unit
  const isElectricalTheory = unitSlug === 'elec2-04' || urlPath.includes('electrical-theory');
  
  // Handle electrical theory content
  if (isElectricalTheory) {
    return renderElectricalTheorySection1(subsectionId, isCompleted, markAsComplete);
  }
  
  // Original health & safety content (kept for backward compatibility)
  // Handle dot notation format (e.g., "1.1", "1.2", "1.3")
  if (subsectionId === "1.1") {
    console.log("Section1Renderer - Rendering subsection 1.1");
    return (
      <Subsection1_1 
        subsectionId={subsectionId} 
        isCompleted={isCompleted} 
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "1.2") {
    console.log("Section1Renderer - Rendering subsection 1.2");
    return (
      <Subsection1_2 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "1.3") {
    console.log("Section1Renderer - Rendering subsection 1.3");
    return (
      <Subsection1_3 
        subsectionId={subsectionId}
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  // Handle simple numeric format (e.g., "1", "2", "3")
  // These map to the first subsection of each section
  if (subsectionId === "1") {
    console.log("Section1Renderer - Rendering subsection 1.1 via numeric ID 1");
    return (
      <Subsection1_1 
        subsectionId="1.1" 
        isCompleted={isCompleted} 
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "2") {
    console.log("Section1Renderer - Rendering subsection 1.2 via numeric ID 2");
    return (
      <Subsection1_2 
        subsectionId="1.2"
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  if (subsectionId === "3") {
    console.log("Section1Renderer - Rendering subsection 1.3 via numeric ID 3");
    return (
      <Subsection1_3 
        subsectionId="1.3"
        isCompleted={isCompleted}
        markAsComplete={markAsComplete}
      />
    );
  }
  
  console.log("Section1Renderer - No matching subsection found for:", subsectionId);
  return <p>Content for subsection {subsectionId} is not yet available.</p>;
};

// Electrical theory section 1 content renderer
const renderElectricalTheorySection1 = (subsectionId: string, isCompleted: boolean, markAsComplete: () => void) => {
  // Map the subsection IDs to content
  switch (subsectionId) {
    case "1.1":
    case "1":
      return (
        <ElectricalTheorySubsection
          title="Health and Safety Legislation"
          content="The Health and Safety at Work Act 1974 (HSWA) is the primary piece of legislation covering occupational health and safety in the United Kingdom. It sets out the general duties that employers have towards employees and members of the public, and employees have to themselves and to each other."
          keyPoints={[
            "Employers must ensure, as far as is reasonably practicable, the health, safety, and welfare of all employees.",
            "Employers must provide and maintain safe equipment and systems of work.",
            "Employees have a duty to take reasonable care of their own health and safety and that of others.",
            "The Health and Safety Executive (HSE) enforces the Act and can issue improvement and prohibition notices."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.2":
    case "2":
      return (
        <ElectricalTheorySubsection
          title="Electricity at Work Regulations 1989"
          content="The Electricity at Work Regulations 1989 are specific regulations designed to prevent death or personal injury from electrical causes in the workplace. They apply to all electrical equipment and systems, and impose duties on employers, employees, and the self-employed."
          keyPoints={[
            "All electrical systems must be maintained to prevent danger.",
            "Work activities must be carried out in a manner that prevents danger.",
            "Persons carrying out electrical work must be competent or adequately supervised.",
            "Proper procedures for working on dead circuits include isolation, proving dead, and locking off."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.3":
    case "3":
      return (
        <ElectricalTheorySubsection
          title="Building Regulations (Part P)"
          content="Part P of the Building Regulations applies to electrical installations in dwellings in England and Wales. It was introduced to reduce the number of injuries and deaths caused by electric shocks and fires in homes."
          keyPoints={[
            "Electrical installation work in dwellings must meet the requirements of Part P.",
            "Notifiable work must be certified by a registered competent person or inspected by building control.",
            "Notifiable work includes new circuits, work in special locations (bathrooms, swimming pools), and consumer unit replacements.",
            "Certification demonstrates that work meets safety requirements and complies with BS 7671."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.4":
    case "4":
      return (
        <ElectricalTheorySubsection
          title="British Standards (BS 7671)"
          content="BS 7671, also known as the IET Wiring Regulations, is the national standard for electrical installations in the UK. It provides detailed technical requirements to ensure the safety of electrical installations in buildings."
          keyPoints={[
            "Currently on the 18th Edition, the regulations are updated periodically to reflect new technologies and safety considerations.",
            "Compliance with BS 7671 is the primary way to satisfy Part P of the Building Regulations.",
            "The standard covers all aspects of electrical installation including design, selection, erection, inspection, and testing.",
            "It includes provisions for protection against electric shock, thermal effects, overcurrent, and more."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.5":
    case "5":
      return (
        <ElectricalTheorySubsection
          title="Guidance Documents"
          content="Various guidance documents are published to help electricians interpret and apply the regulations effectively in practical situations. These include official publications from the IET and other industry bodies."
          keyPoints={[
            "The IET On-Site Guide provides practical guidance for electricians working on-site.",
            "Guidance Notes expand on specific aspects of BS 7671, such as protection, isolation, and earthing.",
            "The Electrician's Guide to Good Electrical Practice offers practical advice on installation techniques.",
            "Manufacturer's instructions provide specific guidance for the installation and use of particular equipment."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    case "1.6":
    case "6":
      return (
        <ElectricalTheorySubsection
          title="Roles and Responsibilities"
          content="Electrical installation work involves multiple parties, each with specific roles and responsibilities to ensure compliance with regulations and safety standards."
          keyPoints={[
            "Designers must specify installations that comply with BS 7671 and other relevant standards.",
            "Installers are responsible for the quality of their work and ensuring it meets the regulations.",
            "Inspectors verify that installations comply with regulations through inspection and testing.",
            "Clients have responsibilities to select competent designers and installers, and to ensure adequate information is provided."
          ]}
          isCompleted={isCompleted}
          markAsComplete={markAsComplete}
          subsectionId={subsectionId}
        />
      );
    default:
      return <p>Content for electrical theory subsection {subsectionId} is not yet available.</p>;
  }
};

// Utility component for rendering electrical theory subsections
const ElectricalTheorySubsection = ({ 
  title, 
  content, 
  keyPoints, 
  isCompleted, 
  markAsComplete,
  subsectionId
}: {
  title: string;
  content: string;
  keyPoints: string[];
  isCompleted: boolean;
  markAsComplete: () => void;
  subsectionId: string;
}) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-lg">{content}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Key Points</h2>
        <ul className="space-y-2">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-elec-yellow mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 pt-4 border-t border-elec-yellow/20">
          <Button
            onClick={markAsComplete}
            disabled={isCompleted}
            className={`w-full ${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
          >
            {isCompleted ? 'Subsection Completed' : 'Mark as Complete'}
            {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Import these only when health and safety content is accessed
// This is a workaround to avoid reference errors
const Subsection1_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  // Dynamic import to prevent reference errors
  const [Component, setComponent] = React.useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("../../content/Subsection1_1").then(module => {
      setComponent(() => module.default);
    });
  }, []);

  if (!Component) {
    return <p>Loading content...</p>;
  }

  return <Component subsectionId={subsectionId} isCompleted={isCompleted} markAsComplete={markAsComplete} />;
};
