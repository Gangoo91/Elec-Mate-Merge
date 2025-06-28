
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import DailyAITipsTab from "@/components/apprentice/ojt/enhanced/DailyAITipsTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";
import MobileAdvancedHelpHeader from "@/components/apprentice/advanced-help/MobileAdvancedHelpHeader";
import MobileTabsList from "@/components/apprentice/advanced-help/MobileTabsList";
import SecondaryTabsList from "@/components/apprentice/advanced-help/SecondaryTabsList";

const AdvancedHelp = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 animate-fade-in p-4 max-w-4xl mx-auto">
        <MobileAdvancedHelpHeader />

        {/* Main AI Help Bot Section */}
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
          <CardContent className="p-4">
            <Tabs defaultValue="helpbot" className="w-full">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4 mb-4">
                <MobileTabsList />
              </div>

              <TabsContent value="helpbot" className="mt-0">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-elec-yellow mb-2">Your Personal AI Assistant</h2>
                  <p className="text-sm text-muted-foreground">
                    Get instant help with electrical work, safety procedures, regulations, and apprentice guidance. 
                    Ask questions in plain English and receive expert advice tailored to UK electrical standards.
                  </p>
                </div>
                <HelpBotTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Daily AI Tips Section */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
          <CardContent className="p-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-2">Daily Learning Booster</h2>
              <p className="text-sm text-muted-foreground">
                Fresh daily tips and insights to accelerate your electrical knowledge and build good habits.
              </p>
            </div>
            
            <Tabs defaultValue="tips" className="w-full">
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4 mb-4">
                <SecondaryTabsList />
              </div>

              <TabsContent value="tips" className="mt-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Daily AI Tips & Insights</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Curated daily tips covering safety, practical skills, regulations, and career advice 
                    specifically for electrical apprentices in the UK.
                  </p>
                </div>
                <DailyAITipsTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Access Tips */}
        <Card className="border-elec-gray/30">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-3">Getting Started Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-elec-yellow">💬 AI Help Bot</h4>
                <p className="text-sm text-muted-foreground">
                  Ask specific questions about electrical work, safety procedures, or regulations. 
                  The more detailed your question, the better the response.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-purple-400">💡 Daily Tips</h4>
                <p className="text-sm text-muted-foreground">
                  Check back daily for fresh insights and tips. Build a learning habit to accelerate your progress.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedHelp;
