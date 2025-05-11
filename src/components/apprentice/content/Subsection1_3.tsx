
import React from 'react';
import { Button } from '@/components/ui/button';
import { SubsectionProps } from "./subsection1_1/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import CourseContentSection from '../CourseContentSection';
import { AlertTriangle, ClipboardCheck, List, FileText, Activity } from 'lucide-react';

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Control of Substances Hazardous to Health (COSHH) Regulations</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <AlertTriangle className="mr-3 h-6 w-6 text-elec-yellow" />
          Introduction to COSHH Regulations
        </h2>
        <p className="mb-4">
          The Control of Substances Hazardous to Health Regulations 2002 (COSHH) require employers to control 
          substances that are hazardous to health. These regulations are particularly relevant to electrical work, 
          where electricians may encounter various chemicals, fumes, dusts, and other hazardous substances.
        </p>
        <p>
          Understanding and complying with COSHH regulations is essential for preventing work-related 
          ill health, which affects thousands of workers each year. The regulations provide a framework 
          for protecting both workers and others who may be exposed to hazardous substances.
        </p>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <List className="mr-3 h-6 w-6" />
            Key Requirements of COSHH
          </CardTitle>
          <CardDescription>Essential elements of compliance with the regulations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            COSHH establishes a clear set of requirements that employers must follow to protect 
            workers from exposure to hazardous substances. These requirements create a 
            comprehensive approach to managing chemical risks in the workplace.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Main COSHH Requirements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Assess risks to health arising from hazardous substances</li>
              <li>Decide what precautions are needed before work begins</li>
              <li>Prevent or adequately control exposure to hazardous substances</li>
              <li>Ensure control measures are used and maintained properly</li>
              <li>Monitor exposure of employees to hazardous substances when necessary</li>
              <li>Carry out appropriate health surveillance where required</li>
              <li>Prepare plans and procedures to deal with accidents, incidents, and emergencies</li>
              <li>Ensure employees are properly informed, trained, and supervised</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Common Hazardous Substances in Electrical Work:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Solvents and cleaning agents</span> - Used for cleaning electrical components and contacts</li>
              <li><span className="font-semibold">Lead</span> - Present in some solder and older cable insulation</li>
              <li><span className="font-semibold">Silica dust</span> - Created when cutting or drilling through concrete, brick, or stone</li>
              <li><span className="font-semibold">Asbestos</span> - May be encountered in older buildings during electrical installation work</li>
              <li><span className="font-semibold">Cable insulation fumes</span> - Released when cables are heated</li>
              <li><span className="font-semibold">PCBs (Polychlorinated biphenyls)</span> - Found in older electrical equipment</li>
              <li><span className="font-semibold">Battery acids</span> - Present in battery backup systems</li>
              <li><span className="font-semibold">SF6 gas</span> - Used in certain high-voltage switchgear</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <ClipboardCheck className="mr-3 h-6 w-6" />
            COSHH Assessment Process
          </CardTitle>
          <CardDescription>How to properly assess risks from hazardous substances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            A COSHH assessment is a systematic examination of hazardous substances in the workplace and the risks 
            they present to health. For electrical workers, these assessments need to be specific to the 
            substances they might encounter during their work activities.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Steps in a COSHH Assessment:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-semibold">Identify the hazardous substances</span> - Review safety data sheets and product information</li>
              <li><span className="font-semibold">Consider the risks</span> - How might people be exposed and what harm could come to them?</li>
              <li><span className="font-semibold">Evaluate existing precautions</span> - Are current measures sufficient?</li>
              <li><span className="font-semibold">Implement additional controls if needed</span> - Following the hierarchy of control</li>
              <li><span className="font-semibold">Record the findings</span> - Document the assessment and control measures</li>
              <li><span className="font-semibold">Inform and train workers</span> - Ensure everyone understands the risks and controls</li>
              <li><span className="font-semibold">Review regularly</span> - Update the assessment when conditions change</li>
            </ol>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Hierarchy of Control for COSHH:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><span className="font-semibold">Elimination</span> - Remove the hazardous substance completely</li>
              <li><span className="font-semibold">Substitution</span> - Replace with a less hazardous alternative</li>
              <li><span className="font-semibold">Engineering controls</span> - Prevent or reduce exposure by isolation or containment</li>
              <li><span className="font-semibold">Administrative controls</span> - Develop safe working procedures and limit exposure time</li>
              <li><span className="font-semibold">Personal protective equipment (PPE)</span> - Use as a last resort when other controls are not sufficient</li>
            </ol>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <Activity className="mr-3 h-6 w-6" />
            RIDDOR Requirements in Electrical Work
          </CardTitle>
          <CardDescription>Reporting of Injuries, Diseases and Dangerous Occurrences Regulations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="mb-4">
            The Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) places a legal duty on 
            employers, self-employed individuals and those in control of premises to report certain serious workplace 
            accidents, occupational diseases, and specified dangerous occurrences (near misses) to the relevant enforcing authority.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">What Must Be Reported Under RIDDOR:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Deaths</span> - All deaths to workers and non-workers that arise from a work-related accident</li>
              <li><span className="font-semibold">Specified injuries</span> - Including fractures (other than fingers/toes), amputations, serious burns, loss of sight</li>
              <li><span className="font-semibold">Over-7-day injuries</span> - Where a worker is away from work or unable to perform normal duties for more than 7 days</li>
              <li><span className="font-semibold">Occupational diseases</span> - Including certain poisonings, skin diseases, lung diseases, infections, and musculoskeletal disorders</li>
              <li><span className="font-semibold">Dangerous occurrences</span> - Specific 'near miss' events with potential to cause harm</li>
              <li><span className="font-semibold">Gas incidents</span> - Accidental leakage, inadequate combustion, or incomplete products of combustion</li>
            </ul>
          </div>
          
          <div className="bg-amber-900/30 rounded-md p-4 border border-amber-500/30 mt-4">
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Electrical-Specific RIDDOR Reportable Incidents
            </h3>
            <p className="mb-3">
              In electrical work, certain incidents require mandatory reporting under RIDDOR:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Electric shock or electrical burn leading to unconsciousness or requiring resuscitation</li>
              <li>Electric shock or burn requiring admittance to hospital for more than 24 hours</li>
              <li>Any explosion or fire caused by an electrical short circuit or overload resulting in work stoppage for more than 24 hours</li>
              <li>Electrical short circuit or overload attended by fire or explosion which causes significant damage</li>
              <li>Any unintentional incident in which plant or equipment comes into contact with overhead power lines</li>
              <li>Any incident where electrical equipment not intended to be supplied at voltage exceeding 650 volts is so supplied</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">RIDDOR Reporting Procedure:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Reporting timeframes</span>:
                <ul className="list-disc pl-5 mt-1">
                  <li>Deaths and specified injuries must be reported without delay (usually within 10 days)</li>
                  <li>Over-7-day injuries must be reported within 15 days of the accident</li>
                  <li>Occupational diseases should be reported as soon as a doctor notifies you</li>
                  <li>Dangerous occurrences must be reported without delay</li>
                </ul>
              </li>
              <li><span className="font-semibold">Online reporting</span> - Most incidents can be reported via the HSE website at www.hse.gov.uk/riddor</li>
              <li><span className="font-semibold">Telephone reporting</span> - Fatal and specified incidents only can be reported by calling the Incident Contact Centre on 0345 300 9923</li>
              <li><span className="font-semibold">Record keeping</span> - Keep records of all reportable incidents for at least 3 years</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">RIDDOR Documentation Requirements:</h3>
            <p className="mb-3">
              When reporting under RIDDOR, the following information must be provided:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Date and time of the incident</li>
              <li>Location of the incident</li>
              <li>Personal details of the injured person (name, job title, etc.)</li>
              <li>Details of the injury, condition, or dangerous occurrence</li>
              <li>Brief description of the circumstances</li>
              <li>Details of any machinery involved</li>
              <li>Details of when the injured person stopped work (if applicable)</li>
              <li>For diseases: diagnosis, date of diagnosis, occupation of affected person</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-elec-dark/80 to-elec-yellow/20 rounded-md p-4 border border-elec-yellow/30 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Case Study: RIDDOR Reporting in Practice</h3>
            <p className="mb-3">
              In 2019, an electrical contracting company was fined £25,000 after failing to report a serious incident where an 
              electrician suffered severe burns from an arc flash while working on a distribution board. The HSE investigation found that:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>The incident was clearly RIDDOR reportable as a specified injury</li>
              <li>The company failed to report the incident within the required timeframe</li>
              <li>The delay in reporting hampered the HSE investigation</li>
              <li>The company had inadequate procedures for RIDDOR reporting</li>
            </ul>
            <p>
              This case highlights the importance of understanding RIDDOR requirements and having clear procedures in place 
              for prompt reporting. The financial penalties and reputational damage from non-compliance can be significant.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <FileText className="mr-3 h-6 w-6" />
            COSHH Documentation and Record Keeping
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Proper documentation and record keeping are essential aspects of COSHH compliance. These records 
            serve as evidence of compliance and provide valuable information for ongoing safety management.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Required COSHH Documentation:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">COSHH assessments</span> - Written assessments for all hazardous substances</li>
              <li><span className="font-semibold">Safety data sheets (SDS)</span> - Must be obtained from suppliers for all chemicals</li>
              <li><span className="font-semibold">Exposure monitoring records</span> - Results of any workplace exposure measurements</li>
              <li><span className="font-semibold">Health surveillance records</span> - Medical checks required for certain substances</li>
              <li><span className="font-semibold">Maintenance logs</span> - Records of testing and maintenance of control measures</li>
              <li><span className="font-semibold">Training records</span> - Evidence of employee COSHH training</li>
              <li><span className="font-semibold">Emergency procedures</span> - Plans for dealing with accidents involving hazardous substances</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Best Practices for COSHH Management:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Maintain an inventory of all hazardous substances used</li>
              <li>Regularly review and update COSHH assessments (at least annually)</li>
              <li>Store hazardous substances securely and according to compatibility requirements</li>
              <li>Implement a system for checking and maintaining control measures</li>
              <li>Provide clear information to workers about risks and control measures</li>
              <li>Ensure adequate supervision of workers using hazardous substances</li>
              <li>Have emergency procedures in place for spills, fires, and first aid</li>
              <li>Conduct regular workplace inspections to check compliance</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      {!isCompleted && (
        <div className="flex justify-center pt-6">
          <Button 
            onClick={markAsComplete}
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          >
            Mark as Complete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Subsection1_3;
