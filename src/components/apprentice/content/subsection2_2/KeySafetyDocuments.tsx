
import React from "react";

const KeySafetyDocuments = () => {
  return (
    <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-elec-yellow mb-4">Key Safety Documents</h2>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Core documentation required for electrical work includes:
        </p>
        
        <h3 className="font-semibold text-white mt-6 mb-2">Risk Assessments</h3>
        <p className="text-muted-foreground mb-4">
          Risk assessments are legally required documents that identify hazards, evaluate risks, and determine control measures for specific tasks.
          They must be:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Task-specific rather than generic</li>
          <li>Created before work begins and updated as conditions change</li>
          <li>Completed by a competent person with knowledge of the work and hazards</li>
          <li>Regularly reviewed and revised as needed</li>
          <li>Communicated to all workers involved in the task</li>
          <li>Stored for a minimum of 3 years, though 5 years is recommended</li>
        </ul>

        <h3 className="font-semibold text-white mt-6 mb-2">Method Statements</h3>
        <p className="text-muted-foreground mb-4">
          Method statements outline the step-by-step procedure for completing work safely. They complement risk assessments by providing detailed instructions on how to implement control measures.
          Effective method statements include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Detailed sequence of operations</li>
          <li>Specific equipment and tools required</li>
          <li>Safety precautions for each step</li>
          <li>PPE requirements</li>
          <li>Emergency procedures</li>
          <li>References to related risk assessments</li>
          <li>Isolation procedures for electrical work</li>
        </ul>

        <h3 className="font-semibold text-white mt-6 mb-2 text-elec-yellow">RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations)</h3>
        <p className="text-muted-foreground mb-4">
          RIDDOR places a legal duty on employers, self-employed people, and those in control of premises to report specific workplace incidents to the Health and Safety Executive (HSE).
        </p>
        <div className="bg-elec-dark/70 border border-elec-yellow/30 rounded p-4 mb-6">
          <h4 className="font-medium text-elec-yellow mb-2">What must be reported under RIDDOR:</h4>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><span className="font-medium text-white">Deaths</span> - All deaths arising from work activities</li>
            <li><span className="font-medium text-white">Specified injuries</span> - Including fractures, amputations, serious burns, loss of sight, and injuries requiring hospital admission for more than 24 hours</li>
            <li><span className="font-medium text-white">Over 7-day injuries</span> - When a worker is away from work or unable to perform their normal duties for more than 7 consecutive days</li>
            <li><span className="font-medium text-white">Occupational diseases</span> - Including carpal tunnel syndrome, occupational dermatitis, and hand-arm vibration syndrome</li>
            <li><span className="font-medium text-white">Dangerous occurrences</span> - Near-miss events with potential to cause serious injury</li>
            <li><span className="font-medium text-white">Gas incidents</span> - Including gas leaks, fires, or explosions connected to gas installations</li>
          </ul>
        </div>
        <p className="text-muted-foreground mb-4">
          For electrical work, examples of reportable dangerous occurrences include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Electric shock or burn incidents that lead to unconsciousness or require resuscitation</li>
          <li>Electrical short circuit or overload causing fire or explosion with significant damage</li>
          <li>Accidental release of any substance that could cause serious injury or death</li>
          <li>Collapse or failure of load-bearing parts of lifting equipment</li>
        </ul>
        <p className="text-muted-foreground mb-6">
          <span className="font-medium text-white">RIDDOR Reporting Timeframes:</span><br/>
          - Fatal and specified injuries: Report without delay (telephone) and within 10 days (online)<br/>
          - Over 7-day injuries: Report within 15 days<br/>
          - Occupational diseases: Report as soon as diagnosed<br/>
          - Dangerous occurrences: Report without delay
        </p>

        <h3 className="font-semibold text-white mt-6 mb-2">Equipment Inspection Records</h3>
        <p className="text-muted-foreground mb-4">
          Regular inspection of tools and equipment is essential for electrical safety. Documentation must track:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Unique identification numbers for each piece of equipment</li>
          <li>Inspection dates and results</li>
          <li>Calibration records for measuring instruments</li>
          <li>PAT testing dates and certificates</li>
          <li>Repair history and maintenance schedules</li>
          <li>Due dates for next inspections</li>
          <li>Name and qualification of the inspector</li>
        </ul>

        <h3 className="font-semibold text-white mt-6 mb-2">Training Records</h3>
        <p className="text-muted-foreground mb-4">
          Documentation of worker training and competence is critical for demonstrating due diligence and compliance:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Qualifications and certifications</li>
          <li>Dates of training sessions attended</li>
          <li>Content covered in training</li>
          <li>Assessment results and competency verification</li>
          <li>Refresher training schedules</li>
          <li>Authorization for specific tasks or equipment</li>
          <li>Signatures of trainers and trainees</li>
        </ul>

        <h3 className="font-semibold text-white mt-6 mb-2">Accident and Incident Reports</h3>
        <p className="text-muted-foreground mb-4">
          When incidents occur, comprehensive documentation is essential:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
          <li>Date, time, and location of the incident</li>
          <li>Names of individuals involved and witnesses</li>
          <li>Detailed description of what happened</li>
          <li>Contributing factors identified</li>
          <li>Immediate actions taken</li>
          <li>Follow-up corrective measures</li>
          <li>RIDDOR reporting details if applicable</li>
          <li>Investigation findings and recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default KeySafetyDocuments;
