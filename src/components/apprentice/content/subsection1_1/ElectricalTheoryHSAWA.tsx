
import React from 'react';
import { Button } from '@/components/ui/button';
import { SubsectionProps } from "../subsection1_1/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AlertCircle, BookOpen, CheckCircle, FileText, Info, Shield, CheckSquare, AlertTriangle } from 'lucide-react';

const ElectricalTheoryHSAWA = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Health and Safety at Work Act 1974</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-elec-yellow/20 p-3 rounded-full">
            <Shield className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-elec-yellow">Key Information</h2>
            <p className="text-muted-foreground mt-1">
              The Health and Safety at Work etc. Act 1974 (HSWA) is the primary piece of legislation covering 
              occupational health and safety in the United Kingdom. It establishes the legal framework to 
              promote, stimulate and encourage high standards of health and safety in the workplace.
            </p>
          </div>
        </div>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Core Principles</CardTitle>
          <CardDescription>The fundamental requirements established by the Act</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Health and Safety at Work Act 1974 sets out the legal duties that employers have towards 
            their employees and members of the public, as well as the duties that employees have to 
            themselves and to each other. These duties are qualified by the principle of 'so far as is 
            reasonably practicable'.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Requirements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Employers must ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees</li>
              <li>Safe systems of work must be provided and maintained</li>
              <li>Safe handling, storage and transport of articles and substances</li>
              <li>Adequate information, instruction, training and supervision must be provided</li>
              <li>Safe workplaces with safe access and egress</li>
              <li>Safe working environments with adequate welfare facilities</li>
              <li>Suitable and sufficient risk assessments must be conducted</li>
              <li>Health and safety policies must be prepared and kept up to date</li>
              <li>Employees must be consulted on health and safety matters</li>
              <li>Employees must take reasonable care for themselves and others</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Employer Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Under Section 2 of the Act, employers have a duty to ensure, so far as is reasonably practicable, 
            the health, safety and welfare at work of all employees. This includes specific obligations that 
            are particularly relevant to electrical work.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Specific Employer Duties:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium text-white">Safe plant and systems of work</span> - Ensuring electrical installations and equipment are safe</li>
              <li><span className="font-medium text-white">Safe use, handling, storage of substances</span> - Including electrical components and materials</li>
              <li><span className="font-medium text-white">Information, instruction, training and supervision</span> - Ensuring electrical workers are competent</li>
              <li><span className="font-medium text-white">Safe workplaces</span> - Including electrical safety measures and emergency procedures</li>
              <li><span className="font-medium text-white">Safe working environment</span> - Proper lighting, ventilation, etc. for electrical work</li>
              <li><span className="font-medium text-white">Adequate welfare facilities</span> - Rest areas, washing facilities, etc.</li>
              <li><span className="font-medium text-white">Health and safety policy</span> - Written policy for organisations with 5+ employees</li>
              <li><span className="font-medium text-white">Risk assessment</span> - Identifying and mitigating electrical hazards</li>
            </ul>
          </div>
          
          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold text-elec-yellow">Important Note:</span> Employers must comply with 
              additional specific regulations, such as the Electricity at Work Regulations 1989, which detail more 
              specific requirements for electrical safety in the workplace.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Employee Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Under Sections 7 and 8 of the Act, employees also have duties while at work. These are particularly 
            important for electrical workers due to the hazardous nature of their work.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Section 7 Duties</h3>
              <p className="mb-2">Every employee must:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Take reasonable care for their own health and safety</li>
                <li>Take reasonable care for the safety of others who may be affected by their acts or omissions</li>
                <li>Cooperate with employers to enable them to comply with statutory duties</li>
                <li>Follow company procedures and safe systems of work</li>
                <li>Use equipment and protective devices properly</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Section 8 Duties</h3>
              <p className="mb-2">No person shall:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Intentionally or recklessly interfere with anything provided in the interests of health and safety</li>
                <li>Misuse anything provided for health, safety or welfare</li>
                <li>Bypass safety devices or guards</li>
                <li>Remove or deface safety signs or notices</li>
                <li>Operate equipment they are not trained or authorised to use</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30 flex items-start gap-3 mt-4">
            <Info className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold text-elec-yellow">For Electrical Workers:</span> Always follow safe 
              isolation procedures, use appropriate test equipment, wear correct PPE, and never work on live 
              equipment unless absolutely necessary and with appropriate safety measures in place.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Enforcement and Penalties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Health and Safety Executive (HSE) and local authorities enforce the Health and Safety at Work Act.
            Inspectors have significant powers and can issue various notices and initiate prosecutions for breaches.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Inspector Powers</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enter premises at any reasonable time</li>
                <li>Examine and investigate</li>
                <li>Take measurements, photographs and recordings</li>
                <li>Take samples of articles and substances</li>
                <li>Require articles or substances to be dismantled or tested</li>
                <li>Take possession of articles and substances</li>
                <li>Require information and documentation</li>
                <li>Interview and take statements</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Enforcement Notices</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium text-white">Improvement Notice</span> - Requires remedy of a breach within a specified time</li>
                <li><span className="font-medium text-white">Prohibition Notice</span> - Stops work activities that create serious risk</li>
                <li><span className="font-medium text-white">Fee for Intervention</span> - HSE can charge for their time when they identify material breaches</li>
                <li><span className="font-medium text-white">Prosecution</span> - For serious breaches or where notices are not complied with</li>
              </ul>
            </div>
          </div>
          
          <Table className="mt-4">
            <TableCaption>Potential penalties under the Health and Safety at Work Act</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Court</TableHead>
                <TableHead>Individual</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Magistrates'/Sheriff Court</TableCell>
                <TableCell>Up to £20,000 fine and/or up to 12 months imprisonment</TableCell>
                <TableCell>Up to £20,000 fine</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Crown/High Court</TableCell>
                <TableCell>Unlimited fine and/or up to 2 years imprisonment</TableCell>
                <TableCell>Unlimited fine</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Corporate Manslaughter</TableCell>
                <TableCell>Not applicable to individuals</TableCell>
                <TableCell>Unlimited fine, publicity orders, remedial orders</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30 flex items-start gap-3 mt-4">
            <AlertTriangle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold text-elec-yellow">Electrical Incidents:</span> Due to the potentially fatal 
              consequences of electrical incidents, prosecutions for electrical safety breaches often result in 
              significant penalties, especially where proper risk assessments and safe systems of work were not in place.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Application to Electrical Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            While the Health and Safety at Work Act 1974 provides the foundation, specific regulations detail 
            requirements for electrical safety. For electrical workers and apprentices, understanding how these 
            work together is essential.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regulations Relevant to Electrical Workers:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium text-white">Electricity at Work Regulations 1989</span> - Specific duties relating to electrical systems and work activities</li>
              <li><span className="font-medium text-white">Provision and Use of Work Equipment Regulations 1998</span> - Requirements for electrical tools and test equipment</li>
              <li><span className="font-medium text-white">Personal Protective Equipment at Work Regulations 1992</span> - Requirements for PPE including insulating gloves, face shields, etc.</li>
              <li><span className="font-medium text-white">Management of Health and Safety at Work Regulations 1999</span> - Requirements for risk assessment</li>
              <li><span className="font-medium text-white">Work at Height Regulations 2005</span> - Safety when working at height on electrical installations</li>
              <li><span className="font-medium text-white">Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013</span> - Reporting electrical incidents</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">How the HSWA Applies to Daily Electrical Work:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium text-white">Risk Assessments</span> - Legally required before starting electrical work</li>
              <li><span className="font-medium text-white">Method Statements</span> - Document safe systems of work for electrical tasks</li>
              <li><span className="font-medium text-white">Competence</span> - Only competent persons should work on electrical installations</li>
              <li><span className="font-medium text-white">Safe Isolation</span> - Following proper procedures to isolate electrical supplies</li>
              <li><span className="font-medium text-white">Test Equipment</span> - Using appropriate, calibrated tools and instruments</li>
              <li><span className="font-medium text-white">Personal Protective Equipment</span> - Using appropriate PPE for electrical tasks</li>
              <li><span className="font-medium text-white">Information and Training</span> - Proper instruction on electrical hazards and controls</li>
              <li><span className="font-medium text-white">Emergency Procedures</span> - Knowing what to do in case of electrical incidents</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Case Studies and Lessons Learned</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Case Study 1: Fatal Electric Shock</h3>
            <p className="mb-2">
              An electrician was electrocuted while working on a distribution board that was not properly isolated. 
              The company was fined £300,000 under Section 2 of HSWA for failing to ensure a safe system of work.
            </p>
            <p className="text-elec-yellow font-semibold mt-4">Key Lessons:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Always follow proper isolation procedures</li>
              <li>Verify isolation with appropriate test equipment</li>
              <li>Never rely on others having isolated circuits without checking</li>
              <li>Use lock-off devices and warning notices</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Case Study 2: Apprentice Injury</h3>
            <p className="mb-2">
              An apprentice electrician suffered serious burns when instructed to work on equipment that was 
              still energised. The employer was prosecuted for inadequate supervision and training, resulting in 
              a £75,000 fine and a custodial sentence for the supervisor.
            </p>
            <p className="text-elec-yellow font-semibold mt-4">Key Lessons:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Apprentices must be properly supervised</li>
              <li>Tasks must be appropriate to competence level</li>
              <li>Training must be provided before undertaking hazardous work</li>
              <li>Supervisors have a duty of care</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Resources and Guidance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                <h3 className="text-lg font-semibold text-elec-yellow">Official Publications</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 flex-grow">
                <li>HSE Website - Health and Safety at Work Act guidance</li>
                <li>HSE INDG231 - Electrical safety and you</li>
                <li>HSE HSG85 - Electricity at work: Safe working practices</li>
                <li>IET Guidance Note 3 - Inspection and Testing</li>
                <li>BS 7671 - Requirements for Electrical Installations</li>
                <li>ECA Guidelines on Safe Isolation Procedures</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare className="h-5 w-5 text-elec-yellow" />
                <h3 className="text-lg font-semibold text-elec-yellow">Compliance Checklist</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 flex-grow">
                <li>Risk assessments completed and documented</li>
                <li>Safe systems of work established</li>
                <li>Appropriate PPE provided and used</li>
                <li>Suitable test equipment available and calibrated</li>
                <li>Adequate information, instruction and training provided</li>
                <li>Emergency procedures in place</li>
                <li>Competent supervision arranged</li>
                <li>Proper communication with clients and other workers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-elec-yellow/10 p-6 rounded-md border border-elec-yellow/30 flex items-start gap-3">
        <FileText className="h-6 w-6 text-elec-yellow shrink-0 mt-0.5" />
        <div>
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Examination Preparation</h3>
          <p className="mb-3">
            For your EAL Level 2 Diploma assessments, you should be able to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Explain the main requirements of the Health and Safety at Work Act 1974</li>
            <li>Identify the key duties of employers and employees</li>
            <li>Describe how the Act is enforced and the potential penalties</li>
            <li>Explain how the Act applies specifically to electrical installation work</li>
            <li>Understand the relationship between the Act and more specific regulations</li>
            <li>Apply health and safety principles to practical electrical scenarios</li>
          </ul>
        </div>
      </div>
      
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
      
      {isCompleted && (
        <Card className="border-green-500/30 bg-green-900/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">You've completed this subsection</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElectricalTheoryHSAWA;
