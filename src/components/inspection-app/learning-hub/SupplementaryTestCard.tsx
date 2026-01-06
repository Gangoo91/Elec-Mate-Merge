import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Settings, CheckCircle2, AlertTriangle, Clock, Shield, Target, Wrench, BookOpen, Zap, Activity, Gauge, TestTube, FileText, TrendingUp, Award, ClipboardList } from 'lucide-react';
import CertificateGuideTab from './supplementary-testing/CertificateGuideTab';
import ScheduleGuideTab from './supplementary-testing/ScheduleGuideTab';

const SupplementaryTestCard = () => {
  const smartTabs = [
    {
      value: "earth-electrode",
      label: "Earth Electrode",
      icon: <Shield className="h-4 w-4" />,
      content: (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Earth Electrode Continuity Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            {/* Why Test Section */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Why Test Earth Electrodes?
              </h4>
              <ul className="space-y-2 text-sm">
                <li>• Verify earth electrode connection integrity and low resistance path</li>
                <li>• Ensure adequate earth fault protection for personnel safety</li>
                <li>• Confirm compliance with BS 7671 Section 542 earthing requirements</li>
                <li>• Validate earthing system effectiveness under fault conditions</li>
                <li>• Prevent dangerous touch and step voltages during earth faults</li>
              </ul>
            </div>

            {/* Equipment Section */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Equipment Required
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Primary Equipment:</h5>
                  <ul className="space-y-1">
                    <li>• Earth electrode resistance tester</li>
                    <li>• Test leads and spikes</li>
                    <li>• Calibrated multimeter</li>
                    <li>• Temporary earth electrodes</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Safety Equipment:</h5>
                  <ul className="space-y-1">
                    <li>• Insulated tools and gloves</li>
                    <li>• Warning signs and barriers</li>
                    <li>• Voltage indicator</li>
                    <li>• First aid equipment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Test Section */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Step-by-Step Test Procedure
              </h4>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Pre-test Safety:</strong> Isolate installation and verify dead using approved voltage indicator</li>
                <li><strong>2. Disconnect Earth:</strong> Safely disconnect earth electrode from main earthing terminal</li>
                <li><strong>3. Visual Inspection:</strong> Check electrode condition and connections for corrosion/damage</li>
                <li><strong>4. Position Test Spikes:</strong> Place current and potential spikes at correct distances (Fall of Potential method)</li>
                <li><strong>5. Connect Tester:</strong> Connect earth electrode tester using manufacturer's instructions</li>
                <li><strong>6. Perform Test:</strong> Conduct multiple measurements at different spike positions</li>
                <li><strong>7. Record Results:</strong> Document all measurements and calculate average resistance</li>
                <li><strong>8. Reconnect System:</strong> Safely reconnect earth electrode to main earthing terminal</li>
              </ol>
            </div>

            {/* Regulations Section */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-400 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                BS 7671 Regulation References
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Key Regulations:</h5>
                  <ul className="space-y-1">
                    <li>• Section 542: Earthing arrangements</li>
                    <li>• Regulation 542.4: Earth electrodes</li>
                    <li>• Section 612: Initial verification</li>
                    <li>• Table 41.5: Maximum earth fault loop impedance</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Test Standards:</h5>
                  <ul className="space-y-1">
                    <li>• BS EN 61557-5: Earth resistance measurement</li>
                    <li>• IEC 61557: Test equipment standards</li>
                    <li>• GS38: Test probe specifications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Expected Results Section */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Expected Results & Acceptance Criteria
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Typical Values:</h5>
                  <ul className="space-y-1">
                    <li>• TT systems: Usually {'<'}200Ω preferred</li>
                    <li>• Agricultural: {'<'}50Ω often required</li>
                    <li>• IT systems: Depends on application</li>
                    <li>• Rod electrodes: 10-100Ω typical</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Factors Affecting Results:</h5>
                  <ul className="space-y-1">
                    <li>• Soil resistivity and moisture content</li>
                    <li>• Electrode material and dimensions</li>
                    <li>• Installation depth and method</li>
                    <li>• Seasonal variations in soil conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Troubleshooting Section */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Troubleshooting & Common Issues
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-2">High Resistance Issues:</h5>
                  <ul className="space-y-1">
                    <li>• Check for corroded connections</li>
                    <li>• Verify electrode is not damaged</li>
                    <li>• Consider parallel electrodes</li>
                    <li>• Improve soil conductivity</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Measurement Problems:</h5>
                  <ul className="space-y-1">
                    <li>• Ensure adequate spike separation</li>
                    <li>• Check for underground services</li>
                    <li>• Verify test equipment calibration</li>
                    <li>• Consider alternative test methods</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "voltage-drop",
      label: "Voltage Drop",
      icon: <Zap className="h-4 w-4" />,
      content: (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Voltage Drop Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-orange-400 mb-3">BS 7671 Voltage Drop Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-foreground mb-2">Standard Limits:</h5>
                  <div className="space-y-1">
                    <p>• Lighting circuits: 3% of nominal voltage</p>
                    <p>• Power circuits: 5% of nominal voltage</p>
                    <p>• Combined lighting/power: 3% limit applies</p>
                    <p>• Motor circuits: Starting conditions considered</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-foreground mb-2">Practical Values (230V):</h5>
                  <div className="space-y-1">
                    <p>• Lighting: Maximum 6.9V drop</p>
                    <p>• Power: Maximum 11.5V drop</p>
                    <p>• Socket outlets: 11.5V maximum</p>
                    <p>• Fixed equipment: As specified</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "phase-sequence",
      label: "Phase Sequence",
      icon: <Gauge className="h-4 w-4" />,
      content: (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Phase Sequence Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-400 mb-3">Phase Sequence Verification</h4>
              <p className="text-sm">Ensures correct phase rotation for three-phase equipment operation.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "touch-voltage",
      label: "Touch Voltage",
      icon: <Zap className="h-4 w-4" />,
      content: (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Touch Voltage Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-red-400 mb-3">Safety Assessment</h4>
              <p className="text-sm">Measures potential voltage differences accessible to persons.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "temperature",
      label: "Temperature",
      icon: <Activity className="h-4 w-4" />,
      content: (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Temperature Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-purple-400 mb-3">Thermal Assessment</h4>
              <p className="text-sm">Verification of thermal effects in electrical installations.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "neutral-integrity",
      label: "Neutral",
      icon: <Settings className="h-4 w-4" />,
      content: (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Neutral Integrity Testing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-white">
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-cyan-400 mb-3">Neutral Conductor Verification</h4>
              <p className="text-sm">Testing of neutral conductor continuity and integrity.</p>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      value: "certificate-guide",
      label: "Certificate Guide",
      icon: <Award className="h-4 w-4" />,
      content: <CertificateGuideTab />
    },
    {
      value: "schedule-guide",
      label: "Schedule Guide",
      icon: <ClipboardList className="h-4 w-4" />,
      content: <ScheduleGuideTab />
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="p-2 bg-purple-500/20 rounded-lg">
          <Activity className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Supplementary Testing</h1>
          <p className="text-sm sm:text-base text-white">Additional tests required or recommended by BS 7671</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-purple-500/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-purple-400 text-xl">Supplementary Testing Overview</CardTitle>
              <CardDescription className="text-white">
                Additional electrical tests beyond core verification procedures
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Additional Tests
            </Badge>
            <Badge variant="outline" className="text-white border-white/50">
              Varies by installation
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Purpose of Supplementary Testing
            </h4>
            <p className="text-sm text-white">
              Supplementary tests are performed in addition to the standard verification tests 
              to confirm specific aspects of electrical installations. These tests may be 
              required based on the type of installation, environmental conditions, or 
              specific regulatory requirements.
            </p>
          </div>
        </CardContent>
      </Card>

      <SmartTabs 
        tabs={smartTabs}
        defaultValue="earth-electrode"
        className="w-full"
        breakpoint={4}
      />
    </div>
  );
};

export default SupplementaryTestCard;