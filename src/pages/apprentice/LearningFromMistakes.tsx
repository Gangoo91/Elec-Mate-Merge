
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, X, ThumbsUp } from "lucide-react";

const LearningFromMistakes = () => {
  const safeMistakes = [
    {
      mistake: "Forgetting to label cables during first fix",
      consequence: "Confusion during second fix, extra time needed",
      lesson: "Always label as you go - it saves hours later",
      severity: "Minor"
    },
    {
      mistake: "Mixing up line and neutral on a light switch",
      consequence: "Switch doesn't work, quick fix needed",
      lesson: "Double-check connections before testing",
      severity: "Minor"
    },
    {
      mistake: "Cutting cable too short for termination",
      consequence: "Need to splice or run new cable",
      lesson: "Always leave extra length - you can cut off but can't add on",
      severity: "Minor"
    },
    {
      mistake: "Forgetting to turn off power before opening consumer unit",
      consequence: "Could cause serious injury or death",
      lesson: "ALWAYS isolate and test before touching anything live",
      severity: "Dangerous"
    }
  ];

  const copingStrategies = [
    {
      strategy: "Own Your Mistakes",
      description: "Admit when you've made an error - hiding it makes things worse",
      example: "Tell your supervisor immediately, don't try to fix it secretly"
    },
    {
      strategy: "Ask Questions", 
      description: "Better to ask and look inexperienced than guess and cause problems",
      example: "If you're not 100% sure, check with someone qualified"
    },
    {
      strategy: "Learn the 'Why'",
      description: "Understand why something went wrong, not just what went wrong",
      example: "Why did that cable fail? What was I trying to achieve?"
    },
    {
      strategy: "Keep a Learning Journal",
      description: "Write down mistakes and lessons learned",
      example: "Date, what happened, what you learned, how to prevent it"
    }
  ];

  const confidenceBuilders = [
    "Everyone makes mistakes - even master electricians",
    "Mistakes in training are learning opportunities",
    "Your questions show you're thinking critically",
    "Supervisors expect mistakes from apprentices",
    "Each mistake makes you a better electrician",
    "Safety mistakes are serious, everything else is fixable"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Learning From Mistakes</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Understanding which mistakes are normal learning experiences and which ones are serious safety issues
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Common Apprentice Mistakes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeMistakes.map((item, index) => (
              <div key={index} className={`border rounded-lg p-4 ${
                item.severity === 'Dangerous' 
                  ? 'border-red-500/50 bg-red-500/10' 
                  : 'border-elec-yellow/20 bg-elec-gray/50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{item.mistake}</h4>
                  <Badge 
                    variant={item.severity === 'Dangerous' ? 'destructive' : 'outline'}
                    className={item.severity === 'Dangerous' ? '' : 'border-elec-yellow/40 text-elec-yellow'}
                  >
                    {item.severity}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium text-orange-300">Consequence:</span>
                    <p className="text-sm text-muted-foreground">{item.consequence}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-green-300">Lesson:</span>
                    <p className="text-sm text-muted-foreground">{item.lesson}</p>
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
            <ThumbsUp className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">How to Handle Mistakes</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{strategy.strategy}</h4>
                <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                <div className="bg-elec-yellow/10 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-elec-yellow">Example:</strong> {strategy.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Building Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Remember These Truths</h4>
              <ul className="space-y-2">
                {confidenceBuilders.map((truth, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    {truth}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-elec-yellow/10 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Imposter Syndrome is Normal</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Feeling like you don't belong or aren't good enough is incredibly common. 
                Even experienced electricians felt this way during their apprenticeships.
              </p>
              <p className="text-sm text-muted-foreground">
                The fact that you're worried about doing well probably means you care 
                about quality work - that's exactly what the industry needs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <X className="h-6 w-6 text-red-400" />
            <CardTitle className="text-red-300">Never Acceptable</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Safety Shortcuts</h4>
              <p className="text-sm text-muted-foreground">
                Taking shortcuts with safety procedures, working live when you shouldn't, 
                or ignoring isolation procedures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Covering Up Problems</h4>
              <p className="text-sm text-muted-foreground">
                Hiding mistakes, not reporting dangerous conditions, or pretending 
                you understand when you don't.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300">The Bottom Line</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You're an apprentice, which means you're learning. Mistakes are part of learning, 
            but safety is non-negotiable. Ask questions, admit when you're unsure, and remember 
            that every skilled electrician was exactly where you are now. Focus on getting better 
            every day, not on being perfect from day one.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningFromMistakes;
