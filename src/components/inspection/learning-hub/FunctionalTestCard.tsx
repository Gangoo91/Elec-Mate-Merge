
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Settings, CheckCircle2, AlertTriangle, Clock, Shield, Target, Wrench, BookOpen, Users } from 'lucide-react';

import FunctionalTestProcedureCard from './functional-testing/FunctionalTestProcedureCard';
import WhyTestSection from './functional-testing/WhyTestSection';
import HowToTestSection from './functional-testing/HowToTestSection';
import EquipmentSection from './functional-testing/EquipmentSection';
import PracticalGuidanceSection from './functional-testing/PracticalGuidanceSection';
import RegulationRequirementsSection from './functional-testing/RegulationRequirementsSection';

const FunctionalTestCard = () => {
  const smartTabs = [
    {
      value: "why-test",
      label: "Why Test?",
      content: <WhyTestSection />
    },
    {
      value: "how-test", 
      label: "How to Test",
      content: <HowToTestSection />
    },
    {
      value: "equipment",
      label: "Equipment",
      content: <EquipmentSection />
    },
    {
      value: "guidance",
      label: "Practical Guide", 
      content: <PracticalGuidanceSection />
    },
    {
      value: "regulations",
      label: "Regulations",
      content: <RegulationRequirementsSection />
    },
    {
      value: "examples",
      label: "Examples",
      content: (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Real-World Testing Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Domestic Example */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-400" />
                    Domestic Consumer Unit
                  </h4>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h6 className="font-medium text-blue-400 mb-2">Scenario</h6>
                    <p className="text-sm mb-3">
                      Testing RCD protection in a domestic consumer unit during EICR
                    </p>
                    <h6 className="font-medium text-foreground mb-2">Expected Results</h6>
                    <ul className="text-xs space-y-1 mb-3">
                      <li>• RCD test button causes immediate tripping</li>
                      <li>• All RCD-protected circuits lose power</li>
                      <li>• RCD resets cleanly after test</li>
                      <li>• No damage to connected equipment</li>
                    </ul>
                    <h6 className="font-medium text-amber-400 mb-2">Common Issues</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Test button stiff or unresponsive</li>
                      <li>• RCD fails to trip - internal fault</li>
                      <li>• Nuisance tripping after test</li>
                      <li>• Will not reset - mechanical problem</li>
                    </ul>
                  </div>
                </div>

                {/* Industrial Example */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Target className="h-4 w-4 text-red-400" />
                    Industrial Emergency Stop
                  </h4>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h6 className="font-medium text-red-400 mb-2">Scenario</h6>
                    <p className="text-sm mb-3">
                      Testing emergency stop system on packaging machinery
                    </p>
                    <h6 className="font-medium text-foreground mb-2">Expected Results</h6>
                    <ul className="text-xs space-y-1 mb-3">
                      <li>• All machinery stops immediately</li>
                      <li>• Conveyor systems halt safely</li>
                      <li>• Status lights indicate emergency state</li>
                      <li>• Cannot restart without manual reset</li>
                    </ul>
                    <h6 className="font-medium text-amber-400 mb-2">Troubleshooting</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Partial stop: Check contactor operation</li>
                      <li>• Delayed stop: Review circuit design</li>
                      <li>• Won't reset: Check safety interlocks</li>
                      <li>• False trips: Investigate vibration/EMI</li>
                    </ul>
                  </div>
                </div>

                {/* Commercial Example */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    Commercial Switchgear
                  </h4>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <h6 className="font-medium text-green-400 mb-2">Scenario</h6>
                    <p className="text-sm mb-3">
                      Testing main switchboard controls in office building
                    </p>
                    <h6 className="font-medium text-foreground mb-2">Test Sequence</h6>
                    <ul className="text-xs space-y-1 mb-3">
                      <li>• Test main isolator operation</li>
                      <li>• Check automatic transfer switch</li>
                      <li>• Verify fire alarm electrical isolation</li>
                      <li>• Test emergency lighting controls</li>
                    </ul>
                    <h6 className="font-medium text-blue-400 mb-2">Coordination Required</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Building management notification</li>
                      <li>• Tenant disruption scheduling</li>
                      <li>• Fire alarm company coordination</li>
                      <li>• Lift engineer involvement</li>
                    </ul>
                  </div>
                </div>

                {/* Data Centre Example */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-purple-400" />
                    Data Centre UPS
                  </h4>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <h6 className="font-medium text-purple-400 mb-2">Scenario</h6>
                    <p className="text-sm mb-3">
                      Testing emergency power off (EPO) system in data centre
                    </p>
                    <h6 className="font-medium text-foreground mb-2">Critical Considerations</h6>
                    <ul className="text-xs space-y-1 mb-3">
                      <li>• Coordinate with IT operations team</li>
                      <li>• Schedule during maintenance window</li>
                      <li>• Ensure backup systems ready</li>
                      <li>• Have recovery procedures prepared</li>
                    </ul>
                    <h6 className="font-medium text-red-400 mb-2">High Risk Factors</h6>
                    <ul className="text-xs space-y-1">
                      <li>• Data loss if systems crash</li>
                      <li>• Extended downtime costs</li>
                      <li>• Customer SLA breaches</li>
                      <li>• Hardware damage from improper shutdown</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Key Learning Points
                </h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Every site has unique functional testing requirements</li>
                  <li>• Coordination and communication are essential for safety</li>
                  <li>• Understanding system operation prevents costly mistakes</li>
                  <li>• Documentation helps track equipment condition over time</li>
                  <li>• Regular testing prevents dangerous failures when systems are needed most</li>
                </ul>
              </div>
            </CardContent>
          </Card>
      )
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Settings className="h-6 w-6 sm:h-7 sm:w-7 text-green-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Functional Testing</h1>
          <p className="text-sm sm:text-base text-gray-300">BS 7671 Regulation 612.13 - Testing operation and functionality</p>
        </div>
      </div>

      <FunctionalTestProcedureCard />

      <SmartTabs 
        tabs={smartTabs}
        defaultValue="why-test"
        className="w-full"
        breakpoint={4}
      />
    </div>
  );
};

export default FunctionalTestCard;
