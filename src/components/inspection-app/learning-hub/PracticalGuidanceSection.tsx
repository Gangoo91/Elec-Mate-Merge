
import React from 'react';
import { Wrench, AlertTriangle, CheckCircle2, Lightbulb, Target, Shield, Clock, TrendingUp, Search, FileText } from 'lucide-react';
import ScienceSection from './insulation-testing/ScienceSection';

const PracticalGuidanceSection = () => (
  <div className="space-y-6">
    <ScienceSection />
    
    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Practical Testing Techniques</h4>
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

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle2 className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Common Testing Scenarios</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">New Installation</p>
            <div className="space-y-1 text-xs">
              <p><strong>Expected:</strong> {'>'} 999MΩ all tests</p>
              <p><strong>Test voltage:</strong> 500V DC</p>
              <p><strong>Duration:</strong> 1 minute minimum</p>
              <p><strong>Action:</strong> If {'<'} 2MΩ, investigate</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Periodic Inspection</p>
            <div className="space-y-1 text-xs">
              <p><strong>Expected:</strong> {'>'} 1MΩ minimum</p>
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

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Advanced Testing Strategies</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Sequential Testing Method:</p>
            <div className="space-y-1 text-xs">
              <p>• Test complete installation first</p>
              <p>• If low reading, test individual circuits</p>
              <p>• Isolate faulty circuit using binary search</p>
              <p>• Test individual cable runs if needed</p>
              <p>• Document all intermediate readings</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-purple-400 mb-2">Trending Analysis:</p>
            <div className="space-y-1 text-xs">
              <p>• Compare with previous test results</p>
              <p>• Calculate percentage change over time</p>
              <p>• Look for consistent declining trends</p>
              <p>• Consider environmental factors</p>
              <p>• Plan preventive maintenance actions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Time-Based Testing Considerations</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Absorption Effects:</p>
            <div className="space-y-1 text-xs">
              <p>• Initial reading may be low</p>
              <p>• Resistance increases with time</p>
              <p>• Stabilisation typically 15-60 seconds</p>
              <p>• Record final stable reading</p>
              <p>• Note absorption characteristics</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Polarisation Index:</p>
            <div className="space-y-1 text-xs">
              <p>• R₁₀ₘᵢₙ / R₁ₘᵢₙ ratio</p>
              <p>• Good insulation: PI {'>'} 2.0</p>
              <p>• Questionable: PI 1.0-2.0</p>
              <p>• Poor insulation: PI {'<'} 1.0</p>
              <p>• Useful for condition assessment</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-cyan-400 mb-2">Dielectric Absorption:</p>
            <div className="space-y-1 text-xs">
              <p>• Time-dependent behaviour</p>
              <p>• Indicates insulation quality</p>
              <p>• Good insulation shows steady increase</p>
              <p>• Poor insulation remains constant</p>
              <p>• Useful diagnostic tool</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Search className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Enhanced Troubleshooting Guide</h4>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-card rounded p-4">
            <p className="font-medium text-yellow-400 mb-3">Systematic Problem Diagnosis:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div>
                <p className="font-medium text-foreground mb-2">Reading {'<'} 1.0MΩ (Unacceptable)</p>
                <div className="space-y-2">
                  <div>
                    <p><strong>Step 1 - Initial Checks:</strong></p>
                    <div className="ml-2 space-y-0.5">
                      <p>• Verify test voltage selection (500V for LV)</p>
                      <p>• Check all equipment disconnected</p>
                      <p>• Ensure good test lead connections</p>
                      <p>• Confirm circuit is de-energised</p>
                    </div>
                  </div>
                  <div>
                    <p><strong>Step 2 - Environmental Assessment:</strong></p>
                    <div className="ml-2 space-y-0.5">
                      <p>• Check for visible moisture/condensation</p>
                      <p>• Record ambient temperature and humidity</p>
                      <p>• Look for contamination on terminations</p>
                      <p>• Assess recent weather conditions</p>
                    </div>
                  </div>
                  <div>
                    <p><strong>Step 3 - Circuit Isolation:</strong></p>
                    <div className="ml-2 space-y-0.5">
                      <p>• Test individual circuit sections</p>
                      <p>• Isolate at distribution boards</p>
                      <p>• Check for parallel paths</p>
                      <p>• Test at cable drum if new installation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium text-foreground mb-2">Reading 1.0-2.0MΩ (Investigation Required)</p>
                <div className="space-y-2">
                  <div>
                    <p><strong>Assessment Criteria:</strong></p>
                    <div className="ml-2 space-y-0.5">
                      <p>• Installation age and type</p>
                      <p>• Environmental exposure level</p>
                      <p>• Previous test result history</p>
                      <p>• Installation conditions</p>
                    </div>
                  </div>
                  <div>
                    <p><strong>Additional Tests:</strong></p>
                    <div className="ml-2 space-y-0.5">
                      <p>• Repeat test after moisture removal</p>
                      <p>• Check temperature correction factor</p>
                      <p>• Test with higher voltage if appropriate</p>
                      <p>• Measure polarisation index</p>
                    </div>
                  </div>
                  <div>
                    <p><strong>Professional Judgement:</strong></p>
                    <div className="ml-2 space-y-0.5">
                      <p>• Consider acceptance with monitoring</p>
                      <p>• Document decision rationale</p>
                      <p>• Set review intervals</p>
                      <p>• Recommend improvements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded p-4">
          <p className="font-medium text-yellow-400 mb-3">Common Fault Scenarios and Solutions:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-2">Moisture-Related Issues</p>
              <div className="space-y-1">
                <p><strong>Symptoms:</strong></p>
                <p>• Low readings improve over time</p>
                <p>• Weather-dependent variations</p>
                <p>• Surface leakage paths visible</p>
                <p><strong>Solutions:</strong></p>
                <p>• Allow drying time</p>
                <p>• Clean terminations</p>
                <p>• Improve IP rating</p>
                <p>• Apply protective coatings</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Cable Degradation</p>
              <div className="space-y-1">
                <p><strong>Symptoms:</strong></p>
                <p>• Consistently declining readings</p>
                <p>• Age-related deterioration</p>
                <p>• Physical damage visible</p>
                <p><strong>Solutions:</strong></p>
                <p>• Section testing to locate fault</p>
                <p>• Cable replacement if necessary</p>
                <p>• Improved installation methods</p>
                <p>• Environmental protection</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Installation Errors</p>
              <div className="space-y-1">
                <p><strong>Symptoms:</strong></p>
                <p>• Equipment still connected</p>
                <p>• Incorrect test setup</p>
                <p>• Parallel circuit paths</p>
                <p><strong>Solutions:</strong></p>
                <p>• Verify complete isolation</p>
                <p>• Check test configuration</p>
                <p>• Identify all circuit paths</p>
                <p>• Repeat tests systematically</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-indigo-400" />
        <h4 className="font-medium text-indigo-400">Professional Best Practices</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">Documentation Standards:</p>
            <div className="space-y-1 text-xs">
              <p>• Record test voltage used</p>
              <p>• Note ambient temperature</p>
              <p>• Apply temperature corrections</p>
              <p>• Document equipment used</p>
              <p>• Include calibration dates</p>
              <p>• Photograph problem areas</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-indigo-400 mb-2">Quality Assurance:</p>
            <div className="space-y-1 text-xs">
              <p>• Verify equipment calibration</p>
              <p>• Cross-check suspicious readings</p>
              <p>• Use multiple test methods when needed</p>
              <p>• Compare with design expectations</p>
              <p>• Peer review critical results</p>
              <p>• Follow company procedures</p>
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

    <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-teal-400" />
        <h4 className="font-medium text-teal-400">Regulatory Compliance</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">BS 7671 Requirements:</p>
            <div className="space-y-1 text-xs">
              <p>• Regulation 612.3 compliance</p>
              <p>• Minimum 1.0MΩ for LV installations</p>
              <p>• 0.5MΩ only for SELV circuits</p>
              <p>• Temperature correction required</p>
              <p>• Proper test voltage selection</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">Test Certificate Requirements:</p>
            <div className="space-y-1 text-xs">
              <p>• Record all test results</p>
              <p>• Include temperature corrections</p>
              <p>• Note test voltage used</p>
              <p>• Document any limitations</p>
              <p>• Sign and date certificates</p>
            </div>
          </div>
          <div className="bg-card rounded p-3">
            <p className="font-medium text-teal-400 mb-2">Quality Standards:</p>
            <div className="space-y-1 text-xs">
              <p>• Use calibrated equipment</p>
              <p>• Follow manufacturer instructions</p>
              <p>• Apply appropriate safety measures</p>
              <p>• Maintain competency records</p>
              <p>• Regular training updates</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-emerald-400" />
        <h4 className="font-medium text-emerald-400">Investigation Report Template</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="bg-card rounded p-4">
          <p className="font-medium text-emerald-400 mb-2">When readings are 1.0-2.0MΩ, document:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Test Details:</p>
              <p>• Measured value: ___ MΩ</p>
              <p>• Test voltage: ___ V DC</p>
              <p>• Temperature: ___ °C</p>
              <p>• Corrected value: ___ MΩ</p>
              <p>• Equipment used: ___</p>
              <p>• Calibration due: ___</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Assessment:</p>
              <p>• Installation age: ___ years</p>
              <p>• Previous reading: ___ MΩ</p>
              <p>• Trend analysis: ___</p>
              <p>• Environmental factors: ___</p>
              <p>• Professional judgement: ___</p>
              <p>• Recommendation: ___</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
