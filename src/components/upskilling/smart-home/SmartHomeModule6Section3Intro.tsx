import { Card, CardContent } from '@/components/ui/card';
import { Zap, Command, TrendingUp } from 'lucide-react';

const SmartHomeModule6Section3Intro = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Voice assistants are powerful, but their true value comes from automation. Instead of controlling devices one at a time, 
              routines and logic mapping allow multiple actions to happen with a single command. For electricians, this means understanding 
              not just how to connect devices, but how to program and test routines that match the client's lifestyle and safety needs.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Automation</h3>
            <p className="text-foreground text-sm">Multiple actions triggered by single commands or events</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <Command className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Control</h3>
            <p className="text-foreground text-sm">IF-THEN logic for intelligent device responses</p>
          </CardContent>
        </Card>

        <Card className="bg-elec-gray border-transparent hover:border-elec-yellow/20 transition-all duration-300">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-elec-yellow mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Efficiency</h3>
            <p className="text-foreground text-sm">Save time and improve convenience for homeowners</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SmartHomeModule6Section3Intro;