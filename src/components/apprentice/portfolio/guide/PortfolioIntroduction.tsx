
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Target, 
  Users, 
  Award,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const PortfolioIntroduction = () => {
  const portfolioPurpose = [
    "Demonstrate your learning and skill development throughout your apprenticeship",
    "Provide evidence of competency against industry standards and qualifications",
    "Showcase your professional growth and technical abilities to assessors",
    "Create a valuable resource for future career development and job applications",
    "Document your journey from apprentice to qualified electrician"
  ];

  const keyBenefits = [
    {
      icon: Target,
      title: "Clear Learning Objectives",
      description: "Structured approach to meeting apprenticeship requirements"
    },
    {
      icon: Award,
      title: "Professional Recognition",
      description: "Demonstrates competency to employers and industry bodies"
    },
    {
      icon: Users,
      title: "Career Development",
      description: "Valuable asset for job applications and career progression"
    },
    {
      icon: FileText,
      title: "Evidence Collection",
      description: "Systematic documentation of skills and knowledge"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            Welcome to Portfolio Building
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Your apprenticeship portfolio is one of the most important documents you'll create during your training. 
            It's not just a collection of evidence - it's a comprehensive record of your professional development, 
            skills acquisition, and journey towards becoming a qualified electrician.
          </p>
        </CardContent>
      </Card>

      {/* What is a Portfolio */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">What is an Apprenticeship Portfolio?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            An apprenticeship portfolio is a structured collection of evidence that demonstrates your competency 
            against the standards required for your electrical qualification. It includes:
          </p>
          
          <div className="space-y-3">
            {portfolioPurpose.map((purpose, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{purpose}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyBenefits.map((benefit, index) => {
          const IconComponent = benefit.icon;
          return (
            <Card key={index} className="border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <IconComponent className="h-5 w-5 text-green-400" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Important Note */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Important: Start Early and Stay Consistent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              The most successful apprentices start building their portfolio from day one and maintain it consistently 
              throughout their training. Don't wait until the end of your apprenticeship to begin collecting evidence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-muted-foreground">Start from week 1</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-muted-foreground">Document everything</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-400" />
                <span className="text-sm text-muted-foreground">Review regularly</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Outcomes */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">What You'll Learn in This Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                Module 1: Planning & Structure
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                Module 2: Evidence Collection
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                Module 3: Reflection & Analysis
              </Badge>
            </div>
            <div className="space-y-2">
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                Module 4: Industry Standards
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                Module 5: Assessment Preparation
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                Module 6: Digital Portfolio Tools
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioIntroduction;
