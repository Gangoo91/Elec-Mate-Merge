
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle, Calculator, Info } from "lucide-react";

const RCDDiscriminationCalculator = () => {
  const [upstreamRCD, setUpstreamRCD] = useState({
    rating: "",
    type: "",
    trippingTime: ""
  });
  
  const [downstreamRCD, setDownstreamRCD] = useState({
    rating: "",
    type: "",
    trippingTime: ""
  });
  
  const [result, setResult] = useState<{
    discriminates: boolean;
    timeDifference: number;
    recommendation: string;
  } | null>(null);

  const rcdTypes = [
    { value: "type-ac", label: "Type AC", trippingTime: 300 },
    { value: "type-a", label: "Type A", trippingTime: 300 },
    { value: "type-f", label: "Type F", trippingTime: 300 },
    { value: "type-b", label: "Type B", trippingTime: 300 },
    { value: "s-type", label: "S-Type (Selective)", trippingTime: 500 },
    { value: "g-type", label: "G-Type (General)", trippingTime: 10 }
  ];

  const rcdRatings = ["10", "30", "100", "300", "500"];

  const calculateDiscrimination = () => {
    if (!upstreamRCD.rating || !downstreamRCD.rating || !upstreamRCD.type || !downstreamRCD.type) {
      return;
    }

    const upstreamType = rcdTypes.find(type => type.value === upstreamRCD.type);
    const downstreamType = rcdTypes.find(type => type.value === downstreamRCD.type);
    
    if (!upstreamType || !downstreamType) return;

    const upstreamTime = upstreamType.trippingTime;
    const downstreamTime = downstreamType.trippingTime;
    const timeDifference = upstreamTime - downstreamTime;

    let discriminates = false;
    let recommendation = "";

    // Check for proper discrimination
    if (upstreamRCD.type === "s-type" && downstreamRCD.type !== "s-type") {
      discriminates = timeDifference >= 200; // S-type should have at least 200ms delay
      recommendation = discriminates 
        ? "Good discrimination - S-type upstream provides selective operation"
        : "Poor discrimination - Consider using different RCD types";
    } else if (upstreamRCD.type === "g-type") {
      discriminates = true;
      recommendation = "G-type RCD provides instantaneous operation for ground fault protection";
    } else {
      discriminates = timeDifference > 0;
      recommendation = discriminates
        ? "Basic discrimination achieved"
        : "No discrimination - both RCDs may trip simultaneously";
    }

    // Additional checks for current ratings
    const upstreamRating = parseInt(upstreamRCD.rating);
    const downstreamRating = parseInt(downstreamRCD.rating);
    
    if (upstreamRating <= downstreamRating) {
      discriminates = false;
      recommendation += " | WARNING: Upstream RCD rating should be higher than downstream";
    }

    setResult({
      discriminates,
      timeDifference,
      recommendation
    });
  };

  const resetCalculator = () => {
    setUpstreamRCD({ rating: "", type: "", trippingTime: "" });
    setDownstreamRCD({ rating: "", type: "", trippingTime: "" });
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-elec-yellow" />
          <CardTitle>RCD Discrimination Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate RCD discrimination for selective operation in electrical installations
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upstream RCD */}
          <Card className="border-blue-500/30 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="text-blue-300 text-lg">Upstream RCD (Main)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="upstream-rating">Rating (mA)</Label>
                  <Select value={upstreamRCD.rating} onValueChange={(value) => 
                    setUpstreamRCD(prev => ({ ...prev, rating: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {rcdRatings.map(rating => (
                        <SelectItem key={rating} value={rating}>
                          {rating} mA
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="upstream-type">RCD Type</Label>
                  <Select value={upstreamRCD.type} onValueChange={(value) => 
                    setUpstreamRCD(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {rcdTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Downstream RCD */}
          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-300 text-lg">Downstream RCD (Circuit)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="downstream-rating">Rating (mA)</Label>
                  <Select value={downstreamRCD.rating} onValueChange={(value) => 
                    setDownstreamRCD(prev => ({ ...prev, rating: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {rcdRatings.map(rating => (
                        <SelectItem key={rating} value={rating}>
                          {rating} mA
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="downstream-type">RCD Type</Label>
                  <Select value={downstreamRCD.type} onValueChange={(value) => 
                    setDownstreamRCD(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {rcdTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3">
          <Button onClick={calculateDiscrimination} className="flex-1">
            <Calculator className="mr-2 h-4 w-4" />
            Calculate Discrimination
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            Reset
          </Button>
        </div>

        {/* Results */}
        {result && (
          <Card className={`border-2 ${result.discriminates ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
            <CardHeader>
              <CardTitle className={`text-lg flex items-center gap-2 ${result.discriminates ? 'text-green-300' : 'text-red-300'}`}>
                {result.discriminates ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertTriangle className="h-5 w-5" />
                )}
                Discrimination Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge variant={result.discriminates ? "default" : "destructive"} className="w-fit">
                    {result.discriminates ? "DISCRIMINATES" : "NO DISCRIMINATION"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Time Difference</Label>
                  <div className="text-lg font-mono">
                    {result.timeDifference}ms
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Recommendation</Label>
                <p className={`text-sm p-3 rounded-md ${result.discriminates ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                  {result.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Panel */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-amber-300 text-lg flex items-center gap-2">
              <Info className="h-5 w-5" />
              RCD Discrimination Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-amber-200">
            <div className="space-y-2">
              <h4 className="font-medium">Key Principles:</h4>
              <ul className="space-y-1 text-sm list-disc list-inside ml-4">
                <li>Upstream RCD rating should be higher than downstream</li>
                <li>S-Type RCDs provide time delay for selective operation</li>
                <li>G-Type RCDs provide instantaneous earth fault protection</li>
                <li>Minimum 200ms time difference required for reliable discrimination</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Common Applications:</h4>
              <ul className="space-y-1 text-sm list-disc list-inside ml-4">
                <li>Main incomer: 100mA S-Type RCD</li>
                <li>Final circuits: 30mA Type AC/A RCDs</li>
                <li>Socket outlets: 30mA RCD protection required</li>
                <li>Bathroom circuits: Additional 30mA RCD protection</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default RCDDiscriminationCalculator;
