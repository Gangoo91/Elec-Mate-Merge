import { ArrowLeft, CheckCircle, AlertTriangle, FileText, Users, TrendingUp, Shield, BookOpen, Lightbulb, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Quiz } from "@/components/apprentice-courses/Quiz";
import { InlineCheck } from "@/components/apprentice-courses/InlineCheck";
import useSEO from "@/hooks/useSEO";

const TITLE = "Near Miss Reporting - Level 2 Electrical Course";
const DESCRIPTION = "Learn how near miss reporting prevents serious incidents and improves workplace safety in electrical environments.";

const Section6_5 = () => {
  useSEO(TITLE, DESCRIPTION);

  const quickCheckQuestions = [
    {
      id: 1,
      question: "What should you do immediately after experiencing a near miss?",
      options: [
        "Continue working and report it later",
        "Tell your supervisor immediately",
        "Wait until break time to mention it",
        "Only report if it was serious"
      ],
      correctIndex: 1,
      explanation: "Near misses should be reported to your supervisor immediately while details are fresh and action can be taken quickly."
    }
  ];

  const quizQuestions = [
    {
      id: 1,
      question: "What is a near miss?",
      options: [
        "An accident that caused minor injury",
        "An unplanned event that could have caused harm but didn't",
        "A safety procedure that was nearly forgotten",
        "Equipment that almost failed inspection"
      ],
      correctAnswer: 1,
      explanation: "A near miss is an unplanned event that could have caused injury, damage, or loss but didn't. It's a warning that conditions exist that could lead to an accident."
    },
    {
      id: 2,
      question: "Why should near misses be reported?",
      options: [
        "To blame someone for the mistake",
        "Only if someone could have been seriously hurt",
        "To identify hazards and prevent future accidents",
        "They don't need to be reported if no one was hurt"
      ],
      correctAnswer: 2,
      explanation: "Near miss reporting helps identify unseen hazards, prevents future accidents, and allows issues to be fixed before someone gets hurt. It's about learning and improving, not blame."
    },
    {
      id: 3,
      question: "Who should you tell if you experience a near miss?",
      options: [
        "No one, if no harm occurred",
        "Only your work colleagues",
        "Your supervisor or safety officer immediately",
        "The client at the end of the job"
      ],
      correctAnswer: 2,
      explanation: "Near misses should be reported to your supervisor or safety officer immediately so they can investigate and implement measures to prevent future incidents."
    },
    {
      id: 4,
      question: "What should a near miss report include?",
      options: [
        "Only the time it happened",
        "Date, time, what happened, what nearly went wrong, and suggestions for improvement",
        "Just your name and signature",
        "Only the location where it occurred"
      ],
      correctAnswer: 1,
      explanation: "A comprehensive near miss report should include date and time, what happened, what nearly went wrong, contributing factors, and suggestions for fixing the issue."
    },
    {
      id: 5,
      question: "True or False: If no one is hurt, there's no need to report a near miss.",
      options: ["True", "False"],
      correctAnswer: 1,
      explanation: "False. Near misses should always be reported regardless of whether anyone was hurt. They provide valuable information to prevent future accidents and improve safety systems."
    },
    {
      id: 6,
      question: "What is Heinrich's Safety Triangle used to demonstrate?",
      options: [
        "Different types of accidents",
        "The relationship between near misses and serious injuries",
        "PPE requirements for different tasks",
        "Emergency response procedures"
      ],
      correctAnswer: 1,
      explanation: "Heinrich's Safety Triangle shows that for every major injury, there are typically 29 minor injuries and 300 near misses, demonstrating the importance of reporting near misses."
    },
    {
      id: 7,
      question: "What happens during a near miss investigation?",
      options: [
        "The person who reported it gets blamed",
        "Root cause analysis and risk assessment review",
        "Nothing, since no one was hurt",
        "Only paperwork is completed"
      ],
      correctAnswer: 1,
      explanation: "A proper near miss investigation includes root cause analysis, risk assessment review, making immediate hazards safe, and implementing improvements."
    },
    {
      id: 8,
      question: "Why does near miss reporting create a positive safety culture?",
      options: [
        "It shows who is making mistakes",
        "It promotes openness, learning, and shared responsibility",
        "It provides data for management reports",
        "It satisfies legal requirements"
      ],
      correctAnswer: 1,
      explanation: "Near miss reporting promotes openness and learning, shows safety is taken seriously, and creates shared responsibility for workplace safety."
    },
    {
      id: 9,
      question: "Which of these is an example of a near miss in electrical work?",
      options: [
        "Completing a job ahead of schedule",
        "Touching a conductor that was unexpectedly live but not getting shocked",
        "Using the correct PPE for a task",
        "Following isolation procedures correctly"
      ],
      correctAnswer: 1,
      explanation: "Touching an unexpectedly live conductor without getting shocked is a classic near miss - it could have caused serious injury but didn't."
    },
    {
      id: 10,
      question: "What should be included in near miss report suggestions?",
      options: [
        "Who should be disciplined",
        "How the incident could be prevented in future",
        "Cost estimates for repairs",
        "Time lost due to the incident"
      ],
      correctAnswer: 1,
      explanation: "Near miss reports should include practical suggestions for preventing similar incidents in the future, focusing on system improvements rather than blame."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <div className="border-b border-border/20 bg-card sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground active:text-foreground p-0 -ml-1" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Section 6
            </Link>
          </Button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-card">
              <AlertTriangle className="w-6 h-6 text-foreground" />
            </div>
            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
              Section 6.5
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
            Near Miss Reporting
          </h1>
          <p className="text-muted-foreground text-lg">
            Learn how near miss reporting prevents serious incidents and improves workplace safety in electrical environments.
          </p>
        </header>

        {/* Introduction */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Introduction</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-base text-foreground">
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">In 30 Seconds</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Near misses are events that could have caused harm but didn't.</li>
                <li>They're warning signs that dangerous conditions exist for accidents.</li>
                <li>Every near miss tells us something valuable about hidden workplace risks.</li>
              </ul>
            </div>
            <div className="rounded-lg p-3 sm:p-4 bg-emerald-500/10 border-l-4 border-l-emerald-500 border border-emerald-500/30">
              <p className="font-semibold text-emerald-400 mb-2">Spot it / Use it</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Spot:</strong> Unexpected live circuits, tools that nearly fell, cables you almost tripped on.</li>
                <li><strong>Use:</strong> Report immediately to supervisor, include full details, suggest improvements.</li>
                <li><strong>Learn:</strong> From investigation findings to prevent future incidents.</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Learning Outcomes */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-3 text-base text-foreground">
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Define what a near miss is and recognise examples in electrical work</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Understand why near miss reporting prevents serious incidents</span>
              </li>
            </ul>
            <ul className="space-y-3 text-base text-foreground">
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Learn the correct reporting procedure and required information</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Recognise how reporting improves workplace safety culture</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* Content Sections */}
        {/* Section 1: Definition and Recognition */}
        <div className="space-y-6 mb-8">
          <div className="rounded-lg p-6 border-l-4 border-l-red-500 bg-card">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-600 dark:text-emerald-400 mb-3">Definition and Recognition</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">What Is a Near Miss?</h4>
                    <p className="text-base text-foreground mb-2">A near miss is any unplanned event that could have caused injury, damage, or loss — but didn't.</p>
                    <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                      <li>Warning signs that dangerous conditions exist</li>
                      <li>Events that could have resulted in accidents</li>
                      <li>Opportunities to learn and improve safety systems</li>
                      <li>Incidents where luck prevented serious consequences</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Common Examples in Electrical Work</h4>
                    <p className="text-base text-foreground mb-2">Recognising near misses helps prevent future accidents.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                        <li>Touching an unexpectedly live conductor</li>
                        <li>Tools falling from height but missing people</li>
                        <li>Loose fittings sparking but not igniting</li>
                      </ul>
                      <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                        <li>Tripping over cables but catching balance</li>
                        <li>Ladders slipping but being caught in time</li>
                        <li>Working on circuits thought to be isolated</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-background/50 p-3 rounded border">
                    <p className="text-sm font-medium text-foreground">
                      <strong>Key Point:</strong> The difference between a near miss and an accident is often just luck. Next time, you might not be so fortunate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Value of Near Miss Reporting */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">2</div>
              <CardTitle className="text-base">The Value of Near Miss Reporting</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              Near miss reporting is one of the most effective ways to prevent serious accidents. It helps identify hidden hazards and system weaknesses before someone gets hurt.
            </p>

            <div className="grid gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-orange-600 mb-2">Safety Benefits</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
                  <li>Identifies unseen hazards</li>
                  <li>Prevents future accidents</li>
                  <li>Allows fixes before someone gets hurt</li>
                  <li>Identifies patterns and trends</li>
                  <li>Improves overall safety systems</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-green-600 mb-2">Cultural Benefits</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
                  <li>Promotes openness and learning</li>
                  <li>Shows safety is taken seriously</li>
                  <li>Encourages proactive thinking</li>
                  <li>Builds trust with management</li>
                  <li>Creates shared responsibility</li>
                </ul>
              </div>
            </div>

            <div className="bg-background/50 p-3 rounded border">
              <p className="text-sm font-medium text-foreground">
                <strong>Remember:</strong> Reporting is not about blaming — it's about improving the system and protecting everyone on site.
              </p>
            </div>
          </CardContent>
        </Card>

        <InlineCheck
          id="nearMissCheck"
          question={quickCheckQuestions[0].question}
          options={quickCheckQuestions[0].options}
          correctIndex={quickCheckQuestions[0].correctIndex}
          explanation={quickCheckQuestions[0].explanation}
        />

        {/* Section 3: Reporting Procedure and Requirements */}
        <div className="space-y-6 mb-8">
          <div className="rounded-lg p-6 border-l-4 border-l-emerald-500 bg-card">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-emerald-400 dark:text-emerald-400 mb-3">Reporting Procedure and Requirements</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Step-by-Step Process</h4>
                    <p className="text-base text-foreground mb-2">Knowing how to report a near miss properly ensures the information gets to the right people.</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                        <div>
                          <p className="text-foreground font-medium">Tell your supervisor immediately</p>
                          <p className="text-muted-foreground text-sm">Don't wait - report as soon as possible while details are fresh</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                        <div>
                          <p className="text-foreground font-medium">Fill in a near miss report form</p>
                          <p className="text-muted-foreground text-sm">Use the site's formal reporting system if available</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                        <div>
                          <p className="text-foreground font-medium">Include all relevant details</p>
                          <p className="text-muted-foreground text-sm">Date, time, location, what happened, and contributing factors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Required Information</h4>
                    <p className="text-base text-foreground mb-2">A comprehensive near miss report should include all relevant details.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                        <li>Date and time when it happened</li>
                        <li>Exact location where it occurred</li>
                        <li>Clear description of events</li>
                        <li>What nearly went wrong</li>
                      </ul>
                      <ul className="text-xs sm:text-sm text-foreground ml-4 space-y-1 list-disc">
                        <li>Contributing factors identified</li>
                        <li>Your suggestions for prevention</li>
                        <li>Names of any witnesses</li>
                        <li>Photos if safe to take them</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-background/50 p-3 rounded border">
                    <p className="text-sm font-medium text-foreground">
                      <strong>Note:</strong> Most large sites have formal processes, but smaller jobs may rely on verbal reporting to the person in charge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Investigation Process */}
        <Card className="mb-6 sm:mb-8 p-4 sm:p-6 bg-card border-border/20 border-l-4 border-l-purple-500">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">4</div>
              <CardTitle className="text-base">What Happens After Reporting</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base text-muted-foreground">
              Understanding the investigation process helps you see why near miss reporting is valuable and how it leads to improvements.
            </p>

            <div className="grid gap-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-purple-600 mb-2">Investigation Process</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
                  <li>Supervisor conducts investigation</li>
                  <li>Root cause analysis performed</li>
                  <li>Risk assessment reviewed</li>
                  <li>Immediate hazards made safe</li>
                  <li>Evidence preserved if needed</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium text-sm text-emerald-400 mb-2">Improvements Made</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc ml-4">
                  <li>Control measures added or changed</li>
                  <li>Training or signage improved</li>
                  <li>Procedures updated</li>
                  <li>Equipment checked or replaced</li>
                  <li>Lessons shared across team</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Heinrich's Safety Triangle & Evidence */}
        <div className="space-y-6 mb-8">
          <div className="rounded-lg p-6 border-l-4 border-l-green-500 bg-card">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-3">Heinrich's Safety Triangle & Evidence</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Statistical Evidence</h4>
                    <p className="text-base text-foreground mb-2">Heinrich's Safety Triangle demonstrates why near miss reporting is statistically proven to prevent serious injuries.</p>
                    
                    <div className="bg-background/50 p-4 rounded border mb-4">
                      <h4 className="font-medium text-foreground mb-3">For Every Major Injury:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold">1</span>
                          </div>
                          <span className="text-foreground">Major Injury</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold">10</span>
                          </div>
                          <span className="text-foreground">Minor Injuries</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold">30</span>
                          </div>
                          <span className="text-foreground">Property Damage</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold">600</span>
                          </div>
                          <span className="text-foreground">Near Misses</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background/50 p-3 rounded border">
                    <p className="text-sm font-medium text-foreground">
                      <strong>Key Insight:</strong> By reporting and addressing near misses, we can prevent the serious injuries at the top of the triangle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real World Scenario */}
        <Card className="p-6 bg-emerald-500/5 border border-emerald-400/20 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Real World Scenario
          </h2>
          <div className="space-y-4">
            <div className="bg-card border border-emerald-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">The Scenario</h3>
              <p className="text-muted-foreground text-sm">
                An apprentice almost drilled into a live cable hidden behind plaster. He stopped after a flash appeared through the drill hole. He reported it, and a scan of the wall showed more poorly routed cables.
              </p>
            </div>
            <div className="bg-card border border-emerald-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">What Happened Next</h3>
              <p className="text-muted-foreground text-sm">
                The site added mandatory cable detection before drilling anywhere — potentially preventing multiple injuries.
              </p>
            </div>
            <div className="bg-card border border-emerald-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Why It Mattered</h3>
              <ul className="space-y-1 text-muted-foreground text-sm list-disc ml-4">
                <li>One person's honesty protected the whole team</li>
                <li>The near miss revealed a systemic problem</li>
                <li>Simple reporting led to better procedures</li>
                <li>Multiple future accidents were prevented</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* FAQs */}
        <Card className="p-6 bg-card border-border/20 mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-foreground mb-1">Will I get in trouble for reporting a near miss?</h3>
              <p className="text-muted-foreground text-sm">No. Near miss reporting is about learning and improvement, not blame. Most companies have policies protecting those who report safety concerns.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-foreground mb-1">What if it was my mistake that caused the near miss?</h3>
              <p className="text-muted-foreground text-sm">Still report it. Honest reporting helps identify training needs or system improvements. The focus is on preventing future incidents.</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-foreground mb-1">Should I report near misses that seem minor?</h3>
              <p className="text-muted-foreground text-sm">Yes. Even minor near misses can reveal important patterns. What seems small to you might be part of a bigger safety issue.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-foreground mb-1">How long do I have to report a near miss?</h3>
              <p className="text-muted-foreground text-sm">Report immediately if possible, or by the end of your shift at the latest. Quick reporting allows faster action to prevent similar incidents.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-foreground mb-1">What if I witness someone else's near miss?</h3>
              <p className="text-muted-foreground text-sm">Encourage them to report it, and if they won't, you should report it yourself. Safety is everyone's responsibility.</p>
            </div>
            <div className="border-l-4 border-emerald-500 pl-4">
              <h3 className="font-semibold text-foreground mb-1">Do near miss reports affect safety statistics?</h3>
              <p className="text-muted-foreground text-sm">Near misses are typically recorded separately from accidents. High near miss reporting often indicates a positive safety culture.</p>
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link to="../subsection26">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous: Accident Reporting
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="../subsection28">
              Next: Emergency Procedures
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </Button>
        </div>

        {/* Quiz */}
        <Quiz questions={quizQuestions} />
      </main>
    </div>
  );
};

export default Section6_5;