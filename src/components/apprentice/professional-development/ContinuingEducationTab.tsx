
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Calculator, CheckCircle, MapPin, Clock, Users, Info, Star, AlertCircle, Lightbulb } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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

      {/* Educational Tips Banner */}
      <Alert className="border-elec-yellow/50 bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5">
        <Lightbulb className="h-4 w-4 text-elec-yellow" />
        <AlertDescription>
          <strong>Pro Tip:</strong> Many employers support continuing education through study leave and funding. 
          Discuss your career aspirations with your supervisor to explore available opportunities.
        </AlertDescription>
      </Alert>

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
          <Alert className="border-blue-500/20 bg-blue-500/10">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-200">
              Choose pathways that align with your career goals and current skill level. Consider both traditional academic routes and industry-specific certifications.
            </AlertDescription>
          </Alert>
          <EducationPathways />
          
          {/* Enhanced Content for Pathways */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-elec-yellow" />
                Popular Education Pathways
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Badge variant="secondary">Most Popular</Badge>
                  <h4 className="font-semibold">Higher National Certificate (HNC)</h4>
                  <p className="text-sm text-muted-foreground">
                    Level 4 qualification ideal for career progression. Can be completed part-time while working.
                  </p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">Fast Track</Badge>
                  <h4 className="font-semibold">Specialist Certifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Short courses in renewable energy, smart home technology, and EV charging installation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <Alert className="border-green-500/20 bg-green-500/10">
            <Calculator className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-200">
              Use our funding calculator below to estimate costs and explore available financial support options for your chosen course.
            </AlertDescription>
          </Alert>
          <FundingCalculator />
          
          {/* Enhanced Funding Information */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Common Funding Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Employer Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Many employers offer study leave, course fees, and exam support for relevant qualifications.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Student Finance</h4>
                  <p className="text-sm text-muted-foreground">
                    Available for higher education courses. Part-time students may qualify for reduced support.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-elec-yellow">Industry Schemes</h4>
                  <p className="text-sm text-muted-foreground">
                    CITB grants and other industry-specific funding for construction-related training.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Alert className="border-orange-500/20 bg-orange-500/10">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-200">
              Check your eligibility carefully before applying. Some courses have specific entry requirements or work experience criteria.
            </AlertDescription>
          </Alert>
          <EligibilityChecker />
          
          {/* Enhanced Eligibility Information */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Typical Entry Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Higher National Certificate (HNC)</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Completed Level 3 apprenticeship or equivalent</li>
                    <li>• Minimum 2 years relevant work experience</li>
                    <li>• GCSE English and Maths (Grade C/4 or above)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Specialist Short Courses</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Qualified electrician status (Level 3)</li>
                    <li>• Current JIB or equivalent registration</li>
                    <li>• Relevant work experience in the field</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6">
          <Alert className="border-purple-500/20 bg-purple-500/10">
            <Clock className="h-4 w-4 text-purple-500" />
            <AlertDescription className="text-purple-200">
              Follow our step-by-step guides to navigate the application process successfully. Start early to meet all deadlines.
            </AlertDescription>
          </Alert>
          <ApplicationGuides />
          
          {/* Enhanced Application Timeline */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle>Application Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline">6 months before</Badge>
                  <div>
                    <h4 className="font-semibold">Research & Planning</h4>
                    <p className="text-sm text-muted-foreground">Research courses, providers, and funding options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">3 months before</Badge>
                  <div>
                    <h4 className="font-semibold">Applications Open</h4>
                    <p className="text-sm text-muted-foreground">Submit applications and funding requests</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline">1 month before</Badge>
                  <div>
                    <h4 className="font-semibold">Final Preparations</h4>
                    <p className="text-sm text-muted-foreground">Arrange study leave and prepare materials</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <Alert className="border-green-500/20 bg-green-500/10">
            <Users className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-200">
              Learn from others who have successfully advanced their careers through continuing education. Their experiences can guide your journey.
            </AlertDescription>
          </Alert>
          <SuccessStories />
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Alert className="border-blue-500/20 bg-blue-500/10">
            <MapPin className="h-4 w-4 text-blue-500" />
            <AlertDescription className="text-blue-200">
              Find local education providers and region-specific opportunities. Distance learning options are also available for flexibility.
            </AlertDescription>
          </Alert>
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
          <p className="text-muted-foreground mb-4">
            Professional development through education is one of the most effective ways to advance your electrical career. 
            Use these tools to explore your options, understand funding opportunities, and create a clear pathway to your goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Interactive funding calculator</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Comprehensive eligibility checker</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Step-by-step application guides</span>
            </div>
          </div>
          <Alert className="mt-4 border-elec-yellow/30">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Remember: Many employers support further education - don't hesitate to discuss your ambitions with your supervisor or HR department.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuingEducationTab;
