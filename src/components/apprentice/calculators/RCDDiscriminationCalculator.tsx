
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RCDDiscriminationCalculator = () => {
  const [upstreamRating, setUpstreamRating] = useState<string>("100");
  const [downstreamRating, setDownstreamRating] = useState<string>("30");
  const [upstreamType, setUpstreamType] = useState<string>("standard");
  const [downstreamType, setDownstreamType] = useState<string>("standard");
  const [result, setResult] = useState<{
    discriminationRatio: number;
    hasDiscrimination: boolean;
    upstreamTripTime: string;
    downstreamTripTime: string;
    recommendation: string;
  } | null>(null);

  const calculateDiscrimination = () => {
    const upstreamRatingVal = parseFloat(upstreamRating);
    const downstreamRatingVal = parseFloat(downstreamRating);

    if (upstreamRatingVal > 0 && downstreamRatingVal > 0) {
      const discriminationRatio = upstreamRatingVal / downstreamRatingVal;
      
      // Trip times based on RCD type and rating
      const getTripTime = (rating: number, type: string) => {
        if (type === "s-type") return "0.13 - 0.5s";
        if (rating <= 30) return "< 0.04s";
        if (rating <= 100) return "< 0.04s";
        return "< 0.2s";
      };

      const upstreamTripTime = getTripTime(upstreamRatingVal, upstreamType);
      const downstreamTripTime = getTripTime(downstreamRatingVal, downstreamType);
      
      // Discrimination rules
      let hasDiscrimination = false;
      let recommendation = "";

      if (upstreamType === "s-type" && downstreamType === "standard") {
        hasDiscrimination = discriminationRatio >= 2;
        recommendation = hasDiscrimination 
          ? "Good discrimination with S-type upstream RCD"
          : "Increase upstream RCD rating or use different RCD types";
      } else if (discriminationRatio >= 3) {
        hasDiscrimination = true;
        recommendation = "Adequate discrimination with standard RCDs";
      } else {
        hasDiscrimination = false;
        recommendation = "Consider S-type upstream RCD or increase rating ratio";
      }

      setResult({
        discriminationRatio,
        hasDiscrimination,
        upstreamTripTime,
        downstreamTripTime,
        recommendation
      });
    }
  };

  const reset = () => {
    setUpstreamRating("100");
    setDownstreamRating("30");
    setUpstreamType("standard");
    setDownstreamType("standard");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <CardTitle>RCD Discrimination Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate RCD discrimination to ensure selective operation in cascade installations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="p-4 border border-elec-yellow/20 rounded-md bg-elec-dark">
              <h4 className="font-semibold mb-3 text-elec-yellow">Upstream RCD (Main)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="upstream-rating">Rating (mA)</Label>
                  <Select value={upstreamRating} onValueChange={setUpstreamRating}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="upstream-type">Type</Label>
                  <Select value={upstreamType} onValueChange={setUpstreamType}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="standard">Standard (General)</SelectItem>
                      <SelectItem value="s-type">S-Type (Selective)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="p-4 border border-elec-yellow/20 rounded-md bg-elec-dark">
              <h4 className="font-semibold mb-3 text-elec-yellow">Downstream RCD (Circuit)</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="downstream-rating">Rating (mA)</Label>
                  <Select value={downstreamRating} onValueChange={setDownstreamRating}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="downstream-type">Type</Label>
                  <Select value={downstreamType} onValueChange={setDownstreamType}>
                    <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-dark border-elec-yellow/20">
                      <SelectItem value="standard">Standard (General)</SelectItem>
                      <SelectItem value="s-type">S-Type (Selective)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateDiscrimination} className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate
              </Button>
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[300px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Discrimination Analysis</h3>
                    <Badge 
                      variant={result.hasDiscrimination ? "default" : "destructive"} 
                      className="mb-4"
                    >
                      {result.hasDiscrimination ? "Discriminates" : "No Discrimination"}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Rating Ratio:</span>
                      <div className="font-mono text-elec-yellow">{result.discriminationRatio.toFixed(1)} : 1</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-muted-foreground text-xs">Upstream Trip:</span>
                        <div className="font-mono text-elec-yellow text-sm">{result.upstreamTripTime}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs">Downstream Trip:</span>
                        <div className="font-mono text-elec-yellow text-sm">{result.downstreamTripTime}</div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <span className="text-muted-foreground">Recommendation:</span>
                      <div className="text-elec-yellow text-sm mt-1">{result.recommendation}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Configure RCD settings to analyse discrimination
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                For discrimination: Standard RCDs need 3:1 ratio, S-type upstream allows 2:1 ratio.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RCDDiscriminationCalculator;
