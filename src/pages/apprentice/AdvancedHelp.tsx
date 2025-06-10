
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain, BookOpen, User, Eye, Bot, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AssessmentPrepTab from "@/components/apprentice/ojt/enhanced/AssessmentPrepTab";
import CareerGuidanceTab from "@/components/apprentice/ojt/enhanced/CareerGuidanceTab";
import SmartAnalyticsTab from "@/components/apprentice/ojt/enhanced/SmartAnalyticsTab";
import ARTrainingTab from "@/components/apprentice/advanced-help/ARTrainingTab";
import HelpBotTab from "@/components/apprentice/ojt/enhanced/HelpBotTab";

const AdvancedHelp = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link to="/apprentice" className="flex-shrink-0">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-8 w-8 text-elec-yellow" />
              Advanced Help Box
            </h1>
            <p className="text-muted-foreground mt-1">
              AI-powered assistance and cutting-edge training tools for electrical apprentices
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-elec-yellow/20 to-orange-500/20 px-4 py-2 rounded-lg border border-elec-yellow/30">
          <Bot className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">AI Enhanced</span>
        </div>
      </div>

      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-orange-500/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Advanced Training Hub</CardTitle>
          <p className="text-muted-foreground">
            Access AI-powered guidance, personalised learning paths, and cutting-edge training technology 
            including upcoming AR features.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="helpbot" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="helpbot" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Help Bot</span>
                <span className="sm:hidden">Help</span>
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Assessment Prep</span>
                <span className="sm:hidden">Prep</span>
              </TabsTrigger>
              <TabsTrigger value="career" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Career Guidance</span>
                <span className="sm:hidden">Career</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Smart Analytics</span>
                <span className="sm:hidden">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="ar" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">AR Training</span>
                <span className="sm:hidden">AR</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="helpbot">
              <HelpBotTab />
            </TabsContent>

            <TabsContent value="assessment">
              <AssessmentPrepTab />
            </TabsContent>

            <TabsContent value="career">
              <CareerGuidanceTab />
            </TabsContent>

            <TabsContent value="analytics">
              <SmartAnalyticsTab />
            </TabsContent>

            <TabsContent value="ar">
              <ARTrainingTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedHelp;
