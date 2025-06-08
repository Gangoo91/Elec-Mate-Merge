
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, GraduationCap, Target, Users, Briefcase, Clock } from "lucide-react";

const CareerPathwaysTab = () => {
  const careerPaths = [
    {
      title: "Qualified Electrician",
      timeframe: "2-4 years",
      requirements: ["Level 3 Diploma", "AM2 Assessment", "NVQ Level 3"],
      description: "Complete your apprenticeship and become a fully qualified electrician",
      salaryRange: "£25k - £35k",
      icon: GraduationCap,
      color: "text-blue-400"
    },
    {
      title: "Specialist Electrician",
      timeframe: "3-6 years",
      requirements: ["Additional certifications", "Specialist training", "Experience"],
      description: "Specialise in areas like renewable energy, industrial systems, or smart homes",
      salaryRange: "£35k - £45k",
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Electrical Supervisor",
      timeframe: "5-8 years",
      requirements: ["Leadership training", "Project management", "Advanced qualifications"],
      description: "Lead teams and oversee electrical projects and installations",
      salaryRange: "£40k - £55k",
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Electrical Engineer",
      timeframe: "4-7 years",
      requirements: ["HNC/HND", "Degree (optional)", "Chartered status"],
      description: "Design electrical systems and advance into engineering roles",
      salaryRange: "£45k - £70k",
      icon: Briefcase,
      color: "text-orange-400"
    }
  ];

  const specialisations = [
    {
      area: "Renewable Energy",
      description: "Solar PV, wind, battery storage systems",
      growth: "+45%",
      demandLevel: "Very High"
    },
    {
      area: "Industrial Automation",
      description: "PLCs, control systems, robotics",
      growth: "+28%",
      demandLevel: "High"
    },
    {
      area: "Smart Buildings",
      description: "IoT, building management systems",
      growth: "+38%",
      demandLevel: "High"
    },
    {
      area: "Electric Vehicle Infrastructure",
      description: "EV charging points, high voltage systems",
      growth: "+67%",
      demandLevel: "Very High"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Career Progression Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {careerPaths.map((path, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-md bg-elec-yellow/10">
                    <path.icon className={`h-5 w-5 ${path.color}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{path.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="border-elec-yellow/40 text-elec-yellow text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {path.timeframe}
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                        {path.salaryRange}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-elec-light/80 mb-3">{path.description}</p>
                <div>
                  <h4 className="font-medium text-elec-yellow text-sm mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {path.requirements.map((req, idx) => (
                      <li key={idx} className="text-xs text-elec-light/80 flex items-center gap-2">
                        <span className="w-1 h-1 bg-elec-yellow rounded-full"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Target className="h-5 w-5" />
            High-Growth Specialisations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialisations.map((spec, index) => (
              <div key={index} className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-green-400">{spec.area}</h3>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/40 text-xs">
                    {spec.growth}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Market Demand</span>
                  <span className="text-sm font-medium text-green-400">{spec.demandLevel}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Next Steps for Career Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <h3 className="font-semibold mb-2 text-blue-400">Self-Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Identify your strengths, interests, and long-term career goals.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <h3 className="font-semibold mb-2 text-blue-400">Skills Gap Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Compare your current skills with your target role requirements.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
              <h3 className="font-semibold mb-2 text-blue-400">Action Planning</h3>
              <p className="text-sm text-muted-foreground">
                Create a step-by-step plan to achieve your career objectives.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathwaysTab;
