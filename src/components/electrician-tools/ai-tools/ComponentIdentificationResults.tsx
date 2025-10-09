import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Zap, BookOpen, Wrench, Info, CheckCircle2 } from "lucide-react";

interface ComponentIdentificationResultsProps {
  analysisResult: {
    component?: {
      name: string;
      type: string;
      plain_english?: string;
      manufacturer?: string;
      model?: string;
      specifications?: {
        voltage_rating?: string;
        current_rating?: string;
        ip_rating?: string;
        breaking_capacity?: string;
        poles?: string;
        protection_type?: string;
        [key: string]: string | undefined;
      };
      visual_identifiers?: string[];
      age_estimate?: string;
      current_compliance?: string;
      bs7671_requirements?: string[];
      typical_applications?: string[];
      installation_notes?: string;
      replacement_notes?: string;
      common_issues?: string;
      where_found?: string;
      confidence?: number;
    };
    similar_components?: Array<{
      name: string;
      manufacturer?: string;
      notes?: string;
    }>;
    summary?: string;
  };
}

export default function ComponentIdentificationResults({ analysisResult }: ComponentIdentificationResultsProps) {
  const component = analysisResult.component;
  
  if (!component) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No component information available</p>
        </CardContent>
      </Card>
    );
  }

  // Fix confidence bug: ensure it's displayed as percentage (95 not 0.95)
  const rawConfidence = component.confidence || 0;
  const confidence = rawConfidence < 1 ? Math.round(rawConfidence * 100) : Math.round(rawConfidence);
  
  const confidenceColor = confidence >= 90 ? "bg-green-500/20 text-green-400 border-green-500/30" : 
                          confidence >= 70 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : 
                          "bg-red-500/20 text-red-400 border-red-500/30";
  
  const confidenceLabel = confidence >= 90 ? "High Confidence" : 
                         confidence >= 70 ? "Moderate Confidence" : 
                         "Low Confidence";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section - Mobile First */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-grey">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 mx-auto sm:mx-0">
              <Package className="h-12 w-12 sm:h-16 sm:w-16 text-elec-yellow" />
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="mb-3">
                <Badge variant="outline" className="mb-2 text-xs sm:text-sm">
                  {component.type}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                {component.name}
              </h1>
              <Badge className={`${confidenceColor} text-sm sm:text-base px-3 py-1`}>
                {confidenceLabel}: {confidence}%
              </Badge>
            </div>
          </div>
          
          {/* Plain English Explanation */}
          {component.plain_english && (
            <div className="mt-6 p-4 rounded-lg bg-elec-yellow/5 border border-elec-yellow/20">
              <h3 className="text-sm font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                What is this?
              </h3>
              <p className="text-sm sm:text-base leading-relaxed">{component.plain_english}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Visual Identifiers - How to Confirm This ID */}
      {component.visual_identifiers && component.visual_identifiers.length > 0 && (
        <Card className="border-elec-yellow/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
              How to Confirm This Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              {component.visual_identifiers.map((identifier, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-elec-grey/30 min-h-[44px]">
                  <span className="text-elec-yellow font-bold text-sm mt-0.5">{index + 1}.</span>
                  <span className="text-sm sm:text-base leading-relaxed flex-1">{identifier}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Specifications - Mobile Optimized Vertical Layout */}
      {component.specifications && Object.keys(component.specifications).length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Zap className="h-5 w-5 text-elec-yellow" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-5">
              {Object.entries(component.specifications).map(([key, value]) => 
                value ? (
                  <div key={key} className="border-b border-elec-yellow/20 pb-4 last:border-b-0 last:pb-0">
                    {/* Label on top - WHITE text */}
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-elec-yellow/60" />
                      <span className="text-sm font-medium text-white uppercase tracking-wide">
                        {key.replace(/_/g, ' ')}
                      </span>
                    </div>
                    {/* Value below - YELLOW text, larger */}
                    <p className="text-left text-base sm:text-lg font-semibold text-elec-yellow pl-6">
                      {value}
                    </p>
                  </div>
                ) : null
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Identification Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {component.manufacturer && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Info className="h-4 w-4 text-elec-yellow" />
                Manufacturer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-semibold text-elec-yellow">{component.manufacturer}</p>
            </CardContent>
          </Card>
        )}
        
        {component.model && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                <Package className="h-4 w-4 text-elec-yellow" />
                Model Number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base sm:text-lg font-semibold text-elec-yellow">{component.model}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Age & Compliance */}
      {(component.age_estimate || component.current_compliance) && (
        <Card className="border-elec-yellow/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Info className="h-5 w-5 text-elec-yellow" />
              Age & Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-5">
            {component.age_estimate && (
              <div className="border-b border-elec-yellow/20 pb-4">
                <p className="text-sm font-medium text-white/90 uppercase tracking-wide mb-2">Estimated Age</p>
                <p className="text-base sm:text-lg font-semibold text-elec-yellow">{component.age_estimate}</p>
              </div>
            )}
            {component.current_compliance && (
              <div className={component.age_estimate ? "" : "pb-0"}>
                <p className="text-sm font-medium text-white/90 uppercase tracking-wide mb-2">BS 7671:2018 Compliance</p>
                <p className={`text-base sm:text-lg font-semibold ${
                  component.current_compliance.toLowerCase().includes('meets') || 
                  component.current_compliance.toLowerCase().includes('compliant')
                    ? 'text-green-400'
                    : 'text-amber-400'
                }`}>
                  {component.current_compliance}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* BS 7671 Requirements - Card Based Layout */}
      {component.bs7671_requirements && component.bs7671_requirements.length > 0 && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              BS 7671:2018 Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-3">
              {component.bs7671_requirements.map((req, index) => (
                <div key={index} className="p-3 sm:p-4 rounded-lg bg-elec-grey/30 border border-elec-yellow/10 min-h-[44px] flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Where Found & Typical Applications */}
      {(component.where_found || (component.typical_applications && component.typical_applications.length > 0)) && (
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Common Uses & Locations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-5">
            {component.where_found && (
              <div className="border-b border-elec-yellow/20 pb-4">
                <p className="text-sm font-medium text-white/90 uppercase tracking-wide mb-2">Where You'll Find This</p>
                <p className="text-sm sm:text-base leading-relaxed text-white/80">{component.where_found}</p>
              </div>
            )}
            {component.typical_applications && component.typical_applications.length > 0 && (
              <div>
                <p className="text-sm font-medium text-white/90 uppercase tracking-wide mb-3">Typical Applications</p>
                <div className="space-y-2">
                  {component.typical_applications.map((app, index) => (
                    <div key={index} className="flex items-start gap-2 min-h-[44px] p-2 rounded bg-elec-grey/20">
                      <span className="text-elec-yellow mt-1">•</span>
                      <span className="text-sm sm:text-base">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Important Information */}
      <div className="space-y-4">
        {component.installation_notes && (
          <Card className="border-elec-yellow/10">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-white">
                <Wrench className="h-5 w-5 text-elec-yellow" />
                Installation Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base leading-relaxed text-white/80">{component.installation_notes}</p>
            </CardContent>
          </Card>
        )}

        {component.replacement_notes && (
          <Card className="border-amber-500/20 bg-amber-500/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-amber-400">
                <Info className="h-5 w-5" />
                Replacement Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base leading-relaxed text-white/80">{component.replacement_notes}</p>
            </CardContent>
          </Card>
        )}

        {component.common_issues && (
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-red-400">
                <Info className="h-5 w-5" />
                Known Issues
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <p className="text-sm sm:text-base leading-relaxed text-white/80">{component.common_issues}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Similar Components */}
      {analysisResult.similar_components && analysisResult.similar_components.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5 text-elec-yellow" />
              Similar Components
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysisResult.similar_components.map((similar, index) => (
                <div key={index} className="p-3 rounded-lg bg-elec-grey/50 border border-border/50">
                  <div className="font-medium text-sm mb-1">{similar.name}</div>
                  {similar.manufacturer && (
                    <div className="text-xs text-muted-foreground mb-1">
                      Manufacturer: {similar.manufacturer}
                    </div>
                  )}
                  {similar.notes && (
                    <div className="text-xs text-muted-foreground">{similar.notes}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {analysisResult.summary && (
        <Card className="border-elec-yellow/10 bg-elec-grey/30">
          <CardContent className="p-6">
            <p className="text-sm leading-relaxed">{analysisResult.summary}</p>
          </CardContent>
        </Card>
      )}

    </div>
  );
}
