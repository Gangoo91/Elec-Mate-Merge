
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, FileText, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyShares = () => {
  const safetyCategories = [
    {
      icon: AlertTriangle,
      title: "Safety Alerts",
      description: "Critical safety warnings and real-time alerts",
      link: "/electrician/safety-shares/alerts",
      count: "12 Active"
    },
    {
      icon: BookOpen,
      title: "Learning From Experience",
      description: "Real incidents, near misses, and lessons learned",
      link: "/electrician/safety-shares/lfe",
      count: "25 Reports"
    },
    {
      icon: Newspaper,
      title: "Industry News",
      description: "Latest regulatory updates and compliance information",
      link: "/electrician/safety-shares/news",
      count: "Weekly Updates"
    },
    {
      icon: Building,
      title: "Major Projects",
      description: "Industry projects and emerging opportunities",
      link: "/electrician/safety-shares/projects",
      count: "£2B+ Value"
    },
    {
      icon: FileText,
      title: "Safety Resources",
      description: "Guides, toolbox talks, and training materials",
      link: "/electrician/safety-shares/resources",
      count: "50+ Resources"
    }
  ];

  const statsCards = [
    {
      icon: Users,
      title: "Active Users",
      value: "2,400+",
      description: "Safety professionals engaged"
    },
    {
      icon: TrendingUp,
      title: "Safety Improvement",
      value: "23%",
      description: "Incident reduction this year"
    },
    {
      icon: AlertTriangle,
      title: "Alerts Issued",
      value: "156",
      description: "Critical safety notifications"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Safety Shares - Elec-Mate</title>
        <meta name="description" content="Share safety knowledge, learn from experience, and stay updated with the latest electrical industry safety information" />
      </Helmet>
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Clean Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-6 tracking-tight">
            Safety Shares
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your central hub for electrical safety information and knowledge sharing
          </p>
        </div>

        {/* Stats Cards - Simplified */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="border-0 bg-elec-gray/40 backdrop-blur-sm hover:bg-elec-gray/60 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <IconComponent className="h-8 w-8 text-elec-yellow mx-auto mb-4" />
                  <div className="text-3xl font-light text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Clean Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {safetyCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.title} to={category.link} className="group block">
                <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 h-full">
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="w-16 h-16 bg-elec-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-elec-yellow/20 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-elec-yellow" />
                      </div>
                      
                      <h3 className="text-xl font-medium text-white mb-4 group-hover:text-elec-yellow transition-colors duration-300">
                        {category.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {category.description}
                      </p>
                    </div>
                    
                    <div className="text-xs text-elec-yellow/80 font-medium">
                      {category.count}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Simple Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Stay informed with the latest safety standards and industry best practices
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyShares;
