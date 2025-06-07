
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  ExternalLink, 
  Clock, 
  PoundSterling, 
  Award,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MapPin,
  RefreshCw,
  Star
} from "lucide-react";
import { AccreditationOption } from "./enhancedAccreditationData";

interface AccreditationDetailViewProps {
  accreditation: AccreditationOption;
  onBack: () => void;
}

const AccreditationDetailView = ({ accreditation, onBack }: AccreditationDetailViewProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Entry Level": return "bg-green-500/10 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/30";
      case "Expert": return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default: return "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30";
    }
  };

  const getPopularityStars = (popularity: number) => {
    const stars = Math.round(popularity / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < stars ? 'text-elec-yellow fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Accreditations
        </Button>
      </div>

      {/* Main Details Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-white mb-2">
                {accreditation.title}
              </CardTitle>
              <p className="text-lg text-elec-yellow mb-3">{accreditation.provider}</p>
              <p className="text-muted-foreground leading-relaxed">
                {accreditation.description}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Badge variant="outline" className={getDifficultyColor(accreditation.difficulty)}>
                {accreditation.level}
              </Badge>
              <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                {accreditation.category}
              </Badge>
              {accreditation.onlineAvailable && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  Online Available
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <div>
                <div className="text-sm font-medium text-white">{accreditation.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              <div>
                <div className="text-sm font-medium text-white">{accreditation.cost}</div>
                <div className="text-xs text-muted-foreground">Investment</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              <div>
                <div className="text-sm font-medium text-white">
                  {accreditation.locations.length > 1 ? 'Multiple' : accreditation.locations[0]}
                </div>
                <div className="text-xs text-muted-foreground">Locations</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <div className="flex">{getPopularityStars(accreditation.popularity)}</div>
              <div>
                <div className="text-sm font-medium text-white">{accreditation.popularity}%</div>
                <div className="text-xs text-muted-foreground">Popularity</div>
              </div>
            </div>
          </div>

          {/* Career Impact */}
          <Card className="bg-elec-yellow/5 border-elec-yellow/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-elec-yellow mt-1" />
                <div>
                  <h4 className="font-medium text-amber-400 mb-1">Career Impact</h4>
                  <p className="text-sm text-muted-foreground">{accreditation.careerImpact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="benefits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-elec-dark">
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-elec-yellow" />
                Key Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accreditation.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-elec-dark/50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
                Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-amber-400 mb-3">Essential Requirements</h4>
                <div className="space-y-2">
                  {accreditation.requirements.map((requirement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-elec-dark/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {accreditation.prerequisites && accreditation.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-red-400 mb-3">Prerequisites</h4>
                  <div className="space-y-2">
                    {accreditation.prerequisites.map((prerequisite, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{prerequisite}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Application Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accreditation.nextSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-elec-dark/50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-elec-yellow" />
                Additional Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-400 mb-2">Accrediting Body</h4>
                  <p className="text-sm text-muted-foreground">{accreditation.accreditationBody}</p>
                </div>
                
                {accreditation.renewalPeriod && (
                  <div className="p-4 bg-elec-dark/50 rounded-lg">
                    <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      Renewal Period
                    </h4>
                    <p className="text-sm text-muted-foreground">{accreditation.renewalPeriod}</p>
                  </div>
                )}
                
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-400 mb-2">Available Locations</h4>
                  <p className="text-sm text-muted-foreground">{accreditation.locations.join(", ")}</p>
                </div>
                
                <div className="p-4 bg-elec-dark/50 rounded-lg">
                  <h4 className="text-sm font-medium text-amber-400 mb-2">Difficulty Level</h4>
                  <p className="text-sm text-muted-foreground">{accreditation.difficulty}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex gap-4">
        {accreditation.website !== "Various providers" && (
          <Button 
            className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
            onClick={() => window.open(accreditation.website, '_blank')}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Provider Website
          </Button>
        )}
        <Button variant="outline" className="border-elec-yellow/30 hover:bg-elec-yellow/10">
          <Star className="mr-2 h-4 w-4" />
          Save to Favourites
        </Button>
      </div>
    </div>
  );
};

export default AccreditationDetailView;
