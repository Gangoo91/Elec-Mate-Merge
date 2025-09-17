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
      <div className={`grid gap-12 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} items-start`}>
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-grey via-elec-grey/95 to-elec-grey/90 shadow-xl hover:shadow-2xl hover:shadow-elec-yellow/20 transition-all duration-500 h-full overflow-hidden">
          <CardHeader className="pb-8 bg-gradient-to-r from-elec-yellow/15 via-elec-yellow/10 to-transparent border-b border-elec-yellow/20">
            <CardTitle className="text-2xl font-bold flex items-center gap-4 text-white">
              <div className="p-3 rounded-xl bg-elec-yellow/20 border border-elec-yellow/40 shadow-lg">
                <Target className="h-8 w-8 text-elec-yellow" />
              </div>
              Why Get Accredited as an Electrician?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8 flex-1">
            <div className="space-y-8">
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Professional Recognition</h4>
                  <p className="text-white/90 leading-relaxed text-base">Demonstrate your expertise and commitment to electrical industry standards. Gain credibility with employers, clients, and peers through recognised qualifications.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Career Advancement</h4>
                  <p className="text-white/90 leading-relaxed text-base">Access senior electrician positions and increased earning potential. Studies show accredited electricians earn <span className="text-elec-yellow font-bold bg-elec-yellow/20 px-2 py-1 rounded">15-25% more</span> than non-accredited peers.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Regulatory Compliance</h4>
                  <p className="text-white/90 leading-relaxed text-base">Meet <span className="text-elec-yellow font-bold bg-elec-yellow/20 px-2 py-1 rounded">BS 7671</span> and industry requirements for electrical work. Stay compliant with Part P regulations and building control requirements.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Industry Network</h4>
                  <p className="text-white/90 leading-relaxed text-base">Connect with electrical professionals and exclusive opportunities. Access CPD events, technical support, and career development resources.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-grey via-elec-grey/95 to-elec-grey/90 shadow-xl hover:shadow-2xl hover:shadow-elec-yellow/20 transition-all duration-500 h-full overflow-hidden">
          <CardHeader className="pb-8 bg-gradient-to-r from-elec-yellow/15 via-elec-yellow/10 to-transparent border-b border-elec-yellow/20">
            <CardTitle className="text-2xl font-bold flex items-center gap-4 text-white">
              <div className="p-3 rounded-xl bg-elec-yellow/20 border border-elec-yellow/40 shadow-lg">
                <Info className="h-8 w-8 text-elec-yellow" />
              </div>
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8 flex-1">
            <div className="space-y-8">
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Assess Your Experience</h4>
                  <p className="text-white/90 leading-relaxed text-base">Consider your electrical work experience and specialisation areas. Most accreditations require <span className="text-elec-yellow font-bold bg-elec-yellow/20 px-2 py-1 rounded">2-5 years</span> of relevant experience in electrical installation work.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Check Prerequisites</h4>
                  <p className="text-white/90 leading-relaxed text-base">Ensure you meet the electrical qualifications required. Typically <span className="text-elec-yellow font-bold bg-elec-yellow/20 px-2 py-1 rounded">Level 3 electrical qualifications, AM2</span>, and relevant work portfolio evidence.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Plan Investment</h4>
                  <p className="text-white/90 leading-relaxed text-base">Budget for certification costs and ongoing professional development. Initial costs range from <span className="text-elec-yellow font-bold bg-elec-yellow/20 px-2 py-1 rounded">£200-£1,500</span> with annual membership fees.</p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-xl bg-gradient-to-r from-elec-yellow/8 to-elec-yellow/4 border border-elec-yellow/15 hover:border-elec-yellow/30 hover:from-elec-yellow/12 hover:to-elec-yellow/6 transition-all duration-300">
                <div className="w-4 h-4 rounded-full bg-elec-yellow mt-3 flex-shrink-0 shadow-lg shadow-elec-yellow/50"></div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-bold text-white text-xl">Start Early</h4>
                  <p className="text-white/90 leading-relaxed text-base">Many electrical accreditations require significant practical experience. Begin the application process <span className="text-elec-yellow font-bold bg-elec-yellow/20 px-2 py-1 rounded">3-6 months</span> before your target date.</p>
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