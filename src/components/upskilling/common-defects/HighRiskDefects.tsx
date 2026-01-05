
import { AlertTriangle } from 'lucide-react';

export const HighRiskDefects = () => {
  const highRiskDefects = [
    {
      title: "Exposed Live Parts",
      description: "Open terminals, broken covers, missing grommets, or damaged enclosures",
      risk: "Could result in shock, electrocution, or arc flash if touched or disturbed",
      examples: [
        "Broken MCB covers in distribution boards",
        "Missing terminal blocks covers",
        "Damaged socket fronts exposing live parts",
        "Open junction boxes without proper covers"
      ]
    },
    {
      title: "Incorrect Cable Sizing or Overload Protection",
      description: "Oversized MCBs, underrated cables, or mismatched protective devices",
      risk: "Risk of overheating, cable damage, or fire under load conditions",
      examples: [
        "32A MCB protecting 2.5mm² cable (should be 20A max)",
        "1.5mm² cable on 20A lighting circuit",
        "No diversity calculations considered",
        "Mixing different cable types inappropriately"
      ]
    },
    {
      title: "Improper Cable Terminations",
      description: "Loose connections, poor crimping, untwisted conductors, or inadequate torque",
      risk: "High resistance joints leading to overheating, arcing, or complete disconnection",
      examples: [
        "Loose terminals in socket outlets",
        "Uncrimped cable lugs in distribution boards",
        "Multi-strand conductors not properly twisted",
        "Insufficient tightening torque on gland plates"
      ]
    },
    {
      title: "Signs of Heat Damage or Burning",
      description: "Discolouration, melting, burning smells, or thermal damage evidence",
      risk: "Indicates existing poor connections, overloads, or fault conditions",
      examples: [
        "Brown discolouration around MCB terminals",
        "Melted cable insulation near connections",
        "Burnt smell from distribution boards",
        "Heat damage on socket outlet faceplates"
      ]
    },
    {
      title: "Missing Protective Earthing",
      description: "Disconnected CPCs, missing earth continuity, or inadequate bonding",
      risk: "Loss of automatic disconnection and increased shock risk during faults",
      examples: [
        "CPC not connected in socket outlets",
        "Missing supplementary bonding in bathrooms",
        "Broken earth continuity in lighting circuits",
        "No main equipotential bonding to services"
      ]
    },
    {
      title: "Lack of Proper Labelling",
      description: "No circuit identification, missing warning notices, or inadequate marking",
      risk: "Makes future work dangerous and breaches BS 7671 requirements",
      examples: [
        "No circuit schedules in distribution boards",
        "Missing RCD test notices",
        "No voltage identification labels",
        "Unlabelled isolation points"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        High-Risk Visual Defects That Demand Immediate Action
      </h3>
      <p className="text-gray-300 mb-4">
        These defects pose immediate safety risks and must be rectified before the installation can be energised:
      </p>
      <div className="space-y-6">
        {highRiskDefects.map((defect, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="bg-red-600 text-foreground text-xs px-2 py-1 rounded font-bold">
                HIGH RISK
              </span>
              {defect.title}
            </h4>
            <p className="text-gray-300 text-sm mb-3">{defect.description}</p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3 mb-3">
              <p className="text-red-200 text-sm font-medium">{defect.risk}</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-foreground text-sm font-medium">Common Examples:</h5>
              <ul className="space-y-1 ml-4">
                {defect.examples.map((example, exampleIndex) => (
                  <li key={exampleIndex} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
