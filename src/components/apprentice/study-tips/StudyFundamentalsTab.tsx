
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, GraduationCap, Users, Zap } from "lucide-react";

const StudyFundamentalsTab = () => {
  const studyPrinciples = [
    {
      principle: "Active Learning with Elec-Mate",
      icon: Lightbulb,
      description: "Engage with content rather than passively reading",
      elecMateFeatures: [
        "Interactive quizzes and assessments",
        "Hands-on calculation tools",
        "Visual circuit simulators",
        "Progress tracking and analytics"
      ],
      tips: [
        "Use Elec-Mate's practice questions daily",
        "Test yourself before checking answers",
        "Engage with community discussions",
        "Apply concepts using our calculators"
      ]
    },
    {
      principle: "Understanding vs Memorisation",
      icon: GraduationCap,
      description: "Build deep conceptual knowledge that lasts",
      elecMateFeatures: [
        "Concept explanation tools",
        "Step-by-step working examples",
        "Visual learning diagrams",
        "AI-powered concept clarification"
      ],
      tips: [
        "Use Elec-Mate's concept explainer for difficult topics",
        "Connect theory to practical applications",
        "Ask 'why' questions in our community",
        "Build knowledge progressively through our modules"
      ]
    },
    {
      principle: "Spaced Learning",
      icon: Zap,
      description: "Distribute learning over time for better retention",
      elecMateFeatures: [
        "Personalised study schedules",
        "Automated revision reminders",
        "Spaced repetition algorithms",
        "Progress-based content delivery"
      ],
      tips: [
        "Follow Elec-Mate's recommended study paths",
        "Use our reminder system for regular review",
        "Complete short daily sessions rather than marathon study",
        "Trust the algorithm to optimise your learning"
      ]
    },
    {
      principle: "Collaborative Learning",
      icon: Users,
      description: "Learn with and from your peers",
      elecMateFeatures: [
        "Community discussion forums",
        "Study group formation tools",
        "Peer-to-peer knowledge sharing",
        "Mentor connection platform"
      ],
      tips: [
        "Join study groups through Elec-Mate",
        "Share your knowledge to reinforce learning",
        "Learn from others' questions and answers",
        "Connect with mentors for guidance"
      ]
    }
  ];

  const learningStyles = [
    {
      style: "Visual Learners",
      percentage: "65%",
      description: "Learn best through diagrams, charts, and visual representations",
      elecMateSupport: [
        "Circuit diagrams and schematics",
        "Interactive visual simulations",
        "Colour-coded reference materials",
        "Video demonstrations and tutorials"
      ]
    },
    {
      style: "Auditory Learners", 
      percentage: "30%",
      description: "Prefer listening and verbal explanations",
      elecMateSupport: [
        "Audio explanations and narrated tutorials",
        "Discussion forums for verbal exchange",
        "Podcast-style content delivery",
        "Voice-guided practice sessions"
      ]
    },
    {
      style: "Kinesthetic Learners",
      percentage: "5%", 
      description: "Learn through hands-on practice and physical interaction",
      elecMateSupport: [
        "Interactive calculation tools",
        "Virtual hands-on simulations",
        "Step-by-step practical guides",
        "Gamified learning experiences"
      ]
    }
  ];

  const studyEnvironment = [
    {
      aspect: "Digital Workspace Setup",
      recommendations: [
        "Use Elec-Mate on multiple devices for flexibility",
        "Sync your progress across phone, tablet, and desktop",
        "Bookmark frequently used calculators and resources",
        "Set up Elec-Mate notifications for study reminders",
        "Create shortcuts to your most-used Elec-Mate tools"
      ]
    },
    {
      aspect: "Physical Environment",
      recommendations: [
        "Good lighting for screen viewing and note-taking",
        "Comfortable seating and desk setup",
        "Minimise distractions and background noise",
        "Keep electrical reference books within reach",
        "Use dual monitors if available for Elec-Mate + notes"
      ]
    },
    {
      aspect: "Integration Strategy",
      recommendations: [
        "Combine Elec-Mate digital tools with traditional methods",
        "Use our offline download features for mobile study",
        "Print key diagrams and formulas from Elec-Mate",
        "Integrate Elec-Mate progress with college coursework",
        "Share Elec-Mate resources with study partners"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Core Study Principles with Elec-Mate</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {studyPrinciples.map((principle, index) => {
              const IconComponent = principle.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{principle.principle}</h3>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Elec-Mate Features</h4>
                      <ul className="space-y-1">
                        {principle.elecMateFeatures.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-white mb-2">How to Apply</h4>
                      <ul className="space-y-1">
                        {principle.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Learning Styles & Elec-Mate Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {learningStyles.map((style, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">{style.style}</h3>
                  <Badge variant="yellow" className="text-xs">
                    {style.percentage}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{style.description}</p>
                <div>
                  <h4 className="font-medium text-white mb-2">Elec-Mate Support</h4>
                  <ul className="space-y-1">
                    {style.elecMateSupport.map((support, supportIndex) => (
                      <li key={supportIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                        {support}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Optimal Learning Environment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {studyEnvironment.map((env, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">{env.aspect}</h3>
                <ul className="space-y-2">
                  {env.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Getting Started with Elec-Mate Study Hub</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-white mb-2">Week 1: Foundation Building</h4>
              <p>Set up your Elec-Mate profile, complete the learning style assessment, and explore the platform's core features. Start with fundamentals modules.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Week 2-4: Habit Formation</h4>
              <p>Establish daily study routines using Elec-Mate's reminder system. Begin participating in community discussions and using practice tools.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Month 2+: Advanced Learning</h4>
              <p>Leverage Elec-Mate's advanced features, join study groups, connect with mentors, and contribute to the community knowledge base.</p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-2">Ongoing: Mastery Path</h4>
              <p>Use Elec-Mate's analytics to identify strengths and weaknesses, customise your learning path, and prepare for qualifications with confidence.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyFundamentalsTab;
