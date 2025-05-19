
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const RegulatoryFramework = () => {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Regulatory Framework | ElecMate</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Regulatory Framework</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Key Legislation and Standards</h2>
            <p className="mb-4">
              Electrical inspection and testing in the UK is governed by several key pieces of legislation and standards:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Electricity at Work Regulations 1989 (EWR)</strong>
                <p className="mt-1">Legal requirement for electrical systems to be maintained to prevent danger.</p>
              </li>
              <li>
                <strong>BS 7671 Requirements for Electrical Installations (IET Wiring Regulations)</strong>
                <p className="mt-1">The primary standard for electrical installations in the UK, currently in its 18th Edition with Amendment 2.</p>
              </li>
              <li>
                <strong>Health and Safety at Work Act 1974</strong>
                <p className="mt-1">Places general duties on employers, employees and the self-employed to ensure workplace safety.</p>
              </li>
              <li>
                <strong>The Provision and Use of Work Equipment Regulations 1998 (PUWER)</strong>
                <p className="mt-1">Requires that equipment provided for use at work is suitable, maintained and inspected.</p>
              </li>
              <li>
                <strong>The Management of Health and Safety at Work Regulations 1999</strong>
                <p className="mt-1">Requires employers to assess and manage risks to their employees and others.</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">BS 7671 Requirements</h2>
            <p className="mb-4">
              BS 7671 contains specific requirements for inspection and testing in Chapter 64 (initial verification) and Chapter 65 (periodic inspection). Key requirements include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Initial Verification:</strong> Required before a new installation is put into service</li>
              <li><strong>Periodic Inspection:</strong> Required at specified intervals after installation</li>
              <li><strong>Documentation:</strong> Specific forms for recording inspection and test results</li>
              <li><strong>Certification:</strong> Requirements for issuing Electrical Installation Certificates (EIC), Electrical Installation Condition Reports (EICR), and Minor Electrical Installation Works Certificates (MEIWC)</li>
              <li><strong>Testing Methodology:</strong> Prescribed methods and sequences for conducting tests</li>
              <li><strong>Test Equipment:</strong> Requirements for accuracy and standards compliance</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Guidance Documents</h2>
            <p className="mb-4">
              Several guidance documents support the regulatory framework:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>IET Guidance Note 3: Inspection & Testing</strong>
                <p className="mt-1">Detailed guidance on the practical aspects of inspection and testing.</p>
              </li>
              <li>
                <strong>HSE Guidance HSG85: Electricity at work: Safe working practices</strong>
                <p className="mt-1">Guidance on safe working procedures for electrical work.</p>
              </li>
              <li>
                <strong>IET Code of Practice for In-service Inspection and Testing of Electrical Equipment</strong>
                <p className="mt-1">Guidance for portable appliance testing.</p>
              </li>
              <li>
                <strong>HSE Memorandum of Guidance on the Electricity at Work Regulations 1989</strong>
                <p className="mt-1">Official guidance on compliance with the EWR.</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Verification Process and Certification</h2>
            <p className="mb-4">
              The verification process results in the production of appropriate certification:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Electrical Installation Certificate (EIC)</strong>
                <p className="mt-1">For new installations, additions, or alterations.</p>
              </li>
              <li>
                <strong>Minor Electrical Installation Works Certificate (MEIWC)</strong>
                <p className="mt-1">For minor works that don't include a new circuit.</p>
              </li>
              <li>
                <strong>Electrical Installation Condition Report (EICR)</strong>
                <p className="mt-1">For periodic inspection of existing installations.</p>
              </li>
              <li>
                <strong>Schedule of Inspections</strong>
                <p className="mt-1">Records items inspected during verification.</p>
              </li>
              <li>
                <strong>Schedule of Test Results</strong>
                <p className="mt-1">Records the results of tests carried out during verification.</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Competence Requirements</h2>
            <p className="mb-4">
              Both the EWR and BS 7671 require that persons carrying out electrical work, including inspection and testing, are competent to do so:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Technical Knowledge:</strong> Understand the relevant standards and test methods</li>
              <li><strong>Practical Skills:</strong> Ability to use test equipment correctly and safely</li>
              <li><strong>Experience:</strong> Relevant experience in the type of installation being tested</li>
              <li><strong>Qualification:</strong> Appropriate qualifications demonstrating competence</li>
              <li><strong>Continuing Professional Development:</strong> Keeping knowledge up to date with changing regulations</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegulatoryFramework;
