
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Clock, CheckCircle, Calculator, Users, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OffJobTrainingGuide = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Off-the-Job Training Guide</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Understanding your 20% off-the-job training requirements and how to make the most of your learning time
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Toolbox" />
      </div>

      <Alert className="border-blue-500/50 bg-blue-500/10">
        <BookOpen className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-200">
          Off-the-job training is a legal requirement for all apprentices in England. You're entitled to at least 20% 
          of your working hours dedicated to learning and development.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="calculation" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Time Calculation
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Tracking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">What is Off-the-Job Training?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Off-the-job training is learning that takes place outside of the day-to-day work environment. 
                It's designed to develop your knowledge, skills, and behaviours beyond what you learn through 
                normal work activities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-400">What Counts as Off-the-Job:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      College/training provider sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Online learning modules
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Workshops and seminars
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Mentoring sessions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Study time for assignments
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-400">What Doesn't Count:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Normal work activities</li>
                    <li>• Progress reviews</li>
                    <li>• English and maths (if not directly related)</li>
                    <li>• Induction that any employee would receive</li>
                    <li>• Training mandated for health and safety</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-elec-yellow" />
                Calculating Your 20% Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-elec-gray p-4 rounded-lg border border-elec-yellow/20">
                <h4 className="font-semibold text-elec-yellow mb-3">Example Calculation:</h4>
                <div className="space-y-2 text-sm">
                  <p>• Working 37.5 hours per week</p>
                  <p>• 20% = 7.5 hours per week off-the-job training</p>
                  <p>• Over a year (52 weeks) = 390 hours minimum</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20 text-center">
                  <div className="text-2xl font-bold text-elec-yellow">7.5</div>
                  <div className="text-sm text-muted-foreground">Hours per week</div>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20 text-center">
                  <div className="text-2xl font-bold text-elec-yellow">30</div>
                  <div className="text-sm text-muted-foreground">Hours per month</div>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20 text-center">
                  <div className="text-2xl font-bold text-elec-yellow">390</div>
                  <div className="text-sm text-muted-foreground">Hours per year</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Important:</strong> Your employer must give you this time - it's not optional. 
              If you're not getting your full 20%, speak to your training provider or apprentice coordinator.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-elec-yellow">Formal Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>College day release or block release</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Online courses and e-learning modules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Webinars and virtual workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Technical qualifications study</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-elec-yellow">Practical Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Skills workshops at training centres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Manufacturer training courses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Trade shows and exhibitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Professional development sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-elec-yellow">Self-Directed Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Portfolio development and documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Research and assignment preparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Reading technical publications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Mock exam preparation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-elec-yellow">Mentoring & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>One-to-one mentoring sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Peer learning groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Skills coaching sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                    <span>Career guidance meetings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-elec-yellow" />
                Tracking Your Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                It's important to keep accurate records of your off-the-job training time. This helps ensure 
                you're meeting requirements and provides evidence for your assessments.
              </p>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-elec-yellow">What to Record:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Date and duration of activity</li>
                    <li>• Type of learning activity</li>
                    <li>• What was learned/covered</li>
                    <li>• How it relates to your apprenticeship</li>
                  </ul>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Evidence or documentation</li>
                    <li>• Reflections on learning</li>
                    <li>• Any actions or follow-up required</li>
                    <li>• Running total of hours</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-elec-yellow">Recording Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Digital Logbook</h4>
                  <p className="text-sm text-muted-foreground">
                    Use Elec-Mate's digital logbook feature to track your time automatically
                  </p>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Training Provider System</h4>
                  <p className="text-sm text-muted-foreground">
                    Many providers have their own tracking systems for apprentices
                  </p>
                </div>
                <div className="p-4 bg-elec-gray rounded-lg border border-elec-yellow/20">
                  <h4 className="font-semibold text-elec-yellow mb-2">Paper Portfolio</h4>
                  <p className="text-sm text-muted-foreground">
                    Traditional paper-based record keeping with signed evidence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OffJobTrainingGuide;
