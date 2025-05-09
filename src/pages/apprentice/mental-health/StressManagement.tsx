
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  User,
  Brain,
  HeartPulse,
  ChevronDown,
  ArrowLeft,
  Timer,
  Lightbulb,
  Hammer,
  ArrowDownToLine,
  Leaf,
  Waves,
  MoveVertical
} from "lucide-react";

import StressProgressBar from "@/components/mental-health/stress/StressProgressBar";
import StressTechnique from "@/components/mental-health/stress/StressTechnique";
import SupportCallout from "@/components/mental-health/stress/SupportCallout";

const StressManagement = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleAdvancedTips = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="container py-8 animate-fade-in max-w-5xl">
      <div className="flex items-center mb-8">
        <Link to="/apprentice/mental-health">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Mental Health Resources
          </Button>
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Stress Management for Apprentices</h1>
      <p className="text-muted-foreground mb-8">
        Practical tools and techniques to help manage workplace and training-related stress
      </p>
      
      {/* Progress Tracking */}
      <div className="mb-10">
        <StressProgressBar />
      </div>
      
      {/* Tabs for different stress management areas */}
      <Tabs defaultValue="identify" className="space-y-6">
        <TabsList className="bg-elec-gray border border-elec-yellow/20">
          <TabsTrigger value="identify">Identify Stressors</TabsTrigger>
          <TabsTrigger value="recognize">Recognize Signs</TabsTrigger>
          <TabsTrigger value="techniques">Management Techniques</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Tab 1: Common Stressors */}
        <TabsContent value="identify" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Common Stressors for Electrical Apprentices</h2>
          <p className="text-muted-foreground mb-4">
            Identifying what causes your stress is the first step in managing it effectively. Here are common stressors that electrical apprentices face:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-elec-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-elec-yellow" />
                  Technical Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learning complex electrical theories, regulations, and practical skills can be overwhelming, especially when you're expected to apply them in real-world situations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5 text-elec-yellow" />
                  Time Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Balancing coursework, on-the-job training, and personal life can create significant time pressure, especially when deadlines for assessments coincide with workplace demands.
                </p>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-elec-yellow" />
                  Performance Anxiety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Concerns about making mistakes, particularly around electrical safety, can create anxiety. The pressure to perform well for both employers and assessors adds to this stress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-elec-yellow" />
                  Workplace Relationships
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Navigating relationships with supervisors, colleagues, and clients while still developing confidence in your role can be challenging and stressful.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Signs of Stress */}
        <TabsContent value="recognize" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Recognising When You're Under Stress</h2>
          <p className="text-muted-foreground mb-4">
            Stress affects everyone differently. Learning to recognise your personal stress signals can help you take action early.
          </p>
          
          <div className="space-y-4">
            <h3 className="font-medium">Physical Signs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Headaches or dizziness</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Muscle tension or pain</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Fatigue</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Sleep problems</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Stomach issues</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Change in appetite</p>
                </CardContent>
              </Card>
            </div>

            <h3 className="font-medium mt-6">Mental & Emotional Signs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Difficulty concentrating</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Feeling overwhelmed</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Irritability</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Low mood or anxiety</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Lack of motivation</p>
                </CardContent>
              </Card>
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardContent className="p-4">
                  <p className="text-sm">Avoiding work or colleagues</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Alert className="bg-elec-yellow/10 border-elec-yellow/30 mt-6">
            <AlertDescription>
              If you notice multiple signs persisting for more than a few weeks, consider speaking with your GP or a mental health professional.
            </AlertDescription>
          </Alert>
        </TabsContent>

        {/* Tab 3: Techniques */}
        <TabsContent value="techniques" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Stress Management Techniques</h2>
          <p className="text-muted-foreground mb-4">
            Try these practical techniques to help manage stress during your apprenticeship:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StressTechnique 
              title="Quick Breathing Exercise (5-5-5)" 
              description="Breathe in for 5 seconds, hold for 5 seconds, breathe out for 5 seconds. Repeat 5 times."
              icon={<Waves className="h-5 w-5 text-elec-yellow" />}
            />
            
            <StressTechnique 
              title="Progressive Muscle Relaxation" 
              description="Tense and then relax each muscle group in your body, working from your feet up to your head."
              icon={<MoveVertical className="h-5 w-5 text-elec-yellow" />}
            />
            
            <StressTechnique 
              title="Task Prioritisation" 
              description="List tasks by urgency and importance. Focus on one task at a time, starting with the most important."
              icon={<ArrowDownToLine className="h-5 w-5 text-elec-yellow" />}
            />
            
            <StressTechnique 
              title="Mindful Moment" 
              description="Take 2 minutes to focus only on your immediate environment. Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
              icon={<Leaf className="h-5 w-5 text-elec-yellow" />}
            />
          </div>
          
          <div className="mt-8">
            <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 border-elec-yellow/30 hover:bg-elec-yellow/10 mt-2 w-full justify-between">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-elec-yellow" />
                    {showAdvanced ? "Hide Advanced Techniques" : "Show Advanced Techniques"}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <StressTechnique 
                    title="Cognitive Restructuring" 
                    description="Challenge negative thoughts: identify them, look for evidence, and replace with balanced alternatives."
                    icon={<Brain className="h-5 w-5 text-elec-yellow" />}
                  />
                  
                  <StressTechnique 
                    title="Problem-Solving Framework" 
                    description="Define the problem, brainstorm solutions, evaluate options, implement a plan, and review effectiveness."
                    icon={<Hammer className="h-5 w-5 text-elec-yellow" />}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </TabsContent>
        
        {/* Tab 4: Resources */}
        <TabsContent value="resources" className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Helpful Resources</h2>
          <p className="text-muted-foreground mb-6">
            Access these additional resources for more support with stress management:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20">
              <CardHeader>
                <CardTitle>Mental Health at Work</CardTitle>
                <CardDescription>Resources specifically for workplace mental health</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Curated resources, toolkits and case studies for workplace mental health.
                </p>
                <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full">
                  <a href="https://www.mentalhealthatwork.org.uk" target="_blank" rel="noopener noreferrer" className="w-full">
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20">
              <CardHeader>
                <CardTitle>Mind</CardTitle>
                <CardDescription>Mental health charity resources</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Information, support and guidance on managing stress and mental health.
                </p>
                <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full">
                  <a href="https://www.mind.org.uk/information-support/tips-for-everyday-living/stress" target="_blank" rel="noopener noreferrer" className="w-full">
                    Visit Website
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20">
              <CardHeader>
                <CardTitle>NHS Mental Wellbeing Audio Guides</CardTitle>
                <CardDescription>Free audio guides to help with stress</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  NHS-produced audio guides to help you manage stress, anxiety and depression.
                </p>
                <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full">
                  <a href="https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/mental-wellbeing-audio-guides/" target="_blank" rel="noopener noreferrer" className="w-full">
                    Access Audio Guides
                  </a>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20">
              <CardHeader>
                <CardTitle>HSE Stress Resources</CardTitle>
                <CardDescription>Workplace stress management guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Health and Safety Executive resources for managing work-related stress.
                </p>
                <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10 w-full">
                  <a href="https://www.hse.gov.uk/stress/" target="_blank" rel="noopener noreferrer" className="w-full">
                    View Resources
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Support Callout */}
          <div className="mt-8">
            <SupportCallout />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StressManagement;
