
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import { Button } from "@/components/ui/button";
import type { CourseUnit } from "@/data/courseUnits";

interface UnitDetailsProps {
  unit: CourseUnit;
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitDetails = ({ unit, onResourceClick }: UnitDetailsProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Only show Health and Safety content for unit ELEC2/01
  const showHealthSafetyContent = unit.code === "ELEC2/01";

  const toggleSection = (sectionNumber: string) => {
    if (expandedSection === sectionNumber) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionNumber);
      // Report study activity when opening a section
      onResourceClick('learning');
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6">
        {/* Health and Safety Content - Only for ELEC2/01 */}
        {showHealthSafetyContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">            
            {/* Section 1 Box */}
            <SectionBox 
              sectionNumber="1"
              title="Health and Safety Legislation"
              isExpanded={expandedSection === "1"}
              onClick={() => toggleSection("1")}
            />
            
            {/* Section 2 Box */}
            <SectionBox 
              sectionNumber="2"
              title="Safe Working Environment"
              isExpanded={expandedSection === "2"}
              onClick={() => toggleSection("2")}
            />
            
            {/* Section 3 Box */}
            <SectionBox 
              sectionNumber="3"
              title="Basic Electrical Safety"
              isExpanded={expandedSection === "3"}
              onClick={() => toggleSection("3")}
            />
            
            {/* Section 4 Box */}
            <SectionBox 
              sectionNumber="4"
              title="Access Equipment Safety"
              isExpanded={expandedSection === "4"}
              onClick={() => toggleSection("4")}
            />
            
            {/* Section 5 Box */}
            <SectionBox 
              sectionNumber="5"
              title="Identifying & Dealing with Hazards"
              isExpanded={expandedSection === "5"}
              onClick={() => toggleSection("5")}
            />
            
            {/* Section 6 Box */}
            <SectionBox 
              sectionNumber="6"
              title="Safe Working Practices"
              isExpanded={expandedSection === "6"}
              onClick={() => toggleSection("6")}
            />
            
            {/* Expanded content area - appears below the grid when a section is expanded */}
            {expandedSection && (
              <div className="col-span-full mt-4 bg-background/40 rounded-lg p-4 animate-fade-in">
                {expandedSection === "1" && (
                  <CourseContentSection 
                    sectionNumber="1"
                    title="Health and Safety Legislation in Electrical Work"
                    description="Understanding how health and safety applies to electrotechnical operations and the relevance of health and safety legislation in electrical work."
                    icon="safety"
                    isMainSection={true}
                    subsections={[
                      {
                        id: "1.1",
                        title: "Key Legislation",
                        content: "The primary legislation governing electrical safety in the workplace includes specific acts and regulations that all electrical workers must adhere to.",
                        keyPoints: [
                          "The Health and Safety at Work Act 1974 establishes the legal framework for workplace safety",
                          "The Electricity at Work Regulations 1989 specifically addresses electrical safety standards and requirements",
                          "The Management of Health and Safety at Work Regulations 1999 requires risk assessments for all work activities"
                        ]
                      },
                      {
                        id: "1.2",
                        title: "Construction Design and Management Regulations",
                        content: "CDM regulations apply specifically to construction projects, including electrical installation work on construction sites.",
                        keyPoints: [
                          "Defines duties for all parties involved in construction projects",
                          "Requires proper planning and management of projects to ensure safety",
                          "Specifies documentation and communication requirements for health and safety"
                        ]
                      },
                      {
                        id: "1.3",
                        title: "RIDDOR and Incident Reporting",
                        content: "The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations requires specific incidents to be reported to the Health and Safety Executive.",
                        keyPoints: [
                          "Mandates reporting of work-related accidents resulting in serious injury",
                          "Covers dangerous occurrences even if no injury results",
                          "Requires reporting of certain occupational diseases",
                          "Specifies timeframes for different types of reports"
                        ]
                      }
                    ]}
                  />
                )}
                {expandedSection === "2" && (
                  <CourseContentSection 
                    sectionNumber="2"
                    title="Safe Working Environment Procedures"
                    description="Identifying and implementing procedures to maintain a safe working environment and establishing effective safety protocols."
                    icon="construction"
                    isMainSection={true}
                    subsections={[
                      {
                        id: "2.1",
                        title: "Workplace Inspection Procedures",
                        content: "Regular inspections are essential to identify potential hazards and maintain a safe working environment.",
                        keyPoints: [
                          "Daily pre-work safety checks of equipment and work area",
                          "Weekly documented inspections of all electrical equipment",
                          "Monthly comprehensive workplace safety audits",
                          "Methods for recording and addressing issues found during inspections"
                        ]
                      },
                      {
                        id: "2.2",
                        title: "Documentation and Record-Keeping",
                        content: "Proper documentation is crucial for maintaining safety standards and demonstrating compliance with regulations.",
                        keyPoints: [
                          "Requirements for risk assessments and method statements",
                          "Maintenance of equipment inspection records",
                          "Documentation of safety training and certifications",
                          "Incident reporting procedures and documentation"
                        ]
                      },
                      {
                        id: "2.3",
                        title: "Safety Communication Systems",
                        content: "Clear communication channels are vital for reporting and addressing safety concerns in the workplace.",
                        keyPoints: [
                          "Establishing clear reporting hierarchies for safety issues",
                          "Implementing toolbox talks and safety briefings",
                          "Creating systems for anonymous safety reporting",
                          "Regular safety meetings and updates"
                        ]
                      }
                    ]}
                  />
                )}
                {expandedSection === "3" && (
                  <CourseContentSection 
                    sectionNumber="3"
                    title="Basic Electrical Safety Requirements"
                    description="Recognizing the fundamental safety measures necessary when working with electrical systems to prevent accidents and injuries."
                    icon="warning"
                    isMainSection={true}
                    subsections={[
                      {
                        id: "3.1",
                        title: "Safe Isolation Procedures",
                        content: "Proper isolation is the cornerstone of electrical safety, ensuring power is completely off before work begins.",
                        keyPoints: [
                          "The five essential steps of safe isolation",
                          "Proper use and maintenance of isolation locks and tags",
                          "Verification procedures to confirm isolation",
                          "Documentation requirements for isolation procedures"
                        ]
                      },
                      {
                        id: "3.2",
                        title: "Test Equipment for Verification",
                        content: "Using appropriate test equipment is essential to verify that electrical systems are safely isolated.",
                        keyPoints: [
                          "Selection of appropriate test equipment for different applications",
                          "Proper testing procedures including the 'test-test-test' methodology",
                          "Calibration and maintenance requirements for test equipment",
                          "Common errors in verification testing and how to avoid them"
                        ]
                      },
                      {
                        id: "3.3",
                        title: "Circuit Protection Devices",
                        content: "Understanding the various protection devices used in electrical systems is crucial for safety.",
                        keyPoints: [
                          "Functions and applications of MCBs, RCDs, and fuses",
                          "Selection criteria for different protection devices",
                          "Testing and maintenance requirements",
                          "Coordination of protection devices in electrical systems"
                        ]
                      },
                      {
                        id: "3.4",
                        title: "Earthing and Bonding Requirements",
                        content: "Proper earthing and bonding are essential safety measures in electrical installations.",
                        keyPoints: [
                          "Purpose and principles of protective earthing",
                          "Main equipotential bonding requirements",
                          "Supplementary bonding in special locations",
                          "Testing and verification of earthing systems"
                        ]
                      }
                    ]}
                  />
                )}
                {expandedSection === "4" && (
                  <CourseContentSection 
                    sectionNumber="4"
                    title="Safety Requirements for Access Equipment"
                    description="Understanding the correct use and safety considerations for ladders, scaffolding, and other access tools used in electrical work."
                    icon="hardhat"
                    isMainSection={true}
                    subsections={[
                      {
                        id: "4.1",
                        title: "Ladder Safety and Inspection",
                        content: "Ladders are commonly used in electrical work and require specific safety measures.",
                        keyPoints: [
                          "Pre-use inspection procedures for ladders",
                          "Proper positioning and securing techniques",
                          "Maximum safe working heights and load ratings",
                          "Three points of contact rule and safe climbing practices"
                        ]
                      },
                      {
                        id: "4.2",
                        title: "Scaffolding Requirements",
                        content: "When working at height on scaffolding, specific safety measures must be followed.",
                        keyPoints: [
                          "Types of scaffolding appropriate for electrical work",
                          "Inspection tags and documentation requirements",
                          "Safe working practices on scaffolding platforms",
                          "Load limitations and material handling on scaffolds"
                        ]
                      },
                      {
                        id: "4.3",
                        title: "Mobile Elevated Work Platforms",
                        content: "MEWPs provide safe access for work at height but require specific training and precautions.",
                        keyPoints: [
                          "Types of MEWPs suitable for electrical installation work",
                          "Training and certification requirements for operators",
                          "Pre-use checks and operational safety measures",
                          "Emergency procedures when using MEWPs"
                        ]
                      },
                      {
                        id: "4.4",
                        title: "Weather Considerations",
                        content: "Weather conditions significantly impact the safety of access equipment, especially when used outdoors.",
                        keyPoints: [
                          "Wind speed limitations for different types of access equipment",
                          "Precautions for wet or icy conditions",
                          "Lightning risks when working at height",
                          "Temperature effects on equipment stability and worker safety"
                        ]
                      }
                    ]}
                  />
                )}
                {expandedSection === "5" && (
                  <CourseContentSection 
                    sectionNumber="5"
                    title="Identifying and Dealing with Hazards"
                    description="Developing the ability to spot potential hazards in electrical work environments and implementing appropriate control measures."
                    icon="warning"
                    isMainSection={true}
                    subsections={[
                      {
                        id: "5.1",
                        title: "Risk Assessment Process",
                        content: "A thorough risk assessment is essential before beginning any electrical work to identify and mitigate hazards.",
                        keyPoints: [
                          "Five steps of risk assessment: identify hazards, determine who might be harmed, evaluate risks, record findings, review assessment",
                          "Dynamic risk assessment techniques for changing conditions",
                          "Documentation requirements and templates",
                          "Review and updating procedures for risk assessments"
                        ]
                      },
                      {
                        id: "5.2",
                        title: "Common Electrical Hazards",
                        content: "Recognizing common hazards in electrical work is the first step in preventing accidents.",
                        keyPoints: [
                          "Electric shock and its physiological effects",
                          "Arc flash and blast hazards",
                          "Fire risks from electrical faults",
                          "Secondary hazards such as falls after shock"
                        ]
                      },
                      {
                        id: "5.3",
                        title: "Hierarchy of Control Measures",
                        content: "Understanding the hierarchy of controls helps in selecting the most effective safety measures.",
                        keyPoints: [
                          "Elimination - removing the hazard completely",
                          "Substitution - replacing with less hazardous alternatives",
                          "Engineering controls - redesigning equipment or processes",
                          "Administrative controls - changing work methods",
                          "Personal protective equipment - last line of defense"
                        ]
                      }
                    ]}
                  />
                )}
                {expandedSection === "6" && (
                  <CourseContentSection 
                    sectionNumber="6"
                    title="Safe Working Practices"
                    description="Demonstrating the application of health and safety knowledge in practical electrical installation tasks."
                    icon="safety"
                    isMainSection={true}
                    subsections={[
                      {
                        id: "6.1",
                        title: "Personal Protective Equipment",
                        content: "Using appropriate PPE is essential for protection against electrical hazards.",
                        keyPoints: [
                          "Selection of appropriate PPE for different electrical tasks",
                          "Proper use and maintenance of insulated tools and gloves",
                          "Arc flash protective clothing requirements",
                          "Eye and face protection for electrical work"
                        ]
                      },
                      {
                        id: "6.2",
                        title: "Safe Work Procedures",
                        content: "Following established procedures ensures consistency in safety practices across all electrical work.",
                        keyPoints: [
                          "Permit-to-work systems for high-risk electrical work",
                          "Lock-out/tag-out procedures for equipment isolation",
                          "Emergency response procedures for electrical incidents",
                          "Working alone protocols and communication requirements"
                        ]
                      },
                      {
                        id: "6.3",
                        title: "Tool and Equipment Safety",
                        content: "Proper handling and maintenance of tools is essential for electrical work safety.",
                        keyPoints: [
                          "Inspection requirements for electrical tools",
                          "PAT testing schedules and documentation",
                          "Storage and transportation of tools to prevent damage",
                          "Battery-powered vs. corded tools safety considerations"
                        ]
                      },
                      {
                        id: "6.4",
                        title: "Housekeeping Practices",
                        content: "Good housekeeping significantly reduces accidents and improves efficiency in electrical work.",
                        keyPoints: [
                          "Cable management techniques to prevent trips and falls",
                          "Material storage practices on job sites",
                          "Waste disposal procedures for electrical materials",
                          "End-of-day cleanup protocols"
                        ]
                      }
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Component for the clickable section boxes
const SectionBox = ({ 
  sectionNumber, 
  title, 
  isExpanded, 
  onClick 
}: { 
  sectionNumber: string; 
  title: string; 
  isExpanded: boolean; 
  onClick: () => void; 
}) => {
  return (
    <div 
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all
        ${isExpanded 
          ? 'bg-elec-yellow/20 border-2 border-elec-yellow shadow-lg' 
          : 'bg-elec-gray-light/20 border border-elec-yellow/10 hover:bg-elec-yellow/10'}
      `}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            {sectionNumber}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-3">{title}</h3>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-elec-yellow/40 bg-elec-gray text-elec-yellow hover:text-elec-dark hover:bg-elec-yellow flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent div's onClick
              onClick();
            }}
          >
            <BookOpen className="h-4 w-4" />
            {isExpanded ? 'Close' : 'Study'}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="absolute -right-1 -top-1">
          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-elec-yellow text-elec-dark text-xs">
            ✓
          </span>
        </div>
      )}
    </div>
  );
};

export default UnitDetails;
