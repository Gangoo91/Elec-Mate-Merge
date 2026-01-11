
import React from 'react';
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Lightbulb,
  Sparkles,
  Shield,
  BookOpen,
  GraduationCap,
  Zap
} from "lucide-react";
import DailyAITipsTab from "@/components/apprentice/ojt/enhanced/DailyAITipsTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";

const AdvancedHelp = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-3 sm:space-y-6 animate-fade-in" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      {/* Compact Header - Mobile Optimized */}
      <div className="relative overflow-hidden rounded-xl border border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 via-white/5 to-elec-yellow/5 p-3 sm:p-6">
        <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <SmartBackButton />
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 rounded-lg bg-elec-yellow/20">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight">AI Study Centre</h1>
              </div>
            </div>
            <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow text-xs px-2 py-0.5 shrink-0">
              <Bot className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">AI Enhanced</span>
              <span className="sm:hidden">AI</span>
            </Badge>
          </div>

          {/* Description - Hidden on Mobile */}
          <p className="hidden sm:block text-white/70 text-sm mt-3 max-w-xl">
            AI-powered learning tools built specifically for UK electrical apprentices.
            Get expert guidance from Dave, your 20-year veteran electrical mentor.
          </p>
        </div>
      </div>

      {/* Feature Highlights - Hidden on Mobile */}
      <div className="hidden sm:grid grid-cols-4 gap-3">
        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-500/5">
          <CardContent className="p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500 shrink-0" />
            <span className="text-xs text-white">Safety-First Guidance</span>
          </CardContent>
        </Card>
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-500/5">
          <CardContent className="p-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-orange-500 shrink-0" />
            <span className="text-xs text-white">BS 7671 Expert</span>
          </CardContent>
        </Card>
        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5">
          <CardContent className="p-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-cyan-500 shrink-0" />
            <span className="text-xs text-white">EPA Preparation</span>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
          <CardContent className="p-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
            <span className="text-xs text-white">Testing & Inspection</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Section */}
      <Tabs defaultValue="helpbot" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-11 bg-white/5 border border-white/10 rounded-xl">
          <TabsTrigger
            value="helpbot"
            className="flex items-center gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow h-9 rounded-lg touch-manipulation"
          >
            <Bot className="h-4 w-4" />
            <span className="text-sm">Ask Dave</span>
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            className="flex items-center gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow h-9 rounded-lg touch-manipulation"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="text-sm">Daily Tips</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="helpbot" className="mt-3 sm:mt-4">
          <HelpBotTab />
        </TabsContent>

        <TabsContent value="tips" className="mt-3 sm:mt-4">
          <DailyAITipsTab />
        </TabsContent>
      </Tabs>

      {/* Footer Note - Hidden on Mobile for Space */}
      <Card className="hidden sm:block border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-elec-yellow mb-1">Learning Support, Not Replacement</h3>
              <p className="text-xs text-white/70">
                These AI tools are designed to complement your apprenticeship training, not replace it.
                Always verify critical information with your supervisor or official documentation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
