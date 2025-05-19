
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const TestingPrinciples = () => {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Testing Principles | ElecMate</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Testing Principles</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Fundamental Testing Principles</h2>
            <p className="mb-4">
              Electrical testing is conducted to verify that an installation meets the requirements for safety and functionality. All tests must be performed following completion of visual inspection and with the appropriate test equipment.
            </p>
            <p className="mb-4">
              The key principles that guide electrical testing include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tests must be performed in the correct sequence</li>
              <li>All test equipment must be calibrated and appropriate for the test</li>
              <li>Tests must be performed by competent persons</li>
              <li>Testing must not create danger to persons, livestock, or property</li>
              <li>Precautions must be taken to prevent damage to equipment connected to the installation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Test Sequence</h2>
            <p className="mb-4">
              Tests should be conducted in the following sequence to ensure safety and accuracy:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li><strong>Continuity of protective conductors</strong> including main and supplementary bonding</li>
              <li><strong>Continuity of ring final circuit conductors</strong></li>
              <li><strong>Insulation resistance</strong></li>
              <li><strong>Protection by SELV, PELV or electrical separation</strong></li>
              <li><strong>Protection by barriers or enclosures provided during erection</strong></li>
              <li><strong>Insulation of non-conducting floors and walls</strong></li>
              <li><strong>Polarity</strong></li>
              <li><strong>Earth electrode resistance</strong></li>
              <li><strong>Earth fault loop impedance</strong></li>
              <li><strong>Additional protection (RCD testing)</strong></li>
              <li><strong>Phase sequence</strong></li>
              <li><strong>Functional testing</strong></li>
              <li><strong>Voltage drop</strong> (where required)</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Instrument Selection</h2>
            <p className="mb-4">
              Test instruments must comply with the relevant parts of BS EN 61557. The following instruments are typically required:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Low resistance ohmmeter</strong> - For continuity testing</li>
              <li><strong>Insulation resistance tester</strong> - Capable of providing 250V, 500V, and 1000V test voltages</li>
              <li><strong>Earth fault loop impedance tester</strong> - For measuring Zs values</li>
              <li><strong>RCD tester</strong> - Capable of testing various RCD types and ratings</li>
              <li><strong>Earth electrode resistance tester</strong> - For measuring Ra values</li>
              <li><strong>Phase sequence indicator</strong> - For three-phase installations</li>
              <li><strong>Voltage indicator</strong> - For checking polarity and supply voltages</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Continuity Testing</h2>
            <p className="mb-4">
              Continuity tests verify the integrity of protective conductors and circuit conductors:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Protective Conductor Continuity</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Test between main earthing terminal and all exposed conductive parts</li>
                  <li>Typical readings below 0.5 ohms (depends on cable length and CSA)</li>
                  <li>Test current: minimum 200mA</li>
                </ul>
              </li>
              <li><strong>Ring Final Circuit Continuity</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>End-to-end testing to confirm integrity of the ring</li>
                  <li>Testing of L-L, N-N and CPC-CPC</li>
                  <li>Cross-checking calculations to identify interconnections or breaks</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Insulation Resistance Testing</h2>
            <p className="mb-4">
              Insulation resistance tests verify the condition of insulation between live conductors and between live conductors and earth:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Test Voltages:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>SELV and PELV circuits: 250V DC</li>
                  <li>Up to 500V installations: 500V DC</li>
                  <li>Over 500V installations: 1000V DC</li>
                </ul>
              </li>
              <li><strong>Minimum Acceptable Values:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>SELV and PELV circuits: ≥ 0.5 MΩ</li>
                  <li>Up to 500V including FELV: ≥ 1.0 MΩ</li>
                  <li>Over 500V: ≥ 1.0 MΩ</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestingPrinciples;
