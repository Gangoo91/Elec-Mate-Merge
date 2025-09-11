
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Wrench, TrendingUp, CheckCircle } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-elec-yellow opacity-80" />,
      title: "Comprehensive Learning",
      description: "Access industry-leading training materials and resources",
      link: "/apprentice/learning"
    },
    {
      icon: <Wrench className="h-12 w-12 text-elec-yellow opacity-80" />,
      title: "Professional Tools", 
      description: "Essential calculators and utilities for electrical work",
      link: "/electrician"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-elec-yellow opacity-80" />,
      title: "Career Progression",
      description: "Advanced career development and progression guidance",
      link: "/apprentice/career"
    }
  ];

  const benefits = [
    "Industry-leading training resources",
    "Professional tools and calculators", 
    "Expert mentorship programs",
    "Mental health and wellbeing support",
    "Career development guidance",
    "Active community of professionals"
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Your comprehensive electrical apprenticeship companion
        </h1>
        <p className="text-sm text-foreground">
          designed specifically for UK electrical apprentices in the electrical industry
        </p>
      </div>

      {/* Feature Cards */}
      <div className="px-4 space-y-4 mb-8">
        {features.map((feature, index) => (
          <Link key={index} to={feature.link}>
            <Card className="bg-elec-gray border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Why Choose Elec-Mate */}
      <div className="px-4 mb-8">
        <Card className="bg-elec-gray border-elec-yellow/20">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">
              Why choose <span className="text-elec-yellow">Elec-Mate?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-elec-yellow flex-shrink-0" />
                <span className="text-sm text-foreground">{benefit}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CTA Button */}
      <div className="px-4 pb-8">
        <Button asChild size="lg" className="w-full">
          <Link to="/apprentice">Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
