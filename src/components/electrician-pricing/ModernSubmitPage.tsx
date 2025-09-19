import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  Heart,
  Star,
  MapPin,
  Clock,
  Award,
  Zap
} from "lucide-react";
import CommunityPricingSubmission from "./CommunityPricingSubmission";

const ModernSubmitPage = () => {
  const benefits = [
    {
      icon: Users,
      title: "Help Fellow Electricians",
      description: "Share your real pricing data to help other electricians stay competitive and price jobs accurately across the UK."
    },
    {
      icon: TrendingUp,
      title: "Build Industry Database",
      description: "Contribute to the most comprehensive UK electrical pricing database, with regional accuracy and real-world data."
    },
    {
      icon: Shield,
      title: "Anonymous & Secure",
      description: "All submissions are completely anonymous. We protect your privacy while building valuable community resources."
    },
    {
      icon: Award,
      title: "BS7671 Compliant",
      description: "Our pricing database follows BS7671 18th Edition standards, ensuring accuracy for modern electrical work."
    }
  ];

  const communityStats = [
    { number: "15,000+", label: "Active Electricians", icon: Users },
    { number: "45,000+", label: "Price Submissions", icon: TrendingUp },
    { number: "12 regions", label: "UK Coverage", icon: MapPin },
    { number: "98%", label: "Verification Rate", icon: CheckCircle }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Submit Your Data",
      description: "Share pricing from recent completed jobs in your area"
    },
    {
      number: "02", 
      title: "Community Review",
      description: "Our verification process ensures data quality and accuracy"
    },
    {
      number: "03",
      title: "Database Update",
      description: "Approved submissions update regional pricing for all users"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
        <div className="mobile-container py-8 sm:py-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="mobile-heading gradient-text mb-4">
              Share Pricing, Help Community
            </h1>
            <p className="mobile-text text-muted-foreground max-w-2xl mx-auto">
              Join thousands of UK electricians building the most accurate regional pricing database. 
              Your contributions help fellow professionals stay competitive and informed.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mobile-container py-8 space-y-8">
        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group relative overflow-hidden border-primary/20 bg-gradient-to-br from-card via-card to-card/90 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
              <CardContent className="relative p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-xl font-bold text-primary mx-auto mb-4">
                    {step.number}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <Card className="bg-gradient-to-r from-primary/5 via-primary/3 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="font-bold text-lg text-foreground mb-2">Trusted by UK Electricians</h3>
                <p className="text-sm text-muted-foreground">
                  Our community-driven approach ensures accurate, real-world pricing data
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Secure & Anonymous</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">Verified Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Real-time Updates</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submission Form */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Submit Your Pricing Data</h2>
            <p className="text-muted-foreground">
              Share details from recent completed jobs to help build accurate regional estimates
            </p>
          </div>
          <CommunityPricingSubmission />
        </div>

        {/* Footer Info */}
        <Card className="bg-muted/30 border-muted/40">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">What Happens Next?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    Your submission is reviewed for accuracy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    Approved data updates regional pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    Community benefits from accurate data
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Privacy & Security</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                    No personal information stored
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                    Anonymous submissions only
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary flex-shrink-0" />
                    GDPR compliant processing
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernSubmitPage;