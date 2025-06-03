
import { Helmet } from "react-helmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, FileText, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import SafetyAlertsCard from "@/components/electrician/safety-shares/SafetyAlertsCard";
import LearningFromExperienceCard from "@/components/electrician/safety-shares/LearningFromExperienceCard";
import IndustryNewsCard from "@/components/electrician/safety-shares/IndustryNewsCard";
import MajorProjectsCard from "@/components/electrician/safety-shares/MajorProjectsCard";
import SafetyResourcesCard from "@/components/electrician/safety-shares/SafetyResourcesCard";

const SafetyShares = () => {
  const safetyCategories = [
    {
      icon: AlertTriangle,
      title: "Safety Alerts",
      description: "Critical safety warnings and alerts",
      link: "/electrician/safety-shares/safety-alerts",
      color: "text-red-400",
      bgColor: "bg-red-500/10"
    },
    {
      icon: BookOpen,
      title: "Learning From Experience",
      description: "Real incidents and lessons learned",
      link: "/electrician/safety-shares/learning-from-experience",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      icon: Newspaper,
      title: "Industry News",
      description: "Latest regulatory updates and news",
      link: "/electrician/safety-shares/industry-news",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Building,
      title: "Major Projects",
      description: "Industry projects and opportunities",
      link: "/electrician/safety-shares/major-projects",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: FileText,
      title: "Safety Resources",
      description: "Download guides and training materials",
      link: "/electrician/safety-shares/safety-resources",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white p-6">
      <Helmet>
        <title>Safety Shares - Elec-Mate</title>
        <meta name="description" content="Share safety knowledge, learn from experience, and stay updated with the latest electrical industry safety information" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-elec-yellow mb-4">Safety Shares</h1>
          <p className="text-xl text-gray-300 mb-6">
            Stay informed with the latest safety alerts, industry news, and learning opportunities from the electrical industry.
          </p>
          
          {/* Quick Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {safetyCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.title} to={category.link}>
                  <Card className={`border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all duration-300 transform hover:scale-105 ${category.bgColor}`}>
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <IconComponent className={`h-8 w-8 ${category.color} mb-2`} />
                        <h3 className="font-semibold text-white mb-1">{category.title}</h3>
                        <p className="text-xs text-gray-400">{category.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Live Content Feed - Single Column Layout for Wider Boxes */}
        <div className="space-y-8 mb-8">
          <SafetyAlertsCard />
          <LearningFromExperienceCard />
          <IndustryNewsCard />
          <MajorProjectsCard />
          <SafetyResourcesCard />
        </div>

        {/* Subscription Notice */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Bell className="h-6 w-6 text-elec-yellow mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-300 mb-4">
                  Get instant notifications for critical safety alerts and industry updates. 
                  Subscribe to categories that matter to your work.
                </p>
                <div className="text-sm text-gray-400">
                  Sign in to manage your notification preferences and never miss important safety information.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyShares;
