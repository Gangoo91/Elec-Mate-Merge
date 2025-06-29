
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, BookOpen, Target, CheckCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ApprenticeshipExpectations = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Apprenticeship Expectations</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          What to expect during your electrical apprenticeship journey - from day one to qualification
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Toolbox" />
      </div>

      <Alert className="border-blue-500/50 bg-blue-500/10">
        <Target className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Understanding what's expected of you as an apprentice helps you succeed and get the most from your training experience.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="expectations" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Expectations
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Support
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Your Apprenticeship Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                An electrical apprenticeship typically lasts 3-4 years and combines practical on-site work with 
                theoretical learning. You'll develop both technical skills and professional competencies whilst 
                earning a wage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">80% On-the-Job</h4>
                  <p className="text-sm text-muted-foreground">
                    Practical work experience on real electrical installations under supervision
                  </p>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">20% Off-the-Job</h4>
                  <p className="text-sm text-muted-foreground">
                    Classroom learning, workshops, and theoretical study time
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                  Year 1: Foundation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Health and safety induction and basic electrical theory
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Tool familiarisation and basic installation techniques
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Introduction to BS 7671 regulations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                  Year 2-3: Development
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Advanced installation methods and circuit design
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Testing and inspection procedures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Fault finding and problem-solving skills
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                  Year 4: Mastery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Independent working and project management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    AM2 practical assessment preparation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    Portfolio completion and final assessments
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expectations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-400">What We Expect From You</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Punctuality and reliable attendance</li>
                  <li>• Professional attitude and willingness to learn</li>
                  <li>• Following health and safety procedures</li>
                  <li>• Completing assigned tasks and coursework</li>
                  <li>• Asking questions when unsure</li>
                  <li>• Maintaining your portfolio and logbook</li>
                  <li>• Respect for colleagues and customers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-elec-yellow">What You Can Expect From Us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Structured training programme</li>
                  <li>• Experienced mentors and supervisors</li>
                  <li>• Regular feedback and assessments</li>
                  <li>• Support with learning difficulties</li>
                  <li>• Career development opportunities</li>
                  <li>• Fair treatment and respect</li>
                  <li>• Competitive apprentice wages</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Support Network</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Site Supervisor</h4>
                  <p className="text-sm text-muted-foreground">
                    Day-to-day guidance and practical training
                  </p>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Training Provider</h4>
                  <p className="text-sm text-muted-foreground">
                    Theoretical learning and assessment support
                  </p>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Apprentice Coordinator</h4>
                  <p className="text-sm text-muted-foreground">
                    Overall progress monitoring and career guidance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Remember:</strong> Your apprenticeship is a journey, not a race. Everyone learns at different 
              paces, and it's normal to face challenges. Don't hesitate to ask for help when you need it.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApprenticeshipExpectations;
