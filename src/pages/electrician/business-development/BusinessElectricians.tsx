
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, ArrowLeft, Users, TrendingUp, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RecruitmentTab from "@/components/electrician/business-development/electricians/RecruitmentTab";
import OnboardingTab from "@/components/electrician/business-development/electricians/OnboardingTab";
import RetentionTab from "@/components/electrician/business-development/electricians/RetentionTab";
import ManagementTab from "@/components/electrician/business-development/electricians/ManagementTab";

const BusinessElectricians = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Onboarding Electricians</h1>
      </div>
      
      <p className="text-muted-foreground text-center max-w-2xl mx-auto">
        Comprehensive guidance for recruiting, onboarding, and retaining qualified electricians in your business
      </p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/50 bg-green-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-300">£15k</div>
            <div className="text-sm text-green-100">Average recruitment cost</div>
          </CardContent>
        </Card>
        <Card className="border-blue-500/50 bg-blue-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-300">6 weeks</div>
            <div className="text-sm text-blue-100">Time to productivity</div>
          </CardContent>
        </Card>
        <Card className="border-purple-500/50 bg-purple-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-300">85%</div>
            <div className="text-sm text-purple-100">Industry retention rate</div>
          </CardContent>
        </Card>
        <Card className="border-orange-500/50 bg-orange-500/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-300">30%</div>
            <div className="text-sm text-orange-100">Productivity increase with good management</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recruitment" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recruitment" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Recruitment
          </TabsTrigger>
          <TabsTrigger value="onboarding" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Onboarding
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Retention
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recruitment">
          <RecruitmentTab />
        </TabsContent>

        <TabsContent value="onboarding">
          <OnboardingTab />
        </TabsContent>

        <TabsContent value="retention">
          <RetentionTab />
        </TabsContent>

        <TabsContent value="management">
          <ManagementTab />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-5 w-5" />
            Key Success Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-3">For Small Businesses (1-5 electricians)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Focus on cultural fit and versatility</li>
                <li>• Provide hands-on mentoring and support</li>
                <li>• Offer competitive packages within budget</li>
                <li>• Create clear progression opportunities</li>
                <li>• Build strong team relationships</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">For Larger Businesses (5+ electricians)</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Implement structured recruitment processes</li>
                <li>• Develop formal training and onboarding programs</li>
                <li>• Create specialisation and advancement tracks</li>
                <li>• Use performance management systems</li>
                <li>• Invest in management training for supervisors</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Legal Compliance Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-100 text-sm">
            Always ensure compliance with employment law, health and safety regulations, and industry standards. 
            When in doubt, consult with HR professionals or employment law specialists. This guidance is for 
            general information only and does not constitute legal advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessElectricians;
