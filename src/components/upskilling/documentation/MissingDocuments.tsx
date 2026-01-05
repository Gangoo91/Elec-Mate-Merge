
import { AlertCircle } from 'lucide-react';

export const MissingDocuments = () => {
  const strategies = [
    {
      situation: "No Original Drawings Available",
      actions: [
        "Create as-built drawings during inspection",
        "Use cable identification and tracing equipment",
        "Document circuit routes and terminations",
        "Verify protective device ratings and characteristics",
        "Record all observations for future reference"
      ]
    },
    {
      situation: "Missing Design Calculations",
      actions: [
        "Reverse-engineer load calculations from installed equipment",
        "Verify cable sizing against protective device ratings",
        "Check voltage drop calculations where possible",
        "Assess earthing arrangements and effectiveness",
        "Document any apparent oversizing or undersizing"
      ]
    },
    {
      situation: "No Previous Certificates",
      actions: [
        "Treat as initial verification inspection",
        "Conduct comprehensive visual and electrical testing",
        "Document all findings and observations",
        "Establish baseline for future inspections",
        "Recommend periodic inspection schedule"
      ]
    },
    {
      situation: "Incomplete Compliance Documentation",
      actions: [
        "Identify applicable standards and regulations",
        "Assess compliance against current requirements",
        "Document deviations and non-compliances",
        "Recommend remedial actions and upgrades",
        "Advise on notification requirements"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        Dealing with Missing Documentation
      </h3>
      <p className="text-foreground mb-4">
        When essential documentation is unavailable, use these strategies:
      </p>
      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3 text-red-300">{strategy.situation}</h4>
            <ul className="space-y-2">
              {strategy.actions.map((action, actionIndex) => (
                <li key={actionIndex} className="text-foreground flex items-start gap-2 text-sm">
                  <span className="text-elec-yellow mt-1">•</span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
        <p className="text-orange-200 font-medium">
          <strong>Important:</strong> Missing documentation significantly increases inspection time and risk. Always inform the client of additional costs and limitations when documentation is inadequate.
        </p>
      </div>
    </div>
  );
};
