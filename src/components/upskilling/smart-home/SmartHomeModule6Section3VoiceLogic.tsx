import { Card, CardContent } from '@/components/ui/card';
import { Brain, ArrowRight, Lightbulb, Clock } from 'lucide-react';
import VoiceLogicQuickCheck from '@/components/upskilling/smart-home/VoiceLogicQuickCheck';

const SmartHomeModule6Section3VoiceLogic = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">2. Voice Control Logic</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Brain className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
              <div className="space-y-3">
                <p className="text-foreground">Voice assistants use <strong>logic</strong> to interpret commands and trigger actions.</p>
                
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/20">
                  <h4 className="text-lg font-semibold text-elec-yellow mb-3">IF-THEN Rules</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-foreground">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm font-mono">IF</span>
                      <span>motion is detected</span>
                      <ArrowRight className="h-4 w-4 text-elec-yellow" />
                      <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm font-mono">THEN</span>
                      <span>turn on hallway light</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-elec-dark/30 border-elec-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-5 w-5 text-elec-yellow" />
                    <h4 className="text-lg font-semibold text-foreground">Simple Logic</h4>
                  </div>
                  <p className="text-foreground text-sm">Basic IF-THEN rules for immediate responses to triggers</p>
                </CardContent>
              </Card>

              <Card className="bg-elec-dark/30 border-elec-yellow/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-elec-yellow" />
                    <h4 className="text-lg font-semibold text-foreground">Advanced Logic</h4>
                  </div>
                  <p className="text-foreground text-sm">Include conditions like time of day or occupancy status</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-amber-400 mb-2">Example: Advanced Conditional Logic</h4>
              <p className="text-foreground text-sm">
                <span className="font-mono bg-blue-500/20 text-blue-300 px-1 rounded">IF</span> motion detected 
                <span className="font-mono bg-purple-500/20 text-purple-300 px-1 rounded mx-1">AND</span> time is after 10pm 
                <span className="font-mono bg-purple-500/20 text-purple-300 px-1 rounded mx-1">AND</span> house is in "Night Mode"
                <span className="font-mono bg-green-500/20 text-green-300 px-1 rounded ml-1">THEN</span> turn on dim nightlight
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <VoiceLogicQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section3VoiceLogic;