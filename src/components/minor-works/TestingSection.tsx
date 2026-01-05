import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TestTube, AlertTriangle, CheckCircle, Settings, Calendar } from 'lucide-react';
import TestMethodInfo from '@/components/TestMethodInfo';

interface TestingSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

// BS 7671 Table 41.3 - Maximum Zs values for Type B MCBs (0.4s disconnection)
const testLimits = {
  insulationResistance: {
    min: 1.0,
    unit: 'MΩ',
    note: 'Minimum 1.0 MΩ for circuits up to 500V'
  },
  earthFaultLoop: {
    typical: {
      '6A': 7.28,
      '10A': 4.37,
      '16A': 2.73,
      '20A': 2.19,
      '25A': 1.75,
      '32A': 1.37,
      '40A': 1.09,
      '50A': 0.87
    },
    unit: 'Ω'
  },
  rcdTimes: {
    halfRated: { max: 300, unit: 'ms' },
    ratedCurrent: { max: 300, unit: 'ms' },
    fiveTimesRated: { max: 40, unit: 'ms' }
  },
  ringCircuit: {
    r1r2Max: 1.67,
    unit: 'Ω',
    note: 'Typical maximum R1+R2 for 32A ring final circuit'
  }
};

const TestingSection = ({ formData, onUpdate }: TestingSectionProps) => {
  const validateTestResult = (testType: string, value: string, deviceRating?: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return null;

    switch (testType) {
      case 'insulationResistance':
        return numValue >= testLimits.insulationResistance.min ? 'pass' : 'fail';
      case 'earthFaultLoop':
        if (deviceRating && testLimits.earthFaultLoop.typical[deviceRating as keyof typeof testLimits.earthFaultLoop.typical]) {
          const limit = testLimits.earthFaultLoop.typical[deviceRating as keyof typeof testLimits.earthFaultLoop.typical];
          return numValue <= limit ? 'pass' : 'fail';
        }
        return null;
      case 'r1r2':
        return numValue <= testLimits.ringCircuit.r1r2Max ? 'pass' : 'fail';
      case 'continuity':
        return numValue < 10 ? 'pass' : 'fail'; // General continuity check
      case 'rcdHalf':
        return numValue <= testLimits.rcdTimes.halfRated.max ? 'pass' : 'fail';
      case 'rcdRated':
        return numValue <= testLimits.rcdTimes.ratedCurrent.max ? 'pass' : 'fail';
      case 'rcdFiveTimes':
        return numValue <= testLimits.rcdTimes.fiveTimesRated.max ? 'pass' : 'fail';
      default:
        return null;
    }
  };

  const getValidationBadge = (result: string | null) => {
    if (!result) return null;
    return result === 'pass' ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Pass
      </Badge>
    ) : (
      <Badge variant="destructive">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Check Required
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Test Instruments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5 text-primary" />
            Test Instruments (Legal Requirement)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              BS 7671 requires all test instruments to be calibrated and suitable for the tests being performed.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="continuityTester" className="text-sm font-medium">
                  Continuity Tester *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="continuityTester"
                    placeholder="Make & Model"
                    value={formData.continuityTesterMake || ''}
                    onChange={(e) => onUpdate('continuityTesterMake', e.target.value)}
                  />
                  <Input
                    placeholder="Serial Number"
                    value={formData.continuityTesterSerial || ''}
                    onChange={(e) => onUpdate('continuityTesterSerial', e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <Label className="text-xs text-muted-foreground">Calibration Date *</Label>
                  <Input
                    type="date"
                    value={formData.continuityTesterCal || ''}
                    onChange={(e) => onUpdate('continuityTesterCal', e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="insulationTester" className="text-sm font-medium">
                  Insulation Resistance Tester *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    id="insulationTester"
                    placeholder="Make & Model"
                    value={formData.insulationTesterMake || ''}
                    onChange={(e) => onUpdate('insulationTesterMake', e.target.value)}
                  />
                  <Input
                    placeholder="Serial Number"
                    value={formData.insulationTesterSerial || ''}
                    onChange={(e) => onUpdate('insulationTesterSerial', e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <Label className="text-xs text-muted-foreground">Calibration Date *</Label>
                  <Input
                    type="date"
                    value={formData.insulationTesterCal || ''}
                    onChange={(e) => onUpdate('insulationTesterCal', e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Conditions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TestTube className="h-5 w-5 text-primary" />
            Test Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ambientTemp" className="text-sm font-medium">
                Ambient Temperature (°C)
              </Label>
              <Input
                id="ambientTemp"
                type="number"
                placeholder="20"
                value={formData.ambientTemp || ''}
                onChange={(e) => onUpdate('ambientTemp', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="isolationConfirmed" className="text-sm font-medium">
                Safe Isolation Confirmed *
              </Label>
              <Select 
                value={formData.isolationConfirmed || ''} 
                onValueChange={(value) => onUpdate('isolationConfirmed', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes - Properly isolated</SelectItem>
                  <SelectItem value="no">No - Testing limitations</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="testingLimitations" className="text-sm font-medium">
                Testing Limitations
              </Label>
              <Select 
                value={formData.testingLimitations || ''} 
                onValueChange={(value) => onUpdate('testingLimitations', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="partial">Partial access only</SelectItem>
                  <SelectItem value="live">Live circuits present</SelectItem>
                  <SelectItem value="other">Other (specify in notes)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5 text-primary" />
            Test Results & Measurements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Circuit and Protective Device Information */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
            <div>
              <Label htmlFor="circuitType" className="text-sm font-medium">
                Circuit Type
              </Label>
              <Select 
                value={formData.circuitType || ''} 
                onValueChange={(value) => onUpdate('circuitType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select circuit type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border shadow-lg z-[60]">
                  <SelectItem value="lighting">Lighting Circuit</SelectItem>
                  <SelectItem value="socket-radial">Socket Outlet - Radial</SelectItem>
                  <SelectItem value="socket-ring">Socket Outlet - Ring Final</SelectItem>
                  <SelectItem value="shower">Shower Circuit</SelectItem>
                  <SelectItem value="cooker">Cooker Circuit</SelectItem>
                  <SelectItem value="immersion">Immersion Heater</SelectItem>
                  <SelectItem value="outdoor">Outdoor Circuit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="protectiveDeviceType" className="text-sm font-medium">
                Protective Device Type
              </Label>
              <Select 
                value={formData.protectiveDeviceType || ''} 
                onValueChange={(value) => onUpdate('protectiveDeviceType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border shadow-lg z-[60]">
                  <SelectItem value="mcb-b">MCB Type B</SelectItem>
                  <SelectItem value="mcb-c">MCB Type C</SelectItem>
                  <SelectItem value="mcb-d">MCB Type D</SelectItem>
                  <SelectItem value="rcbo">RCBO</SelectItem>
                  <SelectItem value="fuse-bs3036">BS 3036 Fuse</SelectItem>
                  <SelectItem value="fuse-bs1361">BS 1361 Fuse</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="protectiveDeviceRating" className="text-sm font-medium">
                Rating (A)
              </Label>
              <Select 
                value={formData.protectiveDeviceRating || ''} 
                onValueChange={(value) => onUpdate('protectiveDeviceRating', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent className="bg-popover border shadow-lg z-[60]">
                  <SelectItem value="6A">6A</SelectItem>
                  <SelectItem value="10A">10A</SelectItem>
                  <SelectItem value="16A">16A</SelectItem>
                  <SelectItem value="20A">20A</SelectItem>
                  <SelectItem value="25A">25A</SelectItem>
                  <SelectItem value="32A">32A</SelectItem>
                  <SelectItem value="40A">40A</SelectItem>
                  <SelectItem value="50A">50A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="cableSize" className="text-sm font-medium">
                Cable Size (mm²)
              </Label>
              <Input
                id="cableSize"
                placeholder="e.g., 2.5"
                value={formData.cableSize || ''}
                onChange={(e) => onUpdate('cableSize', e.target.value)}
              />
            </div>
          </div>

          {/* DEAD TESTS SECTION */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Dead Tests (Safe Isolation Required)</h3>
            </div>
            
            {/* Continuity Tests - Full Width */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-sm text-muted-foreground">Continuity Tests</h4>
              {formData.circuitType === 'socket-ring' || (formData.cableSize === '2.5' && formData.protectiveDeviceRating === '32A') ? (
                // Ring Final Circuit Tests
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="ringContinuityLive" className="text-sm font-medium">
                        Ring Continuity - Live (Ω) *
                      </Label>
                      {getValidationBadge(validateTestResult('continuity', formData.ringContinuityLive || ''))}
                    </div>
                    <Input
                      id="ringContinuityLive"
                      type="number"
                      step="0.01"
                      placeholder="Live conductor end-to-end"
                      value={formData.ringContinuityLive || ''}
                      onChange={(e) => onUpdate('ringContinuityLive', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="ringContinuityNeutral" className="text-sm font-medium">
                        Ring Continuity - Neutral (Ω) *
                      </Label>
                      {getValidationBadge(validateTestResult('continuity', formData.ringContinuityNeutral || ''))}
                    </div>
                    <Input
                      id="ringContinuityNeutral"
                      type="number"
                      step="0.01"
                      placeholder="Neutral conductor end-to-end"
                      value={formData.ringContinuityNeutral || ''}
                      onChange={(e) => onUpdate('ringContinuityNeutral', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="r1r2Result" className="text-sm font-medium">
                        R1+R2 at Socket Outlets (Ω) *
                      </Label>
                      {getValidationBadge(validateTestResult('r1r2', formData.r1r2Result || ''))}
                    </div>
                    <Input
                      id="r1r2Result"
                      type="number"
                      step="0.01"
                      placeholder="Typical ≤1.67Ω for ring final"
                      value={formData.r1r2Result || ''}
                      onChange={(e) => onUpdate('r1r2Result', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Cross-connected L&N, measure at each socket outlet
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="finalRingContinuity" className="text-sm font-medium">
                        Final Ring Continuity Check (Ω) *
                      </Label>
                      {getValidationBadge(validateTestResult('continuity', formData.finalRingContinuity || ''))}
                    </div>
                    <Input
                      id="finalRingContinuity"
                      type="number"
                      step="0.01"
                      placeholder="End-to-end verification"
                      value={formData.finalRingContinuity || ''}
                      onChange={(e) => onUpdate('finalRingContinuity', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Final verification of ring continuity
                    </p>
                  </div>
                </div>
              ) : (
                // Radial Circuit Tests
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="continuityResult" className="text-sm font-medium">
                      Continuity of Protective Conductors (Ω) *
                    </Label>
                    {getValidationBadge(validateTestResult('continuity', formData.continuityResult || ''))}
                  </div>
                  <Input
                    id="continuityResult"
                    type="number"
                    step="0.01"
                    placeholder="R1+R2 or R2 value"
                    value={formData.continuityResult || ''}
                    onChange={(e) => onUpdate('continuityResult', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Record R1+R2 or R2 value as applicable for radial circuits
                  </p>
                </div>
              )}
            </div>
            
            {/* Insulation Resistance Tests - Full Width */}
            <div className="space-y-4 mb-6">
              <h4 className="font-semibold text-sm text-muted-foreground">Insulation Resistance Tests</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="insulationTestVoltage" className="text-sm font-medium">
                    Test Voltage *
                  </Label>
                  <Select 
                    value={formData.insulationTestVoltage || ''} 
                    onValueChange={(value) => onUpdate('insulationTestVoltage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border shadow-lg z-[60]">
                      <SelectItem value="250">250V DC</SelectItem>
                      <SelectItem value="500">500V DC</SelectItem>
                      <SelectItem value="1000">1000V DC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="insulationLiveNeutral" className="text-sm font-medium">
                      Live-Neutral (MΩ) *
                    </Label>
                    {getValidationBadge(validateTestResult('insulationResistance', formData.insulationLiveNeutral || ''))}
                  </div>
                  <Input
                    id="insulationLiveNeutral"
                    type="number"
                    step="0.1"
                    placeholder="Min 1.0"
                    value={formData.insulationLiveNeutral || ''}
                    onChange={(e) => onUpdate('insulationLiveNeutral', e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="insulationLiveEarth" className="text-sm font-medium">
                      Live-Earth (MΩ) *
                    </Label>
                    {getValidationBadge(validateTestResult('insulationResistance', formData.insulationLiveEarth || ''))}
                  </div>
                  <Input
                    id="insulationLiveEarth"
                    type="number"
                    step="0.1"
                    placeholder="Min 1.0"
                    value={formData.insulationLiveEarth || ''}
                    onChange={(e) => onUpdate('insulationLiveEarth', e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="insulationNeutralEarth" className="text-sm font-medium">
                      Neutral-Earth (MΩ) *
                    </Label>
                    {getValidationBadge(validateTestResult('insulationResistance', formData.insulationNeutralEarth || ''))}
                  </div>
                  <Input
                    id="insulationNeutralEarth"
                    type="number"
                    step="0.1"
                    placeholder="Min 1.0"
                    value={formData.insulationNeutralEarth || ''}
                    onChange={(e) => onUpdate('insulationNeutralEarth', e.target.value)}
                  />
                </div>
              </div>
              <Alert className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
                <AlertDescription className="text-blue-700 dark:text-blue-300 text-xs">
                  All insulation resistance values must be ≥1.0 MΩ per BS 7671 Regulation 612.3
                </AlertDescription>
              </Alert>
            </div>
            
            {/* Polarity Check */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm text-muted-foreground">Polarity Verification</h4>
              <div className="max-w-xs">
                <Label htmlFor="polarityResult" className="text-sm font-medium">
                  Polarity Check *
                </Label>
                <Select 
                  value={formData.polarityResult || ''} 
                  onValueChange={(value) => onUpdate('polarityResult', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select result" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border shadow-lg z-[60]">
                    <SelectItem value="correct">Correct</SelectItem>
                    <SelectItem value="incorrect">Incorrect - Defect</SelectItem>
                    <SelectItem value="na">N/A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* LIVE TESTS SECTION */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-orange-700 dark:text-orange-400">Live Tests (Circuit Must Be Energised)</h3>
            </div>
            
            <Alert className="mb-4 border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-700 dark:text-orange-300">
                Ensure all dead tests are satisfactory before energising the circuit for live testing.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-6">
              {/* Earth Fault Loop & PFC */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="earthFaultLoopResult" className="text-sm font-medium">
                      Earth Fault Loop Impedance Zs (Ω) *
                    </Label>
                    {getValidationBadge(validateTestResult('earthFaultLoop', formData.earthFaultLoopResult || '', formData.protectiveDeviceRating))}
                  </div>
                  <Input
                    id="earthFaultLoopResult"
                    type="number"
                    step="0.01"
                    placeholder="Measured at furthest point"
                    value={formData.earthFaultLoopResult || ''}
                    onChange={(e) => onUpdate('earthFaultLoopResult', e.target.value)}
                  />
                  {formData.protectiveDeviceRating && testLimits.earthFaultLoop.typical[formData.protectiveDeviceRating as keyof typeof testLimits.earthFaultLoop.typical] && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Maximum: {testLimits.earthFaultLoop.typical[formData.protectiveDeviceRating as keyof typeof testLimits.earthFaultLoop.typical]}Ω for {formData.protectiveDeviceRating} device
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="prospectiveFault" className="text-sm font-medium">
                    Prospective Fault Current (kA)
                  </Label>
                  <Input
                    id="prospectiveFault"
                    type="number"
                    step="0.1"
                    placeholder="PFC at origin"
                    value={formData.prospectiveFault || ''}
                    onChange={(e) => onUpdate('prospectiveFault', e.target.value)}
                  />
                </div>
              </div>
              
              {/* RCD Testing (if applicable) */}
              {(formData.protectiveDeviceType === 'rcbo' || 
                formData.workType === 'rcd' || 
                formData.circuitType === 'socket-ring' || 
                formData.circuitType === 'socket-radial' || 
                formData.circuitType === 'shower' || 
                formData.circuitType === 'outdoor') && (
                <div className="space-y-4 p-4 bg-blue-50/30 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-sm text-blue-700 dark:text-blue-400">RCD Operation Tests</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="rcdRating" className="text-sm font-medium">
                        RCD Rating (mA)
                      </Label>
                      <Select 
                        value={formData.rcdRating || ''} 
                        onValueChange={(value) => onUpdate('rcdRating', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border shadow-lg z-[60]">
                          <SelectItem value="30">30mA</SelectItem>
                          <SelectItem value="100">100mA</SelectItem>
                          <SelectItem value="300">300mA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label htmlFor="rcdTripTime" className="text-sm font-medium">
                          Trip Time at 1×In (ms)
                        </Label>
                        {getValidationBadge(validateTestResult('rcdRated', formData.rcdTripTime || ''))}
                      </div>
                      <Input
                        id="rcdTripTime"
                        type="number"
                        placeholder="Max 300ms"
                        value={formData.rcdTripTime || ''}
                        onChange={(e) => onUpdate('rcdTripTime', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rcdTestButton" className="text-sm font-medium">
                        Test Button Operation *
                      </Label>
                      <Select 
                        value={formData.rcdTestButton || ''} 
                        onValueChange={(value) => onUpdate('rcdTestButton', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select result" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border shadow-lg z-[60]">
                          <SelectItem value="satisfactory">Satisfactory</SelectItem>
                          <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Functional Testing - At the bottom */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3">Functional Testing</h4>
                <div className="max-w-xs">
                  <Label htmlFor="functionalTesting" className="text-sm font-medium">
                    Functional Testing *
                  </Label>
                  <Select 
                    value={formData.functionalTesting || ''} 
                    onValueChange={(value) => onUpdate('functionalTesting', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border shadow-lg z-[60]">
                      <SelectItem value="satisfactory">Satisfactory</SelectItem>
                      <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                      <SelectItem value="na">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verify operation of switches, sockets, and connected equipment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Method Information */}
      <TestMethodInfo 
        formData={formData} 
        onUpdate={onUpdate} 
      />
    </div>
  );
};

export default TestingSection;