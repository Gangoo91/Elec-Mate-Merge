import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  Clock, 
  TrendingUp, 
  Target, 
  PiggyBank, 
  BarChart3,
  DollarSign,
  Calendar,
  Handshake,
  CreditCard,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BusinessDevelopment = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "customer-acquisition",
      title: "Customer Acquisition",
      description: "Strategies and tools for finding and securing new customers",
      icon: Handshake,
      status: "coming-soon"
    },
    {
      id: "tax-finances",
      title: "Tax & Finances",
      description: "Tax planning tools and financial management resources",
      icon: Calculator,
      status: "coming-soon"
    },
    {
      id: "debt-recovery",
      title: "Debt Recovery & Non-Payers", 
      description: "Tools and strategies for managing late payments and debt recovery",
      icon: CreditCard,
      status: "coming-soon"
    },
    {
      id: "job-profitability",
      title: "Job Profitability Calculator",
      description: "Calculate profit margins and pricing for electrical jobs",
      icon: TrendingUp,
      status: "available"
    },
    {
      id: "hourly-rate",
      title: "Hourly Rate Calculator", 
      description: "Determine optimal hourly rates based on costs and targets",
      icon: Clock,
      status: "available"
    },
    {
      id: "cash-flow",
      title: "Cash Flow Projector",
      description: "Project monthly cash flow and identify potential issues",
      icon: BarChart3,
      status: "available"
    },
    {
      id: "break-even",
      title: "Break-Even Calculator",
      description: "Calculate break-even points for jobs and monthly operations",
      icon: Target,
      status: "available"
    },
    {
      id: "business-costs",
      title: "Business Cost Calculator",
      description: "Estimate startup and running costs for your electrical business",
      icon: DollarSign,
      status: "available"
    }
  ];

  const handleCalculatorClick = (calculatorId: string, status: string) => {
    if (status === "available") {
      navigate(`/electrician-tools/business-development/${calculatorId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/electrician/business-development')}
            className="flex items-center gap-2 text-white hover:text-elec-yellow hover:bg-elec-gray"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Business Development
          </Button>
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Business Development Tools</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Professional calculators and tools to help grow and manage your electrical business effectively.
            Make informed decisions with accurate financial planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => {
            const IconComponent = calculator.icon;
            
            return (
              <Card 
                key={calculator.id}
                className={`border-elec-yellow/20 bg-elec-gray !bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer flex flex-col justify-center items-center py-8 ${
                  calculator.status === "coming-soon" ? "opacity-75" : ""
                }`}
                onClick={() => handleCalculatorClick(calculator.id, calculator.status)}
              >
                <CardHeader className="text-center pb-0 pt-0">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <IconComponent className="h-12 w-12 text-elec-yellow mb-2" />
                    <CardTitle className="text-xl font-bold">{calculator.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Empty card content for clean design */}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BusinessDevelopment;