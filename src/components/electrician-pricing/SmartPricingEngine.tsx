import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Calculator, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Lightbulb,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingFactors {
  location: string;
  jobType: string;
  complexity: 'simple' | 'standard' | 'complex';
  urgency: 'standard' | 'urgent' | 'emergency';
  duration: string;
  materialsCost: number;
  travelDistance: number;
  additionalRequirements: string;
}

interface PricingRecommendation {
  basePrice: number;
  adjustedPrice: number;
  competitiveRange: { min: number; max: number };
  profitMargin: number;
  confidence: number;
  factors: {
    location: number;
    complexity: number;
    urgency: number;
    market: number;
  };
  recommendations: string[];
  risks: string[];
}

const SmartPricingEngine = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pricingFactors, setPricingFactors] = useState<PricingFactors>({
    location: '',
    jobType: '',
    complexity: 'standard',
    urgency: 'standard',
    duration: '',
    materialsCost: 0,
    travelDistance: 0,
    additionalRequirements: ''
  });
  const [recommendation, setRecommendation] = useState<PricingRecommendation | null>(null);

  // Mock job types for demo
  const jobTypes = [
    'Consumer Unit Installation',
    'Socket Installation',
    'Light Fitting',
    'Electric Shower Installation',
    'Rewiring',
    'EICR Testing',
    'PAT Testing',
    'Emergency Call Out',
    'Fault Finding',
    'LED Lighting Upgrade'
  ];

  const calculatePricing = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI pricing calculation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock pricing calculation logic
      let basePrice = 150; // Base electrician day rate
      
      // Job type adjustments
      const jobTypeMultipliers: { [key: string]: number } = {
        'Consumer Unit Installation': 1.8,
        'Socket Installation': 0.6,
        'Light Fitting': 0.4,
        'Electric Shower Installation': 1.4,
        'Rewiring': 3.5,
        'EICR Testing': 1.2,
        'PAT Testing': 0.8,
        'Emergency Call Out': 2.2,
        'Fault Finding': 1.6,
        'LED Lighting Upgrade': 1.0
      };
      
      basePrice *= jobTypeMultipliers[pricingFactors.jobType] || 1.0;
      
      // Location adjustments
      const locationMultipliers: { [key: string]: number } = {
        'london': 1.35,
        'southeast': 1.20,
        'scotland': 1.08,
        'northwest': 1.02,
        'yorkshire': 1.02,
        'wales': 0.98,
        'southwest': 1.05,
        'midlands': 1.00,
        'northeast': 0.95
      };
      
      const locationKey = pricingFactors.location.toLowerCase();
      const locationMultiplier = Object.keys(locationMultipliers).find(key => 
        locationKey.includes(key)
      ) ? locationMultipliers[Object.keys(locationMultipliers).find(key => 
        locationKey.includes(key)
      )!] : 1.0;
      
      // Complexity adjustments
      const complexityMultipliers = {
        'simple': 0.8,
        'standard': 1.0,
        'complex': 1.6
      };
      
      // Urgency adjustments
      const urgencyMultipliers = {
        'standard': 1.0,
        'urgent': 1.3,
        'emergency': 2.0
      };
      
      const adjustedPrice = basePrice * 
        locationMultiplier * 
        complexityMultipliers[pricingFactors.complexity] * 
        urgencyMultipliers[pricingFactors.urgency] +
        pricingFactors.materialsCost +
        (pricingFactors.travelDistance * 0.45); // 45p per mile
      
      const competitiveRange = {
        min: adjustedPrice * 0.85,
        max: adjustedPrice * 1.25
      };
      
      const profitMargin = ((adjustedPrice - pricingFactors.materialsCost - basePrice) / adjustedPrice) * 100;
      
      const mockRecommendation: PricingRecommendation = {
        basePrice,
        adjustedPrice,
        competitiveRange,
        profitMargin,
        confidence: Math.round(85 + Math.random() * 10),
        factors: {
          location: locationMultiplier,
          complexity: complexityMultipliers[pricingFactors.complexity],
          urgency: urgencyMultipliers[pricingFactors.urgency],
          market: 1.1
        },
        recommendations: [
          `Price competitively at £${adjustedPrice.toFixed(0)} based on local market rates`,
          `Consider offering a ${profitMargin > 30 ? 'small discount' : 'premium service'} to stand out`,
          `Factor in ${pricingFactors.travelDistance > 10 ? 'significant' : 'minimal'} travel costs`,
          ...(pricingFactors.urgency === 'emergency' ? ['Apply emergency call-out premium'] : [])
        ],
        risks: [
          ...(profitMargin < 20 ? ['Low profit margin - consider increasing price'] : []),
          ...(adjustedPrice > competitiveRange.max ? ['Price above market range - may lose customers'] : []),
          ...(pricingFactors.complexity === 'complex' ? ['Complex job - ensure adequate time allocation'] : [])
        ]
      };
      
      setRecommendation(mockRecommendation);
      
      toast({
        title: "Pricing Analysis Complete",
        description: `Recommended price: £${adjustedPrice.toFixed(0)}`,
      });
      
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to calculate pricing recommendation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleInputChange = (field: keyof PricingFactors, value: string | number) => {
    setPricingFactors(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            AI-Powered Pricing Engine
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Get intelligent pricing recommendations based on job requirements, location, and market conditions
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Job Details Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., London, Manchester, Birmingham"
                value={pricingFactors.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select value={pricingFactors.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complexity">Complexity Level</Label>
              <Select value={pricingFactors.complexity} onValueChange={(value: any) => handleInputChange('complexity', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simple">Simple</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="complex">Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency</Label>
              <Select value={pricingFactors.urgency} onValueChange={(value: any) => handleInputChange('urgency', value)}>
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="urgent">Urgent (Same Day)</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g., 4"
                value={pricingFactors.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="materialsCost">Materials Cost (£)</Label>
              <Input
                id="materialsCost"
                type="number"
                placeholder="e.g., 150"
                value={pricingFactors.materialsCost || ''}
                onChange={(e) => handleInputChange('materialsCost', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="travelDistance">Travel Distance (miles)</Label>
              <Input
                id="travelDistance"
                type="number"
                placeholder="e.g., 15"
                value={pricingFactors.travelDistance || ''}
                onChange={(e) => handleInputChange('travelDistance', parseFloat(e.target.value) || 0)}
                className="bg-elec-gray border-elec-yellow/30"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requirements">Additional Requirements</Label>
            <Textarea
              id="requirements"
              placeholder="Any special requirements, certifications needed, access issues, etc."
              value={pricingFactors.additionalRequirements}
              onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={calculatePricing}
            disabled={isAnalyzing || !pricingFactors.location || !pricingFactors.jobType}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {isAnalyzing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Analyzing Market Data...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Pricing Recommendation
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Pricing Recommendation */}
      {recommendation && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-400" />
                Pricing Recommendation
              </span>
              <Badge className={`${
                recommendation.confidence >= 85 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                recommendation.confidence >= 70 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
              }`}>
                {recommendation.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Main Pricing */}
            <div className="text-center p-6 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
              <div className="text-3xl font-bold text-elec-yellow mb-2">
                £{recommendation.adjustedPrice.toFixed(0)}
              </div>
              <p className="text-sm text-muted-foreground">Recommended Quote Price</p>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium text-white">Base Price</div>
                  <div className="text-muted-foreground">£{recommendation.basePrice.toFixed(0)}</div>
                </div>
                <div>
                  <div className="font-medium text-white">Profit Margin</div>
                  <div className="text-muted-foreground">{recommendation.profitMargin.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="font-medium text-white">Market Range</div>
                  <div className="text-muted-foreground">
                    £{recommendation.competitiveRange.min.toFixed(0)} - £{recommendation.competitiveRange.max.toFixed(0)}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Factors */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Pricing Factors
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                  <MapPin className="h-4 w-4 mx-auto mb-1 text-elec-yellow" />
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-xs text-muted-foreground">+{((recommendation.factors.location - 1) * 100).toFixed(0)}%</div>
                </div>
                <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                  <AlertCircle className="h-4 w-4 mx-auto mb-1 text-elec-yellow" />
                  <div className="text-sm font-medium">Complexity</div>
                  <div className="text-xs text-muted-foreground">{recommendation.factors.complexity}x</div>
                </div>
                <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                  <Clock className="h-4 w-4 mx-auto mb-1 text-elec-yellow" />
                  <div className="text-sm font-medium">Urgency</div>
                  <div className="text-xs text-muted-foreground">{recommendation.factors.urgency}x</div>
                </div>
                <div className="text-center p-3 bg-elec-gray/50 rounded-lg">
                  <TrendingUp className="h-4 w-4 mx-auto mb-1 text-elec-yellow" />
                  <div className="text-sm font-medium">Market</div>
                  <div className="text-xs text-muted-foreground">+{((recommendation.factors.market - 1) * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Recommendations
              </h4>
              <div className="space-y-2">
                {recommendation.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-green-300">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            {recommendation.risks.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Consider These Factors
                </h4>
                <div className="space-y-2">
                  {recommendation.risks.map((risk, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-yellow-300">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartPricingEngine;