
import React from 'react';
import BackButton from "@/components/common/BackButton";
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
  Zap,
  ArrowLeft
} from "lucide-react";
import DailyAITipsTab from "@/components/apprentice/ojt/enhanced/DailyAITipsTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";
import { Link } from "react-router-dom";

const AdvancedHelp = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-xl border border-elec-yellow/30 bg-gradient-to-br from-elec-gray via-elec-gray to-elec-yellow/10 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <Link
            to="/apprentice"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-elec-yellow transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Apprentice Hub
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-elec-yellow/20">
                  <Sparkles className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Advanced Help</h1>
              </div>
              <p className="text-muted-foreground max-w-xl">
                AI-powered learning tools built specifically for UK electrical apprentices.
                Get expert guidance from Dave, your 20-year veteran electrical mentor.
              </p>
            </div>
            <Badge variant="outline" className="self-start border-elec-yellow/50 text-elec-yellow px-3 py-1">
              <Bot className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-500 shrink-0" />
            <span className="text-xs">Safety-First Guidance</span>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-orange-500 shrink-0" />
            <span className="text-xs">BS 7671 Expert</span>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-cyan-500 shrink-0" />
            <span className="text-xs">EPA Preparation</span>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500 shrink-0" />
            <span className="text-xs">Testing & Inspection</span>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs Section */}
      <Tabs defaultValue="helpbot" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-elec-gray">
          <TabsTrigger
            value="helpbot"
            className="flex items-center gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow h-10"
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Ask Dave -</span> AI Mentor
          </TabsTrigger>
          <TabsTrigger
            value="tips"
            className="flex items-center gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow h-10"
          >
            <Lightbulb className="h-4 w-4" />
            Daily Tips
          </TabsTrigger>
        </TabsList>

        <TabsContent value="helpbot" className="mt-4">
          <HelpBotTab />
        </TabsContent>

        <TabsContent value="tips" className="mt-4">
          <DailyAITipsTab />
        </TabsContent>
      </Tabs>

      {/* Footer Note */}
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-gray/80">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
              <GraduationCap className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-elec-yellow mb-1">Learning Support, Not Replacement</h3>
              <p className="text-xs text-muted-foreground">
                These AI tools are designed to complement your apprenticeship training, not replace it.
                Always verify critical information with your supervisor or official documentation.
                Dave's here to help explain concepts and guide your learning - but nothing beats
                hands-on experience under qualified supervision.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
