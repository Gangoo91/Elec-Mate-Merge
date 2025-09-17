
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
              <p className="text-white/90 leading-relaxed">
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
                <div className="text-xs text-white/70">Duration</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <PoundSterling className="h-5 w-5 text-elec-yellow" />
              <div>
                <div className="text-sm font-medium text-white">{accreditation.cost}</div>
                <div className="text-xs text-white/70">Investment</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <MapPin className="h-5 w-5 text-elec-yellow" />
              <div>
                <div className="text-sm font-medium text-white">
                  {accreditation.locations.length > 1 ? 'Multiple' : accreditation.locations[0]}
                </div>
                <div className="text-xs text-white/70">Locations</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-elec-dark/50 rounded-lg">
              <div className="flex">{getPopularityStars(accreditation.popularity)}</div>
              <div>
                <div className="text-sm font-medium text-white">{accreditation.popularity}%</div>
                <div className="text-xs text-white/70">Popularity</div>
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
                  <p className="text-sm text-white/90">{accreditation.careerImpact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="benefits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-elec-dark">
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-elec-yellow" />
                Comprehensive Benefits Package
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Professional Recognition */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-elec-yellow">Professional Recognition</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-2">Industry Standing</h5>
                    <p className="text-sm text-white/90">Gain instant credibility and recognition within the electrical industry, setting you apart from non-accredited professionals.</p>
                  </div>
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-2">Consumer Trust</h5>
                    <p className="text-sm text-white/90">Customers actively seek accredited professionals, providing immediate confidence in your services and expertise.</p>
                  </div>
                </div>
              </div>

              {/* Business Benefits */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-elec-yellow">Business Advantages</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-2">Higher Rates</h5>
                    <p className="text-sm text-white/90">Command premium pricing - accredited professionals typically charge 15-25% more than non-accredited competitors.</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="font-medium text-blue-400 mb-2">Marketing Edge</h5>
                    <p className="text-sm text-white/90">Use accreditation logos and marketing materials to win more contracts and build trust with potential clients.</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h5 className="font-medium text-purple-400 mb-2">Insurance Discounts</h5>
                    <p className="text-sm text-white/90">Access reduced insurance premiums and preferred rates through accreditation body partnerships.</p>
                  </div>
                </div>
              </div>

              {/* Technical Support */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-elec-yellow">Professional Support</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accreditation.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-elec-dark/50 rounded-lg border border-elec-yellow/10">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/90">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Benefits */}
              <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                <h4 className="text-lg font-semibold text-elec-yellow mb-3">Return on Investment</h4>
                <p className="text-white/90 mb-3">Most professionals recoup their annual membership costs within the first 2-3 contracts through:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span className="text-sm text-white/90">Premium rate justification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span className="text-sm text-white/90">Increased customer confidence</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span className="text-sm text-white/90">Access to larger contracts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                      <span className="text-sm text-white/90">Insurance savings</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertCircle className="h-5 w-5 text-elec-yellow" />
                Detailed Requirements & Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Essential Qualifications */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Essential Qualifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-amber-500/20">
                    <h5 className="font-medium text-amber-400 mb-2">Minimum Qualifications</h5>
                    <div className="space-y-2">
                      {accreditation.requirements.map((requirement, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/90">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-green-500/20">
                    <h5 className="font-medium text-green-400 mb-2">Alternative Pathways</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Equivalent overseas qualifications may be accepted</p>
                      <p>• Apprenticeship completion with appropriate level</p>
                      <p>• Combination of experience and portfolio assessment</p>
                      <p>• Recognition of Prior Learning (RPL) available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Requirements */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Experience Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="font-medium text-blue-400 mb-2">Years Required</h5>
                    <p className="text-sm text-white/90">Minimum 2-4 years post-qualification experience in electrical installation, testing, or design work.</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h5 className="font-medium text-purple-400 mb-2">Type of Work</h5>
                    <p className="text-sm text-white/90">Domestic, commercial, or industrial electrical work with evidence of competence across multiple areas.</p>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-2">Portfolio</h5>
                    <p className="text-sm text-white/90">Documented evidence of completed projects, installations, and ongoing professional development.</p>
                  </div>
                </div>
              </div>

              {/* Technical Competencies */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Technical Competencies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-3">Core Skills Required</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Electrical installation to BS 7671 standards</p>
                      <p>• Testing and inspection procedures</p>
                      <p>• Fault diagnosis and remedial work</p>
                      <p>• Understanding of Building Regulations</p>
                      <p>• Health and safety compliance</p>
                    </div>
                  </div>
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-3">Assessment Areas</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Practical installation assessment</p>
                      <p>• Testing and inspection competence</p>
                      <p>• Knowledge of current regulations</p>
                      <p>• Understanding of safety procedures</p>
                      <p>• Business and customer service skills</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Requirements */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Business Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h5 className="font-medium text-red-400 mb-2">Insurance & Legal</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Public liability insurance (minimum £2m)</p>
                      <p>• Professional indemnity cover</p>
                      <p>• Valid business registration</p>
                      <p>• Compliance with relevant legislation</p>
                    </div>
                  </div>
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-2">Documentation</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Qualification certificates</p>
                      <p>• Work portfolio and references</p>
                      <p>• CPD records and training evidence</p>
                      <p>• Character references</p>
                    </div>
                  </div>
                </div>
              </div>

              {accreditation.prerequisites && accreditation.prerequisites.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-red-400">Critical Prerequisites</h4>
                  <div className="space-y-2">
                    {accreditation.prerequisites.map((prerequisite, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/90 font-medium">{prerequisite}</span>
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
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Complete Application Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preparation Phase */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Phase 1: Preparation (2-4 weeks)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="font-medium text-blue-400 mb-3">Self-Assessment</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Review qualification requirements against your certificates</p>
                      <p>• Assess work experience against competency standards</p>
                      <p>• Check insurance coverage and business documentation</p>
                      <p>• Evaluate readiness for technical assessment</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-3">Document Gathering</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Collect all qualification certificates</p>
                      <p>• Prepare work portfolio with photos and descriptions</p>
                      <p>• Obtain character and professional references</p>
                      <p>• Gather insurance certificates and business documents</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Process */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Phase 2: Application Process (1-2 weeks)</h4>
                <div className="space-y-3">
                  {accreditation.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <div className="flex-shrink-0 w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white/90 font-medium">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Stage */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Phase 3: Assessment (2-6 weeks)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <h5 className="font-medium text-purple-400 mb-3">Technical Assessment</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• On-site practical assessment</p>
                      <p>• Review of work portfolio</p>
                      <p>• Testing and inspection demonstration</p>
                      <p>• Knowledge interview</p>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <h5 className="font-medium text-amber-400 mb-3">What to Expect</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• 2-4 hour assessment duration</p>
                      <p>• Friendly, supportive assessor</p>
                      <p>• Real-world scenarios</p>
                      <p>• Opportunity to demonstrate skills</p>
                    </div>
                  </div>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h5 className="font-medium text-red-400 mb-3">Common Challenges</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Nervousness affecting performance</p>
                      <p>• Incomplete documentation</p>
                      <p>• Outdated regulation knowledge</p>
                      <p>• Limited testing experience</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success & Setup */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Phase 4: Approval & Setup (1-2 weeks)</h4>
                <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-3">After Approval</h5>
                      <div className="space-y-2 text-sm text-white/90">
                        <p>• Receive accreditation certificate and materials</p>
                        <p>• Set up online account and access to resources</p>
                        <p>• Download marketing materials and logos</p>
                        <p>• Schedule ongoing assessment dates</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-3">Getting Started</h5>
                      <div className="space-y-2 text-sm text-white/90">
                        <p>• Update business materials with accreditation</p>
                        <p>• Contact existing clients about new status</p>
                        <p>• Register for CPD and training events</p>
                        <p>• Begin building regulatory compliance history</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Overview */}
              <div className="p-4 bg-elec-dark/50 border border-elec-yellow/20 rounded-lg">
                <h5 className="font-medium text-elec-yellow mb-3">Total Timeline: 6-12 weeks from start to finish</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-white/90">
                  <div className="text-center p-3 bg-elec-yellow/10 rounded">
                    <p className="font-medium">Preparation</p>
                    <p className="text-xs">2-4 weeks</p>
                  </div>
                  <div className="text-center p-3 bg-elec-yellow/10 rounded">
                    <p className="font-medium">Application</p>
                    <p className="text-xs">1-2 weeks</p>
                  </div>
                  <div className="text-center p-3 bg-elec-yellow/10 rounded">
                    <p className="font-medium">Assessment</p>
                    <p className="text-xs">2-6 weeks</p>
                  </div>
                  <div className="text-center p-3 bg-elec-yellow/10 rounded">
                    <p className="font-medium">Setup</p>
                    <p className="text-xs">1-2 weeks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="getting-started">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Getting Started Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Readiness Assessment */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Readiness Assessment Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-3">✅ Ready to Apply</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Hold relevant electrical qualifications</p>
                      <p>• Have 2+ years post-qualification experience</p>
                      <p>• Current public liability insurance</p>
                      <p>• Portfolio of completed electrical work</p>
                      <p>• Up-to-date with BS 7671 regulations</p>
                    </div>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <h5 className="font-medium text-amber-400 mb-3">⚠️ Need Preparation</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Missing key qualifications</p>
                      <p>• Limited electrical experience</p>
                      <p>• No insurance or business setup</p>
                      <p>• Outdated regulation knowledge</p>
                      <p>• Insufficient work portfolio</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preparation Timeline */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">3-6 Month Preparation Plan</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-elec-dark/50 border border-blue-500/20 rounded-lg">
                    <h5 className="font-medium text-blue-400 mb-3">Months 1-2: Foundation Building</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p className="font-medium mb-2">Qualifications</p>
                        <p>• Complete any missing electrical qualifications</p>
                        <p>• Update 18th Edition BS 7671 certification</p>
                        <p>• Consider additional testing qualifications</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Business Setup</p>
                        <p>• Arrange appropriate insurance coverage</p>
                        <p>• Register business if not already done</p>
                        <p>• Set up basic business documentation</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-elec-dark/50 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-3">Months 3-4: Experience & Portfolio</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p className="font-medium mb-2">Gain Experience</p>
                        <p>• Focus on diverse electrical projects</p>
                        <p>• Develop testing and inspection skills</p>
                        <p>• Work on different types of installations</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Build Portfolio</p>
                        <p>• Document completed projects with photos</p>
                        <p>• Collect client testimonials</p>
                        <p>• Gather work certificates and references</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-elec-dark/50 border border-purple-500/20 rounded-lg">
                    <h5 className="font-medium text-purple-400 mb-3">Months 5-6: Final Preparation</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/90">
                      <div>
                        <p className="font-medium mb-2">Knowledge Review</p>
                        <p>• Refresh understanding of current regulations</p>
                        <p>• Practice testing and inspection procedures</p>
                        <p>• Review certification requirements</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Application Ready</p>
                        <p>• Complete all required documentation</p>
                        <p>• Schedule assessment appointment</p>
                        <p>• Prepare for technical evaluation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Complete Cost Analysis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-dark/50 border border-elec-yellow/20 rounded-lg">
                    <h5 className="font-medium text-elec-yellow mb-3">Initial Investment</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <div className="flex justify-between">
                        <span>Application fee:</span>
                        <span className="font-medium">{accreditation.cost.split(' ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assessment cost:</span>
                        <span className="font-medium">£200-400</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Documentation:</span>
                        <span className="font-medium">£50-100</span>
                      </div>
                      <div className="border-t border-elec-yellow/20 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total Year 1:</span>
                          <span className="text-elec-yellow">£650-1,700</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-3">Return on Investment</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <div className="flex justify-between">
                        <span>Average rate increase:</span>
                        <span className="font-medium">15-25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance savings:</span>
                        <span className="font-medium">£200-500/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Typical payback:</span>
                        <span className="font-medium">2-3 contracts</span>
                      </div>
                      <div className="border-t border-green-500/20 pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>ROI Timeline:</span>
                          <span className="text-green-400">3-6 months</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="text-lg font-semibold text-red-400 mb-3">Avoid These Common Mistakes</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm text-white/90">
                    <p>• <span className="font-medium text-red-400">Rushing the application</span> - Take time to prepare properly</p>
                    <p>• <span className="font-medium text-red-400">Incomplete documentation</span> - Gather all required evidence</p>
                    <p>• <span className="font-medium text-red-400">Outdated knowledge</span> - Update regulation understanding</p>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <p>• <span className="font-medium text-red-400">Insufficient experience</span> - Build diverse work portfolio</p>
                    <p>• <span className="font-medium text-red-400">Poor preparation for assessment</span> - Practice and review</p>
                    <p>• <span className="font-medium text-red-400">Inadequate insurance</span> - Ensure proper coverage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Award className="h-5 w-5 text-elec-yellow" />
                Comprehensive Details & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Industry Recognition */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Industry Recognition & Standing</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-blue-500/20">
                    <h5 className="font-medium text-blue-400 mb-2">Market Recognition</h5>
                    <p className="text-sm text-white/90">Recognised by {accreditation.popularity}% of UK electrical professionals and trusted by major contractors nationwide.</p>
                  </div>
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-green-500/20">
                    <h5 className="font-medium text-green-400 mb-2">Consumer Awareness</h5>
                    <p className="text-sm text-white/90">High consumer recognition with active promotion through government and industry channels.</p>
                  </div>
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-purple-500/20">
                    <h5 className="font-medium text-purple-400 mb-2">Regulatory Standing</h5>
                    <p className="text-sm text-white/90">Full government recognition for Building Regulations compliance and notification rights.</p>
                  </div>
                </div>
              </div>

              {/* Career Progression */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Career Progression Opportunities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-3">Next Steps</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Progress to senior contractor status</p>
                      <p>• Develop specialist expertise areas</p>
                      <p>• Become approved instructor or assessor</p>
                      <p>• Expand into related electrical disciplines</p>
                      <p>• Consider professional engineering registration</p>
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h5 className="font-medium text-green-400 mb-3">Earning Potential</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Immediate rate increase: 15-25%</p>
                      <p>• Access to premium commercial contracts</p>
                      <p>• Insurance savings: £200-500 annually</p>
                      <p>• Long-term career value: £10,000+ annually</p>
                      <p>• Business expansion opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Time Commitment */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Ongoing Commitment & Maintenance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <h5 className="font-medium text-amber-400 mb-3">Annual Requirements</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Renewal fee: {accreditation.cost}</p>
                      <p>• Annual assessment or surveillance visit</p>
                      <p>• CPD evidence: 20-30 hours annually</p>
                      <p>• Insurance maintenance and updates</p>
                      <p>• Regulation knowledge updates</p>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h5 className="font-medium text-blue-400 mb-3">Time Investment</h5>
                    <div className="space-y-2 text-sm text-white/90">
                      <p>• Assessment preparation: 2-4 hours monthly</p>
                      <p>• CPD activities: 2-3 hours monthly</p>
                      <p>• Documentation updates: 1 hour monthly</p>
                      <p>• Total time commitment: 5-8 hours monthly</p>
                      <p>• Additional benefits outweigh time investment</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accreditation Details */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-elec-yellow">Accreditation Specifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                    <h5 className="font-medium text-amber-400 mb-2">Accrediting Body</h5>
                    <p className="text-sm text-white/90 mb-3">{accreditation.accreditationBody}</p>
                    
                    <h5 className="font-medium text-amber-400 mb-2">Coverage Areas</h5>
                    <p className="text-sm text-white/90 mb-3">{accreditation.locations.join(", ")}</p>

                    <h5 className="font-medium text-amber-400 mb-2">Difficulty Assessment</h5>
                    <p className="text-sm text-white/90">{accreditation.difficulty} - suitable for experienced electrical professionals</p>
                  </div>
                  
                  {accreditation.renewalPeriod && (
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2 flex items-center gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Renewal Schedule
                      </h5>
                      <p className="text-sm text-white/90 mb-3">{accreditation.renewalPeriod}</p>
                      
                      <h5 className="font-medium text-amber-400 mb-2">Member Support</h5>
                      <p className="text-sm text-white/90">24/7 technical helpline, online resources, member forums, and regular updates on regulation changes.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Success Stories */}
              <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                <h4 className="text-lg font-semibold text-elec-yellow mb-4">Success Stories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-elec-dark/50 rounded border border-green-500/20">
                    <p className="text-sm text-white/90 italic mb-2">"Within 6 months of gaining accreditation, I increased my rates by 20% and secured three major commercial contracts that I wouldn't have been considered for previously."</p>
                    <p className="text-xs text-green-400">- Sarah M., Electrical Contractor, Manchester</p>
                  </div>
                  <div className="p-3 bg-elec-dark/50 rounded border border-blue-500/20">
                    <p className="text-sm text-white/90 italic mb-2">"The credibility this accreditation gives me with clients is invaluable. Customers trust me immediately, and I've seen a 40% increase in repeat business."</p>
                    <p className="text-xs text-blue-400">- James T., Independent Electrician, Birmingham</p>
                  </div>
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
