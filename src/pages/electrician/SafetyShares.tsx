
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, FileText, Bell } from "lucide-react";
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
    <div className="min-h-screen bg-elec-dark text-white p-6">
      <Helmet>
        <title>Safety Shares - Elec-Mate</title>
        <meta name="description" content="Share safety knowledge, learn from experience, and stay updated with the latest electrical industry safety information" />
      </Helmet>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-elec-yellow mb-6">Safety Shares</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your central hub for electrical safety information. Stay informed with the latest safety alerts, 
            industry news, and learning opportunities from the electrical industry.
          </p>
        </div>

        {/* Enhanced Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {safetyCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.title} to={category.link} className="group">
                <Card className={`
                  border-2 ${category.borderColor} ${category.bgColor} 
                  hover:border-elec-yellow/60 transition-all duration-300 
                  transform hover:scale-105 hover:shadow-xl hover:shadow-elec-yellow/10
                  h-48 flex flex-col justify-center
                `}>
                  <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                    <div className="mb-4">
                      <IconComponent className={`h-12 w-12 ${category.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-lg group-hover:text-elec-yellow transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Key Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-400 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Real-Time Safety Updates</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Get instant access to critical safety alerts, regulatory changes, and industry updates 
                    that directly impact your work and safety practices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-yellow-400 mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Learn from Experience</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Access real incident reports, near-miss analyses, and lessons learned from 
                    experienced professionals across the electrical industry.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Industry Resources Section */}
        <Card className="border-elec-yellow/20 bg-elec-gray mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-elec-yellow mb-4">Stay Connected with Industry Standards</h2>
              <p className="text-gray-300 text-lg max-w-4xl mx-auto">
                Our safety shares platform connects you with the latest developments in electrical safety, 
                regulatory compliance, and best practices from across the industry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <Newspaper className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Latest News</h4>
                <p className="text-sm text-gray-400">Industry updates and regulatory changes</p>
              </div>
              <div className="text-center">
                <Building className="h-10 w-10 text-green-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Major Projects</h4>
                <p className="text-sm text-gray-400">Learn from large-scale installations</p>
              </div>
              <div className="text-center">
                <FileText className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold text-white mb-2">Resources</h4>
                <p className="text-sm text-gray-400">Downloadable guides and materials</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Notice */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Bell className="h-6 w-6 text-elec-yellow mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Never Miss Critical Updates</h3>
                <p className="text-gray-300 mb-4">
                  Get instant notifications for critical safety alerts and industry updates. 
                  Subscribe to categories that matter to your work and stay ahead of safety requirements.
                </p>
                <div className="text-sm text-gray-400">
                  Sign in to manage your notification preferences and customize your safety information feed.
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
