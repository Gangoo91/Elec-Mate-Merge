
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Users, BookOpen, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const ApprenticeshipExpectations = () => {
  const isMobile = useIsMobile();

  const yearCards = [
    {
      year: "Year 1",
      title: "Foundation Year",
      icon: BookOpen,
      description: "Building the fundamentals of electrical work and developing safety awareness",
      highlights: ["Basic electrical theory", "Health & safety", "Tool familiarisation", "Following instructions"],
      route: "/apprentice/toolbox/apprenticeship-expectations/year-1",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      year: "Year 2", 
      title: "Development Year",
      icon: Users,
      description: "Developing practical skills and taking on increased responsibility",
      highlights: ["Cable installation", "Basic wiring", "Circuit understanding", "Supervised work"],
      route: "/apprentice/toolbox/apprenticeship-expectations/year-2",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30"
    },
    {
      year: "Year 3",
      title: "Competence Year", 
      icon: Calendar,
      description: "Building independence and developing specialist electrical skills",
      highlights: ["Testing procedures", "Fault finding", "Customer interaction", "Independent work"],
      route: "/apprentice/toolbox/apprenticeship-expectations/year-3",
      color: "from-orange-500/20 to-amber-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      year: "Year 4",
      title: "Mastery Year",
      icon: Award,
      description: "Preparing for qualification and future career progression",
      highlights: ["Advanced installations", "Mentoring others", "Project responsibility", "Final assessments"],
      route: "/apprentice/toolbox/apprenticeship-expectations/year-4",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 animate-fade-in max-w-7xl">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex justify-start">
            <Link to="/apprentice/toolbox">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"} 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {isMobile ? "Back" : "Back to Toolbox"}
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-3 px-2">
            <h1 className={`font-bold tracking-tight text-elec-yellow leading-tight ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
              Apprenticeship Journey
            </h1>
            <p className={`text-muted-foreground leading-relaxed max-w-3xl mx-auto ${isMobile ? 'text-sm px-1' : 'text-base'}`}>
              Navigate through your four-year electrical apprenticeship journey. Each year brings new challenges, 
              skills, and opportunities for growth in the electrical industry.
            </p>
          </div>
        </div>

        {/* Year Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {yearCards.map((yearData, index) => (
            <Link key={index} to={yearData.route} className="block">
              <Card className={`${yearData.borderColor} bg-gradient-to-br ${yearData.color} backdrop-blur border hover:border-elec-yellow/40 transition-all duration-300 group cursor-pointer h-full`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors">
                        <yearData.icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-elec-yellow group-hover:text-elec-yellow/90 transition-colors">
                          {yearData.year}
                        </CardTitle>
                        <p className="text-sm font-medium text-white/80">{yearData.title}</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-elec-yellow/60 group-hover:text-elec-yellow group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {yearData.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-white mb-2 text-sm">Key Focus Areas:</h4>
                    <ul className="space-y-1">
                      {yearData.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-elec-yellow rounded-full flex-shrink-0"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Information Section */}
        <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg p-4 sm:p-6 mt-8">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 text-center">
            Your Apprenticeship Journey
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20">
              <h3 className="font-medium text-white mb-1">Duration</h3>
              <p className="text-muted-foreground">4 years full-time</p>
            </div>
            <div className="text-center p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20">
              <h3 className="font-medium text-white mb-1">Qualification</h3>
              <p className="text-muted-foreground">Level 3 Electrical Installation</p>
            </div>
            <div className="text-center p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20">
              <h3 className="font-medium text-white mb-1">Outcome</h3>
              <p className="text-muted-foreground">Qualified Electrician</p>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-green-500/10 border border-elec-yellow/30 rounded-lg p-4 sm:p-6 shadow-lg">
          <p className={`text-center text-muted-foreground leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
            <strong className="text-elec-yellow">Remember:</strong> Every electrician started as an apprentice. 
            Your journey will have challenges, but with dedication and the right mindset, you'll develop the skills 
            and knowledge to become a qualified professional in the electrical industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApprenticeshipExpectations;
