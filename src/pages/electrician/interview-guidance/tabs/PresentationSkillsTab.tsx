import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { 
  Lightbulb, 
  User, 
  MessageSquare, 
  Eye, 
  Shirt,
  HandHeart,
  AlertCircle,
  CheckCircle,
  Star,
  Clock
} from "lucide-react";

export default function PresentationSkillsTab() {
  const presentationAreas = [
    {
      id: "appearance",
      title: "Professional Appearance",
      icon: <Shirt className="h-5 w-5" />,
      guidelines: [
        "Clean, well-fitted clothing appropriate for the role",
        "Safety boots in good condition if site visit likely",
        "Minimal jewellery and avoid visible tattoos if possible",
        "Good personal hygiene and grooming",
        "Professional but practical attire"
      ],
      tips: [
        "Dress slightly more formal than the everyday work attire",
        "Bring high-vis jacket if site visit is mentioned",
        "Ensure clothes are clean and pressed",
        "Choose comfortable, professional footwear"
      ]
    },
    {
      id: "body-language",
      title: "Body Language & Presence",
      icon: <User className="h-5 w-5" />,
      guidelines: [
        "Firm handshake with good eye contact",
        "Upright posture showing confidence",
        "Open gestures and attentive listening",
        "Appropriate facial expressions",
        "Respectful physical boundaries"
      ],
      tips: [
        "Practice your handshake beforehand",
        "Sit up straight but appear relaxed",
        "Use hand gestures when explaining technical concepts",
        "Mirror interviewer's energy level appropriately"
      ]
    },
    {
      id: "communication",
      title: "Verbal Communication",
      icon: <MessageSquare className="h-5 w-5" />,
      guidelines: [
        "Clear articulation and appropriate pace",
        "Professional vocabulary with technical accuracy",
        "Active listening and thoughtful responses",
        "Confident tone without being arrogant",
        "Appropriate use of technical terminology"
      ],
      tips: [
        "Practice explaining technical concepts simply",
        "Pause to think before answering complex questions",
        "Ask for clarification if questions are unclear",
        "Use specific examples to illustrate points"
      ]
    },
    {
      id: "non-verbal",
      title: "Non-Verbal Communication",
      icon: <Eye className="h-5 w-5" />,
      guidelines: [
        "Maintain appropriate eye contact",
        "Use purposeful hand gestures",
        "Show engagement through facial expressions",
        "Respect personal space",
        "Display active listening cues"
      ],
      tips: [
        "Look at all panel members if group interview",
        "Nod appropriately to show understanding",
        "Avoid fidgeting or distracting habits",
        "Use open posture to appear approachable"
      ]
    }
  ];

  const professionalSkills = [
    {
      skill: "Technical Explanation",
      description: "Making complex electrical concepts understandable",
      techniques: [
        "Use analogies and real-world examples",
        "Break down complex processes into steps",
        "Check understanding with phrases like 'Does that make sense?'",
        "Use visual aids or sketches when helpful"
      ]
    },
    {
      skill: "Confidence Building",
      description: "Projecting competence without arrogance",
      techniques: [
        "Speak about achievements factually",
        "Acknowledge areas for improvement honestly",
        "Ask thoughtful questions about the role",
        "Show enthusiasm for learning opportunities"
      ]
    },
    {
      skill: "Professional Storytelling",
      description: "Presenting experience through compelling narratives",
      techniques: [
        "Use the STAR method for behavioural questions",
        "Include specific details and outcomes",
        "Focus on your role and contributions",
        "Demonstrate problem-solving and learning"
      ]
    },
    {
      skill: "Emotional Intelligence",
      description: "Reading the room and adapting communication style",
      techniques: [
        "Match interviewer's communication style",
        "Pick up on verbal and non-verbal cues",
        "Adjust technical detail level based on audience",
        "Show empathy and collaborative mindset"
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Over-explaining technical details",
      solution: "Gauge audience knowledge and adjust complexity"
    },
    {
      mistake: "Speaking too quietly or quickly",
      solution: "Practice speaking clearly at moderate pace"
    },
    {
      mistake: "Avoiding eye contact",
      solution: "Practice maintaining natural eye contact"
    },
    {
      mistake: "Using too much electrical jargon",
      solution: "Explain terms or use simpler language"
    },
    {
      mistake: "Appearing disinterested or overly casual",
      solution: "Show enthusiasm and professional engagement"
    },
    {
      mistake: "Interrupting or talking over interviewers",
      solution: "Practice active listening and patient responses"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-4">
            <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">7 Seconds</div>
            <div className="text-sm text-muted-foreground">First impression</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">55%</div>
            <div className="text-sm text-muted-foreground">Body language</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <User className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">38%</div>
            <div className="text-sm text-muted-foreground">Tone of voice</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4">
            <Lightbulb className="h-8 w-8 mx-auto mb-2 text-primary" />
            <div className="text-lg font-bold">7%</div>
            <div className="text-sm text-muted-foreground">Words only</div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insight */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Research Insight:</strong> Technical competence gets you the interview, but presentation skills often determine who gets the job. 
          Practice is essential for natural, confident delivery.
        </AlertDescription>
      </Alert>

      {/* Presentation Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Professional Presentation Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible defaultValue="appearance">
            {presentationAreas.map((area) => (
              <AccordionItem key={area.id} value={area.id}>
                <MobileAccordionTrigger icon={area.icon}>
                  {area.title}
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Guidelines</h4>
                      <ul className="space-y-1">
                        {area.guidelines.map((guideline, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {guideline}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Pro Tips</h4>
                      <ul className="space-y-1">
                        {area.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Professional Skills Development */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Advanced Professional Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {professionalSkills.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h4 className="font-medium">{skill.skill}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
                <ul className="space-y-1">
                  {skill.techniques.map((technique, techIndex) => (
                    <li key={techIndex} className="flex items-start gap-2 text-sm">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {technique}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <AlertCircle className="h-5 w-5" />
            Common Presentation Mistakes & Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {commonMistakes.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-red-600 dark:text-red-400 mb-1">
                    ❌ {item.mistake}
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    ✅ {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Exercises */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <Star className="h-5 w-5" />
            Practice Exercises for Skill Development
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Daily Practice</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Record yourself explaining a technical concept (5 minutes daily)
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Practice introductions and handshakes with family/friends
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Read industry news aloud to practice clear articulation
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Practice maintaining eye contact during conversations
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Mock Interview Sessions</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <HandHeart className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Full formal mock interview with colleague/mentor
                </li>
                <li className="flex items-start gap-2">
                  <HandHeart className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Technical explanation practice sessions
                </li>
                <li className="flex items-start gap-2">
                  <HandHeart className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Video record and review your performance
                </li>
                <li className="flex items-start gap-2">
                  <HandHeart className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Practice with different interviewer personalities
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Industry-Specific Considerations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shirt className="h-5 w-5 text-primary" />
            UK Electrical Industry Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Commercial Settings</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Business Casual+</Badge>
                <Badge variant="outline" className="text-xs">Safety Conscious</Badge>
                <Badge variant="outline" className="text-xs">Professional Manner</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Emphasis on professional communication and client interaction skills.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Industrial/Construction</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Practical Attire</Badge>
                <Badge variant="outline" className="text-xs">Safety First</Badge>
                <Badge variant="outline" className="text-xs">Team Focus</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Focus on practical skills, safety mindset, and team collaboration.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Domestic/Maintenance</h4>
              <div className="space-y-1">
                <Badge variant="outline" className="text-xs">Customer Service</Badge>
                <Badge variant="outline" className="text-xs">Reliability</Badge>
                <Badge variant="outline" className="text-xs">Trust Building</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Customer interaction skills and trustworthy presentation essential.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}