
import React from 'react';
import { Target, Calculator } from 'lucide-react';
import TestConnectionDiagram from './TestConnectionDiagram';

const HowToTestSection = () => (
  <div className="space-y-4 sm:space-y-6">
    {/* Critical Equipment Warning */}
    <div className="bg-red-500/10 border-2 border-red-500/30 border-l-4 border-l-red-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-red-400">CRITICAL: Equipment Protection Warning</h4>
      </div>
      <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white leading-relaxed">
        <p className="font-medium text-foreground">The following MUST be disconnected before insulation testing or they WILL be destroyed by the 500V DC test voltage:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li><strong>Surge Protection Devices (SPDs)</strong> - disconnect or remove</li>
          <li><strong>Electronic equipment</strong> - computers, TVs, appliances</li>
          <li><strong>Dimmer switches</strong> - remove or isolate</li>
          <li><strong>LED drivers and control gear</strong></li>
          <li><strong>Smart devices and IoT equipment</strong></li>
          <li><strong>Photocell switches and timers</strong></li>
          <li><strong>RCDs</strong> - can be bridged out during testing</li>
        </ul>
        <p className="text-red-400 font-medium mt-2">Failure to disconnect these items will result in expensive equipment damage!</p>
      </div>
    </div>

    <TestConnectionDiagram />
    
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Complete Testing Procedure</h4>
      </div>
      <div className="space-y-3 text-sm text-white">
        <div className="flex gap-3">
          <div className="bg-purple-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
          <div>
            <p className="font-medium text-foreground">Safe Isolation</p>
            <p>Complete full safe isolation procedure and prove dead on all conductors</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
          <div>
            <p className="font-medium text-foreground">Disconnect Loads</p>
            <p>Remove all connected equipment, lamps, and electronic devices</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
          <div>
            <p className="font-medium text-foreground">Isolate Surge Protection</p>
            <p>Disconnect SPDs, capacitors, and any equipment that could be damaged</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
          <div>
            <p className="font-medium text-foreground">Test Voltage Selection</p>
            <p>Choose appropriate DC test voltage based on circuit nominal voltage</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
          <div>
            <p className="font-medium text-foreground">Perform Tests</p>
            <p>Test Live-Neutral, Live-Earth, and Neutral-Earth combinations</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="bg-purple-500 text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">6</div>
          <div>
            <p className="font-medium text-foreground">Record & Correct</p>
            <p>Record readings and apply temperature correction if required</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Test Voltage Selection Guide</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="border border-blue-400 p-3 rounded">
          <div className="text-blue-400 font-medium mb-1">250V DC</div>
          <div className="text-white">
            <p>SELV circuits</p>
            <p>Telecommunications</p>
            <p>Up to 50V nominal</p>
          </div>
        </div>
        <div className="border border-green-400 p-3 rounded">
          <div className="text-green-400 font-medium mb-1">500V DC</div>
          <div className="text-white">
            <p>LV installations</p>
            <p>50V to 500V</p>
            <p>Most common choice</p>
          </div>
        </div>
        <div className="border border-orange-400 p-3 rounded">
          <div className="text-orange-400 font-medium mb-1">1000V DC</div>
          <div className="text-white">
            <p>HV installations</p>
            <p>500V to 1000V</p>
            <p>Industrial systems</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HowToTestSection;
