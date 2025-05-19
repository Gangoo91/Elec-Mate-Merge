import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet";

const SafeIsolation = () => {
  return (
    <div className="container mx-auto py-8">
      <Helmet>
        <title>Safe Isolation Procedures | ElecMate</title>
      </Helmet>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Safe Isolation Procedures</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Introduction to Safe Isolation</h2>
            <p className="mb-4">
              Safe isolation is a fundamental procedure for all electrical work, ensuring that electrical equipment is safely disconnected from the power supply before work commences. This critical safety practice is essential for preventing electrical accidents, injuries, and fatalities in the workplace.
            </p>
            <p className="mb-4">
              In the UK, safe isolation procedures are governed by regulations including the Electricity at Work Regulations 1989 and guidance provided by the Health and Safety Executive (HSE).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Key Safe Isolation Equipment</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Approved voltage indicator (AVI)</li>
              <li>Proving unit</li>
              <li>Locking off devices (MCB locks, hasp and staple, etc.)</li>
              <li>Warning notices and tags</li>
              <li>Padlocks with unique keys</li>
              <li>Insulated tools</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Safe Isolation Procedure</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Risk Assessment</strong>
                <p>Carry out a risk assessment before undertaking any electrical work.</p>
              </li>
              <li>
                <strong>Identify the Circuit</strong>
                <p>Correctly identify the circuit or equipment to be isolated.</p>
              </li>
              <li>
                <strong>Inform All Affected Persons</strong>
                <p>Communicate with relevant people who may be affected by the isolation.</p>
              </li>
              <li>
                <strong>Isolation</strong>
                <p>Switch off and isolate the identified circuit from all sources of electrical supply.</p>
              </li>
              <li>
                <strong>Secure the Isolation</strong>
                <p>Apply locking devices and/or warning tags with your name, contact details, and estimated completion time.</p>
              </li>
              <li>
                <strong>Verify the Isolation</strong>
                <ul className="list-disc pl-5 mt-2">
                  <li>Test the approved voltage indicator against a known voltage source or proving unit.</li>
                  <li>Use the voltage indicator to verify the circuit is dead.</li>
                  <li>Re-test the voltage indicator against the proving unit to confirm it's still functioning correctly.</li>
                </ul>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Common Safe Isolation Failures</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Inadequate locking off procedures</li>
              <li>Failure to verify isolation using proper equipment</li>
              <li>Not checking that the voltage indicator is working correctly</li>
              <li>Working on the wrong circuit due to incorrect identification</li>
              <li>Removing locks or warnings placed by others</li>
              <li>Inadequate communication with others affected by the isolation</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Special Considerations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Multiple Supplies:</strong> Ensure all potential sources of supply are isolated.</li>
              <li><strong>Residual Energy:</strong> Discharge capacitors and other components that may store energy.</li>
              <li><strong>Backup Supplies:</strong> Be aware of UPS systems, generators, and other alternative power sources.</li>
              <li><strong>Distributed Systems:</strong> Isolation points may be located in different areas.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafeIsolation;
