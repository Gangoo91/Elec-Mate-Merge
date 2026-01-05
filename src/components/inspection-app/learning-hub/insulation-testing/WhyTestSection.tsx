
import React from 'react';
import { Lightbulb, Shield, CheckCircle2, BookOpen, Activity, Users, AlertTriangle } from 'lucide-react';

const WhyTestSection = () => (
  <div className="space-y-4">
    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Why Insulation Resistance Testing is Critical</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Prevent Electric Shock</p>
            <p>Ensures electrical conductors are properly insulated to prevent contact with live parts.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Fire Prevention</p>
            <p>Detects deteriorated insulation that could cause arcing and electrical fires.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Equipment Protection</p>
            <p>Identifies insulation breakdown before it damages expensive electrical equipment.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Activity className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Legal Compliance</p>
            <p>Required by BS 7671 for all new installations and periodic inspections.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Real-World Failure Scenarios</h4>
      </div>
      <div className="space-y-2 text-sm text-white">
        <p><strong>Domestic Installation:</strong> Cable damaged by drilling - insulation breakdown leads to RCD tripping and potential electrocution</p>
        <p><strong>Industrial Environment:</strong> Chemical contamination of cables - gradual insulation deterioration causing equipment failure</p>
        <p><strong>Damp Conditions:</strong> Moisture ingress in junction boxes - low insulation resistance causing nuisance tripping</p>
        <p><strong>Aged Installation:</strong> 30-year-old PVC cables - insulation becomes brittle and cracks, creating safety hazards</p>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Cost of Poor Insulation</h4>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-white">
        <div>
          <p className="font-medium text-foreground">Financial Impact</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Equipment replacement costs</li>
            <li>Business downtime losses</li>
            <li>Emergency repair expenses</li>
            <li>Insurance claims</li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-foreground">Safety Consequences</p>
          <ul className="list-disc list-inside space-y-1 mt-1">
            <li>Electric shock injuries</li>
            <li>Fire and property damage</li>
            <li>Legal liability issues</li>
            <li>Regulatory violations</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default WhyTestSection;
