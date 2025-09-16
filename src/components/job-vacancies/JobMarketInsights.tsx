import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  MapPin, 
  Target,
  Lightbulb,
  BookOpen,
  Award,
  Calendar,
  Zap
} from "lucide-react";

interface JobMarketInsightsProps {
  jobCount?: number;
}

const JobMarketInsights: React.FC<JobMarketInsightsProps> = ({ jobCount = 0 }) => {
  const isMobile = useIsMobile();

  const quickTips = [
    {
      icon: Clock,
      title: "Apply within 48 hours",
      description: "Early applications get 3x better response rates"
    },
    {
      icon: Target,
      title: "Tailor your CV",
      description: "Highlight relevant certifications and experience"
    },
    {
      icon: MapPin,
      title: "Expand your radius",
      description: "Consider jobs within 25 miles for more opportunities"
    },
    {
      icon: Calendar,
      title: "Peak hiring seasons",
      description: "March-May and September-November see most job postings"
    },
    {
      icon: TrendingUp,
      title: "Track applications",
      description: "Keep a record of applications and follow up after 1 week"
    },
    {
      icon: Users,
      title: "Network actively",
      description: "70% of jobs come through professional connections"
    }
  ];

  const careerDevelopment = [
    {
      icon: BookOpen,
      title: "BS7671 18th Edition",
      description: "Stay current with the latest wiring regulations and safety standards"
    },
    {
      icon: Zap,
      title: "EV Charging & Solar",
      description: "Specialise in high-demand renewable energy installations"
    },
    {
      icon: Award,
      title: "NICEIC/NAPIT Registration",
      description: "Maintain your professional registration for credibility"
    },
    {
      icon: Users,
      title: "Trade Associations",
      description: "Join professional networks for career opportunities"
    },
    {
      icon: TrendingUp,
      title: "Additional Certifications",
      description: "PAT testing, fire alarm systems, emergency lighting"
    },
    {
      icon: Lightbulb,
      title: "Smart Home Technology",
      description: "Learn home automation and IoT device installation"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Market Statistics */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-elec-yellow">{jobCount}</div>
              <div className="text-sm text-white">Available Jobs</div>
            </div>
            <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-green-400">94%</div>
              <div className="text-sm text-white">Employment Rate</div>
            </div>
            <div className="text-center p-3 bg-elec-yellow/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">£32k</div>
              <div className="text-sm text-white">Average Salary</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips and Career Development */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Quick Tips */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
                <tip.icon className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-white text-sm">{tip.title}</div>
                  <div className="text-xs text-white/80 mt-1">{tip.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Career Development */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              Career Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {careerDevelopment.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/10">
                <item.icon className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-white text-sm">{item.title}</div>
                  <div className="text-xs text-white/80 mt-1">{item.description}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* High Demand Skills */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <Award className="h-5 w-5 text-elec-yellow" />
            High Demand Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "EV Charging Installation",
              "Solar Panel Systems", 
              "Smart Home Automation",
              "Emergency Lighting",
              "Fire Alarm Systems",
              "PAT Testing",
              "Data Cabling",
              "CCTV Installation",
              "Heat Pump Electrical",
              "Battery Storage Systems"
            ].map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/30 transition-colors"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobMarketInsights;