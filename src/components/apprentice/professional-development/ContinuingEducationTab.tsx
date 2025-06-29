
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calculator, CheckCircle, MapPin, Clock, Users } from "lucide-react";
import EducationPathways from "./education/EducationPathways";
import FundingCalculator from "./education/FundingCalculator";
import EligibilityChecker from "./education/EligibilityChecker";
import ApplicationGuides from "./education/ApplicationGuides";
import SuccessStories from "./education/SuccessStories";
import RegionalInformation from "./education/RegionalInformation";

const ContinuingEducationTab = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Continuing Education & Further Learning</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Advance your career with higher qualifications, specialist courses, and emerging technology training. 
          Explore funding options, check your eligibility, and get step-by-step guidance for your educational journey.
        </p>
      </div>

      <Tabs defaultValue="pathways" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="pathways" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Pathways
          </TabsTrigger>
          <TabsTrigger value="funding" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Funding
          </TabsTrigger>
          <TabsTrigger value="eligibility" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Eligibility
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="stories" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Stories
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Regional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pathways" className="space-y-6">
          <EducationPathways />
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <FundingCalculator />
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <EligibilityChecker />
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <ApplicationGuides />
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <SuccessStories />
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <RegionalInformation />
        </TabsContent>
      </Tabs>

      <Card className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Your Education Journey Starts Here
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Professional development through education is one of the most effective ways to advance your electrical career. 
            Use these tools to explore your options, understand funding opportunities, and create a clear pathway to your goals. 
            Remember, many employers support further education - don't hesitate to discuss your ambitions with your supervisor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;
