
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { careerPaths } from "./careerPathsData";
import CareerPathCard from "./CareerPathCard";
import CareerAdvancementTips from "./CareerAdvancementTips";
import CareerProgressionPaths from "./CareerProgressionPaths";
import ProgressTracker from "@/components/career/ProgressTracker";
import UKCareerProgressionTimeline from "./UKCareerProgressionTimeline";
import UKRegionalJobMarkets from "./UKRegionalJobMarkets";
import UKWorkSectors from "./UKWorkSectors";
import JIBGradingScheme from "./JIBGradingScheme";

const CareerPathways = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  if (selectedPath) {
    const path = careerPaths.find(p => p.id.toString() === selectedPath);
    if (!path) return null;

    // Define milestones for each career path
    const getMilestones = (pathId: string) => {
      const milestoneMap: Record<string, string[]> = {
        "1": [
          "Gain 2+ years post-qualification experience",
          "Complete Inspection & Testing (2391) qualification",
          "Register with NICEIC or NAPIT scheme",
          "Obtain professional indemnity insurance",
          "Complete first self-certification project"
        ],
        "2": [
          "Complete Level 3 Electrical Installation NVQ",
          "Pass AM2 practical assessment", 
          "Achieve 18th Edition BS 7671 certification",
          "Complete required on-the-job hours",
          "Register with JIB grading scheme"
        ],
        "3": [
          "Achieve approved electrician status",
          "Develop business management skills",
          "Create business plan and financial projections",
          "Register company and obtain insurances",
          "Secure first commercial contract"
        ],
        "4": [
          "Obtain relevant higher education qualification",
          "Develop design software proficiency",
          "Work towards Chartered Engineer status",
          "Complete complex engineering project",
          "Join professional engineering body"
        ],
        "5": [
          "Complete specialist maintenance training",
          "Gain PLC systems experience",
          "Master fault diagnosis techniques",
          "Develop preventative maintenance skills",
          "Obtain relevant industry certifications"
        ],
        "6": [
          "Achieve advanced certification",
          "Gain extensive field experience",
          "Develop regulatory expertise",
          "Build documentation skills",
          "Establish professional network"
        ],
        "7": [
          "Gain extensive electrical experience",
          "Complete management qualifications",
          "Develop leadership skills",
          "Build stakeholder management abilities",
          "Master budgeting and scheduling"
        ],
        "8": [
          "Complete standard electrical qualification",
          "Choose specialization area",
          "Complete specialist training courses",
          "Gain manufacturer certifications",
          "Build portfolio of specialist projects"
        ],
        "10": [
          "Complete HNC/HND in Electrical Engineering",
          "Master CAD software proficiency",
          "Learn design standards and regulations",
          "Develop load calculation skills",
          "Build technical drawing expertise"
        ],
        "11": [
          "Achieve advanced electrical qualification",
          "Complete specialized commissioning training",
          "Develop system testing skills",
          "Master troubleshooting techniques",
          "Build documentation expertise"
        ],
        "12": [
          "Complete Degree in Electrical Engineering",
          "Gain commissioning experience",
          "Develop project management skills",
          "Master control systems knowledge",
          "Build client management abilities"
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
              careerPathId={path.id.toString()}
              careerPathTitle={path.title}
              milestones={getMilestones(path.id.toString())}
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
        <h2 className="text-2xl font-semibold">UK Electrical Career Pathways</h2>
        <p className="text-muted-foreground">
          Comprehensive guide to electrical career progression in the UK, including JIB grading schemes, 
          regional opportunities, and sector-specific information to help you navigate your professional journey.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-elec-dark border border-elec-yellow/20">
          <TabsTrigger value="overview" className="data-[state=active]:bg-elec-yellow/20">Overview</TabsTrigger>
          <TabsTrigger value="timeline" className="data-[state=active]:bg-elec-yellow/20">Timeline</TabsTrigger>
          <TabsTrigger value="jib" className="data-[state=active]:bg-elec-yellow/20">JIB Grades</TabsTrigger>
          <TabsTrigger value="sectors" className="data-[state=active]:bg-elec-yellow/20">Work Sectors</TabsTrigger>
          <TabsTrigger value="regions" className="data-[state=active]:bg-elec-yellow/20">Regional Markets</TabsTrigger>
          <TabsTrigger value="paths" className="data-[state=active]:bg-elec-yellow/20">Career Paths</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <CareerAdvancementTips />
          <CareerProgressionPaths />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <UKCareerProgressionTimeline />
        </TabsContent>

        <TabsContent value="jib" className="space-y-6">
          <JIBGradingScheme />
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <UKWorkSectors />
        </TabsContent>

        <TabsContent value="regions" className="space-y-6">
          <UKRegionalJobMarkets />
        </TabsContent>

        <TabsContent value="paths" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((path) => (
              <div key={path.id} onClick={() => setSelectedPath(path.id.toString())} className="cursor-pointer">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerPathways;
