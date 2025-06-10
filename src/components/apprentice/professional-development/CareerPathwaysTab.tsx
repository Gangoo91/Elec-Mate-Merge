
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  MapPin, 
  Clock, 
  Award, 
  Users,
  Briefcase,
  GraduationCap,
  Target,
  PoundSterling,
  ChevronRight,
  Building,
  Zap
} from "lucide-react";

const CareerPathwaysTab = () => {
  const careerPaths = [
    {
      title: "Installation Electrician",
      level: "Entry Level",
      duration: "3-4 years",
      salaryRange: "£18k - £35k",
      description: "Install, maintain and repair electrical systems in domestic and commercial buildings",
      keySkills: ["Wiring Installation", "Testing & Inspection", "Fault Finding", "Customer Service"],
      progressionTo: ["Senior Electrician", "Electrical Supervisor"],
      qualifications: ["Level 3 Electrical Installation", "18th Edition", "Testing & Inspection"],
      demandLevel: 85,
      locations: ["London", "Birmingham", "Manchester", "Leeds"]
    },
    {
      title: "Industrial Electrician",
      level: "Specialist",
      duration: "4-5 years",
      salaryRange: "£32k - £55k",
      description: "Work on complex industrial electrical systems, PLCs, and automation",
      keySkills: ["PLC Programming", "Motor Control", "HV Systems", "Industrial Networks"],
      progressionTo: ["Controls Engineer", "Electrical Project Manager"],
      qualifications: ["Level 3 Electrical", "HV Authorization", "PLC Certification"],
      demandLevel: 92,
      locations: ["Manufacturing Hubs", "Industrial Estates", "Power Stations"]
    },
    {
      title: "Solar PV Installer",
      level: "Emerging Specialist",
      duration: "2-3 years",
      salaryRange: "£28k - £48k",
      description: "Install and maintain solar photovoltaic systems and battery storage",
      keySkills: ["Solar PV Design", "Battery Systems", "Grid Connection", "Energy Management"],
      progressionTo: ["Renewable Energy Consultant", "Project Manager"],
      qualifications: ["MCS Certification", "PV Installation", "Battery Storage"],
      demandLevel: 98,
      locations: ["South England", "Wales", "Scotland", "Nationwide"]
    },
    {
      title: "Electrical Design Engineer",
      level: "Technical Specialist",
      duration: "5-7 years",
      salaryRange: "£35k - £65k",
      description: "Design electrical systems and create technical drawings and specifications",
      keySkills: ["CAD Design", "Load Calculations", "Compliance", "Project Management"],
      progressionTo: ["Senior Design Engineer", "Engineering Manager"],
      qualifications: ["HNC/HND Electrical", "CAD Proficiency", "Design Experience"],
      demandLevel: 78,
      locations: ["London", "Edinburgh", "Bristol", "Cambridge"]
    },
    {
      title: "Electrical Supervisor",
      level: "Management",
      duration: "6-8 years",
      salaryRange: "£38k - £58k",
      description: "Supervise electrical teams and coordinate complex installations",
      keySkills: ["Team Leadership", "Project Coordination", "Quality Control", "Safety Management"],
      progressionTo: ["Electrical Manager", "Operations Director"],
      qualifications: ["SSSTS/SMSTS", "Management Training", "Advanced Technical"],
      demandLevel: 72,
      locations: ["Major Cities", "Construction Sites", "Industrial Areas"]
    },
    {
      title: "EV Charging Specialist",
      level: "Future Growth",
      duration: "1-2 years",
      salaryRange: "£30k - £50k",
      description: "Install and maintain electric vehicle charging infrastructure",
      keySkills: ["EV Charging Systems", "Smart Metering", "Network Communication", "Rapid Charging"],
      progressionTo: ["EV Infrastructure Manager", "Charging Network Engineer"],
      qualifications: ["EV Charging Certification", "Smart Systems", "Network Protocols"],
      demandLevel: 96,
      locations: ["Urban Areas", "Motorway Services", "Commercial Parks"]
    }
  ];

  const skillsInDemand = [
    { skill: "Solar PV Installation", growth: "+67%", salary: "£35k-£55k" },
    { skill: "EV Charging Systems", growth: "+89%", salary: "£32k-£48k" },
    { skill: "Smart Home Technology", growth: "+45%", salary: "£28k-£42k" },
    { skill: "Industrial Automation", growth: "+34%", salary: "£38k-£58k" },
    { skill: "Battery Storage Systems", growth: "+78%", salary: "£35k-£52k" },
    { skill: "Building Management Systems", growth: "+29%", salary: "£30k-£45k" }
  ];

  const certificationPathways = [
    {
      title: "Traditional Electrician Path",
      duration: "3-4 years",
      stages: [
        { name: "Apprenticeship Start", level: "Level 3 Electrical Installation", duration: "3 years" },
        { name: "Qualified Electrician", level: "18th Edition + AM2", duration: "6 months" },
        { name: "Experienced Worker", level: "Testing & Inspection", duration: "1 year" },
        { name: "Senior Electrician", level: "Design + Supervision", duration: "Ongoing" }
      ]
    },
    {
      title: "Renewable Energy Specialist",
      duration: "2-3 years",
      stages: [
        { name: "Basic Electrical", level: "Level 3 Foundation", duration: "2 years" },
        { name: "Solar PV Training", level: "MCS Certification", duration: "3 months" },
        { name: "Battery Systems", level: "Storage Specialist", duration: "6 months" },
        { name: "Grid Connection", level: "DNO Authorization", duration: "1 year" }
      ]
    }
  ];

  const regionsData = [
    {
      region: "London & South East",
      averageSalary: "£42k",
      jobGrowth: "+12%",
      topEmployers: ["Balfour Beatty", "Kier Group", "ISG"],
      specialties: ["Commercial Fit-out", "Data Centres", "Transport"]
    },
    {
      region: "North West",
      averageSalary: "£34k",
      jobGrowth: "+8%",
      topEmployers: ["United Utilities", "Electricity North West", "BAE Systems"],
      specialties: ["Industrial", "Manufacturing", "Nuclear"]
    },
    {
      region: "Scotland",
      averageSalary: "£36k",
      jobGrowth: "+15%",
      topEmployers: ["Scottish Power", "SSE", "Offshore Wind"],
      specialties: ["Renewable Energy", "Offshore", "Oil & Gas"]
    },
    {
      region: "Wales",
      averageSalary: "£32k",
      jobGrowth: "+18%",
      topEmployers: ["National Grid", "Celtic Energy", "Tata Steel"],
      specialties: ["Steel Industry", "Solar Farms", "Grid Infrastructure"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Career Pathways Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Electrical Career Pathways in the UK
          </CardTitle>
          <p className="text-muted-foreground">
            Explore different career paths in the electrical industry, from traditional roles to emerging specialties
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {careerPaths.map((path, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{path.title}</h3>
                        <Badge variant="outline" className="mt-1">
                          {path.level}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-elec-yellow font-semibold">{path.salaryRange}</div>
                        <div className="text-sm text-muted-foreground">{path.duration}</div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{path.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">Key Skills Required:</div>
                      <div className="flex flex-wrap gap-1">
                        {path.keySkills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Market Demand</span>
                        <span className="text-sm text-elec-yellow">{path.demandLevel}%</span>
                      </div>
                      <Progress value={path.demandLevel} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">Progression Opportunities:</div>
                      <div className="flex flex-wrap gap-1">
                        {path.progressionTo.map((role, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90">
                      View Career Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills in High Demand */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            High-Demand Skills & Growth Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsInDemand.map((skill, index) => (
              <div key={index} className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
                <div className="space-y-3">
                  <h3 className="font-semibold text-white">{skill.skill}</h3>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {skill.growth}
                    </Badge>
                    <span className="text-elec-yellow font-semibold">{skill.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certification Pathways */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Certification & Qualification Pathways
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {certificationPathways.map((pathway, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-elec-yellow" />
                  <h3 className="font-semibold text-white text-lg">{pathway.title}</h3>
                  <Badge variant="outline">{pathway.duration}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {pathway.stages.map((stage, stageIndex) => (
                    <div key={stageIndex} className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-elec-yellow text-black text-xs font-bold flex items-center justify-center">
                            {stageIndex + 1}
                          </div>
                          <h4 className="font-medium text-white text-sm">{stage.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{stage.level}</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{stage.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Opportunities */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            Regional Career Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionsData.map((region, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{region.region}</h3>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {region.jobGrowth}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Average Salary</div>
                        <div className="text-elec-yellow font-semibold">{region.averageSalary}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Job Growth</div>
                        <div className="text-green-400 font-semibold">{region.jobGrowth}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">Top Employers:</div>
                      <div className="flex flex-wrap gap-1">
                        {region.topEmployers.map((employer, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {employer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-white">Key Specialties:</div>
                      <div className="flex flex-wrap gap-1">
                        {region.specialties.map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathwaysTab;
