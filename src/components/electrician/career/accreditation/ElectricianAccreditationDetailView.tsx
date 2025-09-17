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
import { AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";

interface ElectricianAccreditationDetailViewProps {
  accreditation: AccreditationOption;
  onBack: () => void;
}

const ElectricianAccreditationDetailView = ({ accreditation, onBack }: ElectricianAccreditationDetailViewProps) => {
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
        className={`h-4 w-4 ${i < stars ? 'text-elec-yellow fill-current' : 'text-white/30'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack} className="text-white border-white/20 hover:bg-white/10">
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
      <div className="space-y-6">
        <Tabs defaultValue="benefits" className="space-y-0">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-1 bg-elec-dark p-1 rounded-lg mb-10 md:mb-12">
            <TabsTrigger 
              value="benefits" 
              className="text-xs md:text-sm px-2 py-3 rounded-md data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70 hover:text-white transition-all"
            >
              Benefits
            </TabsTrigger>
            <TabsTrigger 
              value="requirements" 
              className="text-xs md:text-sm px-2 py-3 rounded-md data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70 hover:text-white transition-all"
            >
              Requirements
            </TabsTrigger>
            <TabsTrigger 
              value="process" 
              className="text-xs md:text-sm px-2 py-3 rounded-md data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70 hover:text-white transition-all"
            >
              Process
            </TabsTrigger>
            <TabsTrigger 
              value="getting-started" 
              className="text-xs md:text-sm px-2 py-3 rounded-md data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70 hover:text-white transition-all"
            >
              Get Started
            </TabsTrigger>
            <TabsTrigger 
              value="details" 
              className="text-xs md:text-sm px-2 py-3 rounded-md data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70 hover:text-white transition-all"
            >
              Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="benefits" className="mt-10 md:mt-0">
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

          <TabsContent value="requirements" className="mt-10 md:mt-0">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-amber-500/20 h-full flex flex-col">
                      <h5 className="font-medium text-amber-400 mb-3">Minimum Qualifications</h5>
                      <div className="space-y-2 flex-1">
                        {accreditation.requirements.map((requirement, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/90">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-green-500/20 h-full flex flex-col">
                      <h5 className="font-medium text-green-400 mb-3">Alternative Pathways</h5>
                      <div className="space-y-2 text-sm text-white/90 flex-1">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg h-full flex flex-col">
                      <h5 className="font-medium text-blue-400 mb-3">Years Required</h5>
                      <p className="text-sm text-white/90 flex-1">Minimum 2-4 years post-qualification experience in electrical installation, testing, or design work.</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg h-full flex flex-col">
                      <h5 className="font-medium text-purple-400 mb-3">Type of Work</h5>
                      <p className="text-sm text-white/90 flex-1">Domestic, commercial, or industrial electrical work with evidence of competence across multiple areas.</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg h-full flex flex-col">
                      <h5 className="font-medium text-green-400 mb-3">Portfolio</h5>
                      <p className="text-sm text-white/90 flex-1">Documented evidence of completed projects, installations, and ongoing professional development.</p>
                    </div>
                  </div>
                </div>

                {/* Technical Competencies */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Technical Competencies</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20 h-full flex flex-col">
                      <h5 className="font-medium text-amber-400 mb-3">Core Skills Required</h5>
                      <div className="space-y-2 text-sm text-white/90 flex-1">
                        <p>• Electrical installation to BS 7671 standards</p>
                        <p>• Testing and inspection procedures</p>
                        <p>• Fault diagnosis and remedial work</p>
                        <p>• Understanding of Building Regulations</p>
                        <p>• Health and safety compliance</p>
                      </div>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20 h-full flex flex-col">
                      <h5 className="font-medium text-amber-400 mb-3">Assessment Areas</h5>
                      <div className="space-y-2 text-sm text-white/90 flex-1">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg h-full flex flex-col">
                      <h5 className="font-medium text-red-400 mb-3">Insurance & Legal</h5>
                      <div className="space-y-2 text-sm text-white/90 flex-1">
                        <p>• Public liability insurance (minimum £2m)</p>
                        <p>• Professional indemnity cover</p>
                        <p>• Valid business registration</p>
                        <p>• Compliance with relevant legislation</p>
                      </div>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20 h-full flex flex-col">
                      <h5 className="font-medium text-amber-400 mb-3">Documentation</h5>
                      <div className="space-y-2 text-sm text-white/90 flex-1">
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
                    <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                      <p className="text-white/90 mb-3">The following are mandatory requirements before you can begin the application process:</p>
                      <div className="space-y-2">
                        {accreditation.prerequisites.map((prerequisite, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <AlertCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white/90">{prerequisite}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process" className="mt-10 md:mt-0">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <RefreshCw className="h-5 w-5 text-elec-yellow" />
                  Application Process & Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Process Steps */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Step-by-Step Process</h4>
                  <div className="space-y-4">
                    {accreditation.nextSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/10">
                        <div className="flex-shrink-0 w-8 h-8 bg-elec-yellow/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-elec-yellow">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-white mb-1">Step {idx + 1}</h5>
                          <p className="text-sm text-white/90">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Typical Timeline</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h5 className="font-medium text-blue-400 mb-2">Preparation Phase</h5>
                      <p className="text-sm text-white/90">2-4 weeks to gather documents, complete applications, and prepare for assessments.</p>
                    </div>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <h5 className="font-medium text-amber-400 mb-2">Assessment Phase</h5>
                      <p className="text-sm text-white/90">1-6 weeks for application review, competency assessment, and any required interviews.</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="font-medium text-green-400 mb-2">Approval Phase</h5>
                      <p className="text-sm text-white/90">1-2 weeks for final decision and certification processing.</p>
                    </div>
                  </div>
                </div>

                {/* Assessment Methods */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Assessment Methods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Portfolio Assessment</h5>
                      <p className="text-sm text-white/90 mb-2">Comprehensive review of:</p>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• Work examples and certificates</li>
                        <li>• Client testimonials</li>
                        <li>• Continuing Professional Development records</li>
                        <li>• Compliance documentation</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">On-site Assessment</h5>
                      <p className="text-sm text-white/90 mb-2">Practical evaluation including:</p>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• Installation work quality</li>
                        <li>• Testing and inspection competence</li>
                        <li>• Safety compliance verification</li>
                        <li>• Technical interview</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Success Tips */}
                <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-elec-yellow mb-3">Success Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="font-medium text-white">Before You Apply</h5>
                      <div className="space-y-1 text-sm text-white/90">
                        <p>• Ensure all qualifications are current</p>
                        <p>• Gather comprehensive work portfolio</p>
                        <p>• Complete any required CPD hours</p>
                        <p>• Verify insurance coverage</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium text-white">During Assessment</h5>
                      <div className="space-y-1 text-sm text-white/90">
                        <p>• Be prepared for technical questions</p>
                        <p>• Demonstrate current regulation knowledge</p>
                        <p>• Show evidence of safe working practices</p>
                        <p>• Maintain professional communication</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="getting-started" className="mt-10 md:mt-0">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-elec-yellow" />
                  Getting Started - Action Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Immediate Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Immediate Actions (This Week)</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="font-medium text-green-400 mb-2">1. Self-Assessment</h5>
                      <p className="text-sm text-white/90 mb-2">Review your current situation against the requirements:</p>
                      <ul className="text-sm text-white/70 space-y-1">
                        <li>• Check qualification validity dates</li>
                        <li>• Calculate years of relevant experience</li>
                        <li>• Review current insurance coverage</li>
                        <li>• Assess competency in required areas</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h5 className="font-medium text-blue-400 mb-2">2. Visit Provider Website</h5>
                      <p className="text-sm text-white/90">Access detailed application information and current requirements directly from the accreditation body.</p>
                      {accreditation.website && (
                        <div className="mt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(accreditation.website, '_blank')}
                            className="text-white border-white/20 hover:bg-white/10"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Visit Provider Website
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Short-term Actions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Short-term Actions (Next 2-4 Weeks)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Document Preparation</h5>
                      <ul className="text-sm text-white/90 space-y-1">
                        <li>• Gather qualification certificates</li>
                        <li>• Compile work portfolio</li>
                        <li>• Obtain character references</li>
                        <li>• Update CPD records</li>
                        <li>• Prepare business documentation</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Skills Development</h5>
                      <ul className="text-sm text-white/90 space-y-1">
                        <li>• Review current regulations (BS 7671)</li>
                        <li>• Update testing and inspection knowledge</li>
                        <li>• Complete any required CPD</li>
                        <li>• Practice technical assessment areas</li>
                        <li>• Refresh safety procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Financial Planning */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Financial Planning</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <h5 className="font-medium text-amber-400 mb-2">Initial Investment</h5>
                      <p className="text-lg font-semibold text-white mb-1">{accreditation.cost}</p>
                      <p className="text-sm text-white/70">Application and assessment fees</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h5 className="font-medium text-purple-400 mb-2">Annual Costs</h5>
                      <p className="text-sm text-white/90">Membership fees typically range from £200-£600 annually, depending on business size.</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="font-medium text-green-400 mb-2">Return Potential</h5>
                      <p className="text-sm text-white/90">15-25% premium rates typically recover investment within 2-3 contracts.</p>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="p-4 bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg">
                  <h4 className="text-lg font-semibold text-elec-yellow mb-3">Your Next Steps</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-elec-yellow/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-elec-yellow">1</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Review Requirements Thoroughly</p>
                        <p className="text-sm text-white/70">Ensure you meet all prerequisites before applying</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-elec-yellow/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-elec-yellow">2</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Contact the Provider</p>
                        <p className="text-sm text-white/70">Speak directly with their team about your specific situation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-elec-yellow/20 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-xs font-semibold text-elec-yellow">3</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">Begin Document Preparation</p>
                        <p className="text-sm text-white/70">Start gathering required documentation early</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-10 md:mt-0">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Award className="h-5 w-5 text-elec-yellow" />
                  Detailed Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Provider Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Provider Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">About {accreditation.provider}</h5>
                      <p className="text-sm text-white/90">Leading professional body in the electrical industry, providing certification and support services to electrical professionals across the UK.</p>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Recognition & Standards</h5>
                      <div className="space-y-2 text-sm text-white/90">
                        <p>• Recognised by government bodies</p>
                        <p>• Compliant with industry standards</p>
                        <p>• Member of professional associations</p>
                        <p>• Regular quality assessments</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Scope */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Scope of Accreditation</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Work Types Covered</h5>
                      <div className="space-y-1 text-sm text-white/90">
                        <p>• Domestic electrical installations</p>
                        <p>• Commercial electrical work</p>
                        <p>• Industrial electrical systems</p>
                        <p>• Testing and inspection services</p>
                        <p>• Electrical design and planning</p>
                      </div>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Regulatory Coverage</h5>
                      <div className="space-y-1 text-sm text-white/90">
                        <p>• BS 7671 (IET Wiring Regulations)</p>
                        <p>• Building Regulations Part P</p>
                        <p>• Health and Safety regulations</p>
                        <p>• Environmental standards</p>
                        <p>• Consumer protection legislation</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support and Training */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Ongoing Support</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h5 className="font-medium text-blue-400 mb-2">Technical Support</h5>
                      <p className="text-sm text-white/90">Access to technical helpline, regulation updates, and expert guidance on complex installations.</p>
                    </div>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <h5 className="font-medium text-green-400 mb-2">Training Resources</h5>
                      <p className="text-sm text-white/90">Continuing Professional Development courses, webinars, and certification updates.</p>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h5 className="font-medium text-purple-400 mb-2">Business Support</h5>
                      <p className="text-sm text-white/90">Marketing materials, business advice, and networking opportunities with other professionals.</p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                {accreditation.locations && accreditation.locations.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-elec-yellow">Available Locations</h4>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {accreditation.locations.map((location, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-elec-yellow" />
                            <span className="text-sm text-white/90">{location}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Validity and Renewal */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-elec-yellow">Validity & Renewal</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Certification Period</h5>
                      <p className="text-sm text-white/90">Most accreditations are valid for 12 months, with annual renewal required to maintain certification status.</p>
                    </div>
                    <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                      <h5 className="font-medium text-amber-400 mb-2">Renewal Requirements</h5>
                      <div className="space-y-1 text-sm text-white/90">
                        <p>• Annual membership fee payment</p>
                        <p>• Minimum CPD hours completion</p>
                        <p>• Continued insurance coverage</p>
                        <p>• Periodic competency assessments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-elec-yellow/20">
        {accreditation.website && (
          <Button
            variant="default"
            onClick={() => window.open(accreditation.website, '_blank')}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-1"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Provider Website
          </Button>
        )}
      </div>
    </div>
  );
};

export default ElectricianAccreditationDetailView;