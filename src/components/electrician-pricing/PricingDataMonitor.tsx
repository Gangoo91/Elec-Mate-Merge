import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Database, RefreshCw, MessageSquare, CheckCircle, AlertCircle, Users, ArrowDown } from "lucide-react";
import { useState } from "react";

interface PricingDataMonitorProps {
  totalRecords: number;
  lastUpdated: string;
  approximateCount: number;
  averageConfidence: number;
  dataSource: string;
}

const PricingDataMonitor = ({
  totalRecords,
  lastUpdated,
  approximateCount,
  averageConfidence,
  dataSource
}: PricingDataMonitorProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'destructive';
  };

  const getDataSourceBadge = (source: string) => {
    switch (source) {
      case 'market_research': return { variant: 'success' as const, label: 'Market Research' };
      case 'reed_api': return { variant: 'default' as const, label: 'Live API Data' };
      case 'mock_realistic': return { variant: 'warning' as const, label: 'Sample Data' };
      default: return { variant: 'outline' as const, label: 'Mixed Sources' };
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback.trim()) return;
    
    // Here you would typically send feedback to your backend
    console.log('Submitting feedback:', feedback);
    
    // Reset form
    setFeedback("");
    setShowFeedback(false);
    
    // Show success message (you could use a toast here)
    alert('Thank you for your feedback! We will review and improve our data quality.');
  };

  const scrollToCommunityForm = () => {
    const communityForm = document.querySelector('[data-community-form]');
    if (communityForm) {
      communityForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const sourceBadge = getDataSourceBadge(dataSource);

  return (
    <div className="space-y-4">
      {/* Community Contribution Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Help Build Accurate UK Pricing</h3>
                <p className="text-sm text-blue-700">
                  Share real prices from your area - takes 2 minutes, helps thousands of electricians
                </p>
              </div>
            </div>
            <Button 
              onClick={scrollToCommunityForm}
              className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
            >
              <ArrowDown className="h-4 w-4 mr-2" />
              Add Your Price
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Data Quality Monitor */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Database className="h-5 w-5 text-elec-yellow" />
            Pricing Data Quality Monitor
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Data Quality Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">{totalRecords}</div>
              <div className="text-xs text-muted-foreground">Total Records</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold flex items-center justify-center gap-1">
                <Badge variant={getConfidenceColor(averageConfidence)} className="text-lg px-2">
                  {averageConfidence}%
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">Avg Confidence</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{approximateCount}</div>
              <div className="text-xs text-muted-foreground">Estimates</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{totalRecords - approximateCount}</div>
              <div className="text-xs text-muted-foreground">Observed</div>
            </div>
          </div>

          {/* Data Source & Freshness */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-elec-yellow/10">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Data Source:</span>
              <Badge variant={sourceBadge.variant}>{sourceBadge.label}</Badge>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              Last updated: {new Date(lastUpdated).toLocaleString('en-GB')}
            </div>
          </div>

          {/* Quality Indicators */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              {averageConfidence >= 80 ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-orange-500" />
              )}
              <span className={averageConfidence >= 80 ? 'text-green-600' : 'text-orange-600'}>
                Data quality: {averageConfidence >= 80 ? 'Good' : averageConfidence >= 60 ? 'Fair' : 'Needs improvement'}
              </span>
            </div>
            
            {approximateCount > totalRecords * 0.3 && (
              <div className="flex items-center gap-2 text-sm text-orange-600">
                <AlertTriangle className="h-4 w-4" />
                <span>High proportion of estimated data - community submissions would improve accuracy</span>
              </div>
            )}
          </div>

          {/* Feedback Section */}
          <div className="pt-3 border-t border-elec-yellow/10">
            {!showFeedback ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFeedback(true)}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Report Data Issue or Provide Feedback
              </Button>
            ) : (
              <div className="space-y-3">
                <textarea
                  placeholder="Please describe any pricing discrepancies or provide feedback on data accuracy..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-3 border border-elec-yellow/20 rounded-md bg-elec-gray text-sm min-h-[80px] resize-none"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleFeedbackSubmit} disabled={!feedback.trim()}>
                    Submit Feedback
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowFeedback(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Coverage Information */}
          <div className="text-xs text-muted-foreground bg-elec-yellow/5 p-3 rounded-lg">
            <strong>Coverage Information:</strong> Our pricing data combines market research, live job boards, and community submissions from UK electricians. 
            Prices are updated nightly with higher accuracy in metropolitan areas. 
            Community-verified prices provide the most accurate local rates.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingDataMonitor;
