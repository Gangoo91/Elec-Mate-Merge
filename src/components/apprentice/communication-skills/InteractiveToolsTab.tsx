
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, MessageSquare, Users, Eye, Volume2, FileText, Globe, CheckCircle } from "lucide-react";

const InteractiveToolsTab = () => {
  const communicationFrameworks = [
    {
      name: "STAR Method",
      description: "Situation, Task, Action, Result - Perfect for explaining problems or achievements",
      example: "Situation: 'When installing the new DB...', Task: 'I needed to ensure safe isolation...', Action: 'I followed lockout procedures...', Result: 'The installation was completed safely with no incidents.'"
    },
    {
      name: "SBI Framework",
      description: "Situation, Behaviour, Impact - Great for giving feedback or reporting issues",
      example: "Situation: 'During the socket installation...', Behaviour: 'The cable was run without proper protection...', Impact: 'This creates a safety risk and doesn't meet BS 7671 requirements.'"
    },
    {
      name: "DESC Method",
      description: "Describe, Express, Specify, Consequences - Useful for difficult conversations",
      example: "Describe: 'I've noticed the materials haven't arrived...', Express: 'I'm concerned about the project timeline...', Specify: 'Could we contact the supplier today?', Consequences: 'This will help us stay on schedule.'"
    }
  ];

  const bodyLanguageTips = [
    {
      aspect: "Posture",
      good: "Stand/sit straight, shoulders back, feet planted",
      avoid: "Slouching, leaning away, fidgeting",
      impact: "Shows confidence and engagement"
    },
    {
      aspect: "Eye Contact",
      good: "Maintain natural eye contact (3-5 seconds at a time)",
      avoid: "Staring or avoiding eye contact completely",
      impact: "Builds trust and shows you're listening"
    },
    {
      aspect: "Hand Gestures",
      good: "Open palms, purposeful movements to emphasise points",
      avoid: "Pointing, crossed arms, hands in pockets",
      impact: "Reinforces your message and shows openness"
    },
    {
      aspect: "Facial Expression",
      good: "Match expression to content, genuine reactions",
      avoid: "Blank stare, inappropriate smiling, frowning",
      impact: "Shows you understand and care about the conversation"
    }
  ];

  const voiceAndToneTips = [
    {
      category: "Volume",
      tips: ["Speak loudly enough to be heard over site noise", "Lower your voice for confidential matters", "Match volume to the environment"]
    },
    {
      category: "Pace",
      tips: ["Slow down when giving technical explanations", "Pause after important points", "Speed up slightly when recapping familiar information"]
    },
    {
      category: "Tone",
      tips: ["Use a respectful tone with all colleagues", "Match seriousness to the situation", "Stay calm and professional under pressure"]
    },
    {
      category: "Clarity",
      tips: ["Pronounce technical terms clearly", "Avoid mumbling or talking too fast", "Repeat important safety information"]
    }
  ];

  const writtenCommunicationGuide = [
    {
      type: "Site Reports",
      structure: "Date, Location, Work Completed, Issues Found, Next Steps",
      tips: ["Be factual and specific", "Include measurements and observations", "Note any safety concerns immediately"]
    },
    {
      type: "Email Communication",
      structure: "Clear subject line, Greeting, Purpose, Details, Next Steps, Professional closing",
      tips: ["Keep subject lines descriptive", "Use bullet points for multiple items", "Proofread before sending"]
    },
    {
      type: "Text Messages",
      structure: "Brief, Clear purpose, Include timeline if urgent",
      tips: ["Use for quick updates only", "Include your name if not saved in contacts", "Confirm receipt for important messages"]
    }
  ];

  const culturalAwareness = [
    {
      aspect: "Regional Differences",
      description: "Communication styles vary across UK regions",
      examples: ["Northern directness vs Southern politeness", "Scottish humour in workplace banter", "Welsh community-focused communication"]
    },
    {
      aspect: "Generational Differences",
      description: "Different age groups prefer different communication styles",
      examples: ["Older tradespeople may prefer face-to-face discussions", "Younger colleagues comfortable with digital communication", "Respect traditional hierarchies while building relationships"]
    },
    {
      aspect: "Industry Culture",
      description: "Electrical trade has its own communication norms",
      examples: ["Direct, safety-focused language", "Technical precision in explanations", "Respect for experience and qualifications"]
    }
  ];

  const selfAssessmentItems = [
    { skill: "I listen actively and ask clarifying questions", level: 0 },
    { skill: "I speak clearly and at an appropriate volume", level: 0 },
    { skill: "I maintain professional body language", level: 0 },
    { skill: "I adapt my communication style to different audiences", level: 0 },
    { skill: "I can explain technical concepts in simple terms", level: 0 },
    { skill: "I stay calm under pressure when communicating", level: 0 },
    { skill: "I write clear and professional reports", level: 0 },
    { skill: "I respect cultural and generational differences", level: 0 }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Tools & Tips</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Practical tools and frameworks to improve your communication skills in the electrical trade. 
            These proven techniques will help you communicate more effectively with supervisors, colleagues, and clients.
          </p>
        </CardContent>
      </Card>

      {/* Communication Frameworks */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Communication Frameworks</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communicationFrameworks.map((framework, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{framework.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{framework.description}</p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-xs text-blue-400 font-medium mb-1">Example:</p>
                  <p className="text-sm text-muted-foreground italic">"{framework.example}"</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Body Language Guide */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Body Language</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bodyLanguageTips.map((tip, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{tip.aspect}</h4>
                <div className="space-y-2">
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                    <p className="text-xs text-green-400 font-medium">Do:</p>
                    <p className="text-sm text-muted-foreground">{tip.good}</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <p className="text-xs text-red-400 font-medium">Avoid:</p>
                    <p className="text-sm text-muted-foreground">{tip.avoid}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                    <p className="text-xs text-blue-400 font-medium">Impact:</p>
                    <p className="text-sm text-muted-foreground">{tip.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voice and Tone */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Voice & Tone Mastery</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {voiceAndToneTips.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Written Communication */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Written Communication Guide</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {writtenCommunicationGuide.map((guide, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{guide.type}</h4>
                <div className="mb-3">
                  <p className="text-xs text-elec-yellow font-medium mb-1">Structure:</p>
                  <p className="text-sm text-muted-foreground">{guide.structure}</p>
                </div>
                <div>
                  <p className="text-xs text-elec-yellow font-medium mb-1">Tips:</p>
                  <ul className="space-y-1">
                    {guide.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cultural Awareness */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Cultural Awareness</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {culturalAwareness.map((aspect, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{aspect.aspect}</h4>
                <p className="text-sm text-muted-foreground mb-3">{aspect.description}</p>
                <div className="space-y-1">
                  {aspect.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Self-Assessment */}
      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <CardTitle className="text-green-400">Communication Skills Self-Assessment</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Rate your current skill level for each communication area. Use this to identify areas for improvement.
          </p>
          <div className="space-y-4">
            {selfAssessmentItems.map((item, index) => (
              <div key={index} className="border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{item.skill}</h4>
                  <Badge variant="outline" className="border-green-500/30">
                    Rate Yourself
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Needs Work</span>
                    <span>Confident</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-400 font-medium mb-1">Remember:</p>
            <p className="text-sm text-muted-foreground">
              Communication skills improve with practice. Focus on one area at a time and ask for feedback from supervisors and colleagues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveToolsTab;
