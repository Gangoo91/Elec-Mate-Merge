
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const LadderInspection = () => {
  return (
    <Card className="border border-elec-yellow/30 bg-elec-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-elec-yellow">Ladder Inspection & Safe Use</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-elec-dark/50 border-l-4 border-red-500 p-4 rounded-r">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h4 className="font-semibold text-elec-yellow">Pre-use Inspection Requirements</h4>
          </div>
          <p className="text-sm">
            Before using any ladder for electrical work, a thorough visual inspection must be performed. 
            Damaged or defective ladders must be removed from service immediately and tagged with 
            "DO NOT USE" signage until repaired or replaced by a competent person.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Visual Inspection Checklist</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Check stiles (side rails) for cracks, splits, or dents</li>
                <li>Ensure rungs are secure and free from damage</li>
                <li>Inspect feet for wear, missing components, or damage</li>
                <li>Check locking mechanisms function correctly</li>
                <li>Look for excessive wear, distortion or corrosion</li>
                <li>Ensure labels are legible (duty rating, standards)</li>
                <li>Verify no paint covering (could hide defects)</li>
                <li>For fiberglass, check for UV deterioration or fibre exposure</li>
                <li>Test stability on level ground</li>
                <li>Check ropes and pulleys on extension ladders</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <CardTitle className="text-lg font-semibold text-elec-yellow">Safe Use Practices</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Position at correct angle (1:4 or 75° ratio)</li>
                <li>Secure ladder at top or bottom to prevent movement</li>
                <li>Extend ladder at least 1m above landing point</li>
                <li>Maintain 3 points of contact while climbing</li>
                <li>Never work from top three rungs</li>
                <li>Avoid side-loading - keep body centred</li>
                <li>Never use aluminium ladders near electrical equipment</li>
                <li>Protect ladder feet from slipping</li>
                <li>Use harness if working at significant height</li>
                <li>Maintain clean rungs - free from oil, grease</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-4">
          <Card className="bg-elec-dark/50 border border-elec-yellow/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-elec-yellow">Formal Inspection Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm">
                In addition to pre-use checks, ladders used for electrical work require formal documented 
                inspections at regular intervals:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Weekly Visual Inspections
                  </h5>
                  <p className="text-sm">Required when ladder is in frequent use or in harsh environments</p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Detailed Inspection Every 3-6 Months
                  </h5>
                  <p className="text-sm">Must be conducted by a competent person and results recorded</p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Tagging System
                  </h5>
                  <p className="text-sm">Colour-coded or dated tags to indicate inspection status</p>
                </div>
                <div className="bg-elec-dark/70 p-3 rounded-lg border border-elec-yellow/10">
                  <h5 className="font-medium text-elec-yellow mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Records Retention
                  </h5>
                  <p className="text-sm">Inspection records must be kept available for regulatory review</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default LadderInspection;
