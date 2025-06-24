
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AssessmentPrepTab from "@/components/apprentice/ojt/enhanced/AssessmentPrepTab";
import CareerGuidanceTab from "@/components/apprentice/ojt/enhanced/CareerGuidanceTab";
import SmartAnalyticsTab from "@/components/apprentice/ojt/enhanced/SmartAnalyticsTab";
import ARTrainingTab from "@/components/apprentice/advanced-help/ARTrainingTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";
import MobileAdvancedHelpHeader from "@/components/apprentice/advanced-help/MobileAdvancedHelpHeader";
import MobileTabsList from "@/components/apprentice/advanced-help/MobileTabsList";
import SecondaryTabsList from "@/components/apprentice/advanced-help/SecondaryTabsList";

const AdvancedHelp = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 animate-fade-in p-4 max-w-4xl mx-auto">
        <MobileAdvancedHelpHeader />

        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
          <CardContent className="p-4">
            <Tabs defaultValue="helpbot" className="w-full">
              {/* Primary Navigation */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4 mb-4">
                <MobileTabsList />
              </div>

              {/* Help Bot Tab */}
              <TabsContent value="helpbot" className="mt-0">
                <HelpBotTab />
              </TabsContent>

              {/* Assessment Tab */}
              <TabsContent value="assessment" className="mt-0">
                <AssessmentPrepTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Secondary Features */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
          <CardContent className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Additional Tools</h3>
              <p className="text-sm text-muted-foreground">
                Explore career guidance, smart analytics, and upcoming AR features
              </p>
            </div>
            
            <Tabs defaultValue="career" className="w-full">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4 mb-4">
                <SecondaryTabsList />
              </div>

              <TabsContent value="career" className="mt-0">
                <CareerGuidanceTab />
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <SmartAnalyticsTab />
              </TabsContent>

              <TabsContent value="ar" className="mt-0">
                <ARTrainingTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedHelp;
