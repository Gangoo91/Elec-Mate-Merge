
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SampleDataLoader from "@/components/electrician/safety-shares/SampleDataLoader";

const SafetyShares = () => {
  const safetyCategories = [
    {
      id: 1,
      title: "Safety Alerts",
      description: "Critical safety warnings and real-time alerts for electrical professionals",
      icon: <AlertTriangle className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/safety-shares/alerts",
      enhancedLink: "/electrician/safety-shares/alerts-enhanced"
    },
    {
      id: 2,
      title: "Learning From Experience",
      description: "Real incidents, near misses, and lessons learned from the field",
      icon: <BookOpen className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/safety-shares/lfe"
    },
    {
      id: 3,
      title: "Industry News",
      description: "Latest regulatory updates and compliance information from industry bodies",
      icon: <Newspaper className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/safety-shares/news",
      enhancedLink: "/electrician/safety-shares/news-enhanced"
    },
    {
      id: 4,
      title: "Major Projects",
      description: "Industry projects and emerging opportunities in the electrical sector",
      icon: <Building className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/safety-shares/projects"
    },
    {
      id: 5,
      title: "Safety Resources",
      description: "Essential safety guides, toolbox talks, and training materials",
      icon: <Shield className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/safety-shares/resources",
      enhancedLink: "/electrician/safety-shares/resources-enhanced"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Safety Shares - Elec-Mate</title>
        <meta name="description" content="Share safety knowledge, learn from experience, and stay updated with the latest electrical industry safety information" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Shares</h1>
          <p className="text-muted-foreground">
            Essential safety information and knowledge sharing for electrical professionals
          </p>
        </div>

        {/* Database Status Component */}
        <SampleDataLoader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyCategories.map((category) => (
            <div key={category.id} className="group">
              <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    {category.enhancedLink && (
                      <div className="w-6 h-6 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-elec-yellow" />
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-6">
                  <div className="transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                </CardContent>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Link to={category.link} className="flex-1">
                      <button className="w-full py-2 px-3 text-sm bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 rounded transition-colors">
                        View Standard
                      </button>
                    </Link>
                    {category.enhancedLink && (
                      <Link to={category.enhancedLink} className="flex-1">
                        <button className="w-full py-2 px-3 text-sm bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 rounded transition-colors font-medium">
                          Enhanced ✨
                        </button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-lg border border-elec-yellow/20 bg-elec-dark/50">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="h-6 w-6 text-elec-yellow" />
            <h2 className="text-xl font-semibold text-elec-yellow">Enhanced Features</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Try our enhanced Safety Shares experience with interactive features including:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li>Real-time data integration with live content updates</li>
            <li>User ratings and reviews for all safety content</li>
            <li>Personal bookmarking system to save important resources</li>
            <li>View tracking and engagement analytics</li>
            <li>Advanced filtering and search capabilities</li>
            <li>File download tracking and management</li>
            <li>Interactive content rating system</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyShares;
