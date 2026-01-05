
import React from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import ScienceSection from './ScienceSection';

const PracticalGuidanceSection = () => (
  <div className="space-y-4 sm:space-y-6">
    <ScienceSection />
    
    <div className="bg-green-500/10 border border-green-500/20 border-l-4 border-l-green-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-green-400">Practical Testing Techniques</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-foreground mb-2">Equipment Setup:</p>
            <div className="space-y-1 text-xs">
              <p>• Use calibrated insulation resistance tester</p>
              <p>• Check battery condition before testing</p>
              <p>• Ensure test leads are in good condition</p>
              <p>• Clean test probe tips for good contact</p>
              <p>• Select appropriate test voltage for circuit</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">Test Sequence:</p>
            <div className="space-y-1 text-xs">
              <p>• Start with Live-Earth test</p>
              <p>• Then test Neutral-Earth</p>
              <p>• Finally test Live-Neutral</p>
              <p>• Record all readings immediately</p>
              <p>• Note any unusual readings for investigation</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 border-l-4 border-l-blue-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-blue-400">Common Testing Scenarios</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">New Installation</p>
            <div className="space-y-1 text-xs">
              <p><strong>Expected:</strong> {'>'} 999MΩ all tests</p>
              <p><strong>Test voltage:</strong> 500V DC</p>
              <p><strong>Duration:</strong> 1 minute minimum</p>
              <p><strong>Action:</strong> If {'<'} 1MΩ, investigate</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Periodic Inspection</p>
            <div className="space-y-1 text-xs">
              <p><strong>Expected:</strong> {'>'} 1MΩ (new) / 0.5MΩ (existing)</p>
              <p><strong>Test voltage:</strong> 500V DC typical</p>
              <p><strong>Compare:</strong> Previous test results</p>
              <p><strong>Action:</strong> Investigate declining trends</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Fault Investigation</p>
            <div className="space-y-1 text-xs">
              <p><strong>Symptoms:</strong> RCD tripping, earth leakage</p>
              <p><strong>Method:</strong> Test individual circuits</p>
              <p><strong>Look for:</strong> Low or declining readings</p>
              <p><strong>Action:</strong> Isolate and repair faulty circuits</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 border-l-4 border-l-yellow-500 rounded-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 shrink-0" />
        <h4 className="text-base sm:text-lg font-semibold text-yellow-400">Troubleshooting Guide</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-card rounded p-4">
            <p className="font-medium text-yellow-400 mb-3">Common Problems and Solutions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-medium text-foreground mb-2">Problem: Reading Too Low</p>
                <div className="space-y-1">
                  <p><strong>Possible Causes:</strong></p>
                  <p>• Moisture ingress in cables/connections</p>
                  <p>• Damaged cable insulation</p>
                  <p>• Contaminated terminations</p>
                  <p>• Equipment not disconnected</p>
                  <p><strong>Solutions:</strong></p>
                  <p>• Allow time for moisture to evaporate</p>
                  <p>• Clean all terminations thoroughly</p>
                  <p>• Check all equipment is disconnected</p>
                  <p>• Test individual cable sections</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Problem: Inconsistent Readings</p>
                <div className="space-y-1">
                  <p><strong>Possible Causes:</strong></p>
                  <p>• Poor test lead connections</p>
                  <p>• Intermittent faults</p>
                  <p>• Temperature variations</p>
                  <p>• Parallel paths</p>
                  <p><strong>Solutions:</strong></p>
                  <p>• Ensure good contact at test points</p>
                  <p>• Repeat tests to confirm readings</p>
                  <p>• Check for parallel paths</p>
                  <p>• Consider environmental factors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Safety Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-foreground mb-2">Before Testing:</p>
            <div className="space-y-1 text-xs">
              <p>• Complete safe isolation procedure</p>
              <p>• Prove dead on all conductors</p>
              <p>• Disconnect all electronic equipment</p>
              <p>• Remove or isolate surge protection devices</p>
              <p>• Warn others of testing in progress</p>
            </div>
          </div>
          <div>
            <p className="font-medium text-foreground mb-2">During Testing:</p>
            <div className="space-y-1 text-xs">
              <p>• High voltage present during test</p>
              <p>• Ensure no one touches live parts</p>
              <p>• Discharge cables after testing</p>
              <p>• Be aware of capacitive effects</p>
              <p>• Stop testing if equipment overheats</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded p-3 mt-4">
          <p className="font-medium text-red-400 mb-2">Equipment That Must Be Disconnected:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>
              <p>• Electronic ballasts</p>
              <p>• LED drivers</p>
              <p>• Dimmer switches</p>
            </div>
            <div>
              <p>• Computer equipment</p>
              <p>• Electronic timers</p>
              <p>• Smart meters</p>
            </div>
            <div>
              <p>• Surge arresters</p>
              <p>• Capacitors</p>
              <p>• Electronic thermostats</p>
            </div>
            <div>
              <p>• Alarm systems</p>
              <p>• Emergency lighting</p>
              <p>• Fire detection systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
