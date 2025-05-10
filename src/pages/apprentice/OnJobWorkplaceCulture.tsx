
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, Lightbulb, PlayCircle, FileText, CheckCircle, Download } from "lucide-react";
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
    resources?: {
      title: string;
      type: "audio" | "document" | "video";
      description: string;
    }[];
    questions?: {
      question: string;
      answer: string;
    }[];
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
        "Know the proper escalation chain if immediate resolution isn't achieved",
        "Document your concerns if they're repeatedly ignored",
        "Remember raising concerns is part of your professional responsibility"
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
        },
        {
          situation: "You see a colleague working at height without proper fall protection",
          rightApproach: "\"Hey mate, I've got a spare harness in the van. The regs require fall protection above 2 meters - we could both get in trouble if someone sees this.\"",
          wrongApproach: "\"You're breaking the rules and being stupid. You'll fall and hurt yourself.\""
        },
        {
          situation: "Multiple safety violations are occurring on site but you're new",
          rightApproach: "\"I've noticed a few safety concerns around the site. Would it be possible to discuss these privately with you? I'm just trying to understand the safety protocols here.\"",
          wrongApproach: "Staying silent because you're new, or publicly criticizing the entire site's safety culture"
        }
      ],
      checklist: [
        "Identify the specific safety issue",
        "Reference relevant regulations or standards",
        "Speak privately when possible",
        "Suggest practical alternatives",
        "Document the concern if not addressed",
        "Follow proper escalation procedures",
        "Maintain professionalism throughout"
      ],
      resources: [
        {
          title: "Safety Concern Conversation Template",
          type: "document",
          description: "Fill-in-the-blank template for raising different types of safety concerns"
        },
        {
          title: "Safety Concern Escalation Flowchart",
          type: "document",
          description: "Visual guide on when and how to escalate safety concerns on site"
        }
      ],
      questions: [
        {
          question: "What if my safety concern is ignored?",
          answer: "If your immediate supervisor ignores a legitimate safety concern, you should document the concern and follow your company's escalation procedure. This might involve speaking to a higher manager, safety officer, or union representative. In cases of serious and imminent danger, you have the legal right to refuse unsafe work."
        },
        {
          question: "How do I raise a safety concern about my supervisor's behavior?",
          answer: "This requires tact and careful documentation. First, try speaking directly with your supervisor if you feel safe doing so. If that's not effective, consult your company's policies on reporting safety violations, which may involve HR, a safety committee, or an anonymous reporting system. Document specific instances, dates, times, and how the behavior violates specific regulations."
        }
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
        "Adjust your own body language to communicate effectively",
        "Recognize when someone might be feeling uncomfortable or unsafe",
        "Pay attention to the atmosphere in meetings and toolbox talks"
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
        },
        {
          situation: "A new team member stands apart from the group during breaks",
          rightApproach: "Approach them individually with a casual greeting: \"First week on site? I'm Dave - let me know if you need anything.\"",
          wrongApproach: "Publicly point out that they're being antisocial or assume they don't want to be part of the team"
        },
        {
          situation: "Someone appears frustrated with a complex installation task",
          rightApproach: "\"That conduit run looks tricky. I had a similar one last week - mind if I show you a technique that helped me?\"",
          wrongApproach: "\"You're doing that wrong. Let me take over.\""
        },
        {
          situation: "You notice a colleague looks unusually tired or distracted while working with dangerous equipment",
          rightApproach: "\"Would you like to take a quick break? I could use one myself. Maybe grab a coffee?\"",
          wrongApproach: "Ignore the signs or publicly comment on their poor performance"
        }
      ],
      resources: [
        {
          title: "Construction Site Body Language Guide",
          type: "document",
          description: "Visual reference for common non-verbal cues on construction sites"
        },
        {
          title: "Cross-Cultural Communication for Construction",
          type: "audio",
          description: "Audio guide for understanding non-verbal communication across different cultures"
        }
      ],
      questions: [
        {
          question: "How do I know if someone is open to receiving help or advice?",
          answer: "Look for open body posture (uncrossed arms), eye contact, and engaged responses to questions. People receptive to help often pause their work when you approach, turn to face you fully, and ask clarifying questions. If they continue working without looking up, give short responses, or physically turn away, they may not be receptive at that moment."
        },
        {
          question: "What body language should I use when I'm trying to assert myself as a new apprentice?",
          answer: "Stand straight with shoulders back, maintain appropriate eye contact, and speak clearly at a measured pace. Avoid fidgeting, looking down, or speaking too quietly as these can undermine your credibility. Ask questions confidently and take notes visibly to demonstrate your engagement and commitment to learning."
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
        "Support colleagues who may be targeted inappropriately",
        "Know your legal rights regarding harassment and discrimination",
        "Recognize when 'banter' crosses into bullying territory"
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
        },
        {
          situation: "Persistent teasing about a mistake you made weeks ago",
          rightApproach: "\"I've learned from that mistake and moved on. I'd appreciate if we could focus on the current job now.\"",
          wrongApproach: "Getting defensive or making excuses about the past mistake"
        },
        {
          situation: "A colleague is being targeted with uncomfortable 'jokes' about their background",
          rightApproach: "Privately: \"I noticed those comments earlier. Are you OK? I don't think that kind of talk is appropriate either.\"",
          wrongApproach: "Joining in with the inappropriate comments to fit in with the group"
        },
        {
          situation: "Being pressured to participate in pranks that could be unsafe",
          rightApproach: "\"That sounds like it could go wrong easily. I don't want to risk anyone getting hurt or in trouble.\"",
          wrongApproach: "Participating despite your concerns because you fear being labeled as 'no fun'"
        }
      ],
      checklist: [
        "Is it targeting personal characteristics?",
        "Would it make someone feel excluded?",
        "Is it repeated after someone showed discomfort?",
        "Would you say it in front of a client or manager?",
        "Could it be considered harassment under workplace policies?",
        "Is it creating an uncomfortable atmosphere for others?",
        "Does it reference protected characteristics (race, gender, etc.)?"
      ],
      resources: [
        {
          title: "Setting Boundaries Script Examples",
          type: "document",
          description: "Ready-to-use phrases for setting professional boundaries"
        },
        {
          title: "Toolbox Talk: Banter vs. Bullying",
          type: "audio",
          description: "Audio roleplay showing the difference between acceptable banter and bullying"
        }
      ],
      questions: [
        {
          question: "What if I'm not sure whether something crosses the line?",
          answer: "A good rule of thumb is to consider whether you'd be comfortable if the comment was said in front of your family, was recorded on video, or appeared in writing. If something makes you uncomfortable, it's likely problematic regardless of intent. Trust your instinct - if it feels wrong, it probably is."
        },
        {
          question: "How do I fit in without participating in inappropriate jokes?",
          answer: "Focus on building relationships through shared interests, offering help on tasks, asking questions about others' expertise, and initiating positive conversations about sports, projects, or skills. Friendly banter can exist without crossing ethical lines - redirect conversations toward more inclusive topics when necessary."
        }
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
        "Document new information for future reference",
        "Prepare questions in advance when possible",
        "Use different learning approaches if the first explanation doesn't click"
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
        },
        {
          situation: "Everyone is using technical terminology you don't understand",
          rightApproach: "\"I'm still learning some of the technical terms. Could you clarify what you mean by [term]?\"",
          wrongApproach: "Staying silent and hoping to figure it out later, potentially missing crucial information"
        },
        {
          situation: "You've been shown a technique multiple times but still don't understand",
          rightApproach: "\"I'm having trouble grasping this technique. Would it be possible to try a different approach, maybe with a diagram or by breaking it down further?\"",
          wrongApproach: "Pretending to understand to avoid looking slow or asking for the same explanation over and over"
        },
        {
          situation: "You're given a complex wiring diagram to follow",
          rightApproach: "\"I'd like to walk through this diagram step by step before I start. Could you confirm my understanding of this section here?\"",
          wrongApproach: "Proceeding without clarification and making assumptions about unclear parts"
        }
      ],
      resources: [
        {
          title: "Effective Question Templates",
          type: "document",
          description: "Framework for asking clear, specific questions in different situations"
        },
        {
          title: "Note-Taking System for Apprentices",
          type: "document",
          description: "Structured method for recording new information efficiently"
        },
        {
          title: "Learning Types Assessment",
          type: "document",
          description: "Tool to identify whether you learn better visually, verbally, or hands-on"
        }
      ],
      questions: [
        {
          question: "What if my supervisor gets annoyed when I ask questions?",
          answer: "Try to batch your questions instead of asking them one by one. Take notes throughout the day, and find an appropriate time to ask multiple questions at once. You can preface with \"I've been taking notes on things I need clarification on - is now a good time to go through them?\" This shows you're organized and respectful of their time."
        },
        {
          question: "How do I remember complex instructions when there's a lot to take in?",
          answer: "Develop a consistent note-taking system that works for you - whether that's in a dedicated notebook, on your phone, or using voice memos (with permission). Take photos of complex installations or diagrams when appropriate. Immediately repeat back the most critical information to confirm understanding and help with retention."
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
        "Offer safe alternatives when possible",
        "Understand the difference between discomfort and genuine danger",
        "Know the appropriate escalation path if pressured to continue"
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
        },
        {
          situation: "Asked to use equipment you know is faulty",
          rightApproach: "\"This equipment has a fault that could be dangerous. I can help source a replacement quickly so we don't fall behind schedule.\"",
          wrongApproach: "Using it anyway despite the risk, or refusing without offering any solution"
        },
        {
          situation: "Told to skip important safety tests to save time",
          rightApproach: "\"I understand we're under time pressure, but these tests are required by BS7671. If we skip them and something goes wrong, we could be legally liable. I can work through lunch to make up the time.\"",
          wrongApproach: "Silently skipping the tests to avoid confrontation, or creating a scene about being asked"
        },
        {
          situation: "Supervisor insists you continue working in severe weather conditions",
          rightApproach: "\"The lightning presents a significant risk while working with these metal components. The HSE guidelines recommend suspending work in these conditions. We could use this time to prep materials under cover for when it's safe to resume.\"",
          wrongApproach: "Simply leaving the site without explanation or continuing to work despite clear danger"
        }
      ],
      checklist: [
        "Identify the specific safety risk",
        "Reference relevant regulations",
        "Propose an alternative approach",
        "Remain calm and professional",
        "Document the incident if necessary",
        "Know who to contact if the issue persists",
        "Understand your legal protections against retaliation"
      ],
      resources: [
        {
          title: "Work Refusal Rights Card",
          type: "document",
          description: "Pocket reference for your legal rights when refusing unsafe work"
        },
        {
          title: "Safety Conversation Simulator",
          type: "audio",
          description: "Practice conversations for refusing unsafe work in different scenarios"
        },
        {
          title: "Documentation Template",
          type: "document",
          description: "Form for documenting unsafe work requests and your response"
        }
      ],
      questions: [
        {
          question: "What if refusing makes me look like I'm not a team player?",
          answer: "Frame your refusal as protecting the team, not just yourself. Use phrases like \"I'm concerned about our liability here\" or \"I want to make sure we all get home safely.\" Offering alternatives shows you're solution-focused. A good team values safety over speed - and most experienced workers will respect your professionalism, even if they seem annoyed in the moment."
        },
        {
          question: "Could I lose my apprenticeship if I refuse certain tasks?",
          answer: "You have legal protections against retaliation for refusing genuinely unsafe work. Document incidents, including dates, times, what was requested, and your response. If you experience negative consequences, contact your apprenticeship provider, union representative, or the Health and Safety Executive. Your training agreement should outline the appropriate supervision levels required for different tasks."
        }
      ]
    }
  },
  {
    id: "cultural-differences",
    title: "Navigating Cultural Differences",
    description: "Working effectively in a diverse industry",
    icon: Globe,
    content: {
      overview: "The electrical industry is increasingly diverse. Understanding cultural differences helps create a more respectful, inclusive, and effective workplace for everyone.",
      keyPoints: [
        "Recognize that communication styles vary across cultures",
        "Avoid assumptions based on stereotypes",
        "Be open to different perspectives and methods",
        "Address language barriers constructively",
        "Respect different religious and cultural practices",
        "Build relationships based on mutual respect and understanding"
      ],
      examples: [
        {
          situation: "A colleague doesn't make direct eye contact during conversations",
          rightApproach: "Recognize this may be a sign of respect in their culture, not disinterest. Focus on their overall engagement and communication.",
          wrongApproach: "Assuming they're being dishonest or not paying attention because they don't meet Western eye contact expectations"
        },
        {
          situation: "Team member needs to take brief breaks for religious observance",
          rightApproach: "\"Let me know what schedule works best for you. We can plan the work to accommodate your prayer times.\"",
          wrongApproach: "Making them feel uncomfortable about their religious practices or suggesting they're not committed to the job"
        },
        {
          situation: "Language barrier causes confusion about a technical instruction",
          rightApproach: "\"Let me show you what I mean,\" then demonstrating the technique or drawing a diagram. Checking understanding with follow-up questions.",
          wrongApproach: "Repeating the same instructions louder or using complicated terms, then getting frustrated"
        },
        {
          situation: "Different approaches to hierarchy and authority",
          rightApproach: "Explaining the chain of command clearly while still encouraging questions and input regardless of seniority",
          wrongApproach: "Becoming offended if someone from a hierarchical culture is very deferential, or if someone from an egalitarian culture is more direct"
        },
        {
          situation: "Differences in communication style (direct vs. indirect)",
          rightApproach: "Learn to recognize different styles. Some cultures value direct communication while others prefer indirect approaches to avoid potential conflict or loss of face.",
          wrongApproach: "Judging someone as rude for being direct, or as dishonest for being indirect, without understanding cultural context"
        }
      ],
      resources: [
        {
          title: "Cross-Cultural Communication Guide",
          type: "document",
          description: "Overview of communication styles across different cultures in construction"
        },
        {
          title: "Common Technical Terms Glossary",
          type: "document",
          description: "Multi-language glossary of electrical terminology"
        },
        {
          title: "Cultural Awareness Quiz",
          type: "document",
          description: "Self-assessment tool to identify potential cultural biases"
        }
      ],
      questions: [
        {
          question: "How do I correct someone's work when there's a language barrier?",
          answer: "Use visual demonstrations alongside simple, clear language. Focus on the work itself rather than the person. Use diagrams, photos, or hands-on demonstrations. Confirm understanding through having them repeat or demonstrate the technique. Avoid idioms, slang, or complex technical jargon when explaining corrections."
        },
        {
          question: "What if cultural differences are causing tension in the team?",
          answer: "Address issues proactively through team discussions about working styles and expectations. Create opportunities for team members to share their perspectives. Establish clear, consistent protocols that everyone understands. Focus on common goals and shared professional standards while acknowledging that there are multiple valid approaches to achieving them."
        }
      ]
    }
  }
];

// Missing component imports
import { AlertTriangle, Eye, HelpCircle, ShieldX, Globe } from "lucide-react";

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
                <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
                  <Download className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Downloadable Resources</h3>
                    <p className="text-sm text-elec-light/80">Pocket guides and reference cards for common workplace situations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/20">
                  <MessageSquare className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Communication Templates</h3>
                    <p className="text-sm text-elec-light/80">Ready-to-use phrases for difficult workplace conversations</p>
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
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
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
                
                {activeModule.content.checklist && (
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
                )}
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
              
              <TabsContent value="resources">
                {activeModule.content.resources ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeModule.content.resources.map((resource, index) => (
                      <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20 flex items-start gap-3">
                        {resource.type === "audio" && <PlayCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />}
                        {resource.type === "document" && <FileText className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />}
                        {resource.type === "video" && <PlayCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />}
                        <div>
                          <h3 className="font-medium mb-1">{resource.title}</h3>
                          <p className="text-sm text-elec-light/80">{resource.description}</p>
                          <Button variant="link" className="p-0 h-auto mt-2 text-elec-yellow">Download</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Resources for this module are coming soon</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="faq">
                {activeModule.content.questions ? (
                  <div className="space-y-4">
                    {activeModule.content.questions.map((item, index) => (
                      <div key={index} className="bg-elec-dark/40 p-4 rounded-md border border-elec-yellow/20">
                        <h4 className="font-medium text-elec-yellow mb-2">{item.question}</h4>
                        <p className="text-elec-light/90">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">FAQ content for this module is coming soon</p>
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
