
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  HandHelping, 
  Users, 
  UserCheck,
  Calculator,
  CreditCard
} from "lucide-react";

const BusinessDevelopment = () => {
  const businessSections = [
    {
      id: 1,
      title: "Starting an Electrical Business",
      description: "Essential guidance for establishing your electrical contracting business, from registration to certification",
      icon: <Briefcase className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/startup"
    },
    {
      id: 2,
      title: "Onboarding Apprentices",
      description: "Best practices for recruiting, mentoring and developing apprentices in your electrical business",
      icon: <GraduationCap className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/apprentices"
    },
    {
      id: 3,
      title: "Onboarding Electricians",
      description: "Effective strategies for recruiting, integrating and retaining qualified electricians",
      icon: <UserCheck className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/electricians"
    },
    {
      id: 4,
      title: "Growing Your Business",
      description: "Strategies for expanding your electrical business, from marketing to diversifying services",
      icon: <TrendingUp className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/growth"
    },
    {
      id: 5,
      title: "Customer Acquisition",
      description: "Effective methods to attract and retain clients for your electrical services",
      icon: <HandHelping className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/customers"
    },
    {
      id: 6,
      title: "Tax & Finances",
      description: "Financial management, tax obligations, and accounting best practices for electrical contractors",
      icon: <Calculator className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/tax-finances"
    },
    {
      id: 7,
      title: "Debt Recovery & Non-Payers",
      description: "Strategies for managing late payments, debt recovery, and protecting your cash flow",
      icon: <CreditCard className="h-12 w-12 text-elec-yellow opacity-80" />,
      link: "/electrician/business-development/debt-recovery"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Business Development</h1>
        <p className="text-muted-foreground">
          Resources and guidance to establish and grow your electrical contracting business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessSections.map((section) => (
          <Link key={section.id} to={section.link} className="group">
            <Card className="h-full border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{section.title}</CardTitle>
                <CardDescription className="text-sm">
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-6">
                <div className="transition-transform group-hover:scale-110">
                  {section.icon}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <Card className="border-elec-yellow/20 bg-elec-gray mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Business Development Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The information provided is for general guidance only and does not constitute financial, legal, or business advice. 
            Always consult with qualified professionals regarding your specific business circumstances. ElecMate is not endorsed by, 
            directly affiliated with, maintained, authorised, or sponsored by any regulatory bodies or certification schemes mentioned. 
            All product names, logos, and brands are property of their respective owners.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDevelopment;
