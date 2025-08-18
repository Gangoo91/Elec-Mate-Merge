
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RCDTripTimeCalculator = () => {
  const [rcdType, setRcdType] = useState("");
  const [rcdRating, setRcdRating] = useState("");
  const [testCurrent, setTestCurrent] = useState("");
  const [maxTripTime, setMaxTripTime] = useState<number | null>(null);
  const [actualTripTime, setActualTripTime] = useState("");
  const [isCompliant, setIsCompliant] = useState<boolean | null>(null);

  // RCD trip time requirements (in milliseconds)
  const tripTimeRequirements = {
    "30mA": {
      "1x": 300,
      "5x": 40
    },
    "100mA": {
      "1x": 300,
      "5x": 40
    },
    "300mA": {
      "1x": 300,
      "5x": 150
    }
  };

  const calculateTripTime = () => {
    if (!rcdRating || !testCurrent) return;

    const rating = rcdRating as keyof typeof tripTimeRequirements;
    const current = testCurrent as keyof typeof tripTimeRequirements[typeof rating];
    
    const maxTime = tripTimeRequirements[rating]?.[current];
    setMaxTripTime(maxTime || null);

    // Check compliance if actual trip time is provided
    if (actualTripTime && maxTime) {
      const actualTime = parseFloat(actualTripTime);
      setIsCompliant(actualTime <= maxTime);
    }
  };

  const resetCalculator = () => {
    setRcdType("");
    setRcdRating("");
    setTestCurrent("");
    setMaxTripTime(null);
    setActualTripTime("");
    setIsCompliant(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          <CardTitle>RCD Trip Time Chart Helper</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="rcd-type">RCD Type</Label>
              <Select value={rcdType} onValueChange={setRcdType}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select RCD type" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="general">General Purpose RCD</SelectItem>
                  <SelectItem value="socket">Socket Outlet RCD</SelectItem>
                  <SelectItem value="rcbo">RCBO</SelectItem>
                  <SelectItem value="main">Main Switch RCD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rcd-rating">RCD Rating</Label>
              <Select value={rcdRating} onValueChange={setRcdRating}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select RCD rating" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="30mA">30mA</SelectItem>
                  <SelectItem value="100mA">100mA</SelectItem>
                  <SelectItem value="300mA">300mA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="test-current">Test Current</Label>
              <Select value={testCurrent} onValueChange={setTestCurrent}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select test current" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1x">1× Rated Current (IΔn)</SelectItem>
                  <SelectItem value="5x">5× Rated Current (5×IΔn)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="actual-trip-time">Actual Trip Time (ms) - Optional</Label>
              <Input
                id="actual-trip-time"
                type="number"
                value={actualTripTime}
                onChange={(e) => setActualTripTime(e.target.value)}
                placeholder="e.g., 25"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button 
                onClick={calculateTripTime}
                className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                disabled={!rcdRating || !testCurrent}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Get Requirements
              </Button>
              <Button variant="outline" onClick={resetCalculator}>
                Reset
              </Button>
            </div>
          </div>

          <div className="bg-elec-dark/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-elec-yellow mb-4">Trip Time Requirements</h3>
            {maxTripTime !== null ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Trip Time:</p>
                  <p className="text-2xl font-bold text-white">{maxTripTime}ms</p>
                </div>

                {actualTripTime && isCompliant !== null && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Actual Trip Time:</p>
                      <p className="text-xl font-bold text-white">{actualTripTime}ms</p>
                    </div>

                    <div className={`p-3 rounded ${isCompliant ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                      <p className={`font-medium ${isCompliant ? 'text-green-300' : 'text-red-300'}`}>
                        {isCompliant ? '✓ PASS' : '✗ FAIL'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {isCompliant ? 
                          'RCD trip time is within acceptable limits.' : 
                          'RCD trip time exceeds maximum allowed time.'
                        }
                      </p>
                    </div>
                  </>
                )}

                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-4">
                  <h4 className="text-sm font-medium text-blue-300 mb-2">RCD Testing Standards</h4>
                  <div className="text-xs text-blue-300 space-y-1">
                    <p><strong>30mA RCD:</strong> 1×IΔn ≤ 300ms, 5×IΔn ≤ 40ms</p>
                    <p><strong>100mA RCD:</strong> 1×IΔn ≤ 300ms, 5×IΔn ≤ 40ms</p>
                    <p><strong>300mA RCD:</strong> 1×IΔn ≤ 300ms, 5×IΔn ≤ 150ms</p>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-xs text-amber-300">
                    <strong>Note:</strong> Test at 1×IΔn and 5×IΔn. RCD should NOT trip at 0.5×IΔn. 
                    All tests per BS 7671 requirements.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select RCD rating and test current to see trip time requirements.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RCDTripTimeCalculator;
