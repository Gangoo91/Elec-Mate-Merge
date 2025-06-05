
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { careerPaths } from "./careerPathsData";
import CareerPathCard from "./CareerPathCard";
import CareerAdvancementTips from "./CareerAdvancementTips";
import CareerProgressionPaths from "./CareerProgressionPaths";
import ProgressTracker from "@/components/career/ProgressTracker";

const CareerPathways = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  if (selectedPath) {
    const path = careerPaths.find(p => p.id === selectedPath);
    if (!path) return null;

    // Define milestones for each career path
    const getMilestones = (pathId: string) => {
      const milestoneMap: Record<string, string[]> = {
        "qualified-electrician": [
          "Complete Level 3 Electrical Installation NVQ",
          "Pass AM2 practical assessment", 
          "Achieve 18th Edition BS 7671 certification",
          "Complete required on-the-job hours",
          "Register with JIB grading scheme"
        ],
        "approved-electrician": [
          "Gain 2+ years post-qualification experience",
          "Complete Inspection & Testing (2391) qualification",
          "Register with NICEIC or NAPIT scheme",
          "Obtain professional indemnity insurance",
          "Complete first self-certification project"
        ],
        "specialist-electrician": [
          "Choose specialization area",
          "Complete specialist training courses",
          "Gain manufacturer certifications",
          "Build portfolio of specialist projects",
          "Develop ongoing CPD plan"
        ],
        "electrical-contractor": [
          "Achieve approved electrician status",
          "Develop business management skills",
          "Create business plan and financial projections",
          "Register company and obtain insurances",
          "Secure first commercial contract"
        ],
        "electrical-supervisor": [
          "Gain extensive practical experience",
          "Develop leadership and communication skills",
          "Complete health and safety qualifications (SMSTS/SSSTS)",
          "Lead first team project",
          "Master project coordination skills"
        ],
        "electrical-engineer": [
          "Obtain relevant higher education qualification",
          "Develop design software proficiency",
          "Work towards Chartered Engineer status",
          "Complete complex engineering project",
          "Join professional engineering body"
        ]
      };
      return milestoneMap[pathId] || [];
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedPath(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Career Paths
          </Button>
          <h2 className="text-2xl font-semibold">{path.title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CareerPathCard {...path} />
          </div>
          <div>
            <ProgressTracker
              careerPathId={path.id}
              careerPathTitle={path.title}
              milestones={getMilestones(path.id)}
              onUpdateProgress={() => {
                // Progress updated - could trigger any necessary refreshes
                console.log('Progress updated for', path.title);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Career Pathways</h2>
        <p className="text-muted-foreground">
          The electrical industry offers diverse career paths with opportunities for advancement based on your interests, skills, and goals. 
          Below are key pathways you can explore as you progress in your electrical career, sorted by typical salary ranges from entry-level to advanced positions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careerPaths.map((path) => (
          <div key={path.id} onClick={() => setSelectedPath(path.id)} className="cursor-pointer">
            <CareerPathCard 
              title={path.title}
              requirements={path.requirements}
              description={path.description}
              icon={path.icon}
              skills={path.skills}
              salaryRange={path.salaryRange}
              timeToAchieve={path.timeToAchieve}
            />
          </div>
        ))}
      </div>

      <CareerAdvancementTips />
      <CareerProgressionPaths />
    </div>
  );
};

export default CareerPathways;
