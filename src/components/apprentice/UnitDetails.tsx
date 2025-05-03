
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import UnitProgressBar from "@/components/apprentice/UnitProgressBar";
import UnitResourceList from "@/components/apprentice/UnitResourceList";
import CourseContentSection from "@/components/apprentice/CourseContentSection";
import type { CourseUnit } from "@/data/courseUnits";

interface UnitDetailsProps {
  unit: CourseUnit;
  onResourceClick: (type: string) => void;
  completedResources: Record<string, boolean>;
  onToggleResourceComplete: (resourceId: string) => void;
}

const UnitDetails = ({ unit, onResourceClick, completedResources, onToggleResourceComplete }: UnitDetailsProps) => {
  // Calculate progress for this unit
  const calculateProgress = () => {
    if (unit.resources.length === 0) return 0;
    
    const completedCount = unit.resources.filter(
      resource => completedResources[resource.id]
    ).length;
    
    return Math.round((completedCount / unit.resources.length) * 100);
  };

  const progressPercent = calculateProgress();

  // Health and safety content - only show for unit ELEC2/01
  const showHealthSafetyContent = unit.code === "ELEC2/01";

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap className="h-6 w-6 text-elec-yellow" />
          <h2 className="text-xl font-semibold">{unit.title} <span className="text-elec-yellow">({unit.code})</span></h2>
        </div>
        
        <p className="text-muted-foreground">{unit.description}</p>
        
        <UnitProgressBar progressPercent={progressPercent} />
        
        <UnitResourceList 
          resources={unit.resources}
          onResourceClick={onResourceClick}
          completedResources={completedResources}
          onToggleResourceComplete={onToggleResourceComplete}
        />

        {/* Health and Safety Content - Only for ELEC2/01 */}
        {showHealthSafetyContent && (
          <div className="mt-8">
            <h3 className="font-semibold text-xl mb-6">Health and Safety in Electrical Installation</h3>
            
            <CourseContentSection 
              title="Health and Safety Legislation in Electrical Work"
              description="Understand how health and safety applies to electrotechnical operations and comprehend the relevance of health and safety legislation in electrical work."
              icon="safety"
              keyPoints={[
                "The Health and Safety at Work Act 1974 is the primary legislation governing workplace safety",
                "The Electricity at Work Regulations 1989 specifically addresses electrical safety standards",
                "Construction Design and Management (CDM) Regulations apply to construction projects",
                "The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR) requires reporting of workplace incidents"
              ]}
            />
            
            <CourseContentSection 
              title="Safe Working Environment Procedures"
              description="Identify and implement procedures to maintain a safe working environment and understand the importance of establishing safety protocols."
              icon="construction"
              keyPoints={[
                "Regular workplace inspections are essential to maintain safety standards",
                "Proper documentation and record-keeping of safety procedures and incidents",
                "Clear communication channels for reporting safety concerns",
                "Implementation of safety training programs and regular updates",
                "Use of appropriate signage and barriers to mark hazardous areas"
              ]}
            />
            
            <CourseContentSection 
              title="Basic Electrical Safety Requirements"
              description="Recognize the fundamental safety measures necessary when working with electrical systems."
              icon="warning"
              keyPoints={[
                "Safe isolation procedures to ensure power is off before work begins",
                "Use of approved test equipment to verify isolation",
                "Understanding of circuit protection devices like MCBs, RCDs, and fuses",
                "Knowledge of earthing and bonding requirements",
                "Awareness of IP ratings and appropriate equipment selection for different environments"
              ]}
            />
            
            <CourseContentSection 
              title="Safety Requirements for Access Equipment"
              description="Understand the correct use and safety considerations for ladders, scaffolding, and other access tools."
              icon="hardhat"
              keyPoints={[
                "Inspection protocols for ladders and scaffolding before use",
                "Correct positioning and securing of access equipment",
                "Weight limitations and load-bearing considerations",
                "Appropriate training requirements for different access equipment",
                "Weather considerations when using access equipment outdoors"
              ]}
            />
            
            <CourseContentSection 
              title="Identifying and Dealing with Hazards"
              description="Develop the ability to spot potential hazards and implement appropriate control measures."
              icon="warning"
              keyPoints={[
                "Conducting thorough risk assessments before beginning work",
                "Identifying common electrical hazards like exposed conductors or damaged insulation",
                "Understanding the hierarchy of control measures",
                "Implementation of appropriate control measures based on risk level",
                "Regular review and update of hazard controls"
              ]}
            />
            
            <CourseContentSection 
              title="Safe Working Practices"
              description="Demonstrate the application of health and safety knowledge in practical tasks and carry out safe working practices."
              icon="safety"
              keyPoints={[
                "Use of appropriate Personal Protective Equipment (PPE)",
                "Following established safety procedures and protocols",
                "Proper handling and storage of tools and equipment",
                "Maintaining good housekeeping practices in work areas",
                "Effective communication with team members about safety concerns"
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnitDetails;
