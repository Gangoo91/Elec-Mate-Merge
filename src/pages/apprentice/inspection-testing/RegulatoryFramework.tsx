
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
              <li><strong>BS 7671</strong> - Requirements for Electrical Installations (IET Wiring Regulations)</li>
              <li><strong>Electricity at Work Regulations 1989</strong> - Legal framework requiring electrical systems to be maintained to prevent danger</li>
              <li><strong>Electricity Safety, Quality and Continuity Regulations 2002</strong> - Governs the supply and safety of electricity to consumers</li>
              <li><strong>Health and Safety at Work Act 1974</strong> - Broad legislation placing duties on employers to ensure safety</li>
              <li><strong>The Management of Health and Safety at Work Regulations 1999</strong> - Requires risk assessment for work activities</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">BS 7671 Requirements</h2>
            <p className="mb-4">
              The IET Wiring Regulations (BS 7671) are the national standard for electrical installations in the UK. Key sections related to inspection and testing include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Part 6</strong> - Inspection and Testing</li>
              <li><strong>Section 641</strong> - Initial Verification</li>
              <li><strong>Section 642</strong> - Periodic Inspection and Testing</li>
              <li><strong>Section 643</strong> - Testing</li>
              <li><strong>Appendix 6</strong> - Model Forms for Certification and Reporting</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Guidance Documents</h2>
            <p className="mb-4">
              Several guidance documents provide practical advice on implementing the regulations:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>IET Guidance Note 3</strong> - Inspection & Testing</li>
              <li><strong>HSE HSG85</strong> - Electricity at Work: Safe Working Practices</li>
              <li><strong>HSE HSG141</strong> - Electrical Safety on Construction Sites</li>
              <li><strong>IET Code of Practice</strong> - In-service Inspection and Testing of Electrical Equipment</li>
              <li><strong>ECA/NICEIC/SELECT</strong> - Guidance on Safe Isolation Procedures</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Competency Requirements</h2>
            <p className="mb-4">
              The regulations require that persons undertaking inspection and testing must be competent:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Adequate knowledge and experience for the nature of the work</li>
              <li>Understanding of the installation being inspected and tested</li>
              <li>Knowledge of relevant standards and regulations</li>
              <li>Ability to identify departures from requirements</li>
              <li>Understanding of test methods and test results</li>
              <li>Ability to safely use appropriate test equipment</li>
            </ul>
            <p className="mt-4">
              Evidence of competence may include appropriate qualifications such as City & Guilds 2391, 2394, 2395 or equivalent.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegulatoryFramework;
