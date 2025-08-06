import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Brain, TrendingUp, BarChart3, Users, Eye, Clock, Award, Briefcase, MapPin } from "lucide-react";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import { careerPaths } from "../careerPathsData";
import CareerPathCard from "../CareerPathCard";
import EnhancedCareerOverview from "./EnhancedCareerOverview";
import ProgressTracker from "@/components/career/ProgressTracker";
import UKCareerProgressionTimeline from "../UKCareerProgressionTimeline";
import UKRegionalJobMarkets from "../UKRegionalJobMarkets";
import UKWorkSectors from "../UKWorkSectors";
import JIBGradingScheme from "../JIBGradingScheme";
import SkillsDevelopmentMatrix from "./SkillsDevelopmentMatrix";
import ProfessionalDevelopmentStrategy from "./ProfessionalDevelopmentStrategy";
import IndustryInsightsAnalysis from "./IndustryInsightsAnalysis";

const EnhancedCareerPathways = () => {
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
            <ArrowLeft className="h-4 w-4" /> Back to Career Pathways
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
                console.log('Progress updated for', path.title);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  const careerPathwaysTabs: DropdownTab[] = [
    {
      value: "overview",
      label: "Overview",
      icon: Eye,
      content: <EnhancedCareerOverview />
    },
    {
      value: "skills-matrix",
      label: "Skills Development",
      icon: Brain,
      content: <SkillsDevelopmentMatrix />
    },
    {
      value: "professional-development",
      label: "Professional Development",
      icon: Target,
      content: <ProfessionalDevelopmentStrategy />
    },
    {
      value: "industry-insights",
      label: "Industry Analysis",
      icon: BarChart3,
      content: <IndustryInsightsAnalysis />
    },
    {
      value: "timeline",
      label: "Timeline",
      icon: Clock,
      content: <UKCareerProgressionTimeline />
    },
    {
      value: "jib",
      label: "JIB Grades",
      icon: Award,
      content: <JIBGradingScheme />
    },
    {
      value: "sectors",
      label: "Work Sectors",
      icon: Briefcase,
      content: <UKWorkSectors />
    },
    {
      value: "regions",
      label: "Regional Markets",
      icon: MapPin,
      content: <UKRegionalJobMarkets />
    },
    {
      value: "paths",
      label: "Career Paths",
      icon: TrendingUp,
      content: (
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
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-elec-yellow" />
          UK Electrical Career Pathways
        </h1>
        <p className="text-muted-foreground text-center max-w-3xl mb-4">
          Comprehensive career development framework including skills matrices, professional development strategies, 
          industry insights, and progression pathways for electrical professionals in the UK
        </p>
      </div>

      <DropdownTabs 
        tabs={careerPathwaysTabs}
        defaultValue="overview"
        placeholder="Select career section"
        className="w-full"
      />
    </div>
  );
};

export default EnhancedCareerPathways;