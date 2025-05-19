
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const InspectionMethodology = () => {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Inspection Methodology | ElecMate</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Inspection Methodology</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Inspection Planning & Preparation</h2>
            <p className="mb-4">
              Effective inspection requires thorough planning and preparation before arriving on site. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reviewing previous certificates and reports (if available)</li>
              <li>Understanding the installation type and its intended use</li>
              <li>Identifying special locations or installations requiring specific attention</li>
              <li>Preparing appropriate documentation and schedules</li>
              <li>Ensuring all test equipment is calibrated and functioning correctly</li>
              <li>Determining the extent and limitations of the inspection</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Visual Inspection Methodology</h2>
            <p className="mb-4">
              Visual inspection is a critical component of electrical inspection and should follow a systematic approach:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Intake Position:</strong> Main intake equipment, earthing arrangements, and consumer unit</li>
              <li><strong>Distribution Boards:</strong> Condition, identification, accessibility, and security</li>
              <li><strong>Circuits:</strong> Working from distribution boards outwards to final circuits</li>
              <li><strong>Wiring Systems:</strong> Condition, installation method, and support</li>
              <li><strong>Accessories:</strong> Condition, suitability, and fixing</li>
              <li><strong>Special Locations:</strong> Additional requirements for bathrooms, outdoor areas, etc.</li>
            </ul>
            <p className="mt-4">
              Visual inspection must be completed before any testing commences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Key Inspection Checks</h2>
            <p className="mb-4">
              The following must be addressed during inspection:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Presence of fire barriers and protection from thermal effects</li>
              <li>Cable selection for current-carrying capacity and voltage drop</li>
              <li>Connection and fixing of wiring systems</li>
              <li>Accessibility of equipment for operation and maintenance</li>
              <li>Identification and labelling of protective devices, switches, and terminals</li>
              <li>Presence of appropriate devices for isolation and switching</li>
              <li>Protection against electric shock (basic and fault protection)</li>
              <li>Protection against overcurrent</li>
              <li>Presence of undervoltage protective devices where required</li>
              <li>Selection and erection in relation to external influences</li>
              <li>Prevention of harmful influences between electrical and non-electrical installations</li>
              <li>Adequacy of protective conductor sizing</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Inspection Sampling</h2>
            <p className="mb-4">
              For large installations, sampling may be necessary:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Initial Verification:</strong> 100% inspection where practical</li>
              <li><strong>Periodic Inspection:</strong> Representative sampling based on the age, condition, and previous history</li>
              <li>Sample size should be statistically significant (10-20% depending on installation size)</li>
              <li>Increased sampling if defects are found</li>
              <li>All sampling decisions must be recorded in the report</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Recording of Inspection Results</h2>
            <p className="mb-4">
              Detailed records must be maintained throughout the inspection process:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Schedules for both inspection and testing</li>
              <li>Clear identification of locations inspected</li>
              <li>Detailed descriptions of any defects found</li>
              <li>Classification of defects (C1, C2, C3 for periodic inspection)</li>
              <li>Photographic evidence where appropriate</li>
              <li>Legible and comprehensive documentation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InspectionMethodology;
