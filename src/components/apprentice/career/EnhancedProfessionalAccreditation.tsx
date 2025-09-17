
import { useState } from "react";
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
import AccreditationSearchForm, { AccreditationSearchFilters } from "./accreditation/AccreditationSearchForm";
import AccreditationCard from "./accreditation/AccreditationCard";
import AccreditationDetailView from "./accreditation/AccreditationDetailView";
import AccreditationAnalytics from "./accreditation/AccreditationAnalytics";
import { enhancedAccreditationOptions, AccreditationOption } from "./accreditation/enhancedAccreditationData";

const EnhancedProfessionalAccreditation = () => {
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
          Professional Accreditations
        </h2>
        <p className="text-muted-foreground">
          Advance your electrical career with recognised professional accreditations. From industry memberships 
          to specialist certifications, discover the credentials that will enhance your professional standing 
          and open new opportunities.
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Why Get Accredited?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong className="text-white">Professional Recognition:</strong> Demonstrate your expertise and commitment to industry standards</p>
              <p>• <strong className="text-white">Career Advancement:</strong> Access higher-level positions and increased earning potential</p>
              <p>• <strong className="text-white">Continuous Learning:</strong> Stay current with evolving technologies and regulations</p>
              <p>• <strong className="text-white">Network Access:</strong> Connect with industry professionals and exclusive opportunities</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-elec-yellow" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• <strong className="text-white">Assess Your Goals:</strong> Consider your career objectives and specialisation interests</p>
              <p>• <strong className="text-white">Check Requirements:</strong> Ensure you meet the prerequisites for your chosen accreditation</p>
              <p>• <strong className="text-white">Plan Your Investment:</strong> Budget for training costs and ongoing renewal fees</p>
              <p>• <strong className="text-white">Start Early:</strong> Many accreditations require time to complete and demonstrate competence</p>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No accreditations found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or explore different categories.
            </p>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Additional Resources */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            Professional Development Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 text-amber-400">Industry Bodies</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Institution of Engineering and Technology (IET)</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://www.theiet.org', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Electrical Contractors' Association (ECA)</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://www.eca.co.uk', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">NICEIC</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://www.niceic.com', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 text-amber-400">Training Providers</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">CITB Construction Training</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://www.citb.co.uk', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">IOSH Training Network</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open('https://www.iosh.com', '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Local Training Centres</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedProfessionalAccreditation;
