
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, PoundSterling, Settings, TrendingUp, Lightbulb, Users, Shield } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-elec-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-center">
              <div className="p-2 sm:p-3 bg-elec-yellow/10 rounded-full border border-elec-yellow/20">
                <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Starting an Electrical Business
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Complete guidance for establishing and growing your electrical contracting business in the UK
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs sm:text-sm">
                <Shield className="h-3 w-3 mr-1" />
                Legal Compliance
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs sm:text-sm">
                <PoundSterling className="h-3 w-3 mr-1" />
                Financial Planning
              </Badge>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs sm:text-sm">
                <Users className="h-3 w-3 mr-1" />
                Business Growth
              </Badge>
            </div>
          </div>

          <div className="px-4">
            <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="border-elec-yellow/20 bg-elec-gray text-center">
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-elec-yellow">4-6</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Weeks to Setup</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/20 bg-elec-gray text-center">
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">£1K-3K</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Initial Investment</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-500/20 bg-elec-gray text-center">
            <CardContent className="pt-4 sm:pt-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">85%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Success Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Business Calculator */}
        <div className="space-y-6">
          <BusinessCalculator />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="legal" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-gray border border-elec-yellow/20 h-auto">
            <TabsTrigger 
              value="legal" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-2 sm:p-3"
            >
              <FileText className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Legal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="finance" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-2 sm:p-3"
            >
              <PoundSterling className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Finance</span>
            </TabsTrigger>
            <TabsTrigger 
              value="operations" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-2 sm:p-3"
            >
              <Settings className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Operations</span>
            </TabsTrigger>
            <TabsTrigger 
              value="growth" 
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black p-2 sm:p-3"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Growth</span>
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
              Building Your Success Foundation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm sm:text-base">
                Building a successful electrical business requires careful planning, proper legal setup, 
                sound financial management, and excellent customer service. Take time to establish 
                solid foundations - they'll support your growth for years to come.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-green-500/20">
                <div>
                  <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Key Success Factors</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Strong legal and regulatory compliance</li>
                    <li>• Robust financial planning and management</li>
                    <li>• Professional customer service approach</li>
                    <li>• Continuous learning and development</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Growth Opportunities</h4>
                  <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                    <li>• Specialisation in emerging technologies</li>
                    <li>• Building strategic partnerships</li>
                    <li>• Expanding service offerings</li>
                    <li>• Developing team capabilities</li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-4 border-t border-green-500/20">
                <p className="text-xs sm:text-sm text-green-400 font-medium">
                  Remember: Every successful electrician started exactly where you are now. 
                  Focus on quality, safety, and customer satisfaction.
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
