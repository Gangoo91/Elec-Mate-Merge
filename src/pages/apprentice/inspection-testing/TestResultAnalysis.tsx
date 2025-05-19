
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const TestResultAnalysis = () => {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Test Result Analysis | ElecMate</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Test Result Analysis</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Interpreting Test Results</h2>
            <p className="mb-4">
              Analysing test results requires understanding the expected values and recognising when measurements indicate a potential issue. For each test, there are specific parameters that determine whether an installation is compliant with BS 7671.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Continuity Test Results</h2>
            <p className="mb-4">
              When analysing continuity test results:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>R1+R2 values:</strong> Should be consistent with the calculated value based on cable length and cross-sectional area.</li>
              <li><strong>Main bonding conductor resistance:</strong> Should typically be below 0.05Ω.</li>
              <li><strong>Supplementary bonding conductor resistance:</strong> Should meet the requirements of regulation 415.2.</li>
              <li><strong>Ring circuit continuity:</strong> Values should be consistent and indicate an intact ring with no interconnections.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Insulation Resistance Results</h2>
            <p className="mb-4">
              Minimum acceptable values as per BS 7671:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>SELV and PELV circuits:</strong> ≥ 0.5MΩ (test voltage 250V DC)</li>
              <li><strong>Up to 500V including FELV:</strong> ≥ 1.0MΩ (test voltage 500V DC)</li>
              <li><strong>Over 500V:</strong> ≥ 1.0MΩ (test voltage 1000V DC)</li>
            </ul>
            <p className="mt-4">
              Lower than expected values may indicate:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Damaged insulation</li>
              <li>Moisture ingress</li>
              <li>Connected loads that should be disconnected during testing</li>
              <li>Installation faults such as trapped conductors</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Earth Fault Loop Impedance Results</h2>
            <p className="mb-4">
              When analysing loop impedance (Zs) results:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Measured values must be less than or equal to the tabulated maximum values in BS 7671.</li>
              <li>Values depend on the type and rating of the protective device.</li>
              <li>Higher than expected values may indicate:
                <ul className="list-disc pl-5 mt-2">
                  <li>Poor connections</li>
                  <li>Incorrect cable sizing</li>
                  <li>Excessive cable length</li>
                  <li>Measurement during supply variations</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">RCD Test Results</h2>
            <p className="mb-4">
              For RCD testing:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Trip time at 1× rating:</strong> Should not exceed 300ms for general type RCDs.</li>
              <li><strong>Trip time at 5× rating:</strong> Should not exceed 40ms for general type RCDs.</li>
              <li><strong>Type S (time-delayed) RCDs:</strong> Should not trip below 130ms and should trip before 500ms at 1× rating.</li>
              <li>If an RCD fails to trip within specified times, it must be replaced.</li>
              <li>If an RCD trips too quickly (Type S), it may not be suitable for the installation.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestResultAnalysis;
