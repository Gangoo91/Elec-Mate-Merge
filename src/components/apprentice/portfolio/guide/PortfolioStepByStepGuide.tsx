
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  FileText, 
  Target,
  Calendar,
  Users,
  Upload,
  Search,
  BookOpen,
  AlertTriangle,
  Clock
} from "lucide-react";

const PortfolioStepByStepGuide = () => {
  const steps = [
    {
      number: 1,
      title: "Setting Up Your Portfolio Structure",
      duration: "Week 1",
      icon: FileText,
      description: "Create the foundation for your portfolio with proper organisation and filing systems",
      tasks: [
        "Choose your portfolio format (digital, physical, or hybrid)",
        "Set up folder structures for different evidence types",
        "Create a master tracking spreadsheet or document",
        "Establish naming conventions for files and documents",
        "Set up cloud storage backup systems"
      ],
      tips: [
        "Use consistent naming: Date_Type_Description (e.g., 2024-01-15_Practical_RingCircuitInstall)",
        "Create separate folders for each unit or competency area",
        "Always maintain backup copies of important evidence"
      ]
    },
    {
      number: 2,
      title: "Understanding Learning Outcomes & Competencies",
      duration: "Week 2",
      icon: Target,
      description: "Map your apprenticeship requirements and understand what evidence you need to collect",
      tasks: [
        "Review your apprenticeship standard and learning outcomes",
        "Download assessment criteria from your training provider",
        "Create a competency tracking matrix",
        "Identify gaps in your current knowledge or experience",
        "Plan which evidence you'll need for each outcome"
      ],
      tips: [
        "Cross-reference everything with your apprenticeship standard",
        "Some evidence can cover multiple competencies",
        "Keep a running list of what you still need to achieve"
      ]
    },
    {
      number: 3,
      title: "Daily Evidence Collection",
      duration: "Ongoing",
      icon: Calendar,
      description: "Develop habits for consistently collecting and documenting evidence throughout your apprenticeship",
      tasks: [
        "Take photos of your work (with permission)",
        "Write daily reflection notes about what you learned",
        "Collect work orders, method statements, and certificates",
        "Document conversations with supervisors and mentors",
        "Record time spent on different activities"
      ],
      tips: [
        "Set phone reminders to collect evidence daily",
        "Always ask permission before photographing on site",
        "Include context and learning points with every photo"
      ]
    },
    {
      number: 4,
      title: "Creating Quality Reflective Commentary",
      duration: "Ongoing",
      icon: BookOpen,
      description: "Learn to write meaningful reflections that demonstrate your learning and development",
      tasks: [
        "Practice describing what you did, how you did it, and why",
        "Explain what you learned from each experience",
        "Identify areas for improvement and future development",
        "Link experiences to theoretical knowledge",
        "Demonstrate progression over time"
      ],
      tips: [
        "Use the STAR method: Situation, Task, Action, Result",
        "Be honest about challenges and how you overcame them",
        "Show how you've applied feedback and improved"
      ]
    },
    {
      number: 5,
      title: "Organising & Cross-Referencing Evidence",
      duration: "Monthly",
      icon: Search,
      description: "Systematically organise your evidence to make it easy to find and assess",
      tasks: [
        "Review and categorise all collected evidence",
        "Create an evidence index or contents page",
        "Cross-reference evidence against competency requirements",
        "Identify and fill any gaps in your portfolio",
        "Update your tracking systems"
      ],
      tips: [
        "Use a simple numbering system for easy reference",
        "Create links between related pieces of evidence",
        "Regular organisation saves time later"
      ]
    },
    {
      number: 6,
      title: "Preparing for Reviews & Assessments",
      duration: "Before each review",
      icon: Users,
      description: "Get your portfolio ready for formal reviews and assessment meetings",
      tasks: [
        "Review assessment criteria one more time",
        "Prepare a portfolio summary or overview",
        "Practice presenting your evidence verbally",
        "Prepare questions about areas you're unsure about",
        "Ensure all evidence is properly labelled and accessible"
      ],
      tips: [
        "Know your portfolio inside and out",
        "Be prepared to explain any piece of evidence",
        "Bring specific examples to discuss"
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: "Leaving evidence collection until the last minute",
      solution: "Start from day one and collect evidence daily"
    },
    {
      mistake: "Not providing enough context with photos and documents",
      solution: "Always include what, when, where, why, and what you learned"
    },
    {
      mistake: "Focusing only on practical work and ignoring theory",
      solution: "Include evidence of research, calculations, and theoretical understanding"
    },
    {
      mistake: "Not seeking feedback regularly",
      solution: "Schedule monthly reviews with your supervisor or mentor"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Introduction */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400">Step-by-Step Portfolio Building Process</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Follow this structured approach to build your portfolio systematically throughout your apprenticeship. 
            Each step builds on the previous one, creating a comprehensive record of your learning journey.
          </p>
        </CardContent>
      </Card>

      {/* Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <Card key={step.number} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-elec-yellow/10 rounded-lg">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                        Step {step.number}
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                        <Clock className="h-3 w-3 mr-1" />
                        {step.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                    <p className="text-muted-foreground mt-2">{step.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      Tasks to Complete
                    </h4>
                    <ul className="space-y-2">
                      {step.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-elec-yellow rounded-full mt-2 flex-shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-400" />
                      Pro Tips
                    </h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Common Mistakes */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-2 w-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground font-medium">{item.mistake}</p>
                </div>
                <div className="flex items-start gap-2 ml-4">
                  <div className="h-2 w-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStepByStepGuide;
