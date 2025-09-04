import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  X, 
  PoundSterling, 
  CheckCircle, 
  AlertCircle, 
  Zap,
  ShoppingCart,
  TrendingUp,
  Clock,
  Database,
  RefreshCw
} from "lucide-react";

interface GuideRecommendation {
  tool: string;
  price: string;
  supplier: string;
  reason: string;
  compliance: string;
}

interface GuideSection {
  title: string;
  content: string;
  recommendations: GuideRecommendation[];
}

interface GuideData {
  title: string;
  summary: string;
  sections: GuideSection[];
  quickTips: string[];
  budgetBreakdown: {
    starter: string;
    professional: string;
    premium: string;
  };
}

interface AIGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideType: string;
  guideTitle: string;
}

const AIGuideModal = ({ isOpen, onClose, guideType, guideTitle }: AIGuideModalProps) => {
  const [guideData, setGuideData] = useState<GuideData | null>(null);
  const [cacheInfo, setCacheInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const generateGuide = async (forceRefresh = false) => {
    if (!forceRefresh && isInitialLoad) {
      setIsLoading(true);
    }
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-tool-guide', {
        body: { 
          guideType: guideType,
          forceRefresh,
          userProfile: {
            experience: 'professional',
            specialization: 'general_electrical',
            business_type: 'mobile_electrician'
          }
        }
      });

      if (error) {
        console.error('Error loading guide:', error);
        toast({
          title: "Guide Loading Failed",
          description: "Unable to load guide. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setGuideData(data.guide);
      setCacheInfo(data.cacheInfo || null);
      setHasGenerated(true);
      setIsInitialLoad(false);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to load guide data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !hasGenerated) {
      generateGuide(false);
    }
  }, [isOpen, hasGenerated]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-elec-gray border-elec-yellow/20"
        onOpenAutoFocus={() => {}}
      >
        <DialogHeader className="border-b border-elec-yellow/20 pb-4">
          <DialogTitle className="text-2xl text-white flex items-center gap-3">
            <Zap className="h-6 w-6 text-elec-yellow" />
            {guideTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Loading state - only show skeletons for initial load */}
          {!guideData && isLoading && isInitialLoad && (
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-4 w-96 mx-auto" />
              </div>
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-elec-yellow/20 bg-elec-gray/50">
                  <CardHeader>
                    <Skeleton className="h-6 w-48" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {guideData && (
            <>
              {/* Cache Information */}
              {cacheInfo && (
                <Card className="border-blue-500/20 bg-blue-500/10">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-blue-300 mb-2">
                      <Database className="h-4 w-4" />
                      <span className="font-medium">Cache Information</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Last Updated:</span>
                        <p className="text-white font-medium">
                          {new Date(cacheInfo.lastRefreshed).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expires:</span>
                        <p className="text-white font-medium">
                          {new Date(cacheInfo.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Next Refresh:</span>
                        <p className="text-white font-medium">
                          {cacheInfo.nextRefresh ? new Date(cacheInfo.nextRefresh).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Version:</span>
                        <p className="text-white font-medium">v{cacheInfo.cacheVersion}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Guide Summary */}
              <Card className="border-elec-yellow/30 bg-elec-yellow/10">
                <CardContent className="pt-4">
                  <p className="text-white leading-relaxed">{guideData.summary}</p>
                </CardContent>
              </Card>

              {/* Budget Overview */}
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PoundSterling className="h-5 w-5 text-elec-yellow" />
                    Budget Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-elec-gray rounded-lg border border-elec-yellow/20">
                      <div className="text-elec-yellow font-semibold">Starter</div>
                      <div className="text-white text-lg">{guideData.budgetBreakdown.starter}</div>
                    </div>
                    <div className="text-center p-3 bg-elec-gray rounded-lg border border-elec-yellow/20">
                      <div className="text-elec-yellow font-semibold">Professional</div>
                      <div className="text-white text-lg">{guideData.budgetBreakdown.professional}</div>
                    </div>
                    <div className="text-center p-3 bg-elec-gray rounded-lg border border-elec-yellow/20">
                      <div className="text-elec-yellow font-semibold">Premium</div>
                      <div className="text-white text-lg">{guideData.budgetBreakdown.premium}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide Sections */}
              {guideData.sections.map((section, index) => (
                <Card key={index} className="border-elec-yellow/20 bg-elec-gray/50">
                  <CardHeader>
                    <CardTitle className="text-white">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    
                    {section.recommendations.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-elec-yellow" />
                          Recommendations
                        </h4>
                        {section.recommendations.map((rec, idx) => (
                          <div key={idx} className="p-3 bg-elec-gray border border-elec-yellow/20 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="text-white font-medium">{rec.tool}</h5>
                              <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                                {rec.price}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{rec.reason}</p>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-elec-yellow">{rec.supplier}</span>
                              {rec.compliance && (
                                <span className="text-green-400 flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  {rec.compliance}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {/* Quick Tips */}
              {guideData.quickTips.length > 0 && (
                <Card className="border-green-500/20 bg-green-500/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Professional Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guideData.quickTips.map((tip, index) => (
                        <li key={index} className="text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => generateGuide(true)}
                  disabled={isLoading}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Update Guide
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                >
                  Close
                </Button>
              </div>
            </>
          )}

          {!guideData && !isLoading && (
            <Card className="border-elec-yellow/20 bg-elec-gray/50">
              <CardContent className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
                <h3 className="text-white text-lg mb-2">Guide Not Available</h3>
                <p className="text-muted-foreground mb-4">
                  Unable to load the guide at this moment.
                </p>
                <Button 
                  onClick={() => generateGuide(false)}
                  disabled={isLoading}
                  className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  Load Guide
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIGuideModal;