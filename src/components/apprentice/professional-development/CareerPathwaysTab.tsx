
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Clock, 
  PoundSterling, 
  GraduationCap,
  Award,
  Building,
  Zap,
  Wrench,
  Shield,
  Target
} from "lucide-react";

const CareerPathwaysTab = () => {
  const careerPaths = [
    {
      title: "Domestic Electrician",
      icon: <Building className="h-6 w-6 text-blue-400" />,
      timeframe: "0-2 years post-qualification",
      salaryRange: "£25,000 - £35,000",
      description: "Residential electrical installations, maintenance, and repairs",
      requirements: [
        "Level 3 Electrical Installation qualification",
        "AM2 practical assessment",
        "18th Edition BS 7671",
        "Part P Building Regulations"
      ],
      progression: "→ Commercial Work → Specialist Areas → Self-Employment",
      color: "blue"
    },
    {
      title: "Commercial Electrician",
      icon: <Building className="h-6 w-6 text-green-400" />,
      timeframe: "2-5 years experience",
      salaryRange: "£30,000 - £45,000",
      description: "Office buildings, shops, and commercial installations",
      requirements: [
        "Domestic experience foundation",
        "Commercial wiring methods",
        "Fire alarm systems knowledge",
        "Emergency lighting understanding"
      ],
      progression: "→ Industrial Work → Project Management → Contracting",
      color: "green"
    },
    {
      title: "Industrial Electrician",
      icon: <Wrench className="h-6 w-6 text-amber-400" />,
      timeframe: "3-7 years experience",
      salaryRange: "£35,000 - £55,000",
      description: "Manufacturing plants, heavy machinery, and process control",
      requirements: [
        "Motor control systems",
        "PLC programming basics",
        "High voltage awareness",
        "Instrumentation knowledge"
      ],
      progression: "→ Maintenance Engineering → Control Systems → Plant Management",
      color: "amber"
    },
    {
      title: "Renewable Energy Specialist",
      icon: <Zap className="h-6 w-6 text-green-500" />,
      timeframe: "2-4 years + specialisation",
      salaryRange: "£35,000 - £50,000",
      description: "Solar PV, wind, battery storage, and green technology",
      requirements: [
        "Solar PV installation certification",
        "Battery storage systems",
        "Heat pump electrical work",
        "Grid connection knowledge"
      ],
      progression: "→ Energy Consultant → System Designer → Green Tech Business",
      color: "emerald"
    },
    {
      title: "Electrical Designer",
      icon: <GraduationCap className="h-6 w-6 text-purple-400" />,
      timeframe: "5+ years + education",
      salaryRange: "£40,000 - £65,000",
      description: "Electrical system design and engineering drawings",
      requirements: [
        "HNC/HND Electrical Engineering",
        "CAD software proficiency",
        "Design standards knowledge",
        "Load calculation expertise"
      ],
      progression: "→ Senior Designer → Principal Engineer → Chartered Engineer",
      color: "purple"
    },
    {
      title: "Inspection & Testing Specialist",
      icon: <Shield className="h-6 w-6 text-red-400" />,
      timeframe: "3-5 years + certification",
      salaryRange: "£35,000 - £50,000",
      description: "Electrical installation testing and certification",
      requirements: [
        "2391 Inspection & Testing",
        "Extensive testing experience",
        "Fault finding expertise",
        "Regulatory knowledge"
      ],
      progression: "→ Lead Inspector → Training Provider → Compliance Manager",
      color: "red"
    }
  ];

  const progressionStages = [
    {
      stage: "Apprentice",
      duration: "3-4 years",
      focus: "Learning fundamentals, gaining experience, completing qualification",
      salary: "£15,000 - £20,000"
    },
    {
      stage: "Newly Qualified",
      duration: "0-2 years",
      focus: "Building confidence, developing speed, learning business practices",
      salary: "£25,000 - £30,000"
    },
    {
      stage: "Experienced Electrician",
      duration: "2-7 years",
      focus: "Specialisation, leadership skills, advanced qualifications",
      salary: "£30,000 - £45,000"
    },
    {
      stage: "Senior/Specialist",
      duration: "7+ years",
      focus: "Expert knowledge, mentoring others, business development",
      salary: "£40,000 - £65,000+"
    }
  ];

  const factorsAffectingSalary = [
    {
      factor: "Location",
      impact: "High",
      description: "London and South East typically 20-30% higher than national average"
    },
    {
      factor: "Specialisation",
      impact: "High", 
      description: "High voltage, renewable energy, and automation command premium rates"
    },
    {
      factor: "Employment Type",
      impact: "Medium",
      description: "Self-employed often earn more but have additional responsibilities"
    },
    {
      factor: "Industry Sector",
      impact: "Medium",
      description: "Oil & gas, nuclear, and aerospace typically pay more than domestic"
    },
    {
      factor: "Qualifications",
      impact: "Medium",
      description: "Advanced certifications and degrees increase earning potential"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">UK Electrical Career Pathways</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Explore the diverse career opportunities available in the UK electrical industry. 
          Understanding these pathways helps you make informed decisions about your professional development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careerPaths.map((path, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-${path.color}-500/10`}>
                  {path.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {path.timeframe}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <PoundSterling className="h-3 w-3 mr-1" />
                  {path.salaryRange}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Requirements</h4>
                <ul className="space-y-1">
                  {path.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">Career Progression</h4>
                <p className="text-sm text-green-300">{path.progression}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Career Progression Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressionStages.map((stage, index) => (
              <div key={index} className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                    <span className="text-elec-yellow font-bold text-sm">{index + 1}</span>
                  </div>
                  <h4 className="font-medium text-white">{stage.stage}</h4>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{stage.duration}</p>
                <p className="text-sm text-slate-200 mb-3">{stage.focus}</p>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  {stage.salary}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PoundSterling className="h-5 w-5 text-elec-yellow" />
            Factors Affecting Salary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {factorsAffectingSalary.map((factor, index) => (
              <div key={index} className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{factor.factor}</h4>
                  <Badge 
                    className={`text-xs ${
                      factor.impact === 'High' 
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {factor.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Planning Your Career Path
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow">Key Considerations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Consider your interests and strengths when choosing specialisations
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Research local job markets and growth sectors in your area
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Plan qualifications and training well in advance
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  Build a network of professional contacts early in your career
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-elec-yellow">Next Steps</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Identify 2-3 career paths that interest you most
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Research the specific qualifications and experience needed
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Speak to professionals already working in those areas
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  Create a 5-year development plan with clear milestones
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathwaysTab;
