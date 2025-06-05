
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Newspaper, Building, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const SafetyShares = () => {
  const safetyCategories = [
    {
      id: 1,
      title: "Safety Alerts",
      description: "Critical safety warnings and real-time alerts for electrical professionals",
      icon: <AlertTriangle className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/safety-shares/alerts"
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
      link: "/electrician/safety-shares/news"
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
      link: "/electrician/safety-shares/resources"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyCategories.map((category) => (
            <Link key={category.id} to={category.link} className="group">
              <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-6">
                  <div className="transition-transform group-hover:scale-110">
                    {category.icon}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyShares;
