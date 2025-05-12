
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
import { AlertTriangle, Shield, FileText, List, ClipboardCheck } from 'lucide-react';

const Subsection1_3 = ({ subsectionId, isCompleted, markAsComplete }: SubsectionProps) => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-elec-yellow">Building Regulations (Part P)</h1>
      
      <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-elec-yellow mb-4 flex items-center">
          <AlertTriangle className="mr-3 h-6 w-6 text-elec-yellow" />
          Introduction to Building Regulations
        </h2>
        <p className="mb-4">
          Building Regulations Part P specifically applies to electrical installations in dwellings and is designed to 
          ensure the safety of electrical work in residential properties. These regulations came into effect in 2005 
          to reduce the number of injuries, deaths and fires caused by faulty electrical installations.
        </p>
        <p>
          Part P is a critical element of the UK Building Regulations that electrical professionals must understand 
          and comply with for all domestic electrical work. It sets the standards for safety and provides a framework 
          for ensuring that electrical work in homes is completed to a high standard.
        </p>
      </div>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <List className="mr-3 h-6 w-6" />
            Key Requirements of Part P
          </CardTitle>
          <CardDescription>Essential compliance elements for electrical work in dwellings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Part P of the Building Regulations establishes requirements for ensuring that electrical installations 
            in dwellings are designed, installed, inspected and tested to provide reasonable protection against 
            injuries from fire or electric shocks.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Main Part P Requirements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reasonable provision must be made in the design, installation, inspection and testing of electrical installations to protect people from fire or injury</li>
              <li>Electrical work must be designed and installed to afford appropriate protection against mechanical and thermal damage</li>
              <li>Sufficient information must be provided to allow proper operation, maintenance and future alterations to the electrical installation</li>
              <li>Certain types of electrical work in dwellings must be notified to a local building control body</li>
              <li>Work that requires notification must be carried out by a competent person registered with an approved scheme or must be inspected by building control</li>
            </ul>
          </div>

          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Types of Notifiable Work:</h3>
            <p className="mb-3">Part P defines two categories of work that require notification:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Installation of a new circuit</span> - For example, adding a new lighting circuit or socket outlet circuit</li>
              <li><span className="font-semibold">Replacement of consumer units</span> - Complete replacement of the main fuse box/consumer unit</li>
              <li><span className="font-semibold">Work in special locations</span> - Any electrical work in kitchens, bathrooms, or outdoors, regardless of scale</li>
              <li><span className="font-semibold">Alterations to existing circuits</span> - In special locations such as bathrooms or outdoors</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <ClipboardCheck className="mr-3 h-6 w-6" />
            Compliance with Part P
          </CardTitle>
          <CardDescription>How to ensure work meets legal requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Compliance with Part P can be achieved through one of two main routes. Understanding these options 
            is essential for all electrical professionals working on domestic properties.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Routes to Compliance:</h3>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <span className="font-semibold">Registered Competent Person Scheme</span>
                <p className="mt-1">If you're registered with a Competent Person Scheme (such as NICEIC, ELECSA, NAPIT), you can:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Self-certify your electrical work</li>
                  <li>Issue certificates directly to clients</li>
                  <li>Notify the local authority on the client's behalf</li>
                  <li>Issue a Building Regulations Compliance Certificate</li>
                </ul>
              </li>
              <li>
                <span className="font-semibold">Building Control Notification</span>
                <p className="mt-1">If you're not part of a scheme, you must:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Submit a building notice to the local authority before starting work</li>
                  <li>Pay the appropriate fee</li>
                  <li>Have the work inspected by building control</li>
                  <li>Provide appropriate certification upon completion</li>
                </ul>
              </li>
            </ol>
          </div>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Required Certification:</h3>
            <p className="mb-3">When completing electrical work under Part P, the following certificates are required:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Electrical Installation Certificate (EIC)</span> - For new installations and major alterations</li>
              <li><span className="font-semibold">Minor Electrical Installation Works Certificate (MEIWC)</span> - For smaller additions or alterations to existing circuits</li>
              <li><span className="font-semibold">Building Regulations Compliance Certificate</span> - Issued by registered scheme members</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-elec-yellow/30 bg-elec-dark/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-elec-yellow flex items-center">
            <FileText className="mr-3 h-6 w-6" />
            Practical Implications for Electricians
          </CardTitle>
          <CardDescription>Real-world application of Part P regulations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Understanding the practical implications of Part P helps electrical professionals navigate the 
            regulatory requirements while ensuring client satisfaction and compliance.
          </p>
          
          <div className="bg-elec-dark rounded-md p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-semibold text-elec-yellow mb-2">Best Practices for Part P Compliance:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Thorough documentation</span> - Keep detailed records of all electrical work conducted</li>
              <li><span className="font-semibold">Clear client communication</span> - Explain Part P requirements and certification to clients</li>
              <li><span className="font-semibold">Regular scheme updates</span> - Stay informed about changes to Part P requirements</li>
              <li><span className="font-semibold">Continuous professional development</span> - Maintain knowledge of current regulations and standards</li>
              <li><span className="font-semibold">Pre-planning</span> - Determine notification requirements before commencing work</li>
              <li><span className="font-semibold">Quality control</span> - Implement robust testing and verification procedures</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-elec-dark/80 to-elec-yellow/20 rounded-md p-4 border border-elec-yellow/30 mt-4">
            <h3 className="text-lg font-semibold text-elec-yellow mb-3">Case Study: Part P Compliance</h3>
            <p className="mb-3">
              An electrician was hired to install a new shower circuit in a domestic property. As this work was in a bathroom 
              (special location) and involved creating a new circuit, it was notifiable under Part P.
            </p>
            <p className="mb-3">
              Being registered with NICEIC, the electrician was able to:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>Complete the installation according to BS 7671 requirements</li>
              <li>Test the installation thoroughly and compile test results</li>
              <li>Issue an Electrical Installation Certificate to the client</li>
              <li>Submit notification to the local authority through the NICEIC portal</li>
              <li>Provide the client with a Building Regulations Compliance Certificate</li>
            </ul>
            <p>
              This process ensured full compliance with Part P while minimizing administrative burden and cost to the client, 
              who received proper documentation confirming the safety and legality of the installation.
            </p>
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
