import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Package, Zap, BookOpen, Wrench, Info, CheckCircle2 } from "lucide-react";

interface ComponentIdentificationResultsProps {
  analysisResult: {
    component?: {
      name: string;
      type: string;
      manufacturer?: string;
      model?: string;
      specifications?: {
        voltage_rating?: string;
        current_rating?: string;
        ip_rating?: string;
        breaking_capacity?: string;
        poles?: string;
        [key: string]: string | undefined;
      };
      bs7671_requirements?: string[];
      typical_applications?: string[];
      installation_notes?: string;
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

  const confidence = component.confidence || 0;
  const confidenceColor = confidence >= 90 ? "bg-green-500/20 text-green-400 border-green-500/30" : 
                          confidence >= 70 ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : 
                          "bg-red-500/20 text-red-400 border-red-500/30";

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-grey">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
              <Package className="h-8 w-8 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{component.name}</h2>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-muted-foreground">
                  {component.type}
                </Badge>
                <Badge className={confidenceColor}>
                  Confidence: {confidence}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Specifications */}
        {component.specifications && Object.keys(component.specifications).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(component.specifications).map(([key, value]) => 
                value ? (
                  <div key={key} className="flex justify-between items-center border-b border-border/50 pb-2">
                    <span className="text-sm text-muted-foreground capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm font-medium text-elec-yellow">{value}</span>
                  </div>
                ) : null
              )}
            </CardContent>
          </Card>
        )}

        {/* Identification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-elec-yellow" />
              Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {component.manufacturer && (
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-sm text-muted-foreground">Manufacturer</span>
                <span className="text-sm font-medium text-elec-yellow">{component.manufacturer}</span>
              </div>
            )}
            {component.model && (
              <div className="flex justify-between items-center border-b border-border/50 pb-2">
                <span className="text-sm text-muted-foreground">Model</span>
                <span className="text-sm font-medium text-elec-yellow">{component.model}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm font-medium text-elec-yellow">{component.type}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BS 7671 Requirements */}
      {component.bs7671_requirements && component.bs7671_requirements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-elec-yellow" />
              BS 7671:2018 Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {component.bs7671_requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Typical Applications */}
      {component.typical_applications && component.typical_applications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-elec-yellow" />
              Typical Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {component.typical_applications.map((app, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-0.5">•</span>
                  <span className="text-sm">{app}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Installation Notes */}
      {component.installation_notes && (
        <Card className="border-elec-yellow/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-elec-yellow" />
              Installation Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{component.installation_notes}</p>
          </CardContent>
        </Card>
      )}

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

      {/* Export Button */}
      <div className="flex justify-center pt-4">
        <Button 
          size="lg"
          className="bg-elec-yellow text-elec-grey hover:bg-elec-yellow/90 font-medium"
          onClick={() => {
            // TODO: Implement component spec sheet export
            console.log('Export component spec sheet');
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Component Sheet
        </Button>
      </div>
    </div>
  );
}
