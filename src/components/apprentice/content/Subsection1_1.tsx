
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
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AlertCircle, Shield, BookOpen, FileText, CheckSquare } from 'lucide-react';

const Subsection1_1 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Electricity at Work Regulations 1989</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/30 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="bg-elec-yellow/20 p-3 rounded-full">
            <Shield className="h-6 w-6 text-elec-yellow" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-elec-yellow">Key Information</h2>
            <p className="text-muted-foreground mt-1">
              The Electricity at Work Regulations 1989 (EWR) came into force on 1 April 1990 and apply to all aspects of 
              the use of electricity in the workplace. They are made under the Health and Safety at Work etc. Act 1974 
              and enforce a high standard of electrical safety in all workplaces.
            </p>
          </div>
        </div>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Core Principles</CardTitle>
          <CardDescription>The fundamental requirements established by the regulations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Electricity at Work Regulations 1989 establish legal requirements for employers, employees, and self-employed 
            persons to ensure electrical safety in the workplace. They apply to all electrical equipment and systems, from 
            power stations to the smallest portable appliance.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Requirements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All electrical systems must be constructed and maintained to prevent danger</li>
              <li>All work activities involving electrical systems must be carried out safely</li>
              <li>Only persons with appropriate technical knowledge or experience may work on electrical systems</li>
              <li>All conductors must be insulated, protected, or placed to prevent danger</li>
              <li>Precautions must be taken against adverse or hazardous environments</li>
              <li>Electrical equipment must be suitable for its environment and intended use</li>
              <li>Equipment must be properly isolated before work is carried out</li>
              <li>Adequate working space, access, and lighting must be provided for electrical work</li>
              <li>Persons working on electrical systems must be competent to prevent danger</li>
              <li>Testing and inspection must be carried out to prevent danger</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Regulation 4: Systems, Work Activities and Protective Equipment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This key regulation requires that all electrical systems be constructed and maintained to prevent danger. It establishes 
            the fundamental safety requirements for all electrical installations and equipment.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Requirements for Compliance:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>All electrical systems must be of suitable construction</li>
              <li>Systems must be maintained in a safe condition</li>
              <li>Systems must be protected from foreseeable environmental conditions</li>
              <li>Work activities must not give rise to danger</li>
              <li>Protective equipment must be suitable for use and properly maintained</li>
              <li>The system design must consider the environment it will operate in</li>
            </ul>
          </div>
          
          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
            <p className="text-sm">
              <span className="font-semibold text-elec-yellow">Important Note:</span> Regulation 4 is absolute in nature, 
              meaning there is no qualification of "so far as is reasonably practicable." This makes compliance 
              mandatory regardless of cost or difficulty.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Regulation 14: Working on or Near Live Conductors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This critical regulation establishes the requirements for any work on or near live electrical conductors. It is 
            particularly relevant for electricians who may need to work with live systems.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">The Three Conditions:</h3>
            <p className="mb-2">
              Under Regulation 14, no person shall work on or near any live conductor unless:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>It is unreasonable in all circumstances for the conductor to be dead</li>
              <li>It is reasonable in all circumstances for the person to work on or near the conductor while it is live</li>
              <li>Suitable precautions are taken to prevent injury</li>
            </ol>
          </div>
          
          <Table>
            <TableCaption>Common examples of suitable precautions for live working</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Precaution Type</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">PPE</TableCell>
                <TableCell>Insulated tools, rubber mats, insulating gloves, face shields</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Workspace</TableCell>
                <TableCell>Adequate working space, good lighting, dry conditions</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Procedural</TableCell>
                <TableCell>Permits to work, risk assessments, method statements</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Personnel</TableCell>
                <TableCell>Second person present, competent supervision</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Engineering</TableCell>
                <TableCell>Temporary insulation, shrouding, barriers, screens</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Competence Requirements (Regulation 16)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Regulation 16 requires that no person shall engage in work that requires technical knowledge or experience
            to prevent danger unless they have that knowledge or experience, or are under appropriate supervision.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Technical Knowledge</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Understanding of electrical theory</li>
                <li>Knowledge of the system being worked on</li>
                <li>Awareness of hazards and safety requirements</li>
                <li>Familiarity with relevant standards and procedures</li>
                <li>Understanding of test equipment and methods</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Experience</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Practical application of technical knowledge</li>
                <li>Demonstrated ability to work safely</li>
                <li>Familiarity with tools and equipment</li>
                <li>Past similar work completed successfully</li>
                <li>Proven problem-solving capabilities</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Documentation of Competence:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Formal qualifications (City & Guilds, NVQs, etc.)</li>
              <li>Training certificates and records</li>
              <li>Evidence of continuing professional development</li>
              <li>Employer authorization/competency assessment</li>
              <li>Professional registration (e.g., with IET, ECA)</li>
              <li>Apprenticeship completion certificates</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Legal Enforcement and Penalties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The Health and Safety Executive (HSE) and local authorities enforce the Electricity at Work Regulations 1989.
            Breaches can result in significant penalties, including fines and imprisonment.
          </p>
          
          <div className="bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Potential Penalties:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Improvement notices requiring remedial action</li>
              <li>Prohibition notices stopping dangerous activities</li>
              <li>Fines with no upper limit for serious offenses</li>
              <li>Imprisonment up to 2 years for the most serious cases</li>
              <li>Corporate manslaughter charges in fatality cases</li>
              <li>Disqualification from directorship</li>
            </ul>
          </div>
          
          <div className="flex items-start gap-4 mt-4">
            <div className="bg-elec-yellow/20 p-3 rounded-full">
              <FileText className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-elec-yellow">Case Law</h3>
              <p className="text-muted-foreground mt-1">
                Several landmark legal cases have established precedents in the application of the EWR, including 
                R v HTM Ltd (2006), where a company was fined £175,000 after an employee was fatally electrocuted, 
                and R v Balfour Beatty Rail Infrastructure Services Ltd (2006), resulting in a £10 million fine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Guidance and Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-elec-yellow" />
                <h3 className="text-lg font-semibold text-elec-yellow">Official Publications</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 flex-grow">
                <li>HSE Guidance Note HSR25</li>
                <li>Memorandum of Guidance on the EWR</li>
                <li>BS 7671 IET Wiring Regulations</li>
                <li>Guidance Notes 1-8 by the IET</li>
                <li>HSE Electrical Safety at Work website</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <CheckSquare className="h-5 w-5 text-elec-yellow" />
                <h3 className="text-lg font-semibold text-elec-yellow">Compliance Checklist</h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 flex-grow">
                <li>Risk assessments completed</li>
                <li>Safe systems of work established</li>
                <li>Competency records maintained</li>
                <li>Test and inspection regimes in place</li>
                <li>Documentation and certification up to date</li>
                <li>Suitable tools and PPE provided</li>
              </ul>
            </div>
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

export default Subsection1_1;
