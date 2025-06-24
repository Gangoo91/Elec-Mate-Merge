
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, FileCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const SafetyProceduresSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Safety Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Comprehensive safety protocols and risk assessment procedures for electrical testing work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <FileCheck className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Risk Assessment</h4>
              <p className="text-sm text-muted-foreground">Pre-work risk evaluation and mitigation strategies</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">PPE Requirements</h4>
              <p className="text-sm text-muted-foreground">Personal protective equipment for testing activities</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Emergency Procedures</h4>
              <p className="text-sm text-muted-foreground">Response to electrical incidents and accidents</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Users className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-purple-300">Team Safety</h4>
              <p className="text-sm text-muted-foreground">Communication and coordination protocols</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-red-500/30 rounded-lg bg-red-500/10">
          <h4 className="font-medium text-red-300 mb-2">Safety Checklist</h4>
          <ul className="text-sm text-red-200 space-y-1">
            <li>• Complete risk assessment before starting work</li>
            <li>• Ensure all safety equipment is available and functional</li>
            <li>• Verify competency levels of all team members</li>
            <li>• Establish clear communication procedures</li>
            <li>• Plan emergency evacuation and first aid procedures</li>
            <li>• Document all safety measures and briefings</li>
          </ul>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Access Safety Protocols
        </Button>
      </CardContent>
    </Card>
  );
};

export default SafetyProceduresSection;
