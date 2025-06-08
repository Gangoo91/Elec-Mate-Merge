
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, CheckCircle, AlertTriangle } from "lucide-react";

const SupportSystemsTab = () => {
  const supportNetwork = [
    {
      role: "Direct Supervisor",
      importance: "Critical",
      description: "Your immediate point of contact for mistake reporting and guidance",
      whenToApproach: ["Immediate safety concerns", "Technical mistakes", "When you've made an error", "Need clarification on procedures"],
      howToApproach: "Be direct, honest, and specific about the issue and any safety implications",
      expectations: "Professional guidance, constructive feedback, support for learning"
    },
    {
      role: "Training Officer",
      importance: "High",
      description: "Specialist in apprentice development and learning support",
      whenToApproach: ["Repeated mistake patterns", "Learning difficulties", "Need additional training", "Career guidance"],
      howToApproach: "Schedule regular check-ins, prepare specific examples of challenges",
      expectations: "Structured learning support, additional resources, skills assessment"
    },
    {
      role: "Mentor/Buddy",
      importance: "High",
      description: "Experienced colleague assigned to support your development",
      whenToApproach: ["Daily questions", "Confidence issues", "Practical advice", "Industry insights"],
      howToApproach: "Regular informal conversations, ask for practical tips and experiences",
      expectations: "Peer support, practical advice, encouragement, reality checks"
    },
    {
      role: "Fellow Apprentices",
      importance: "Medium",
      description: "Peers facing similar challenges and learning experiences",
      whenToApproach: ["Shared learning", "Moral support", "Comparing experiences", "Study groups"],
      howToApproach: "Form study groups, share experiences openly, support each other",
      expectations: "Mutual support, shared learning, peer perspective, friendship"
    },
    {
      role: "College Tutors",
      importance: "Medium",
      description: "Academic support for theoretical understanding",
      whenToApproach: ["Theory difficulties", "Exam preparation", "Academic questions", "Career pathways"],
      howToApproach: "Use office hours, prepare specific questions, seek additional resources",
      expectations: "Academic guidance, exam support, theoretical explanations"
    },
    {
      role: "HR/Welfare Officer",
      importance: "Medium",
      description: "Support for personal and workplace welfare issues",
      whenToApproach: ["Workplace conflicts", "Personal problems affecting work", "Rights and procedures", "Wellbeing concerns"],
      howToApproach: "Confidential discussions, formal procedures if needed",
      expectations: "Confidential support, procedural guidance, welfare assistance"
    }
  ];

  const professionalResources = [
    {
      organization: "Construction Industry Training Board (CITB)",
      services: ["Training grants", "Apprenticeship support", "Career guidance", "Safety training"],
      access: "Through employer or direct application",
      website: "citb.co.uk"
    },
    {
      organization: "Joint Industry Board (JIB)",
      services: ["Industry standards", "Grading schemes", "Dispute resolution", "Career progression"],
      access: "Membership through employment",
      website: "jib.org.uk"
    },
    {
      organization: "Institution of Engineering and Technology (IET)",
      services: ["Professional development", "Technical resources", "Networking", "Career support"],
      access: "Student membership available",
      website: "theiet.org"
    },
    {
      organization: "National Careers Service",
      services: ["Career advice", "Skills assessment", "Training opportunities", "CV support"],
      access: "Free online and phone service",
      website: "nationalcareers.service.gov.uk"
    }
  ];

  const mentalHealthSupport = [
    {
      service: "Employee Assistance Programme (EAP)",
      description: "Confidential counselling and support service",
      availability: "24/7 phone support",
      coverage: "Personal problems, work stress, mental health, financial advice"
    },
    {
      service: "Occupational Health",
      description: "Workplace health and wellbeing support",
      availability: "Through employer",
      coverage: "Work-related stress, fitness for work, reasonable adjustments"
    },
    {
      service: "Samaritans",
      description: "Emotional support for anyone in distress",
      availability: "24/7 free phone: 116 123",
      coverage: "Any emotional distress, confidential listening service"
    },
    {
      service: "Mind",
      description: "Mental health charity with practical support",
      availability: "Online and local services",
      coverage: "Mental health information, local support groups, advocacy"
    }
  ];

  const communicationTips = [
    {
      situation: "Reporting a Mistake",
      tips: [
        "Report immediately, don't wait or try to hide it",
        "Be specific about what happened and any safety implications",
        "Explain what you've already done to make it safe",
        "Ask for guidance on how to proceed",
        "Listen carefully to feedback and ask questions if unclear"
      ]
    },
    {
      situation: "Asking for Help",
      tips: [
        "Explain what you've tried already",
        "Be specific about what you don't understand",
        "Ask for the reasoning behind procedures, not just what to do",
        "Take notes during explanations",
        "Confirm your understanding by explaining it back"
      ]
    },
    {
      situation: "Receiving Criticism",
      tips: [
        "Listen without becoming defensive",
        "Ask clarifying questions to understand fully",
        "Acknowledge the feedback and show you understand",
        "Ask for specific suggestions for improvement",
        "Thank the person for taking time to help you improve"
      ]
    },
    {
      situation: "Building Relationships",
      tips: [
        "Show genuine interest in learning from others",
        "Offer help with tasks appropriate to your skill level",
        "Be reliable and punctual in all interactions",
        "Share your own learning experiences appropriately",
        "Respect people's time and ask when it's convenient to talk"
      ]
    }
  ];

  const warningSignsAndActions = [
    {
      category: "Personal Warning Signs",
      signs: ["Frequent self-criticism", "Avoiding challenging tasks", "Losing sleep over mistakes", "Feeling overwhelmed regularly"],
      actions: ["Talk to mentor or supervisor", "Consider counselling support", "Review workload and expectations", "Practice stress management techniques"]
    },
    {
      category: "Professional Warning Signs",
      signs: ["Repeating same mistakes", "Avoiding questions", "Working in isolation", "Falling behind schedule regularly"],
      actions: ["Request additional training", "Ask for more supervision", "Join study groups", "Discuss concerns with training officer"]
    },
    {
      category: "Relationship Warning Signs",
      signs: ["Conflicts with colleagues", "Feeling unsupported", "Communication breakdown", "Avoiding team activities"],
      actions: ["Speak with HR or welfare officer", "Request mediation if needed", "Work on communication skills", "Seek team-building opportunities"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Your Support Network</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {supportNetwork.map((support, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{support.role}</h3>
                    <p className="text-sm text-muted-foreground">{support.description}</p>
                  </div>
                  <Badge 
                    variant={support.importance === 'Critical' ? 'destructive' : 'outline'}
                    className={support.importance === 'High' ? 'border-amber-500/40 text-amber-400' : support.importance === 'Medium' ? 'border-blue-500/40 text-blue-400' : ''}
                  >
                    {support.importance}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-green-300 mb-2">When to Approach:</h4>
                      <ul className="space-y-1">
                        {support.whenToApproach.map((when, wIndex) => (
                          <li key={wIndex} className="text-sm text-muted-foreground">• {when}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300 mb-2">How to Approach:</h4>
                      <p className="text-sm text-muted-foreground">{support.howToApproach}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-elec-yellow mb-2">What to Expect:</h4>
                    <p className="text-sm text-muted-foreground">{support.expectations}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Professional Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {professionalResources.map((resource, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{resource.organization}</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-green-300 mb-1">Services:</h5>
                    <ul className="space-y-1">
                      {resource.services.map((service, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground">• {service}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-300 mb-1">Access:</h5>
                    <p className="text-sm text-muted-foreground">{resource.access}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-elec-yellow mb-1">Website:</h5>
                    <p className="text-sm text-muted-foreground">{resource.website}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Mental Health & Wellbeing Support</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentalHealthSupport.map((support, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{support.service}</h4>
                <p className="text-sm text-muted-foreground mb-3">{support.description}</p>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-blue-300">Availability: </span>
                    <span className="text-sm text-muted-foreground">{support.availability}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-300">Coverage: </span>
                    <span className="text-sm text-muted-foreground">{support.coverage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Effective Communication Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {communicationTips.map((tip, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{tip.situation}</h4>
                <ul className="space-y-2">
                  {tip.tips.map((tipText, tIndex) => (
                    <li key={tIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                      {tipText}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-500/50 bg-amber-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-300" />
            <CardTitle className="text-amber-300">Warning Signs & Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {warningSignsAndActions.map((warning, index) => (
              <div key={index} className="border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{warning.category}</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-amber-300 mb-2">Warning Signs:</h5>
                    <ul className="space-y-1">
                      {warning.signs.map((sign, sIndex) => (
                        <li key={sIndex} className="text-sm text-muted-foreground">• {sign}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-300 mb-2">Recommended Actions:</h5>
                    <ul className="space-y-1">
                      {warning.actions.map((action, aIndex) => (
                        <li key={aIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportSystemsTab;
