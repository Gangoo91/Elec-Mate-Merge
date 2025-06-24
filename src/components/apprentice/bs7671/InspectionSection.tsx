
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, AlertTriangle, CheckSquare, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const InspectionSection = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Visual Inspection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Visual inspection is the first and most important step in the testing process. It identifies potential hazards before energising the installation.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <CheckSquare className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-green-300">Consumer Unit Inspection</h4>
              <p className="text-sm text-muted-foreground">Check labelling, RCD provision, proper segregation, and compliance with current standards</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-amber-300">Cable Routes & Supports</h4>
              <p className="text-sm text-muted-foreground">Verify proper cable routing, adequate support, and protection from damage</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg bg-elec-dark/50">
            <Clipboard className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-300">Accessories & Equipment</h4>
              <p className="text-sm text-muted-foreground">Inspect sockets, switches, light fittings, and fixed equipment for damage or wear</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-amber-500/30 rounded-lg bg-amber-500/10">
          <h4 className="font-medium text-amber-300 mb-2">Inspection Checklist</h4>
          <ul className="text-sm text-amber-200 space-y-1">
            <li>• All connections secure and properly made</li>
            <li>• Adequate earthing and bonding arrangements</li>
            <li>• Correct cable identification and labelling</li>
            <li>• No signs of overheating or damage</li>
            <li>• Compliance with installation methods</li>
          </ul>
        </div>

        <Button className="w-full mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90">
          Start Visual Inspection Guide
        </Button>
      </CardContent>
    </Card>
  );
};

export default InspectionSection;
