
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Briefcase, DollarSign, ArrowUpRight, Calendar, BookOpen } from "lucide-react";

const IndustryInsights = () => {
  const marketTrends = [
    {
      title: "Renewable Energy Surge",
      growth: "+45%",
      description: "Solar and wind installation jobs increasing rapidly",
      impact: "High demand for certified PV installers",
      skillsNeeded: ["Solar PV", "Battery Storage", "Grid Connection"]
    },
    {
      title: "Smart Home Technology",
      growth: "+32%",
      description: "Home automation and IoT electrical systems",
      impact: "New specialisation opportunities emerging",
      skillsNeeded: ["IoT Systems", "Network Cabling", "Smart Controls"]
    },
    {
      title: "EV Charging Infrastructure",
      growth: "+67%",
      description: "Electric vehicle charging point installations",
      impact: "Specialist EV training highly valued",
      skillsNeeded: ["EV Charging", "High Power Systems", "Smart Metering"]
    }
  ];

  const salaryInsights = [
    { role: "Apprentice Electrician", min: "£18k", max: "£22k", experience: "0-2 years" },
    { role: "Qualified Electrician", min: "£28k", max: "£38k", experience: "2-5 years" },
    { role: "Senior Electrician", min: "£35k", max: "£48k", experience: "5-10 years" },
    { role: "Electrical Supervisor", min: "£42k", max: "£58k", experience: "8+ years" },
    { role: "Specialist (Solar/EV)", min: "£40k", max: "£65k", experience: "3+ years certified" }
  ];

  const upcomingEvents = [
    {
      title: "Electrical Careers Fair 2024",
      date: "15 March 2024",
      location: "NEC Birmingham",
      type: "Networking"
    },
    {
      title: "Renewable Energy Workshop",
      date: "22 March 2024",
      location: "Online",
      type: "Training"
    },
    {
      title: "IET Young Professionals Meet",
      date: "5 April 2024",
      location: "London",
      type: "Professional"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Trends */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Industry Growth Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {marketTrends.map((trend, index) => (
              <Card key={index} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">{trend.title}</h3>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {trend.growth}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{trend.description}</p>
                  <div className="text-sm font-medium text-elec-yellow mb-2">{trend.impact}</div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Key Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {trend.skillsNeeded.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Salary Insights */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-elec-yellow" />
            UK Electrical Industry Salary Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {salaryInsights.map((role, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-elec-dark/50 rounded-lg">
                <div>
                  <div className="font-medium text-white">{role.role}</div>
                  <div className="text-sm text-muted-foreground">{role.experience}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-elec-yellow">
                    {role.min} - {role.max}
                  </div>
                  <div className="text-xs text-muted-foreground">per year</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <strong className="text-elec-yellow">Note:</strong> Salaries vary by location, company size, 
              and specialisations. London and South East typically 15-25% higher.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Upcoming Industry Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-elec-dark/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-elec-yellow/10">
                    {event.type === 'Training' ? (
                      <BookOpen className="h-4 w-4 text-elec-yellow" />
                    ) : event.type === 'Networking' ? (
                      <Users className="h-4 w-4 text-elec-yellow" />
                    ) : (
                      <Briefcase className="h-4 w-4 text-elec-yellow" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{event.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {event.date} • {event.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-elec-yellow/30">
                    <ArrowUpRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryInsights;
