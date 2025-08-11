import { Button } from "@/components/ui/button";
import { Target, Brain, TrendingUp, BarChart3, Eye, Clock, Award, MapPin, PoundSterling, GraduationCap, ShieldCheck, Building, Briefcase, Home } from "lucide-react";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import EnhancedCareerOverview from "../../../apprentice/career/enhanced/EnhancedCareerOverview";
import UKCareerProgressionTimeline from "../../../apprentice/career/UKCareerProgressionTimeline";
import UKRegionalJobMarkets from "../../../apprentice/career/UKRegionalJobMarkets";

import JIBGradingScheme from "../../../apprentice/career/JIBGradingScheme";
import SkillsDevelopmentMatrix from "../../../apprentice/career/enhanced/SkillsDevelopmentMatrix";
import ProfessionalDevelopmentStrategy from "../../../apprentice/career/enhanced/ProfessionalDevelopmentStrategy";
import IndustryInsightsAnalysis from "../../../apprentice/career/enhanced/IndustryInsightsAnalysis";


const ElectricianCareerPathways = () => {

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
              <MobileAccordionTrigger icon={<MapPin className="h-5 w-5 text-blue-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Explore regions
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <UKRegionalJobMarkets />
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-wage-bands">
              <MobileAccordionTrigger icon={<PoundSterling className="h-5 w-5 text-green-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                JIB wage bands & allowances
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-xs">Reference only — always check the latest JIB rate sheets and company agreements.</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>Grades: Electrician, Approved Electrician, Technician — check JIB grade alignment.</li>
                    <li>Typical additions: travel time, lodge, overtime bands, shift premia (per agreement).</li>
                    <li>Sources: JIB, NAECI, company rate cards; verify regional uplifts (e.g. London weighting).</li>
                  </ul>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-hotspots">
              <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-orange-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Demand hotspots & top cities
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">High demand</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>London & South East — commercial fit‑out, data centres, EV charging</li>
                      <li>Midlands — manufacturing, logistics hubs, renewables</li>
                      <li>North West & North East — infrastructure, utilities, rail</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Top cities</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>London, Birmingham, Manchester, Leeds, Bristol, Glasgow</li>
                    </ul>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-apprenticeships">
              <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-blue-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Apprenticeships & providers
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  <li>National: JTL Training, City & Guilds centres, EAL approved centres</li>
                  <li>Lookup: local colleges, group training associations, employer academies</li>
                  <li>Tip: match provider to pathway (install, maintenance, data, renewables)</li>
                </ul>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-cost-of-living">
              <MobileAccordionTrigger icon={<Home className="h-5 w-5 text-yellow-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Cost of living & travel
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  <li>Balance day‑rate vs rent/lodging; check weekly lodge rates near sites</li>
                  <li>Transport: rail season tickets, road tolls, ULEZ/CAZ charges may apply</li>
                  <li>Travel time policies differ — confirm with employer or main contractor</li>
                </ul>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-compliance">
              <MobileAccordionTrigger icon={<ShieldCheck className="h-5 w-5 text-green-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Compliance & best practice
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  <li>BS 7671 (18th Edition) — ensure latest Amendment is applied</li>
                  <li>Part P (England & Wales), Scottish Building Standards, Building Regs (NI)</li>
                  <li>Certification schemes: NICEIC, NAPIT, SELECT, ECA — scope varies by region</li>
                </ul>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-employers-projects">
              <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-purple-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Key employers & major projects
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Employers</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Tier‑1 M&E contractors, FM providers, utilities, rail, data centres</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Projects</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>Hospitals, airports, commercial fit‑outs, energy & grid upgrades</li>
                    </ul>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-agencies">
              <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-pink-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Agencies & job boards
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                  <li>Specialist trades recruiters; verify JIB alignment and day‑rate structure</li>
                  <li>Use filters by region, sector, and certification requirements</li>
                  <li>Keep ECS card, AM2, 2391, EV/solar tickets visible on profile</li>
                </ul>
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