
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Lightbulb, PlayCircle, FileText, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CultureModule {
  id: string;
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  content: {
    overview: string;
    keyPoints: string[];
    examples: {
      situation: string;
      rightApproach: string;
      wrongApproach: string;
    }[];
    checklist?: string[];
  };
}

const cultureModules: CultureModule[] = [
  {
    id: "safety-concern",
    title: "Raising Safety Concerns",
    description: "How to speak up about safety issues in a professional way",
    icon: AlertTriangle,
    content: {
      overview: "Every electrician has the right and responsibility to raise safety concerns. This module helps you develop the skills to address issues effectively without creating conflict.",
      keyPoints: [
        "Use specific, factual observations rather than accusations",
        "Focus on regulations and standards when explaining your concern",
        "Offer potential solutions when possible",
        "Know the proper escalation chain if immediate resolution isn't achieved"
      ],
      examples: [
        {
          situation: "You notice another worker using a damaged power tool",
          rightApproach: "\"Excuse me, I've noticed that drill has some exposed wiring near the handle. Would you like me to help you find a replacement? I'm concerned it might not be safe.\"",
          wrongApproach: "\"That drill looks dangerous. You shouldn't be using it.\""
        },
        {
          situation: "A supervisor asks you to work on a live circuit",
          rightApproach: "\"I understand we're tight on schedule. The regulations require isolation before working on this circuit. I can isolate it quickly and still complete the work safely.\"",
          wrongApproach: "\"That's against the rules. I'm not doing that.\""
        }
      ],
      checklist: [
        "Identify the specific safety issue",
        "Reference relevant regulations or standards",
        "Speak privately when possible",
        "Suggest practical alternatives",
        "Document the concern if not addressed"
      ]
    }
  },
  {
    id: "body-language",
    title: "Reading Site Body Language",
    description: "Understanding non-verbal cues in the workplace",
    icon: Eye,
    content: {
      overview: "Worksite communication isn't just verbal. Understanding body language helps you navigate relationships and identify potential issues before they escalate.",
      keyPoints: [
        "Recognize signs of stress or fatigue in colleagues",
        "Understand cultural differences in non-verbal communication",
        "Pick up on warning signs that someone might need help",
        "Adjust your own body language to communicate effectively"
      ],
      examples: [
        {
          situation: "A colleague keeps checking their watch and sighing while you're explaining something",
          rightApproach: "\"I notice we might be short on time. Would it help if I sent you these details in a text later?\"",
          wrongApproach: "Continue with a lengthy explanation ignoring their signals"
        },
        {
          situation: "Site manager has crossed arms and is frowning during your update",
          rightApproach: "\"I'd appreciate any feedback on how we could improve this approach.\"",
          wrongApproach: "\"Why do you look so angry? I'm just telling you how it is.\""
        }
      ]
    }
  },
  {
    id: "banter",
    title: "Dealing With Site Banter",
    description: "Navigating workplace humor and social dynamics",
    icon: MessageSquare,
    content: {
      overview: "Banter is common on construction sites, but there's a line between friendly jokes and harassment. This module helps you navigate this balance and respond appropriately.",
      keyPoints: [
        "Distinguish between friendly teasing and harmful comments",
        "Set personal boundaries clearly but professionally",
        "Respond to uncomfortable situations without escalating tensions",
        "Support colleagues who may be targeted inappropriately"
      ],
      examples: [
        {
          situation: "Colleagues make jokes about your age or experience level",
          rightApproach: "\"I know I'm still learning, but I'd appreciate the chance to prove myself without the commentary.\"",
          wrongApproach: "Responding with insults or becoming visibly upset"
        },
        {
          situation: "Someone makes discriminatory remarks disguised as 'just joking'",
          rightApproach: "\"I don't find those kinds of jokes funny. Let's keep things professional.\"",
          wrongApproach: "Laughing along to fit in despite being uncomfortable"
        }
      ],
      checklist: [
        "Is it targeting personal characteristics?",
        "Would it make someone feel excluded?",
        "Is it repeated after someone showed discomfort?",
        "Would you say it in front of a client or manager?",
        "Could it be considered harassment under workplace policies?"
      ]
    }
  },
  {
    id: "not-understanding",
    title: "When You Don't Understand",
    description: "How to seek clarification without fear",
    icon: HelpCircle,
    content: {
      overview: "Everyone has knowledge gaps, especially apprentices. Learning how to ask for help effectively is a crucial skill that improves your learning and prevents mistakes.",
      keyPoints: [
        "Asking questions demonstrates professionalism, not weakness",
        "Specific questions show you've been paying attention",
        "Follow up to confirm your understanding",
        "Document new information for future reference"
      ],
      examples: [
        {
          situation: "A supervisor gives multiple complex instructions at once",
          rightApproach: "\"Let me make sure I've got this right. You'd like me to first... then... Is that correct?\"",
          wrongApproach: "Nodding and saying 'yes' despite confusion, then doing the task incorrectly"
        },
        {
          situation: "You're unfamiliar with a specialized tool or fitting",
          rightApproach: "\"I haven't worked with this model before. Could you show me the correct way to use it, or point me to the manual?\"",
          wrongApproach: "Attempting to use it without guidance, risking damage or safety issues"
        }
      ]
    }
  },
  {
    id: "unsafe-work",
    title: "Saying No to Unsafe Work",
    description: "Standing your ground professionally",
    icon: ShieldX,
    content: {
      overview: "All workers have the legal right to refuse unsafe work. This module covers how to exercise this right professionally while maintaining good workplace relationships.",
      keyPoints: [
        "Know your legal rights regarding work refusal",
        "Frame refusals around specific safety concerns, not personal preference",
        "Document any unsafe work requests",
        "Offer safe alternatives when possible"
      ],
      examples: [
        {
          situation: "Asked to work at height without proper fall protection",
          rightApproach: "\"I'm not comfortable proceeding without the proper harness as required by the Work at Height Regulations. I can get the equipment from the van or help with ground tasks until it's available.\"",
          wrongApproach: "\"That's too dangerous. I'm not doing it.\""
        },
        {
          situation: "Pressured to complete electrical work beyond your training level",
          rightApproach: "\"This type of installation is outside my current qualification level. According to my apprenticeship agreement, I need supervision for this task. Can we arrange that?\"",
          wrongApproach: "Attempting work you're not qualified for, or walking off without explanation"
        }
      ],
      checklist: [
        "Identify the specific safety risk",
        "Reference relevant regulations",
        "Propose an alternative approach",
        "Remain calm and professional",
        "Document the incident if necessary"
      ]
    }
  }
];

// Missing component imports
import { AlertTriangle, Eye, HelpCircle, ShieldX } from "lucide-react";

const OnJobWorkplaceCulture = () => {
  const [activeModule, setActiveModule] = useState<CultureModule | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const handleModuleSelect = (module: CultureModule) => {
    setActiveModule(module);
    setActiveTab("overview");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workplace Language & Culture</h1>
          <p className="text-muted-foreground">Navigate workplace communication and relationships effectively</p>
        </div>
        <Link to="/apprentice/on-job-tools" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </Link>
      </div>

      {!activeModule ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cultureModules.map(module => (
              <Card 
                key={module.id} 
                className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-colors"
                onClick={() => handleModuleSelect(module)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-elec-yellow/10">
                      <module.icon className="h-5 w-5 text-elec-yellow" />
                    </div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-elec-light/80">
                    {module.description}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Module</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/10">
                  <PlayCircle className="h-5 w-5 text-elec-yellow" />
                </div>
                <CardTitle>Learning Resources</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
                  <Lightbulb className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Audio Roleplays</h3>
                    <p className="text-sm text-elec-light/80">Listen to common workplace scenarios and how to navigate them effectively</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
                  <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Site Checklists</h3>
                    <p className="text-sm text-elec-light/80">Downloadable first-day checklists for new sites and projects</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-3">
              <activeModule.icon className="h-6 w-6 text-elec-yellow" />
              <CardTitle>{activeModule.title}</CardTitle>
            </div>
            <CardDescription className="text-base text-elec-light/80 mt-2">
              {activeModule.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="checklist">Checklist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
                  <p>{activeModule.content.overview}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {activeModule.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="space-y-4">
                {activeModule.content.examples.map((example, index) => (
                  <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
                    <h4 className="font-medium mb-2">Situation: {example.situation}</h4>
                    <div className="space-y-3 mt-4">
                      <div className="pl-4 border-l-2 border-green-500">
                        <p className="text-sm text-green-400 mb-1">Effective Approach:</p>
                        <p className="text-elec-light/90">{example.rightApproach}</p>
                      </div>
                      <div className="pl-4 border-l-2 border-red-500">
                        <p className="text-sm text-red-400 mb-1">Less Effective Approach:</p>
                        <p className="text-elec-light/90">{example.wrongApproach}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="checklist">
                {activeModule.content.checklist ? (
                  <div className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
                    <h3 className="font-medium mb-3">Quick Reference Checklist</h3>
                    <ul className="space-y-2">
                      {activeModule.content.checklist.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded border border-elec-yellow/40 flex-shrink-0 mt-0.5"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">No checklist available for this module</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => setActiveModule(null)}>
              Back to Modules
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default OnJobWorkplaceCulture;
