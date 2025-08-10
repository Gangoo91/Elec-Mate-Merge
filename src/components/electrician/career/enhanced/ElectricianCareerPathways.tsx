import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Brain, TrendingUp, BarChart3, Users, Eye, Clock, Award, Briefcase, MapPin } from "lucide-react";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { careerPaths } from "../../../apprentice/career/careerPathsData";
import CareerPathCard from "../../../apprentice/career/CareerPathCard";
import EnhancedCareerOverview from "../../../apprentice/career/enhanced/EnhancedCareerOverview";
import ProgressTracker from "@/components/career/ProgressTracker";
import UKCareerProgressionTimeline from "../../../apprentice/career/UKCareerProgressionTimeline";
import UKRegionalJobMarkets from "../../../apprentice/career/UKRegionalJobMarkets";
import UKWorkSectors from "../../../apprentice/career/UKWorkSectors";
import JIBGradingScheme from "../../../apprentice/career/JIBGradingScheme";
import SkillsDevelopmentMatrix from "../../../apprentice/career/enhanced/SkillsDevelopmentMatrix";
import ProfessionalDevelopmentStrategy from "../../../apprentice/career/enhanced/ProfessionalDevelopmentStrategy";
import IndustryInsightsAnalysis from "../../../apprentice/career/enhanced/IndustryInsightsAnalysis";


const ElectricianCareerPathways = () => {
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
      content: (
        <div className="space-y-4">
          {/* Metrics tiles - match JIB colours and spacing */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-5 w-5 text-purple-400" />
                <div className="text-elec-yellow text-base font-semibold">Work sectors</div>
              </div>
              <div className="text-xs text-muted-foreground">Domestic, Commercial, Industrial, Specialist</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-5 w-5 text-elec-yellow" />
                <div className="text-elec-yellow text-base font-semibold">Typical day rates</div>
              </div>
              <div className="text-xs text-muted-foreground">~£150–£450/day (scope & experience)</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-5 w-5 text-green-400" />
                <div className="text-elec-yellow text-base font-semibold">Market demand</div>
              </div>
              <div className="text-xs text-muted-foreground">Testing, EV, Data, Renewables in demand</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-5 w-5 text-blue-400" />
                <div className="text-elec-yellow text-base font-semibold">Key skills</div>
              </div>
              <div className="text-xs text-muted-foreground">I&T (2391), containment, LV design, H&S</div>
            </div>
          </div>

          {/* Accordion layout */}
          <MobileAccordion type="multiple" className="w-full">
            <MobileAccordionItem value="sectors-explore">
              <MobileAccordionTrigger className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4">
                Explore sectors
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <UKWorkSectors />
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="sectors-insights">
              <MobileAccordionTrigger className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4">
                Sector insights & guidance
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-md border border-elec-yellow/10 bg-elec-dark/40 p-3">
                    <p className="text-sm font-medium mb-2">High‑growth areas</p>
                    <ul className="text-sm list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>EV charge points and renewables integration</li>
                      <li>Data/comms and smart building systems</li>
                      <li>Testing, inspection and periodic reports</li>
                    </ul>
                  </div>
                  <div className="rounded-md border border-elec-yellow/10 bg-elec-dark/40 p-3">
                    <p className="text-sm font-medium mb-2">Progression tips</p>
                    <ul className="text-sm list-disc pl-4 space-y-1 text-muted-foreground">
                      <li>Build a portfolio of sector‑specific projects</li>
                      <li>Maintain CPD aligned to BS 7671 (18th)</li>
                      <li>Collect references and manufacturer certs</li>
                    </ul>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="sectors-pay">
              <MobileAccordionTrigger className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4">
                Pay rates & allowances
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="rounded-md border border-elec-yellow/10 bg-elec-dark/40 p-3">
                    <p className="font-medium mb-1">Domestic</p>
                    <p className="text-muted-foreground">£150–£250/day</p>
                  </div>
                  <div className="rounded-md border border-elec-yellow/10 bg-elec-dark/40 p-3">
                    <p className="font-medium mb-1">Commercial</p>
                    <p className="text-muted-foreground">£180–£350/day</p>
                  </div>
                  <div className="rounded-md border border-elec-yellow/10 bg-elec-dark/40 p-3">
                    <p className="font-medium mb-1">Industrial</p>
                    <p className="text-muted-foreground">£200–£400/day</p>
                  </div>
                  <div className="rounded-md border border-elec-yellow/10 bg-elec-dark/40 p-3">
                    <p className="font-medium mb-1">Specialist</p>
                    <p className="text-muted-foreground">£250–£450+/day</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Guide only. Varies by region, certs, experience and scope.</p>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="sectors-compliance">
              <MobileAccordionTrigger className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4">
                Compliance & best practice
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <ul className="text-sm list-disc pl-4 space-y-1 text-muted-foreground">
                  <li>BS 7671:2018 (18th Edition) requirements</li>
                  <li>Building Regs (Part P), Health & Safety, RAMS</li>
                  <li>ECS/JIB grading, insurance and calibration records</li>
                </ul>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>
      )
    },
    {
      value: "regions",
      label: "Regional Markets",
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Regions</div>
              <div className="text-xs text-muted-foreground">UK coverage</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Rates</div>
              <div className="text-xs text-muted-foreground">Highest areas</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Demand</div>
              <div className="text-xs text-muted-foreground">Current market</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Starters</div>
              <div className="text-xs text-muted-foreground">Best regions</div>
            </div>
          </div>
          <MobileAccordion type="single" collapsible className="w-full">
            <MobileAccordionItem value="regions-overview">
              <MobileAccordionTrigger className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4">
                Explore regions
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <UKRegionalJobMarkets />
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>
      )
    },
    {
      value: "paths",
      label: "Career Paths",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Total paths</div>
              <div className="text-xs text-muted-foreground">{careerPaths.length}</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Fastest route</div>
              <div className="text-xs text-muted-foreground">~1–2 yrs</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Top earnings</div>
              <div className="text-xs text-muted-foreground">£80k+</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Popular</div>
              <div className="text-xs text-muted-foreground">QS, Specialist</div>
            </div>
          </div>

          <MobileAccordion type="single" collapsible className="w-full">
            <MobileAccordionItem value="paths-browse">
              <MobileAccordionTrigger className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4">
                Browse career paths
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-elec-yellow" />
          UK Electrical Career Pathways
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-3xl mb-3">
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

export default ElectricianCareerPathways;