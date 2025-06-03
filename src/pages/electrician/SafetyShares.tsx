
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, FileText, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyShares = () => {
  const safetyCategories = [
    {
      icon: AlertTriangle,
      title: "Safety Alerts",
      description: "Critical safety warnings and real-time alerts from industry bodies",
      link: "/electrician/safety-shares/alerts",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      count: "12+ Active"
    },
    {
      icon: BookOpen,
      title: "Learning From Experience",
      description: "Real incidents, near misses, and valuable lessons from the field",
      link: "/electrician/safety-shares/lfe",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
      count: "25+ Reports"
    },
    {
      icon: Newspaper,
      title: "Industry News",
      description: "Latest regulatory updates, news, and compliance information",
      link: "/electrician/safety-shares/news",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      count: "Weekly Updates"
    },
    {
      icon: Building,
      title: "Major Projects",
      description: "Industry projects, contracts, and emerging opportunities",
      link: "/electrician/safety-shares/projects",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
      count: "£2B+ Value"
    },
    {
      icon: FileText,
      title: "Safety Resources",
      description: "Download guides, toolbox talks, and essential training materials",
      link: "/electrician/safety-shares/resources",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-elec-yellow mb-4 tracking-tight">
            Safety Shares
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Your central hub for electrical safety information. Stay informed with the latest safety alerts, 
            industry news, and learning opportunities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-12">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <IconComponent className="h-8 w-8 text-elec-yellow mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.description}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 max-w-none">
          {safetyCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.title} to={category.link} className="group block">
                <Card className={`
                  border ${category.borderColor} ${category.bgColor} 
                  hover:border-elec-yellow/60 transition-all duration-300 
                  transform hover:scale-105 hover:shadow-lg hover:shadow-elec-yellow/10
                  h-auto sm:h-52 lg:h-56 flex flex-col justify-between relative overflow-hidden
                  backdrop-blur-sm bg-elec-card/80
                `}>
                  <CardContent className="p-4 sm:p-6 text-center h-full flex flex-col justify-between relative z-10">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="mb-3 sm:mb-4">
                        <IconComponent className={`h-10 w-10 sm:h-12 sm:w-12 ${category.color} mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-300`} />
                      </div>
                      <h3 className="font-semibold text-white mb-2 text-base sm:text-lg group-hover:text-elec-yellow transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-xs sm:text-sm leading-relaxed mb-3">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Count Badge */}
                    <div className="mt-auto">
                      <span className="inline-block bg-elec-yellow/20 text-elec-yellow text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </div>
                  </CardContent>
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-elec-yellow/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-8 sm:mt-12 space-y-4">
          <p className="text-gray-400 text-sm sm:text-base px-4">
            Click on any category above to explore comprehensive safety resources and stay ahead of industry standards.
          </p>
          
          {/* Quick Access Links */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-sm">
            <Link 
              to="/electrician/safety-shares/alerts" 
              className="text-elec-yellow hover:text-white transition-colors underline"
            >
              Latest Alerts
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/electrician/safety-shares/resources" 
              className="text-elec-yellow hover:text-white transition-colors underline"
            >
              Download Center
            </Link>
            <span className="text-gray-600">•</span>
            <Link 
              to="/electrician/safety-shares/news" 
              className="text-elec-yellow hover:text-white transition-colors underline"
            >
              Industry Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyShares;
