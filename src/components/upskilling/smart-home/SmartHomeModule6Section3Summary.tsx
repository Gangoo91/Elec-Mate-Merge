import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Settings, Command, AlertCircle } from 'lucide-react';

const SmartHomeModule6Section3Summary = () => {
  const summaryPoints = [
    {
      icon: Zap,
      title: "Routines group multiple smart actions",
      description: "Single command or event triggers coordinate multiple devices for efficiency"
    },
    {
      icon: Command,
      title: "Voice assistants use IF-THEN logic",
      description: "Conditional automation allows intelligent responses to triggers and conditions"
    },
    {
      icon: Settings,
      title: "Three types of routines",
      description: "Command-based, event-based, and conditional routines serve different automation needs"
    },
    {
      icon: AlertCircle,
      title: "Testing and documentation are key",
      description: "Thorough testing and client training ensure successful long-term implementation"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          <h2 className="text-2xl font-bold text-foreground">Summary</h2>
        </div>
        
        <div className="space-y-4">
          {summaryPoints.map((point, index) => (
            <Card key={index} className="bg-elec-dark/50 border-elec-yellow/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <point.icon className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{point.title}</h3>
                    <p className="text-foreground text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Takeaway</h3>
          <p className="text-foreground text-sm leading-relaxed">
            Successful routine implementation requires understanding client habits, starting simple, 
            thorough testing, and providing ongoing support. Well-designed routines transform smart homes 
            from complex systems into intuitive, automated environments that enhance daily life.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section3Summary;