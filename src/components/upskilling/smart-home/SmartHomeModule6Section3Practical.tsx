import { Card, CardContent } from '@/components/ui/card';
import { Wrench, Users, Shield, BookOpen } from 'lucide-react';

const SmartHomeModule6Section3Practical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Practical Guidance</h2>
        <p className="text-foreground mb-6">As an electrician, follow these practical steps for successful routine implementation:</p>
        
        <div className="grid gap-5">
          {/* Understand Client Habits */}
          <Card className="bg-elec-dark/50 border-elec-yellow/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Users className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Understand Client Habits</h3>
                  <p className="text-foreground mb-3">Work with clients to understand their daily routines and preferences.</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Morning routine:</strong> Wake-up time, breakfast habits, departure schedule</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Evening routine:</strong> Arrival time, dinner, relaxation activities</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Bedtime routine:</strong> Sleep schedule, security preferences</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Holiday patterns:</strong> Weekend and vacation behaviours</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Safety-Focused Routines */}
          <Card className="bg-elec-dark/50 border-elec-yellow/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Suggest Safety Routines</h3>
                  <p className="text-foreground mb-3">Recommend routines that improve safety and security.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <h4 className="text-red-300 font-semibold text-sm mb-1">"All Off" Routine</h4>
                      <p className="text-foreground text-xs">Switch off appliances when leaving home</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold text-sm mb-1">"Security" Routine</h4>
                      <p className="text-foreground text-xs">Lock doors, arm alarms, activate cameras</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Training */}
          <Card className="bg-elec-dark/50 border-elec-yellow/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Demonstrate and Train</h3>
                  <p className="text-foreground mb-3">Show clients how to create or edit routines in their chosen platform.</p>
                  <div className="space-y-2 text-sm text-foreground">
                    <div>• Live demonstration of routine creation</div>
                    <div>• Walk through editing existing routines</div>
                    <div>• Explain common troubleshooting steps</div>
                    <div>• Provide platform-specific guides</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gradual Implementation */}
          <Card className="bg-elec-dark/50 border-elec-yellow/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Wrench className="h-6 w-6 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Start Simple, Add Complexity</h3>
                  <p className="text-foreground mb-3">Begin with basic routines, then add complexity once the client is confident.</p>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                    <p className="text-foreground text-sm">
                      <strong>Phase 1:</strong> Simple single-command routines → 
                      <strong>Phase 2:</strong> Scheduled routines → 
                      <strong>Phase 3:</strong> Complex conditional logic
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section3Practical;