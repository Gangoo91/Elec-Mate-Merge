
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyShares = () => {
  const safetyCategories = [
    {
      icon: AlertTriangle,
      title: "Safety Alerts",
      description: "Critical safety warnings and alerts",
      link: "/electrician/safety-shares/alerts",
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30"
    },
    {
      icon: BookOpen,
      title: "Learning From Experience",
      description: "Real incidents and lessons learned",
      link: "/electrician/safety-shares/lfe",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30"
    },
    {
      icon: Newspaper,
      title: "Industry News",
      description: "Latest regulatory updates and news",
      link: "/electrician/safety-shares/news",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Building,
      title: "Major Projects",
      description: "Industry projects and opportunities",
      link: "/electrician/safety-shares/projects",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: FileText,
      title: "Safety Resources",
      description: "Download guides and training materials",
      link: "/electrician/safety-shares/resources",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Safety Shares - Elec-Mate</title>
        <meta name="description" content="Share safety knowledge, learn from experience, and stay updated with the latest electrical industry safety information" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-elec-yellow mb-8 tracking-tight">
            Safety Shares
          </h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Your central hub for electrical safety information. Stay informed with the latest safety alerts, 
            industry news, and learning opportunities from the electrical industry.
          </p>
        </div>

        {/* Navigation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {safetyCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.title} to={category.link} className="group">
                <Card className={`
                  border-2 ${category.borderColor} ${category.bgColor} 
                  hover:border-elec-yellow/80 transition-all duration-500 
                  transform hover:scale-105 hover:shadow-2xl hover:shadow-elec-yellow/20
                  h-64 flex flex-col justify-center relative overflow-hidden
                  backdrop-blur-sm
                `}>
                  <CardContent className="p-8 text-center h-full flex flex-col justify-center relative z-10">
                    <div className="mb-6">
                      <IconComponent className={`h-16 w-16 ${category.color} mx-auto mb-4 group-hover:scale-125 transition-all duration-500 drop-shadow-lg`} />
                    </div>
                    <h3 className="font-bold text-white mb-3 text-xl group-hover:text-elec-yellow transition-colors duration-300">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed text-sm">
                      {category.description}
                    </p>
                  </CardContent>
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-elec-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            Click on any category above to explore comprehensive safety resources and stay ahead of industry standards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyShares;
