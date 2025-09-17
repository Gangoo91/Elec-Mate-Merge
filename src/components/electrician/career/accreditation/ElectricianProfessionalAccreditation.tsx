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
import AccreditationCard from "../../../apprentice/career/accreditation/AccreditationCard";
import AccreditationDetailView from "../../../apprentice/career/accreditation/AccreditationDetailView";
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
      <AccreditationDetailView 
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
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        <Card className="border-elec-yellow/20 bg-elec-grey">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3">
              <Target className="h-6 w-6 text-elec-yellow" />
              Why Get Accredited as an Electrician?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Professional Recognition</p>
                  <p className="text-white/90 leading-relaxed">Demonstrate your expertise and commitment to electrical industry standards. Gain credibility with employers, clients, and peers through recognised qualifications.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Career Advancement</p>
                  <p className="text-white/90 leading-relaxed">Access senior electrician positions and increased earning potential. Studies show accredited electricians earn 15-25% more than non-accredited peers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Regulatory Compliance</p>
                  <p className="text-white/90 leading-relaxed">Meet BS 7671 and industry requirements for electrical work. Stay compliant with Part P regulations and building control requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Industry Network</p>
                  <p className="text-white/90 leading-relaxed">Connect with electrical professionals and exclusive opportunities. Access CPD events, technical support, and career development resources.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-grey">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3">
              <Info className="h-6 w-6 text-elec-yellow" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Assess Your Experience</p>
                  <p className="text-white/90 leading-relaxed">Consider your electrical work experience and specialisation areas. Most accreditations require 2-5 years of relevant experience in electrical installation work.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Check Prerequisites</p>
                  <p className="text-white/90 leading-relaxed">Ensure you meet the electrical qualifications required. Typically Level 3 electrical qualifications, AM2, and relevant work portfolio evidence.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Plan Investment</p>
                  <p className="text-white/90 leading-relaxed">Budget for certification costs and ongoing professional development. Initial costs range from £200-£1,500 with annual membership fees.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-white mb-1">Start Early</p>
                  <p className="text-white/90 leading-relaxed">Many electrical accreditations require significant practical experience. Begin the application process 3-6 months before your target date.</p>
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
      <div className={`grid gap-6 auto-rows-fr ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
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