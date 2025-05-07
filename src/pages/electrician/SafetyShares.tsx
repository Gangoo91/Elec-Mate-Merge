
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, AlertTriangle, Library, FileText, Construction, ExternalLink, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const SafetyShares = () => {
  const isMobile = useIsMobile();
  
  // Simulating a notification when page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info("New safety alert from HSE available", {
        description: "Updated guidance on electrical test equipment use - 15 Apr 2025",
        action: {
          label: "View",
          onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Category card data
  const categories = [
    {
      id: "safety-updates",
      title: "Safety Updates",
      description: "Critical alerts and bulletins from industry regulators",
      icon: <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 text-red-400" />,
      color: "from-red-900/20 to-red-800/10 border-red-500/30",
      badge: "2 New",
      badgeColor: "bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-400",
      linkText: "View Safety Alerts",
      linkTo: "/electrician/safety-shares/alerts"
    },
    {
      id: "learning-from-experience",
      title: "Learning From Experience",
      description: "Real-world incidents and valuable lessons for electricians",
      icon: <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-amber-400" />,
      color: "from-amber-900/20 to-amber-800/10 border-amber-500/30",
      badge: "3 New",
      badgeColor: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 hover:text-amber-400",
      linkText: "Browse LFE Reports",
      linkTo: "/electrician/safety-shares/lfe"
    },
    {
      id: "major-projects",
      title: "Major Projects",
      description: "Safety considerations for upcoming large-scale electrical projects",
      icon: <Construction className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
      color: "from-green-900/20 to-green-800/10 border-green-500/30",
      linkText: "Explore Projects",
      linkTo: "/electrician/safety-shares/projects"
    },
    {
      id: "industry-news",
      title: "Industry News",
      description: "Latest electrical industry regulations and developments",
      icon: <Library className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />,
      color: "from-blue-900/20 to-blue-800/10 border-blue-500/30",
      badge: "Updated",
      badgeColor: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400",
      linkText: "Read Latest News",
      linkTo: "/electrician/safety-shares/news"
    },
    {
      id: "resources",
      title: "Resources",
      description: "Downloadable guides, toolbox talks and reference materials",
      icon: <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />,
      color: "from-purple-900/20 to-purple-800/10 border-purple-500/30",
      linkText: "Access Resources",
      linkTo: "/electrician/safety-shares/resources"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in px-2 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
            Safety & Industry Updates
          </h1>
          <p className="text-sm text-muted-foreground">
            Stay informed with the latest safety information and industry developments
          </p>
        </div>
        <Link to="/electrician/toolbox-talk">
          <Button variant="outline" size={isMobile ? "sm" : "default"} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Toolbox Talk
          </Button>
        </Link>
      </div>

      {/* Featured Alert Banner */}
      <Card className="bg-gradient-to-r from-red-900/40 to-red-800/20 border-red-500/30">
        <CardContent className={`${isMobile ? 'p-4' : 'p-4 sm:p-6'} flex flex-col sm:flex-row items-start sm:items-center gap-4`}>
          <div className="rounded-full bg-red-500/20 p-2 sm:p-3">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-red-400">Critical Safety Notice</h2>
            <p className="text-xs sm:text-sm text-white/90">
              All electrical work must comply with the Electricity at Work Regulations and current BS7671 standards. 
              Always ensure proper isolation procedures before working on electrical systems.
            </p>
          </div>
          <div>
            <Button size={isMobile ? "sm" : "default"} variant="destructive" className="whitespace-nowrap">View Details</Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`overflow-hidden border-elec-yellow/20 bg-gradient-to-br ${category.color} hover:shadow-md transition-all duration-200 group`}
          >
            <CardHeader className={`pb-2 ${isMobile ? 'p-4' : 'p-6'}`}>
              <div className="flex justify-between items-start">
                <div className="rounded-full bg-elec-gray/30 p-2 sm:p-3">
                  {category.icon}
                </div>
                {category.badge && (
                  <Badge className={category.badgeColor}>
                    {category.badge}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg sm:text-xl mt-3">{category.title}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-white/80">
                {category.description}
              </CardDescription>
            </CardHeader>
            <CardContent className={`${isMobile ? 'px-4 py-2' : 'p-6 py-2'} space-y-2`}>
              <div className="h-1 bg-white/10 rounded-full w-full" />
            </CardContent>
            <CardFooter className={isMobile ? 'p-4' : 'p-6 pt-4'}>
              <Link to={category.linkTo} className="w-full">
                <Button 
                  className="w-full flex items-center gap-2 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 transition-all font-medium"
                  variant="default"
                  size={isMobile ? "sm" : "default"}
                >
                  {category.linkText}
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Subscribe Banner */}
      <Card className="bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30">
        <CardContent className={`${isMobile ? 'p-4' : 'p-4 sm:p-6'} flex flex-col sm:flex-row items-center gap-4`}>
          <div className="rounded-full bg-elec-yellow/20 p-2 sm:p-3">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
          </div>
          <div className="space-y-2 flex-1">
            <h2 className="text-base sm:text-lg font-semibold text-elec-yellow">Stay Informed</h2>
            <p className="text-xs sm:text-sm text-white/90">
              Subscribe to safety alerts and regulatory updates to receive immediate notifications.
            </p>
          </div>
          <div>
            <Button size={isMobile ? "sm" : "default"} variant="default" className="whitespace-nowrap">Subscribe Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyShares;
