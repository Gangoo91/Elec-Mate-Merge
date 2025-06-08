
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Clock, Users, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const ContinuingEducation = () => {
  const educationOptions = [
    {
      title: "HNC/HND in Electrical Engineering",
      provider: "Colleges & Universities",
      duration: "2-3 years part-time",
      level: "Level 4-5",
      icon: BookOpen,
      description: "Higher level qualification for career advancement"
    },
    {
      title: "Renewable Energy Courses",
      provider: "Various providers",
      duration: "1-5 days",
      level: "Specialist",
      icon: Lightbulb,
      description: "Solar PV, heat pumps, and green energy systems"
    },
    {
      title: "Smart Home Technology",
      provider: "Industry providers",
      duration: "2-3 days",
      level: "Emerging",
      icon: Users,
      description: "Home automation and IoT electrical systems"
    },
    {
      title: "Electric Vehicle Charging",
      provider: "NICEIC, NAPIT",
      duration: "1-2 days",
      level: "Growing Market",
      icon: Clock,
      description: "EV charging point installation and maintenance"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Continuing Education</h1>
          <p className="text-muted-foreground">Keep your skills current and expand into new areas</p>
        </div>
        <Link to="/apprentice/professional-development" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professional Development
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {educationOptions.map((option, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-elec-yellow/10">
                  <option.icon className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <p className="text-sm text-elec-light/70">{option.provider}</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-blue-500/10 rounded text-blue-400">
                {option.level}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{option.description}</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                <span className="text-sm">{option.duration}</span>
              </div>
              <Button className="w-full" size="sm">
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Why Continue Learning?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Stay Current</h3>
              <p className="text-sm text-elec-light/80">
                Technology and regulations are constantly evolving. Continuing education keeps you relevant.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Higher Earnings</h3>
              <p className="text-sm text-elec-light/80">
                Specialist skills command premium rates and open doors to better opportunities.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-elec-yellow">Future-Proof Career</h3>
              <p className="text-sm text-elec-light/80">
                Green energy and smart technology are the future of electrical work.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducation;
