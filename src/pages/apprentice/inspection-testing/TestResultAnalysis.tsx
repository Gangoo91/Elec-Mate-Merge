
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
            <h2 className="text-xl font-semibold mb-4">Interpreting Continuity Test Results</h2>
            <p className="mb-4">
              Continuity tests measure the resistance of conductors and connections:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Protective Conductor Continuity:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Low readings (typically less than 1Ω) indicate good continuity</li>
                  <li>Results must be consistent with conductor length and cross-sectional area</li>
                  <li>Formula for expected resistance: R = ρL/A (where ρ is resistivity, L is length, A is cross-sectional area)</li>
                  <li>Higher than expected readings may indicate poor connections or incorrect conductor size</li>
                </ul>
              </li>
              <li><strong>Ring Final Circuit Continuity:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>R1 + R2 should approximately equal R1+2 (end to end plus cross connection)</li>
                  <li>Significant variations indicate possible interconnections or broken conductors</li>
                  <li>Highest resistance values typically at the furthest socket from the origin</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Interpreting Insulation Resistance Results</h2>
            <p className="mb-4">
              Insulation resistance tests measure the resistance between conductors and between conductors and earth:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Minimum acceptable values:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>SELV and PELV circuits: ≥ 0.5 MΩ</li>
                  <li>Up to 500V including FELV: ≥ 1.0 MΩ</li>
                  <li>Over 500V: ≥ 1.0 MΩ</li>
                </ul>
              </li>
              <li><strong>Interpreting results:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Values significantly above minimum indicate good insulation</li>
                  <li>Values close to minimum may indicate aging or contaminated insulation</li>
                  <li>Values below minimum indicate insulation failure requiring investigation</li>
                  <li>Declining values over time in periodic testing indicate deteriorating insulation</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Interpreting Earth Fault Loop Impedance Results</h2>
            <p className="mb-4">
              Earth fault loop impedance (Zs) tests measure the impedance of the earth fault current path:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Maximum Zs values:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Determined by the characteristics of the protective device</li>
                  <li>Found in Tables 41.2 to 41.5 of BS 7671</li>
                </ul>
              </li>
              <li><strong>Interpreting results:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Measured Zs must not exceed maximum permitted Zs for the protective device</li>
                  <li>High Zs values may indicate poor connections, undersized conductors, or excessive circuit length</li>
                  <li>For circuits protected by RCDs, higher Zs values may be acceptable</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Interpreting RCD Test Results</h2>
            <p className="mb-4">
              RCD tests verify the correct operation of residual current devices:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Operating times:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>General purpose RCDs (Type AC/A): 300ms at IΔn, 150ms at 2IΔn, 40ms at 5IΔn</li>
                  <li>Type S (selective) RCDs: 500ms at IΔn, 200ms at 2IΔn, 150ms at 5IΔn</li>
                  <li>RCDs for additional protection (socket outlets): 40ms at 5IΔn</li>
                </ul>
              </li>
              <li><strong>Interpreting results:</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Operating times exceeding maximum values indicate faulty RCDs requiring replacement</li>
                  <li>RCDs that fail to trip at IΔn are not compliant</li>
                  <li>RCDs that trip below 50% of IΔn may indicate earth leakage problems</li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Condition Reporting</h2>
            <p className="mb-4">
              For periodic inspection, test results contribute to the overall condition code:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Code C1 (Danger present):</strong>
                <p className="mt-1">Where test results indicate immediate danger requiring immediate remedial action.</p>
                <p className="mt-1">Examples: Exposed live parts, absence of earthing, insulation resistance below minimum values.</p>
              </li>
              <li><strong>Code C2 (Potentially dangerous):</strong>
                <p className="mt-1">Where test results indicate potential danger requiring urgent remedial action.</p>
                <p className="mt-1">Examples: High earth loop impedance values, RCD operating times exceeding maximum values.</p>
              </li>
              <li><strong>Code C3 (Improvement recommended):</strong>
                <p className="mt-1">Where test results do not comply with current regulations but are not dangerous.</p>
                <p className="mt-1">Examples: Declining insulation resistance values still above minimum, minor deviations from current standards.</p>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Common Testing Problems and Solutions</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Erratic insulation resistance readings:</strong>
                <p className="mt-1">May be due to parallel paths, connected equipment, or surge protection devices. Disconnect equipment or SPDs and retest.</p>
              </li>
              <li><strong>Inconsistent continuity readings:</strong>
                <p className="mt-1">Check for loose connections, corrosion, or parallel paths. Ensure good test lead contact.</p>
              </li>
              <li><strong>High earth loop impedance:</strong>
                <p className="mt-1">Check for loose connections, undersized conductors, or excessive circuit length. Verify test instrument operation.</p>
              </li>
              <li><strong>RCD nuisance tripping:</strong>
                <p className="mt-1">Check for earth leakage currents, faulty equipment, or damp conditions causing leakage.</p>
              </li>
              <li><strong>Zero or very low insulation resistance:</strong>
                <p className="mt-1">Indicates serious insulation failure. Investigate for damaged cables, water ingress, or conductive contamination.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestResultAnalysis;
