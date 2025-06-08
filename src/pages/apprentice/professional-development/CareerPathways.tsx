
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, GraduationCap, TrendingUp, Award, Users, Target, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const CareerPathways = () => {
  const careerPaths = [
    {
      title: "Qualified Electrician",
      timeframe: "2-4 years",
      requirements: ["Level 3 Diploma", "AM2 Assessment", "NVQ Level 3"],
      description: "Complete your apprenticeship and become a fully qualified electrician",
      icon: GraduationCap,
      color: "text-blue-400"
    },
    {
      title: "Specialist Electrician",
      timeframe: "3-6 years",
      requirements: ["Additional certifications", "Specialist training", "Experience"],
      description: "Specialise in areas like renewable energy, industrial systems, or smart homes",
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Electrical Supervisor",
      timeframe: "5-8 years",
      requirements: ["Leadership training", "Project management", "Advanced qualifications"],
      description: "Lead teams and oversee electrical projects and installations",
      icon: Users,
      color: "text-purple-400"
    },
    {
      title: "Electrical Engineer",
      timeframe: "4-7 years",
      requirements: ["HNC/HND", "Degree (optional)", "Chartered status"],
      description: "Design electrical systems and advance into engineering roles",
      icon: Briefcase,
      color: "text-orange-400"
    }
  ];

  const specialisations = [
    {
      area: "Renewable Energy",
      description: "Solar PV, wind, battery storage systems",
      growth: "+45%",
      salaryRange: "£35k - £65k"
    },
    {
      area: "Industrial Automation",
      description: "PLCs, control systems, robotics",
      growth: "+28%",
      salaryRange: "£40k - £70k"
    },
    {
      area: "Smart Buildings",
      description: "IoT, building management systems",
      growth: "+38%",
      salaryRange: "£38k - £60k"
    },
    {
      area: "Electric Vehicle Infrastructure",
      description: "EV charging points, high voltage systems",
      growth: "+67%",
      salaryRange: "£35k - £58k"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Career Progression Paths</h1>
          <p className="text-muted-foreground">Explore your options for advancing your electrical career</p>
        </div>
        <Link to="/apprentice/professional-development" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professional Development
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careerPaths.map((path, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <path.icon className={`h-6 w-6 ${path.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <p className="text-sm text-elec-light/70">{path.timeframe}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{path.description}</p>
              <div>
                <h4 className="font-semibold mb-2 text-elec-yellow">Requirements:</h4>
                <ul className="space-y-1">
                  {path.requirements.map((req, idx) => (
                    <li key={idx} className="text-sm text-elec-light/80 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            High-Growth Specialisations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialisations.map((spec, index) => (
              <div key={index} className="p-4 rounded-lg bg-elec-dark/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-elec-yellow">{spec.area}</h3>
                  <span className="text-sm text-green-400">{spec.growth}</span>
                </div>
                <p className="text-sm text-elec-light/80 mb-3">{spec.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Salary Range</span>
                  <span className="text-sm font-medium text-elec-yellow">{spec.salaryRange}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            Next Steps for Career Advancement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Skills Development</h3>
              <p className="text-sm text-elec-light/80">
                Continuously update your skills with new technologies and regulations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Professional Networking</h3>
              <p className="text-sm text-elec-light/80">
                Build relationships within the industry to discover opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Further Education</h3>
              <p className="text-sm text-elec-light/80">
                Consider higher qualifications like HNC/HND or degree programmes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathways;
