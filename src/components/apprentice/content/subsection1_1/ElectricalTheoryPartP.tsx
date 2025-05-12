
import React from 'react';
import { Button } from '@/components/ui/button';
import { SubsectionProps } from "./types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { AlertTriangle, CheckCircle, BookOpen, FileCheck, Home, Tools, ClipboardCheck, AlertCircle } from 'lucide-react';

const ElectricalTheoryPartP = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Building Regulations (Part P)</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <Home className="mr-3 h-6 w-6 text-elec-yellow" />
          Introduction to Building Regulations Part P
        </h2>
        <p className="mb-4">
          Part P of the Building Regulations applies specifically to electrical installations in dwellings in England and Wales. 
          It was introduced in 2005 to reduce the number of injuries and deaths caused by electric shocks and fires in homes 
          resulting from faulty electrical work.
        </p>
        <p>
          These regulations ensure that electrical work within domestic properties meets safety standards to protect the occupants 
          and future users of the installation. It is a legal requirement that must be understood and followed by all electricians 
          undertaking domestic electrical work.
        </p>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <BookOpen className="mr-3 h-6 w-6" />
            Scope and Legal Requirements
          </CardTitle>
          <CardDescription>Understanding what work is covered by Part P</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Part P applies to fixed electrical installations in domestic properties, including houses, flats, and associated buildings 
            such as garages and outbuildings. It sets out the legal requirements concerning electrical safety for design and installation 
            work in these properties.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Requirements of Part P:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Electrical installations must be designed and installed to provide reasonable protection against damage from fire and injury from electric shock</li>
              <li>Electrical work must either be notified to Building Control or completed by a competent person registered with an approved scheme</li>
              <li>All completed electrical work must be certified to confirm compliance with BS 7671 (IET Wiring Regulations)</li>
              <li>Records of all electrical installation work must be kept and provided to the homeowner</li>
              <li>Building Control must be notified before commencing notifiable electrical work unless using a registered competent person</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">What is a Dwelling?</h3>
            <p className="mb-2">For the purposes of Part P, a dwelling is defined as:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>A house or flat</li>
              <li>A room used for residential purposes</li>
              <li>A business premises that also includes living accommodation</li>
              <li>Common access areas in buildings containing flats</li>
              <li>Outbuildings such as garages, greenhouses, and sheds that receive their electricity supply from the dwelling</li>
              <li>Gardens and land associated with the dwelling</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <AlertTriangle className="mr-3 h-6 w-6" />
            Notifiable Work
          </CardTitle>
          <CardDescription>When you need to notify Building Control or use a registered scheme</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Not all electrical work in dwellings needs to be notified to Building Control. Only "notifiable work" requires 
            either notification or completion by a registered competent person. Understanding what constitutes notifiable work 
            is essential for compliance.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Notifiable Electrical Work:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Installation of a new consumer unit (fuse box)</span> or complete replacement of an existing one</li>
              <li><span className="font-semibold">Installation of a complete new circuit</span>, including lighting circuits, power circuits, or dedicated circuits for appliances</li>
              <li><span className="font-semibold">Any electrical work in special locations</span>, including:
                <ul className="list-disc pl-5 mt-2">
                  <li>Bathrooms (within Zones 0, 1, or 2)</li>
                  <li>Swimming/paddling pools (within 2.5m horizontally from pool water)</li>
                  <li>Hot air saunas (within 0.5m of the heater)</li>
                </ul>
              </li>
              <li><span className="font-semibold">Electrical installation of a new build dwelling</span> (all electrical work)</li>
              <li><span className="font-semibold">Rewiring of a property</span> (complete or substantial)</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Non-Notifiable Work Examples:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Replacing damaged accessories (like-for-like)</li>
              <li>Adding additional sockets or lights to an existing circuit</li>
              <li>Replacing cables damaged by fire, rodents, or similar causes (like-for-like)</li>
              <li>Installing or upgrading main or supplementary equipotential bonding</li>
              <li>Work that is not in a kitchen or special location, and does not involve a special installation</li>
            </ul>
            <div className="mt-4 p-3 bg-amber-900/40 border border-amber-600/30 rounded-md">
              <p className="text-amber-200 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>Even if work is non-notifiable, it must still comply with BS 7671 requirements. All electrical work, regardless of notification status, must be safe and meet current regulations.</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <Tools className="mr-3 h-6 w-6" />
            Routes to Compliance
          </CardTitle>
          <CardDescription>How to ensure your work meets Part P requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            There are two main routes to demonstrate compliance with Part P for notifiable electrical work:
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Route 1: Self-Certification Schemes</h3>
            <p className="mb-3">
              The most common route for professional electricians is to register with a competent person self-certification scheme such as:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">NICEIC</span> - National Inspection Council for Electrical Installation Contracting</li>
              <li><span className="font-semibold">ELECSA</span> - Part of Certsure LLP alongside NICEIC</li>
              <li><span className="font-semibold">NAPIT</span> - National Association of Professional Inspectors and Testers</li>
              <li><span className="font-semibold">STROMA</span> - Certification for building energy performance and services</li>
            </ul>
            <p className="mt-3">
              Registered installers can self-certify their work, meaning they don't need to notify Building Control before starting 
              work. Upon completion, they issue certificates, notify the local authority of the work, and provide the customer with 
              documentation confirming compliance.
            </p>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Route 2: Building Control Notification</h3>
            <p className="mb-3">
              If not registered with a competent person scheme, you must:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Submit a building notice or full plans application to the local authority building control before work begins</li>
              <li>Pay the appropriate building control fee</li>
              <li>Have the work inspected by building control before, during, and after installation</li>
              <li>Provide an Electrical Installation Certificate or Minor Works Certificate upon completion</li>
              <li>Building control may require an additional inspection by a qualified electrician</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-900/40 border border-blue-600/30 rounded-md">
              <p className="text-blue-200 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>This route is typically more time-consuming and expensive than using a registered competent person, but it allows electricians who aren't registered with a scheme to undertake notifiable work legally.</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <FileCheck className="mr-3 h-6 w-6" />
            Certification and Documentation
          </CardTitle>
          <CardDescription>Essential paperwork for Part P compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Proper documentation is an essential aspect of Part P compliance. All electrical work must be certified 
            to confirm it meets the requirements of BS 7671 (the IET Wiring Regulations).
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Required Documentation:</h3>
            <ul className="list-disc pl-5 space-y-3">
              <li>
                <span className="font-semibold">Electrical Installation Certificate (EIC)</span> 
                <p className="mt-1">Required for new installations, additions, or alterations to existing installations. Must be issued by a competent person who is responsible for the design, construction, inspection, and testing of the installation.</p>
              </li>
              <li>
                <span className="font-semibold">Minor Electrical Installation Works Certificate (MEIWC)</span>
                <p className="mt-1">For minor work that doesn't include a new circuit, such as adding a socket to an existing circuit or replacing a consumer unit. It confirms the work meets BS 7671 but doesn't require a full inspection of the existing installation.</p>
              </li>
              <li>
                <span className="font-semibold">Building Regulations Compliance Certificate</span>
                <p className="mt-1">Issued by the registered scheme provider when work is self-certified by a registered installer. This confirms the work complies with Building Regulations.</p>
              </li>
              <li>
                <span className="font-semibold">Schedule of Inspections and Schedule of Test Results</span>
                <p className="mt-1">Details of the inspections conducted and the results of the tests performed on the installation.</p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-elec-dark/80 to-elec-yellow/20 rounded-md p-4 border border-elec-yellow/30 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Part P in Practice: Case Study</h3>
            <p className="mb-3">
              An electrician was hired to install a new shower circuit in a domestic bathroom. This work was notifiable under Part P because:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-3">
              <li>It involved creating a new circuit</li>
              <li>The work was located in a bathroom (special location)</li>
            </ul>
            <p className="mb-3">The electrician, registered with NICEIC, followed these steps for compliance:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-3">
              <li>Designed the installation to meet BS 7671 requirements for bathrooms</li>
              <li>Ensured appropriate IP ratings for all equipment within the bathroom zones</li>
              <li>Installed RCD protection as required by the regulations</li>
              <li>Completed all necessary testing and inspection</li>
              <li>Issued an Electrical Installation Certificate (EIC) to the customer</li>
              <li>Notified the work to the local authority through the NICEIC scheme</li>
              <li>Provided the customer with a Building Regulations Compliance Certificate</li>
            </ol>
            <p>
              This example demonstrates how Part P works in practice, ensuring electrical installations in domestic properties 
              are safe and compliant with regulations while providing documentary evidence of compliance.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <ClipboardCheck className="mr-3 h-6 w-6" />
            Enforcement and Consequences
          </CardTitle>
          <CardDescription>Understanding the implications of non-compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Failing to comply with Part P can have serious consequences for both electricians and homeowners. 
            Local authorities have powers to enforce the regulations and take action against non-compliant work.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Enforcement Actions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Local authorities can require homeowners to remove or alter non-compliant electrical installations</li>
              <li>Building control may issue an enforcement notice requiring rectification of non-compliant work</li>
              <li>Fines of up to £5,000 may be imposed for breaches of the Building Regulations</li>
              <li>Professional electricians may face disciplinary action from their registration scheme</li>
              <li>Insurance claims may be invalidated if electrical work doesn't comply with Building Regulations</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Importance for Homeowners:</h3>
            <p className="mb-3">
              Homeowners should be aware that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>When selling their property, they may be asked to provide evidence that electrical work complies with Building Regulations</li>
              <li>If non-compliant work is discovered during a property sale, it could delay or prevent the sale</li>
              <li>Homeowners have a legal duty to ensure that notifiable electrical work is either self-certified by a registered installer or notified to building control</li>
              <li>If work is done as DIY, the homeowner must arrange for building control notification and inspection</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <CheckCircle className="mr-3 h-6 w-6" />
            Exam Preparation
          </CardTitle>
          <CardDescription>Key points to remember for your EAL assessments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            For EAL Level 2 assessments, you should be familiar with these key points about Part P:
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Examination Key Points:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Part P applies to domestic electrical installations in England and Wales</li>
              <li>Understand what constitutes "notifiable work" versus "non-notifiable work"</li>
              <li>Know the special locations where all electrical work is notifiable (bathrooms, swimming pools, saunas)</li>
              <li>Be able to identify the two routes to compliance (self-certification or building control notification)</li>
              <li>Understand the required documentation for different types of electrical work</li>
              <li>Know the main competent person schemes (NICEIC, ELECSA, NAPIT, etc.)</li>
              <li>Understand the consequences of non-compliance for both electricians and homeowners</li>
              <li>Remember that all electrical work must comply with BS 7671 whether notifiable or not</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Practice Assessment Questions:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <p className="font-medium">Which of the following is considered notifiable work under Part P?</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Installing a new power socket in an existing circuit in a living room</li>
                  <li>Installing a complete new lighting circuit in a bedroom</li>
                  <li>Replacing a damaged light switch with an identical one</li>
                  <li>Adding supplementary bonding to a kitchen</li>
                </ul>
                <p className="mt-2 text-elec-yellow/80"><em>Answer: Installing a complete new lighting circuit in a bedroom</em></p>
              </li>
              <li>
                <p className="font-medium">Which of these locations makes electrical work automatically notifiable under Part P?</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Kitchen</li>
                  <li>Bathroom</li>
                  <li>Living room</li>
                  <li>Hallway</li>
                </ul>
                <p className="mt-2 text-elec-yellow/80"><em>Answer: Bathroom</em></p>
              </li>
            </ol>
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

export default ElectricalTheoryPartP;
