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
import AccreditationSearchForm, { AccreditationSearchFilters } from "../../../apprentice/career/accreditation/AccreditationSearchForm";
import AccreditationCard from "../../../apprentice/career/accreditation/AccreditationCard";
import AccreditationDetailView from "../../../apprentice/career/accreditation/AccreditationDetailView";
import AccreditationAnalytics from "../../../apprentice/career/accreditation/AccreditationAnalytics";
import { enhancedAccreditationOptions, AccreditationOption } from "../../../apprentice/career/accreditation/enhancedAccreditationData";

const ElectricianProfessionalAccreditation = () => {
  const isMobile = useIsMobile();
  const [filteredOptions, setFilteredOptions] = useState<AccreditationOption[]>(enhancedAccreditationOptions);
  const [selectedAccreditation, setSelectedAccreditation] = useState<AccreditationOption | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "details">("grid");

  const handleSearch = (filters: AccreditationSearchFilters) => {
    let filtered = enhancedAccreditationOptions;

    // Apply search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(option => 
        option.title.toLowerCase().includes(searchLower) ||
        option.provider.toLowerCase().includes(searchLower) ||
        option.description.toLowerCase().includes(searchLower) ||
        option.benefits.some(benefit => benefit.toLowerCase().includes(searchLower)) ||
        option.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category && filters.category !== "All Categories") {
      filtered = filtered.filter(option => option.category === filters.category);
    }

    // Apply level filter
    if (filters.level && filters.level !== "All Levels") {
      filtered = filtered.filter(option => option.level === filters.level);
    }

    // Apply online filter
    if (filters.onlineOnly) {
      filtered = filtered.filter(option => option.onlineAvailable);
    }

    // Apply cost filter
    if (filters.maxCost && filters.maxCost !== "All Costs") {
      filtered = filtered.filter(option => {
        const costStr = option.cost.toLowerCase();
        switch (filters.maxCost) {
          case "Under £200":
            return costStr.includes("£150") || costStr.includes("£100") || costStr.includes("under");
          case "£200-£500":
            return costStr.includes("£200") || costStr.includes("£300") || costStr.includes("£400") || costStr.includes("£250");
          case "£500-£1000":
            return costStr.includes("£500") || costStr.includes("£600") || costStr.includes("£700") || costStr.includes("£800") || costStr.includes("£900");
          case "Over £1000":
            return costStr.includes("£1000") || costStr.includes("£1200") || costStr.includes("over £1000");
          default:
            return true;
        }
      });
    }

    // Apply provider filter
    if (filters.provider && filters.provider !== "All Providers") {
      filtered = filtered.filter(option => 
        option.accreditationBody === filters.provider || option.provider.includes(filters.provider)
      );
    }

    setFilteredOptions(filtered);
  };

  const handleReset = () => {
    setFilteredOptions(enhancedAccreditationOptions);
  };

  const handleViewDetails = (accreditation: AccreditationOption) => {
    setSelectedAccreditation(accreditation);
    setViewMode("details");
  };

  const handleBackToGrid = () => {
    setSelectedAccreditation(null);
    setViewMode("grid");
  };

  if (viewMode === "details" && selectedAccreditation) {
    return (
      <AccreditationDetailView
        accreditation={selectedAccreditation}
        onBack={handleBackToGrid}
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

      {/* Search and Filters */}
      <AccreditationSearchForm 
        onSearch={handleSearch} 
        onReset={handleReset}
        resultsCount={filteredOptions.length}
      />

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
            {filteredOptions.length} {filteredOptions.length === 1 ? 'option' : 'options'}
          </Badge>
        </div>
      </div>

      {/* Accreditations Grid */}
      <div className={`grid gap-6 auto-rows-fr ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {filteredOptions.map((accreditation) => (
          <AccreditationCard
            key={accreditation.id}
            accreditation={accreditation}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredOptions.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-grey">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No accreditations found</h3>
            <p className="text-white mb-4">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Additional Resources */}
      <Card className="border-elec-yellow/20 bg-elec-grey">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Electrical Industry Resources
          </CardTitle>
        </CardHeader>
        <CardContent className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-elec-yellow flex items-center gap-2">
              <Award className="h-5 w-5" />
              Professional Bodies
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">Institution of Engineering and Technology (IET)</p>
                  <p className="text-sm text-white/80 mt-1">Professional engineering institution for electrical professionals</p>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"}
                  className="ml-3 text-elec-yellow hover:text-white hover:bg-elec-yellow/20"
                  onClick={() => window.open('https://www.theiet.org', '_blank')}
                >
                  <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">Electrical Contractors' Association (ECA)</p>
                  <p className="text-sm text-white/80 mt-1">Trade association for electrical contractors and installers</p>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"}
                  className="ml-3 text-elec-yellow hover:text-white hover:bg-elec-yellow/20"
                  onClick={() => window.open('https://www.eca.co.uk', '_blank')}
                >
                  <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">NICEIC</p>
                  <p className="text-sm text-white/80 mt-1">Leading voluntary regulatory body for electrical contractors</p>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"}
                  className="ml-3 text-elec-yellow hover:text-white hover:bg-elec-yellow/20"
                  onClick={() => window.open('https://www.niceic.com', '_blank')}
                >
                  <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-elec-yellow flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Scheme Providers
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">NAPIT Electrical Certification</p>
                  <p className="text-sm text-white/80 mt-1">Certification and registration for electrical competency</p>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"}
                  className="ml-3 text-elec-yellow hover:text-white hover:bg-elec-yellow/20"
                  onClick={() => window.open('https://www.napit.org.uk', '_blank')}
                >
                  <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">STROMA Certification</p>
                  <p className="text-sm text-white/80 mt-1">Assessment and certification services for electrical work</p>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"}
                  className="ml-3 text-elec-yellow hover:text-white hover:bg-elec-yellow/20"
                  onClick={() => window.open('https://www.stroma.com', '_blank')}
                >
                  <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-elec-grey/50 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-white">Find Local Training Centres</p>
                  <p className="text-sm text-white/80 mt-1">Discover approved training providers in your area</p>
                </div>
                <Button 
                  variant="ghost" 
                  size={isMobile ? "sm" : "default"}
                  className="ml-3 text-elec-yellow hover:text-white hover:bg-elec-yellow/20"
                  onClick={() => window.open('https://www.findapprenticeship.service.gov.uk/apprenticeship-training-providers', '_blank')}
                >
                  <ExternalLink className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElectricianProfessionalAccreditation;