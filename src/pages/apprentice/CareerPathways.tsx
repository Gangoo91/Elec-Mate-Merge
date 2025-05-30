
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Briefcase, Building, Zap, Users, Crown, Wrench } from "lucide-react";

const CareerPathways = () => {
  const careerPaths = [
    {
      title: "Qualified Electrician",
      timeframe: "2-4 years",
      description: "Complete your apprenticeship and become a fully qualified electrician",
      requirements: ["Complete Level 3 Electrical Installation", "AM2 Assessment", "NVQ Level 3"],
      opportunities: ["Domestic installations", "Commercial work", "Industrial maintenance"],
      icon: <Zap className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Specialist Electrician",
      timeframe: "3-6 years",
      description: "Specialise in specific areas of electrical work",
      requirements: ["Additional certifications", "Specialist training courses", "Experience in chosen field"],
      opportunities: ["Solar panel installation", "EV charging points", "Smart home systems", "Fire alarm systems"],
      icon: <Wrench className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Supervisor",
      timeframe: "5-8 years",
      description: "Lead teams of electricians and oversee electrical projects",
      requirements: ["Leadership experience", "Project management skills", "Additional qualifications"],
      opportunities: ["Site supervision", "Team management", "Quality control", "Training apprentices"],
      icon: <Users className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Contractor",
      timeframe: "6-10 years",
      description: "Start your own electrical contracting business",
      requirements: ["Business skills", "Financial management", "Insurance and certifications"],
      opportunities: ["Own business", "Client relationships", "Project bidding", "Team employment"],
      icon: <Briefcase className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Engineer",
      timeframe: "4-7 years",
      description: "Design electrical systems and work on complex projects",
      requirements: ["Higher education", "Engineering qualifications", "Design experience"],
      opportunities: ["System design", "Project planning", "Technical consultancy", "Research and development"],
      icon: <Building className="h-8 w-8 text-elec-yellow" />
    },
    {
      title: "Electrical Manager",
      timeframe: "8-12 years",
      description: "Manage electrical departments and major projects",
      requirements: ["Management experience", "Strategic thinking", "Advanced qualifications"],
      opportunities: ["Department management", "Strategic planning", "Budget control", "Policy development"],
      icon: <Crown className="h-8 w-8 text-elec-yellow" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Career Progression Pathways</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Explore the various career paths available in the electrical industry, from qualified electrician to senior management roles.
        </p>
        <BackButton customUrl="/apprentice/professional-development" label="Back to Professional Development" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {careerPaths.map((path, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/40 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {path.icon}
                <div className="flex-1">
                  <CardTitle className="text-xl text-elec-yellow">{path.title}</CardTitle>
                  <Badge variant="outline" className="mt-1 border-elec-yellow/40 text-elec-yellow">
                    {path.timeframe}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground">{path.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {path.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-3 w-3 text-elec-yellow" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Opportunities:</h4>
                <ul className="space-y-1">
                  {path.opportunities.map((opp, oppIndex) => (
                    <li key={oppIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="h-3 w-3 text-elec-yellow" />
                      {opp}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Planning Your Career Path</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Remember that career progression isn't always linear. You might move between different paths or combine specialities. 
            The key is to continuously develop your skills, gain experience, and build professional relationships within the industry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Short Term (1-3 years)</h4>
              <p className="text-muted-foreground">Focus on completing qualifications and gaining experience</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Medium Term (3-7 years)</h4>
              <p className="text-muted-foreground">Develop specialisations and leadership skills</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Long Term (7+ years)</h4>
              <p className="text-muted-foreground">Consider management, business ownership, or consulting roles</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPathways;
