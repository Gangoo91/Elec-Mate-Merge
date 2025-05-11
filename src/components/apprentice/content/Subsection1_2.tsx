
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
import { AlertTriangle, Shield, Users, BookOpen, ClipboardCheck } from 'lucide-react';

const Subsection1_2 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Roles and Responsibilities in Electrical Safety</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <Shield className="mr-3 h-6 w-6 text-elec-yellow" />
          Introduction to Electrical Safety Responsibilities
        </h2>
        <p className="mb-4">
          Electrical safety in the workplace is governed by several key pieces of legislation, including the Health and Safety 
          at Work Act 1974 and the Electricity at Work Regulations 1989. These regulations establish a framework of 
          responsibilities that are distributed among various stakeholders in the electrical industry.
        </p>
        <p>
          Understanding who is responsible for what aspects of electrical safety is crucial for ensuring compliance 
          with regulations and, more importantly, for preventing electrical accidents, injuries, and fatalities. This 
          section explores the different roles and responsibilities in maintaining electrical safety in the workplace.
        </p>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <Users className="mr-3 h-6 w-6" />
            Employer Responsibilities
          </CardTitle>
          <CardDescription>Legal duties of employers to ensure electrical safety</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Employers have extensive responsibilities for ensuring electrical safety in the workplace. 
            These duties are legally enforced through various regulations including the Health and Safety 
            at Work Act and the Electricity at Work Regulations.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Employer Duties:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure electrical systems are designed, constructed, and maintained to be safe</li>
              <li>Carry out risk assessments for all electrical work</li>
              <li>Provide and maintain safe work equipment</li>
              <li>Provide adequate information, instruction, training, and supervision</li>
              <li>Create and implement safe systems of work</li>
              <li>Ensure only competent persons work on electrical systems</li>
              <li>Provide suitable personal protective equipment (PPE)</li>
              <li>Implement emergency procedures for electrical incidents</li>
              <li>Maintain accurate records of maintenance and testing</li>
              <li>Report serious electrical incidents under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations)</li>
            </ul>
          </div>

          <div className="bg-amber-900/30 rounded-md p-4 border border-amber-500/30 mt-4">
            <h3 className="text-lg font-semibold text-amber-400 mb-2 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Employer Legal Liabilities
            </h3>
            <p className="mb-2">
              Employers who fail to fulfill their electrical safety obligations may face serious consequences:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prosecution by the Health and Safety Executive (HSE) or local authorities</li>
              <li>Substantial fines that can reach into millions of pounds for serious violations</li>
              <li>Imprisonment for particularly egregious cases of negligence</li>
              <li>Prohibition notices that can halt business operations</li>
              <li>Civil claims from affected employees</li>
              <li>Reputational damage and loss of business</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Specific Employer Responsibilities Under EWR 1989:</h3>
            <p className="mb-3">The Electricity at Work Regulations place specific duties on employers:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Regulation 4:</span> Ensure all electrical systems are constructed and maintained to prevent danger</li>
              <li><span className="font-semibold">Regulation 14:</span> Ensure no person works on or near any live conductor unless it's unreasonable to work dead, suitable precautions are taken, and it's reasonable to work live</li>
              <li><span className="font-semibold">Regulation 16:</span> Ensure persons working on electrical equipment are competent to prevent danger</li>
              <li><span className="font-semibold">Regular testing:</span> Implement regimes for inspection and testing, including PAT testing for portable appliances</li>
              <li><span className="font-semibold">Documentation:</span> Maintain records of electrical installations, testing, and maintenance</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <BookOpen className="mr-3 h-6 w-6" />
            Employee Responsibilities
          </CardTitle>
          <CardDescription>Duties of workers in electrical environments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            All employees, especially electricians and those working with electrical equipment, have 
            significant responsibilities for maintaining safety. These responsibilities are both 
            legal obligations and essential practices for preventing electrical incidents.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Employee Duties:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Take reasonable care of their own health and safety and that of others</li>
              <li>Cooperate with employers on health and safety matters</li>
              <li>Follow safe working procedures and instructions</li>
              <li>Use equipment correctly according to training</li>
              <li>Wear appropriate PPE as required</li>
              <li>Report hazards, defects, and unsafe conditions immediately</li>
              <li>Not interfere with or misuse safety equipment</li>
              <li>Maintain competence through continual professional development</li>
              <li>Only undertake work for which they are competent</li>
              <li>Stop work if it becomes unsafe</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Electrician-Specific Responsibilities:</h3>
            <p className="mb-3">
              Qualified electricians have additional responsibilities due to their specialized knowledge and role:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Verify isolation before beginning work on electrical systems</li>
              <li>Apply appropriate lock-out/tag-out procedures</li>
              <li>Use properly insulated and tested tools</li>
              <li>Follow wiring regulations (BS 7671) in all installation work</li>
              <li>Conduct thorough testing and inspection after completing work</li>
              <li>Document all work performed on electrical systems</li>
              <li>Stay current with changes to regulations and best practices</li>
              <li>Mentor apprentices and less experienced colleagues in safe practices</li>
              <li>Refuse work that would violate safety regulations</li>
              <li>Report near misses to improve safety systems</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <ClipboardCheck className="mr-3 h-6 w-6" />
            Duties of Other Stakeholders
          </CardTitle>
          <CardDescription>Roles of additional parties in ensuring electrical safety</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Beyond employers and employees, several other stakeholders have important roles in maintaining 
            electrical safety. These include clients, designers, contractors, manufacturers, and regulatory bodies.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Clients and Building Owners:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Select competent contractors for electrical work</li>
              <li>Provide information about existing electrical installations</li>
              <li>Ensure adequate resources for safe work</li>
              <li>Maintain electrical installations once installed</li>
              <li>Keep records of electrical certification</li>
              <li>Commission appropriate verification and testing</li>
              <li>Fulfill duties under CDM Regulations when applicable</li>
              <li>Ensure Electrical Installation Condition Reports (EICRs) are conducted at appropriate intervals</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mb-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Designers and Consultants:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Design electrical systems that comply with regulations</li>
              <li>Consider safety during installation, maintenance, and use</li>
              <li>Specify appropriate equipment and materials</li>
              <li>Communicate design requirements clearly</li>
              <li>Ensure designs meet BS 7671 requirements</li>
              <li>Consider future maintenance access and requirements</li>
              <li>Design with energy efficiency and sustainability in mind</li>
              <li>Provide clear documentation and specifications</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regulatory Bodies:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Health and Safety Executive (HSE):</span> Enforcement and guidance, investigation of serious incidents, publishing safety alerts and bulletins</li>
              <li><span className="font-semibold">Local Authority Building Control:</span> Enforcement of Building Regulations, including Part P for domestic electrical work</li>
              <li><span className="font-semibold">Institution of Engineering and Technology (IET):</span> Technical standards, publishing BS 7671 (Wiring Regulations), guidance materials and training</li>
              <li><span className="font-semibold">NICEIC, ELECSA, NAPIT:</span> Registration and assessment of contractors, certification, quality assurance schemes</li>
              <li><span className="font-semibold">Office for Product Safety and Standards:</span> Oversight of electrical product safety standards and enforcement</li>
              <li><span className="font-semibold">Electrical Safety First:</span> Charity promoting electrical safety through campaigns and education</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Manufacturers and Suppliers:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ensure products comply with relevant standards and regulations</li>
              <li>Provide clear instructions for safe installation and use</li>
              <li>Supply appropriate technical data and specifications</li>
              <li>Mark products with appropriate safety information</li>
              <li>Conduct rigorous testing before market release</li>
              <li>Recall defective products that present safety hazards</li>
              <li>Provide updates on product safety developments</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <BookOpen className="mr-3 h-6 w-6" />
            Competence and Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            A fundamental requirement for electrical safety is ensuring that work is only carried out by those 
            who are competent to do so. Competence is a combination of training, qualifications, knowledge, 
            experience, and ongoing professional development.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Elements of Electrical Competence:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Appropriate technical knowledge</li>
              <li>Experience with the type of installation</li>
              <li>Understanding of the equipment and hazards involved</li>
              <li>Ability to recognize limitations of own competence</li>
              <li>Knowledge of relevant standards and regulations</li>
              <li>Formal qualifications (NVQs, City & Guilds, etc.)</li>
              <li>Regular updates on new technologies and regulations</li>
              <li>Membership of professional bodies (IET, ECA, etc.)</li>
              <li>Evidence of continued professional development</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key UK Electrical Qualifications:</h3>
            <p className="mb-3">Several recognized qualifications demonstrate electrical competence:</p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white">Level 3 NVQ Diploma in Electrotechnical Technology</h4>
                <p className="text-sm text-elec-light/90">The standard qualification for electricians working in the UK, covering installation and maintenance.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white">City & Guilds 2365 Diploma in Electrical Installation</h4>
                <p className="text-sm text-elec-light/90">A theory-based qualification that covers the principles of electrical installation.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white">City & Guilds 2391 Inspection and Testing</h4>
                <p className="text-sm text-elec-light/90">Specific qualification for conducting inspection and testing of electrical installations.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white">City & Guilds 2382 18th Edition Wiring Regulations</h4>
                <p className="text-sm text-elec-light/90">Required qualification covering the current BS 7671 wiring regulations.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white">ECS Card (Electrotechnical Certification Scheme)</h4>
                <p className="text-sm text-elec-light/90">Industry recognition card that proves identity, qualifications, and occupational competence.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-elec-dark/80 to-elec-yellow/20 rounded-md p-4 border border-elec-yellow/30 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Case Study: Electrical Safety Responsibilities in Action</h3>
            <p className="mb-3">
              In 2018, a UK electrical contractor was fined £25,000 after an employee suffered serious burns while working on a 
              live electrical panel. The HSE investigation found that:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>The employer failed to ensure work was properly planned and risk-assessed</li>
              <li>Employees were not provided with adequate training for live working</li>
              <li>Appropriate PPE was available but not worn</li>
              <li>Supervision was inadequate for the complexity of the task</li>
            </ul>
            <p>
              This case highlights how a failure to fulfill safety responsibilities at multiple levels can lead to serious 
              incidents. Had proper planning, risk assessment, training, supervision, and PPE use been implemented, the incident 
              could have been prevented.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow">Best Practice for Managing Electrical Safety Responsibilities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="mb-4">
            Implementing a comprehensive approach to managing electrical safety responsibilities involves several key strategies:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Clear Documentation</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Written safety policies and procedures</li>
                <li>Detailed method statements and risk assessments</li>
                <li>Permit-to-work systems for hazardous activities</li>
                <li>Equipment inventories and maintenance schedules</li>
                <li>Training records and competency assessments</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Regular Training</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Initial safety induction for all staff</li>
                <li>Specialized training for electrical workers</li>
                <li>Refresher training at appropriate intervals</li>
                <li>Updates on regulatory changes</li>
                <li>Training on new equipment and technologies</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Effective Communication</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Clear safety briefings before work begins</li>
                <li>Regular toolbox talks on specific safety topics</li>
                <li>Open reporting culture for hazards and near misses</li>
                <li>Clear signage and labeling of electrical hazards</li>
                <li>Communication of lessons learned from incidents</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
              <h3 className="text-lg font-semibold text-elec-yellow mb-2">Monitoring and Review</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Regular safety inspections and audits</li>
                <li>Performance metrics for safety compliance</li>
                <li>Investigation of all incidents and near misses</li>
                <li>Management reviews of safety systems</li>
                <li>External certification and accreditation</li>
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

export default Subsection1_2;
