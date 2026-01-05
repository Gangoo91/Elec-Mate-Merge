
import React from 'react';
import { Zap, TestTube2 } from 'lucide-react';
import TestConnectionDiagram from '../insulation-testing/TestConnectionDiagram';

const HowToTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <div className="bg-purple-500/10 border border-purple-500/20 border-l-4 border-l-purple-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <TestTube2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-purple-400">Dead Testing Method (Preferred)</h4>
      </div>
      <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed">
        <div>
          <p className="font-medium text-foreground">Step 1: Isolate the circuit safely</p>
          <p className="ml-4">Turn off protective device and prove dead with voltage indicator</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 2: Test continuity</p>
          <p className="ml-4">Connect continuity tester between phase at origin and switched contacts</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 3: Verify connections</p>
          <p className="ml-4">Ensure continuity exists only when testing phase to phase connections</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 4: Check all outlets</p>
          <p className="ml-4">Test socket outlets, light switches, and isolator switches</p>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 border-l-4 border-l-orange-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-orange-400">Live Testing Method (When Required)</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Step 1: Use approved voltage indicator</p>
          <p className="ml-4">GS38 compliant tester with appropriate PPE</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 2: Test phase presence</p>
          <p className="ml-4">Confirm phase conductor at all socket outlets and switch positions</p>
        </div>
        <div>
          <p className="font-medium text-foreground">Step 3: Safety precautions</p>
          <p className="ml-4">Extra care - working on live circuits increases risk</p>
        </div>
      </div>
    </div>

    <TestConnectionDiagram />
  </div>
);

export default HowToTestSection;
