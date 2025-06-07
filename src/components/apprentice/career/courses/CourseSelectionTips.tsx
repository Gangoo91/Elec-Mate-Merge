
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, Award, Clock, PoundSterling } from "lucide-react";

const CourseSelectionTips = () => {
  const tips = [
    {
      icon: Target,
      title: "Align with Career Goals",
      description: "Choose courses that directly support your career progression plans and match industry demand in your area."
    },
    {
      icon: TrendingUp,
      title: "Future-Proof Your Skills",
      description: "Prioritise emerging technologies like EV charging, smart systems, and renewable energy for long-term career security."
    },
    {
      icon: Award,
      title: "Check Accreditations",
      description: "Ensure courses are recognised by industry bodies like NICEIC, ECA, City & Guilds, or JIB for maximum value."
    },
    {
      icon: Clock,
      title: "Consider Timing",
      description: "Balance course duration with your work commitments. Evening and weekend options are available for working electricians."
    },
    {
      icon: PoundSterling,
      title: "Employer Support",
      description: "Many employers offer funding for relevant training. Check if your company has a training budget or apprenticeship levy."
    }
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Course Selection Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, idx) => (
            <div key={idx} className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
              <div className="flex items-start gap-3">
                <tip.icon className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-2">{tip.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
          <h4 className="font-medium text-sm mb-2 text-elec-yellow">Industry Insight</h4>
          <p className="text-xs text-muted-foreground">
            The UK electrical industry is experiencing rapid growth, particularly in green technology sectors. 
            Courses in EV charging, renewable energy, and smart building systems are seeing 40%+ year-on-year demand increases. 
            Traditional qualifications remain essential, but combining them with emerging technology skills maximises earning potential.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSelectionTips;
