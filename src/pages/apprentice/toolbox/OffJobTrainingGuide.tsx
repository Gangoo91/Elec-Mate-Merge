
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, FileText, Users, CheckCircle, AlertCircle, BookOpen, Target, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OffJobTrainingGuide = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Off-the-Job Training Guide</h1>
        <Link to="/apprentice/toolbox" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Toolbox
          </Button>
        </Link>
      </div>

      {/* Introduction Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Understanding Off-the-Job Training
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-elec-light">
            Off-the-job training is a fundamental requirement for all apprenticeships in the UK. It represents learning that takes place 
            away from your normal work duties but within your paid working hours, accounting for at least 20% of your total working time.
          </p>
          <div className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/10">
            <h3 className="text-elec-yellow font-semibold mb-2">Key Requirements</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Minimum 20% of your contracted working hours
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Must be within paid working time
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Separate from day-to-day work activities
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                Directly relevant to your apprenticeship standard
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="what-counts" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="what-counts">What Counts</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
          <TabsTrigger value="rights">Rights</TabsTrigger>
          <TabsTrigger value="assessment">Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="what-counts" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">Activities That Count</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Theory lessons and lectures</span>
                      <p className="text-muted-foreground">Classroom-based learning covering electrical theory, regulations, and principles</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Practical workshops</span>
                      <p className="text-muted-foreground">Hands-on training in controlled environments away from live projects</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Shadowing and mentoring</span>
                      <p className="text-muted-foreground">Structured observation and guidance from experienced professionals</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Online learning modules</span>
                      <p className="text-muted-foreground">Digital courses, webinars, and educational resources</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Industry visits</span>
                      <p className="text-muted-foreground">Educational trips to suppliers, manufacturers, or exemplar installations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Research and assignments</span>
                      <p className="text-muted-foreground">Independent study projects and coursework</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-lg text-red-400">What Doesn't Count</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Regular work duties</span>
                      <p className="text-muted-foreground">Normal installation, maintenance, or repair work</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Tea breaks and lunch</span>
                      <p className="text-muted-foreground">General break times don't constitute learning</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Travel time</span>
                      <p className="text-muted-foreground">Journey time between sites (unless structured learning occurs)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Unpaid study time</span>
                      <p className="text-muted-foreground">Learning outside of contracted working hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Induction periods</span>
                      <p className="text-muted-foreground">General workplace orientation and safety briefings</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="mt-6">
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-elec-yellow" />
                  Evidence Collection Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-elec-light">
                  Proper documentation of your off-the-job training is essential for apprenticeship completion. 
                  You must maintain comprehensive evidence to demonstrate compliance with the 20% requirement.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-3">Essential Documentation</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Training logs with dates, times, and duration</li>
                      <li>• Course certificates and completion records</li>
                      <li>• Assignment submissions and feedback</li>
                      <li>• Photographic evidence of practical work</li>
                      <li>• Witness testimonials from trainers</li>
                      <li>• Learning reflections and progress notes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-3">Quality Standards</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Clear, legible, and professionally presented</li>
                      <li>• Chronologically organised and dated</li>
                      <li>• Directly linked to apprenticeship standards</li>
                      <li>• Authenticated by appropriate personnel</li>
                      <li>• Regularly updated and maintained</li>
                      <li>• Accessible for assessment and verification</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-semibold mb-2">Digital Portfolio Best Practices</h3>
                  <p className="text-sm text-elec-light mb-3">
                    Modern apprentices benefit from digital evidence management:
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>• Use cloud storage for backup and accessibility</li>
                    <li>• Maintain consistent file naming conventions</li>
                    <li>• Create separate folders for each learning activity</li>
                    <li>• Include metadata and tags for easy searching</li>
                    <li>• Regular backups to prevent data loss</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planning" className="mt-6">
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  Strategic Planning for Off-the-Job Training
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-elec-yellow font-semibold mb-3">Annual Planning Approach</h3>
                    <div className="space-y-3 text-sm">
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-blue-400">Year 1: Foundation Building</span>
                        <p className="text-muted-foreground mt-1">
                          Focus on electrical fundamentals, safety regulations, and basic practical skills. 
                          Expect 60-80% theory-based learning.
                        </p>
                      </div>
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-green-400">Year 2-3: Skill Development</span>
                        <p className="text-muted-foreground mt-1">
                          Balance theory with practical application. Specialisation areas and advanced techniques. 
                          50-70% practical focus.
                        </p>
                      </div>
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-orange-400">Year 4: Mastery & Assessment</span>
                        <p className="text-muted-foreground mt-1">
                          Portfolio completion, EPA preparation, and advanced troubleshooting. 
                          Assessment-focused learning.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-elec-yellow font-semibold mb-3">Monthly Time Allocation</h3>
                    <div className="bg-elec-dark p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">College/Training Centre</span>
                        <span className="text-elec-yellow font-medium">40-60%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Online Learning</span>
                        <span className="text-elec-yellow font-medium">20-30%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Practical Workshops</span>
                        <span className="text-elec-yellow font-medium">15-25%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Industry Visits/Events</span>
                        <span className="text-elec-yellow font-medium">5-15%</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                      <p className="text-sm text-yellow-400">
                        <strong>Planning Tip:</strong> Coordinate with your employer to ensure 20% time is protected 
                        and scheduled in advance. Last-minute changes can disrupt learning progression.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="mt-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-lg">Traditional Delivery Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-elec-dark p-3 rounded">
                      <h4 className="font-semibold text-blue-400 mb-1">College Block Release</h4>
                      <p className="text-sm text-muted-foreground">
                        Full-time attendance at college for concentrated periods (typically 1-2 weeks). 
                        Intensive learning with dedicated facilities and expert instructors.
                      </p>
                    </div>
                    <div className="bg-elec-dark p-3 rounded">
                      <h4 className="font-semibold text-green-400 mb-1">Day Release</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular weekly attendance (usually one day per week). Consistent progress 
                        with immediate workplace application opportunities.
                      </p>
                    </div>
                    <div className="bg-elec-dark p-3 rounded">
                      <h4 className="font-semibold text-orange-400 mb-1">Evening Classes</h4>
                      <p className="text-sm text-muted-foreground">
                        After-hours study sessions. Flexible for employers but must be within 
                        contracted working hours to count as off-the-job training.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <CardTitle className="text-lg">Modern Delivery Approaches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-elec-dark p-3 rounded">
                      <h4 className="font-semibold text-purple-400 mb-1">Blended Learning</h4>
                      <p className="text-sm text-muted-foreground">
                        Combination of face-to-face and digital learning. Interactive online modules 
                        complemented by practical workshops and assessments.
                      </p>
                    </div>
                    <div className="bg-elec-dark p-3 rounded">
                      <h4 className="font-semibold text-cyan-400 mb-1">Virtual Reality Training</h4>
                      <p className="text-sm text-muted-foreground">
                        Immersive simulation environments for hazardous scenario training. 
                        Safe practice of high-risk procedures and fault-finding techniques.
                      </p>
                    </div>
                    <div className="bg-elec-dark p-3 rounded">
                      <h4 className="font-semibold text-pink-400 mb-1">Mobile Learning</h4>
                      <p className="text-sm text-muted-foreground">
                        Smartphone and tablet-based learning platforms. Micro-learning modules 
                        for flexible study during commute or breaks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-elec-yellow" />
                  Training Provider Selection Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-2">Quality Indicators</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Ofsted rating (Good or Outstanding)</li>
                      <li>• Industry-experienced instructors</li>
                      <li>• Modern facilities and equipment</li>
                      <li>• Strong employer partnerships</li>
                      <li>• High completion rates</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-2">Practical Considerations</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Geographic accessibility</li>
                      <li>• Flexible scheduling options</li>
                      <li>• Digital platform availability</li>
                      <li>• Support services offered</li>
                      <li>• Assessment methods used</li>
                    </ul>
                  </div>
                  
                  <div className="bg-elec-dark p-4 rounded-lg">
                    <h3 className="text-elec-yellow font-semibold mb-2">Cost Factors</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Government funding eligibility</li>
                      <li>• Additional resource costs</li>
                      <li>• Travel and accommodation</li>
                      <li>• Technology requirements</li>
                      <li>• Examination and certification fees</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rights" className="mt-6">
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  Your Rights and Employer Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-green-400 font-semibold mb-3">Your Rights as an Apprentice</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Guaranteed training time</span>
                          <p className="text-muted-foreground">Minimum 20% of working hours for off-the-job training</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Paid learning time</span>
                          <p className="text-muted-foreground">Training must occur during contracted, paid hours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Quality training provision</span>
                          <p className="text-muted-foreground">Access to qualified instructors and appropriate resources</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Progress monitoring</span>
                          <p className="text-muted-foreground">Regular reviews and feedback on your development</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-blue-400 font-semibold mb-3">Employer Responsibilities</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Release time provision</span>
                          <p className="text-muted-foreground">Must allow and schedule appropriate training time</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Financial investment</span>
                          <p className="text-muted-foreground">Cover training costs and maintain wages during learning</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Workplace support</span>
                          <p className="text-muted-foreground">Provide mentoring and practical application opportunities</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Target className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">Progress facilitation</span>
                          <p className="text-muted-foreground">Support portfolio development and assessment preparation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                  <h3 className="text-red-400 font-semibold mb-2">When Things Go Wrong</h3>
                  <p className="text-sm text-elec-light mb-3">
                    If your employer is not meeting their off-the-job training obligations:
                  </p>
                  <div className="grid gap-3 md:grid-cols-2 text-sm">
                    <div>
                      <span className="font-medium text-yellow-400">Step 1: Document the Issues</span>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>• Keep records of missed training time</li>
                        <li>• Note specific incidents and dates</li>
                        <li>• Gather evidence of impact on progress</li>
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium text-yellow-400">Step 2: Seek Support</span>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>• Contact your training provider first</li>
                        <li>• Speak with your apprenticeship assessor</li>
                        <li>• Consider mediation services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="mt-6">
          <div className="space-y-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                  Assessment Integration and EPA Preparation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
                  <h3 className="text-blue-400 font-semibold mb-2">Off-the-Job Training and EPA Connection</h3>
                  <p className="text-sm text-elec-light">
                    Your off-the-job training directly prepares you for the End Point Assessment (EPA). 
                    Every learning activity should contribute towards demonstrating the knowledge, skills, 
                    and behaviours required in your apprenticeship standard.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="text-elec-yellow font-semibold mb-3">Knowledge Component Alignment</h3>
                    <div className="space-y-3 text-sm">
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-green-400">Electrical Science & Theory</span>
                        <p className="text-muted-foreground mt-1">
                          Classroom theory, online modules, and practical demonstrations that build 
                          fundamental understanding tested in knowledge assessments.
                        </p>
                      </div>
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-blue-400">Regulations & Standards</span>
                        <p className="text-muted-foreground mt-1">
                          Structured study of BS 7671, building regulations, and safety standards 
                          through guided reading and interpretation exercises.
                        </p>
                      </div>
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-purple-400">Design & Planning</span>
                        <p className="text-muted-foreground mt-1">
                          Project-based learning covering circuit design, load calculations, 
                          and installation planning methodologies.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-elec-yellow font-semibold mb-3">Skills Development Focus</h3>
                    <div className="space-y-3 text-sm">
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-orange-400">Practical Competencies</span>
                        <p className="text-muted-foreground mt-1">
                          Workshop-based skill development that directly maps to practical 
                          assessment criteria and workplace observations.
                        </p>
                      </div>
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-cyan-400">Testing & Inspection</span>
                        <p className="text-muted-foreground mt-1">
                          Hands-on training with test equipment, measurement techniques, 
                          and certification procedures required for professional practice.
                        </p>
                      </div>
                      <div className="bg-elec-dark p-3 rounded">
                        <span className="font-medium text-pink-400">Problem Solving</span>
                        <p className="text-muted-foreground mt-1">
                          Scenario-based learning that develops diagnostic skills and 
                          systematic fault-finding approaches tested in EPA activities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-elec-dark p-4 rounded-lg">
                  <h3 className="text-elec-yellow font-semibold mb-3">Portfolio Integration Strategy</h3>
                  <div className="grid gap-4 md:grid-cols-3 text-sm">
                    <div>
                      <span className="font-medium text-yellow-400">Continuous Documentation</span>
                      <p className="text-muted-foreground mt-1">
                        Record learning outcomes from each training session with reflection 
                        on application to apprenticeship standards.
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-yellow-400">Evidence Mapping</span>
                      <p className="text-muted-foreground mt-1">
                        Cross-reference training activities to specific EPA criteria 
                        and portfolio requirements for comprehensive coverage.
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-yellow-400">Progress Monitoring</span>
                      <p className="text-muted-foreground mt-1">
                        Regular review sessions to identify gaps and plan additional 
                        training to ensure EPA readiness.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OffJobTrainingGuide;
