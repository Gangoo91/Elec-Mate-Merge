
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Brain, Target } from "lucide-react";

const MistakeCategoriesTab = () => {
  const mistakeCategories = [
    {
      category: "Learning Mistakes",
      icon: Brain,
      severity: "Minor",
      color: "border-green-500/20 bg-green-500/10",
      iconColor: "text-green-400",
      description: "Normal part of the learning process",
      examples: [
        {
          mistake: "Cutting cable too short for termination",
          consequence: "Need to splice or run new cable",
          lesson: "Always leave extra length - you can cut off but can't add on",
          recovery: "Measure twice, cut once - plan termination lengths"
        },
        {
          mistake: "Forgetting to label cables during first fix",
          consequence: "Confusion during second fix, extra time needed",
          lesson: "Label as you go - it saves hours later",
          recovery: "Develop a systematic labelling routine"
        },
        {
          mistake: "Mixing up line and neutral on a light switch",
          consequence: "Switch doesn't work, quick fix needed",
          lesson: "Double-check connections before testing",
          recovery: "Use proper testing procedures before energising"
        }
      ]
    },
    {
      category: "Technical Mistakes",
      icon: Target,
      severity: "Moderate",
      color: "border-amber-500/20 bg-amber-500/10",
      iconColor: "text-amber-400",
      description: "Require immediate correction and learning",
      examples: [
        {
          mistake: "Incorrect cable size calculation",
          consequence: "Cable overheating, potential fire risk",
          lesson: "Always verify calculations with multiple methods",
          recovery: "Replace cable with correct size, document the error"
        },
        {
          mistake: "Wrong protective device rating",
          consequence: "Poor protection or nuisance tripping",
          lesson: "Understand discrimination and selectivity principles",
          recovery: "Calculate proper ratings, replace if necessary"
        },
        {
          mistake: "Inadequate earthing connection",
          consequence: "Dangerous touch voltages, compliance failure",
          lesson: "Earth continuity is critical for safety",
          recovery: "Improve connection, test thoroughly"
        }
      ]
    },
    {
      category: "Safety Mistakes",
      icon: AlertTriangle,
      severity: "Serious",
      color: "border-red-500/20 bg-red-500/10",
      iconColor: "text-red-400",
      description: "Never acceptable - immediate action required",
      examples: [
        {
          mistake: "Working live without proper procedures",
          consequence: "Risk of electrocution or arc flash",
          lesson: "Safety procedures exist for a reason",
          recovery: "Stop work, isolate properly, review safety training"
        },
        {
          mistake: "Not testing isolation before work",
          consequence: "Working on live circuits unknowingly",
          lesson: "Prove dead before starting any work",
          recovery: "Always use approved voltage indicator and test it"
        },
        {
          mistake: "Ignoring PPE requirements",
          consequence: "Exposure to electrical hazards",
          lesson: "PPE is the last line of defence",
          recovery: "Obtain proper PPE, understand its limitations"
        }
      ]
    }
  ];

  const commonPatterns = [
    {
      pattern: "Rushing Under Pressure",
      description: "Making mistakes when time pressure increases",
      solutions: ["Break tasks into smaller steps", "Communicate delays early", "Practice standard procedures until automatic"]
    },
    {
      pattern: "Overconfidence in Familiar Tasks",
      description: "Becoming complacent with routine work",
      solutions: ["Maintain consistent checking procedures", "Stay vigilant on repetitive tasks", "Ask for peer reviews occasionally"]
    },
    {
      pattern: "Fear of Asking Questions",
      description: "Guessing instead of seeking clarification",
      solutions: ["Remember questions show critical thinking", "Build relationships with mentors", "Document answers for future reference"]
    },
    {
      pattern: "Incomplete Understanding",
      description: "Applying procedures without understanding principles",
      solutions: ["Study the 'why' behind procedures", "Connect theory to practice", "Seek explanations, not just instructions"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Understanding Mistake Categories</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mistakeCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${category.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`h-6 w-6 ${category.iconColor}`} />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge 
                      variant={category.severity === 'Serious' ? 'destructive' : 'outline'}
                      className={category.severity === 'Serious' ? '' : `border-${category.iconColor.split('-')[1]}-500/40 text-${category.iconColor.split('-')[1]}-400`}
                    >
                      {category.severity}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {category.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{example.mistake}</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-orange-300">Consequence:</span>
                            <p className="text-muted-foreground">{example.consequence}</p>
                          </div>
                          <div>
                            <span className="font-medium text-blue-300">Lesson:</span>
                            <p className="text-muted-foreground">{example.lesson}</p>
                          </div>
                          <div>
                            <span className="font-medium text-green-300">Recovery:</span>
                            <p className="text-muted-foreground">{example.recovery}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Mistake Patterns</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commonPatterns.map((pattern, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{pattern.pattern}</h4>
                <p className="text-sm text-muted-foreground mb-3">{pattern.description}</p>
                <div>
                  <h5 className="font-medium text-elec-yellow mb-2">Solutions:</h5>
                  <ul className="space-y-1">
                    {pattern.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MistakeCategoriesTab;
