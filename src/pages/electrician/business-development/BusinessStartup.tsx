
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, PoundSterling, Settings, TrendingUp, Lightbulb, Users, Shield, Clock, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import LegalSetupTab from "@/components/electrician/business-development/startup/LegalSetupTab";
import FinanceTab from "@/components/electrician/business-development/startup/FinanceTab";
import OperationsTab from "@/components/electrician/business-development/startup/OperationsTab";
import GrowthTab from "@/components/electrician/business-development/startup/GrowthTab";
import BusinessCalculator from "@/components/electrician/business-development/startup/BusinessCalculator";

const BusinessStartup = () => {
  const [activeTab, setActiveTab] = useState("legal");

  const quickWins = [
    {
      title: "Register Your Business",
      description: "Complete Companies House registration and get your UTR number",
      timeframe: "1-2 weeks",
      priority: "high"
    },
    {
      title: "Get Essential Insurance",
      description: "Public liability (£2M minimum) and professional indemnity cover",
      timeframe: "2-3 days",
      priority: "high"
    },
    {
      title: "Join a Competent Person Scheme",
      description: "NICEIC, NAPIT, or similar for Part P compliance",
      timeframe: "2-4 weeks",
      priority: "high"
    },
    {
      title: "Set Up Business Banking",
      description: "Separate business account for better financial management",
      timeframe: "1 week",
      priority: "medium"
    }
  ];

  const successFactors = [
    {
      icon: Shield,
      title: "Legal Foundation",
      description: "Proper business structure, insurance, and regulatory compliance",
      color: "text-red-400"
    },
    {
      icon: PoundSterling,
      title: "Financial Management",
      description: "Sound pricing, cash flow management, and tax planning",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Professional service delivery and strong customer relationships",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Growth Strategy",
      description: "Scalable systems, marketing, and business development",
      color: "text-purple-400"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30';
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <div className="p-3 sm:p-4 bg-elec-yellow/10 rounded-full border border-elec-yellow/20">
                <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Starting an Electrical Business
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
                Your complete guide to establishing and growing a successful electrical contracting business in the UK. 
                From legal setup to scaling your operations.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-sm">
                <Shield className="h-3 w-3 mr-1" />
                Legal Compliance
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-sm">
                <PoundSterling className="h-3 w-3 mr-1" />
                Financial Planning
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm">
                <Users className="h-3 w-3 mr-1" />
                Business Growth
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-sm">
                <Target className="h-3 w-3 mr-1" />
                Strategic Planning
              </Badge>
            </div>
          </div>

          <div className="px-4">
            <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="border-elec-yellow/20 bg-elec-gray text-center">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Clock className="h-6 w-6 text-elec-yellow mx-auto" />
                <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">4-6</div>
                <div className="text-sm text-muted-foreground">Weeks to Setup</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/20 bg-elec-gray text-center">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <PoundSterling className="h-6 w-6 text-blue-400 mx-auto" />
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">£1K-3K</div>
                <div className="text-sm text-muted-foreground">Initial Investment</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-500/20 bg-elec-gray text-center">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <TrendingUp className="h-6 w-6 text-green-400 mx-auto" />
                <div className="text-2xl sm:text-3xl font-bold text-green-400">85%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-elec-gray text-center">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Target className="h-6 w-6 text-purple-400 mx-auto" />
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">£45K+</div>
                <div className="text-sm text-muted-foreground">Average Annual Income</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Wins Section */}
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
          <CardHeader>
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Quick Wins - First 30 Days
            </CardTitle>
            <CardDescription>
              Essential actions to get your business legally operating and earning revenue quickly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickWins.map((item, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-4 bg-elec-dark/50">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-white text-base">{item.title}</h4>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-blue-400">{item.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Factors */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-blue-500/5">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Four Pillars of Success
            </CardTitle>
            <CardDescription>
              The essential foundations every successful electrical business needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {successFactors.map((factor, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-green-500/20 bg-elec-dark/50">
                  <div className="p-2 bg-elec-gray rounded-lg border border-green-500/20">
                    <factor.icon className={`h-5 w-5 ${factor.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold mb-2 ${factor.color}`}>{factor.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{factor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Calculator */}
        <div className="space-y-6">
          <BusinessCalculator />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="legal" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray border border-elec-yellow/20 h-auto p-1">
            <TabsTrigger 
              value="legal" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-3 text-xs sm:text-sm"
            >
              <FileText className="h-4 w-4" />
              <span>Legal Setup</span>
            </TabsTrigger>
            <TabsTrigger 
              value="finance" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-3 text-xs sm:text-sm"
            >
              <PoundSterling className="h-4 w-4" />
              <span>Finance</span>
            </TabsTrigger>
            <TabsTrigger 
              value="operations" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-3 text-xs sm:text-sm"
            >
              <Settings className="h-4 w-4" />
              <span>Operations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="growth" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-3 text-xs sm:text-sm"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Growth</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 sm:mt-8">
            <TabsContent value="legal" className="space-y-6">
              <LegalSetupTab />
            </TabsContent>

            <TabsContent value="finance" className="space-y-6">
              <FinanceTab />
            </TabsContent>

            <TabsContent value="operations" className="space-y-6">
              <OperationsTab />
            </TabsContent>

            <TabsContent value="growth" className="space-y-6">
              <GrowthTab />
            </TabsContent>
          </div>
        </Tabs>

        {/* Bottom Success Card */}
        <Card className="border-green-500/50 bg-gradient-to-br from-green-500/10 to-elec-yellow/5">
          <CardHeader>
            <CardTitle className="text-green-300 flex items-center gap-2 text-lg sm:text-xl">
              <Lightbulb className="h-5 w-5" />
              Your Journey to Success
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Starting an electrical business is a significant step that requires careful planning and execution. 
                Success comes from building strong foundations in legal compliance, financial management, 
                operational excellence, and strategic growth planning.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-green-500/20">
                <div>
                  <h4 className="font-semibold text-green-300 mb-3 text-sm sm:text-base">Your Path Forward</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <li>• Complete legal setup and regulatory compliance</li>
                    <li>• Establish robust financial management systems</li>
                    <li>• Build strong customer relationships and reputation</li>
                    <li>• Continuously develop skills and knowledge</li>
                    <li>• Plan for sustainable growth and expansion</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-3 text-sm sm:text-base">Market Opportunities</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <li>• Growing demand for EV charging installations</li>
                    <li>• Renewable energy and solar PV systems</li>
                    <li>• Smart home technology integration</li>
                    <li>• Energy efficiency and LED upgrades</li>
                    <li>• Commercial and industrial opportunities</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 border-t border-green-500/20">
                <p className="text-xs sm:text-sm text-green-400 font-medium leading-relaxed">
                  Remember: Every successful electrician started with a single job and a commitment to excellence. 
                  Focus on delivering quality work, building trust, and growing your expertise one project at a time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessStartup;
