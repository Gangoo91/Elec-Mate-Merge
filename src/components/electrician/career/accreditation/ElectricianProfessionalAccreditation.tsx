import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  BookOpen, 
  TrendingUp, 
  Users,
  Target,
  ExternalLink,
  Info,
  ArrowRight
} from "lucide-react";
import AccreditationCard from "./AccreditationCard";
import ElectricianAccreditationDetailView from "./ElectricianAccreditationDetailView";
import AccreditationAnalytics from "../../../apprentice/career/accreditation/AccreditationAnalytics";
import ResourceCard from "./ResourceCard";
import { enhancedAccreditationOptions, AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";

const ElectricianProfessionalAccreditation = () => {
  const isMobile = useIsMobile();
  const [selectedAccreditation, setSelectedAccreditation] = useState<AccreditationOption | null>(null);

  const handleViewDetails = (accreditation: AccreditationOption) => {
    setSelectedAccreditation(accreditation);
  };

  const handleCloseDetails = () => {
    setSelectedAccreditation(null);
  };

  if (selectedAccreditation) {
    return (
      <ElectricianAccreditationDetailView 
        accreditation={selectedAccreditation} 
        onBack={handleCloseDetails}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          Professional Accreditations for Electricians
        </h2>
        <p className="text-white">
          Advance your electrical career with recognised professional accreditations. From industry memberships 
          to specialist certifications, discover the credentials that will enhance your professional standing 
          and open new opportunities in the electrical industry.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <AccreditationAnalytics />


      {/* Information Cards */}
      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} items-start`}>
        <Card className="border-elec-yellow/30 bg-elec-grey shadow-md hover:shadow-lg transition-all duration-300 h-full">
          <CardHeader className="pb-3 border-b border-elec-yellow/20">
            <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40">
                <Target className="h-5 w-5 text-elec-yellow" />
              </div>
              Why Get Accredited as an Electrician?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 flex-1">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Professional Recognition</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Demonstrate expertise and gain credibility with employers through recognised qualifications.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Career Advancement</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Access senior positions and <span className="text-elec-yellow font-semibold">15-25% higher</span> earning potential.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Regulatory Compliance</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Meet <span className="text-elec-yellow font-semibold">BS 7671</span> and Part P regulations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Industry Network</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Connect with professionals and access CPD events.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-elec-grey shadow-md hover:shadow-lg transition-all duration-300 h-full">
          <CardHeader className="pb-3 border-b border-elec-yellow/20">
            <CardTitle className="text-lg font-semibold flex items-center gap-3 text-white">
              <div className="p-1.5 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40">
                <Info className="h-5 w-5 text-elec-yellow" />
              </div>
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3 flex-1">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Assess Your Experience</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Most accreditations require <span className="text-elec-yellow font-semibold">2-5 years</span> of electrical installation experience.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Check Prerequisites</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Typically need <span className="text-elec-yellow font-semibold">Level 3 electrical qualifications, AM2</span>.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Plan Investment</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Initial costs range from <span className="text-elec-yellow font-semibold">£200-£1,500</span> plus annual fees.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all duration-200">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0"></div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm mb-1">Start Early</h4>
                  <p className="text-white/85 text-xs leading-relaxed">Begin applications <span className="text-elec-yellow font-semibold">3-6 months</span> before target date.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium">Available Accreditations</h3>
          <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
            {enhancedAccreditationOptions.length} {enhancedAccreditationOptions.length === 1 ? 'option' : 'options'}
          </Badge>
        </div>
      </div>

      {/* Accreditations Grid */}
      <div className={`grid gap-4 sm:gap-6 auto-rows-fr ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {enhancedAccreditationOptions.map((accreditation) => (
          <AccreditationCard
            key={accreditation.id}
            accreditation={accreditation}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>


      {/* Additional Resources */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Electrical Industry Resources
          </CardTitle>
        </CardHeader>
        <CardContent className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} items-start`}>
          <div className="space-y-4 h-full">
            <h4 className="font-semibold text-lg text-elec-yellow flex items-center gap-2">
              <Award className="h-5 w-5" />
              Professional Bodies
            </h4>
            <div className="grid gap-4 auto-rows-fr">
              <ResourceCard
                title="Institution of Engineering and Technology (IET)"
                description="Professional engineering institution for electrical professionals"
                url="https://www.theiet.org"
                isMobile={isMobile}
              />
              <ResourceCard
                title="Electrical Contractors' Association (ECA)"
                description="Trade association for electrical contractors and installers"
                url="https://www.eca.co.uk"
                isMobile={isMobile}
              />
              <ResourceCard
                title="NICEIC"
                description="Leading voluntary regulatory body for electrical contractors"
                url="https://www.niceic.com"
                isMobile={isMobile}
              />
            </div>
          </div>
          
          <div className="space-y-4 h-full">
            <h4 className="font-semibold text-lg text-elec-yellow flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Scheme Providers
            </h4>
            <div className="grid gap-4 auto-rows-fr">
              <ResourceCard
                title="NAPIT Electrical Certification"
                description="Certification and registration for electrical competency"
                url="https://www.napit.org.uk"
                isMobile={isMobile}
              />
              <ResourceCard
                title="STROMA Certification"
                description="Assessment and certification services for electrical work"
                url="https://www.stroma.com"
                isMobile={isMobile}
              />
              <ResourceCard
                title="Find Local Training Centres"
                description="Discover approved training providers in your area"
                url="https://www.findapprenticeship.service.gov.uk/apprenticeship-training-providers"
                isMobile={isMobile}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricianProfessionalAccreditation;