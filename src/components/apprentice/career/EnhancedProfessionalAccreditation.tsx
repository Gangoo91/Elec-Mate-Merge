
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  ArrowLeft, 
  Search, 
  Filter, 
  PoundSterling, 
  Clock, 
  Users, 
  CheckCircle, 
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Target,
  BookOpen,
  Star,
  Info
} from "lucide-react";
import { ukAccreditations, accreditationCategories, accreditationLevels, fundingTypes, UKAccreditation } from "./education/enhancedAccreditationData";

const EnhancedProfessionalAccreditation = () => {
  const [filteredAccreditations, setFilteredAccreditations] = useState<UKAccreditation[]>(ukAccreditations);
  const [selectedAccreditation, setSelectedAccreditation] = useState<UKAccreditation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedFunding, setSelectedFunding] = useState("All Funding Types");

  const handleSearch = () => {
    let filtered = ukAccreditations;

    // Apply search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(acc => 
        acc.title.toLowerCase().includes(searchLower) ||
        acc.provider.toLowerCase().includes(searchLower) ||
        acc.description.toLowerCase().includes(searchLower) ||
        acc.benefits.some(benefit => benefit.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(acc => acc.category === selectedCategory);
    }

    // Apply level filter
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter(acc => acc.level === selectedLevel);
    }

    // Apply funding filter
    if (selectedFunding !== "All Funding Types") {
      const fundingMap: { [key: string]: keyof UKAccreditation['eligibleFunding'] } = {
        "Apprenticeship Levy": "apprenticeshipLevy",
        "Government Support": "governmentSupport",
        "Employer Support": "employerSupport",
        "Professional Body Grants": "professionalbodyGrants"
      };
      const fundingKey = fundingMap[selectedFunding];
      if (fundingKey) {
        filtered = filtered.filter(acc => acc.eligibleFunding[fundingKey]);
      }
    }

    setFilteredAccreditations(filtered);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All Levels");
    setSelectedFunding("All Funding Types");
    setFilteredAccreditations(ukAccreditations);
  };

  const handleViewDetails = (accreditation: UKAccreditation) => {
    setSelectedAccreditation(accreditation);
  };

  const handleBackToGrid = () => {
    setSelectedAccreditation(null);
  };

  if (selectedAccreditation) {
    const Icon = selectedAccreditation.icon;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBackToGrid}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Accreditations
          </Button>
        </div>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-elec-yellow" />
                <div>
                  <CardTitle className="text-2xl">{selectedAccreditation.title}</CardTitle>
                  <p className="text-amber-400 text-lg">{selectedAccreditation.provider}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="outline" className={`mb-2 ${
                  selectedAccreditation.level === "Advanced" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                  selectedAccreditation.level === "Professional" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
                  selectedAccreditation.level === "Foundation" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
                  "bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}>
                  {selectedAccreditation.level}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Success Rate: {selectedAccreditation.successRate}%
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
                <TabsTrigger value="process">Process</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <PoundSterling className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">Total Cost</span>
                      </div>
                      <div className="text-lg font-bold text-white">{selectedAccreditation.costs.totalCost}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">Duration</span>
                      </div>
                      <div className="text-lg font-bold text-white">{selectedAccreditation.timeToComplete}</div>
                    </CardContent>
                  </Card>
                  <Card className="border-elec-yellow/10 bg-elec-dark/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-medium">Salary Impact</span>
                      </div>
                      <div className="text-lg font-bold text-white">{selectedAccreditation.careerImpact.salaryIncrease}</div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedAccreditation.detailedDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Career Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-amber-400">New Opportunities</h4>
                      <ul className="space-y-1">
                        {selectedAccreditation.careerImpact.jobOpportunities.map((opportunity, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                            <span>{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-amber-400">Progression Path</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedAccreditation.careerImpact.progression}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      {selectedAccreditation.ukRecognition.governmentRecognised ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">Government Recognised</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {selectedAccreditation.ukRecognition.internationalRecognition ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">International Recognition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-400">
                      {selectedAccreditation.ukRecognition.industryStandard ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">Industry Standard</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-yellow">Entry Requirements</h3>
                <ul className="space-y-3">
                  {selectedAccreditation.requirements.map((requirement, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-4">
                <h3 className="text-lg font-semibold text-elec-yellow">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedAccreditation.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-elec-dark/30">
                      <Star className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3 text-amber-400">Member Benefits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedAccreditation.memberBenefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="funding" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Cost Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Application Fee:</span>
                        <span className="font-medium">{selectedAccreditation.costs.applicationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Fee:</span>
                        <span className="font-medium">{selectedAccreditation.costs.annualFee}</span>
                      </div>
                      <div className="flex justify-between border-t border-elec-yellow/20 pt-2">
                        <span className="font-medium">Total First Year:</span>
                        <span className="font-bold text-elec-yellow">{selectedAccreditation.costs.totalCost}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Funding Options</h3>
                    <ul className="space-y-2">
                      {selectedAccreditation.fundingOptions.map((option, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <PoundSterling className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedAccreditation.eligibleFunding.apprenticeshipLevy ? "text-green-400" : "text-red-400"}`}>
                      {selectedAccreditation.eligibleFunding.apprenticeshipLevy ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">Apprenticeship Levy</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedAccreditation.eligibleFunding.governmentSupport ? "text-green-400" : "text-red-400"}`}>
                      {selectedAccreditation.eligibleFunding.governmentSupport ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">Government Support</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedAccreditation.eligibleFunding.employerSupport ? "text-green-400" : "text-red-400"}`}>
                      {selectedAccreditation.eligibleFunding.employerSupport ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">Employer Support</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedAccreditation.eligibleFunding.professionalbodyGrants ? "text-green-400" : "text-red-400"}`}>
                      {selectedAccreditation.eligibleFunding.professionalbodyGrants ? "✓" : "✗"}
                    </div>
                    <div className="text-xs text-muted-foreground">Professional Grants</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="process" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Application Process</h3>
                  <div className="space-y-4">
                    {selectedAccreditation.applicationProcess.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Required Documentation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedAccreditation.applicationProcess.documentation.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-elec-yellow/5 border border-elec-yellow/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-elec-yellow" />
                    <span className="font-medium text-elec-yellow">Timeline</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedAccreditation.applicationProcess.timeline}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Support Available</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${selectedAccreditation.supportResources.mentorship ? "text-green-400" : "text-red-400"}`}>
                        {selectedAccreditation.supportResources.mentorship ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-muted-foreground">Mentorship</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${selectedAccreditation.supportResources.studyMaterials ? "text-green-400" : "text-red-400"}`}>
                        {selectedAccreditation.supportResources.studyMaterials ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-muted-foreground">Study Materials</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${selectedAccreditation.supportResources.workshops ? "text-green-400" : "text-red-400"}`}>
                        {selectedAccreditation.supportResources.workshops ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-muted-foreground">Workshops</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${selectedAccreditation.supportResources.onlinePortal ? "text-green-400" : "text-red-400"}`}>
                        {selectedAccreditation.supportResources.onlinePortal ? "✓" : "✗"}
                      </div>
                      <div className="text-xs text-muted-foreground">Online Portal</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-green-400" />
                        <span>{selectedAccreditation.contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-400" />
                        <span>{selectedAccreditation.contactInfo.email}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-amber-400 mt-0.5" />
                        <span className="text-sm">{selectedAccreditation.contactInfo.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-elec-yellow">Online Resources</h3>
                    <Button 
                      variant="outline" 
                      className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
                      onClick={() => window.open(selectedAccreditation.websiteLink, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Official Website
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          UK Professional Accreditations
        </h2>
        <p className="text-muted-foreground">
          Comprehensive guide to professional accreditations in the UK electrical industry. 
          Enhance your career prospects with recognised qualifications and professional memberships.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-elec-yellow">{filteredAccreditations.length}</div>
            <div className="text-sm text-muted-foreground">Available Accreditations</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">85%</div>
            <div className="text-sm text-muted-foreground">Average Success Rate</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">£5k+</div>
            <div className="text-sm text-muted-foreground">Average Salary Boost</div>
          </CardContent>
        </Card>
        <Card className="border-elec-yellow/20 bg-elec-gray/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">6 months</div>
            <div className="text-sm text-muted-foreground">Average Timeline</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Search & Filter Accreditations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search accreditations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {accreditationCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {accreditationLevels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Funding</Label>
              <Select value={selectedFunding} onValueChange={setSelectedFunding}>
                <SelectTrigger>
                  <SelectValue placeholder="Select funding" />
                </SelectTrigger>
                <SelectContent>
                  {fundingTypes.map(funding => (
                    <SelectItem key={funding} value={funding}>{funding}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Professional Accreditations ({filteredAccreditations.length} results)
        </h3>
      </div>

      {/* Accreditations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccreditations.map((accreditation) => {
          const Icon = accreditation.icon;
          return (
            <Card key={accreditation.id} className="border-elec-yellow/20 bg-elec-gray h-full flex flex-col hover:border-elec-yellow/40 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-elec-yellow" />
                    <div>
                      <CardTitle className="text-lg leading-tight">{accreditation.title}</CardTitle>
                      <p className="text-sm text-amber-400">{accreditation.provider}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-xs ${
                    accreditation.level === "Advanced" ? "bg-green-500/20 text-green-300 border-green-500/30" :
                    accreditation.level === "Professional" ? "bg-blue-500/20 text-blue-300 border-blue-500/30" :
                    accreditation.level === "Foundation" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
                    "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  }`}>
                    {accreditation.level}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 flex-grow flex flex-col">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {accreditation.description}
                </p>
                
                <div className="space-y-3 mt-auto">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <PoundSterling className="h-3 w-3 text-green-400" />
                      <span>{accreditation.costs.totalCost.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-blue-400" />
                      <span>{accreditation.timeToComplete.split(' ')[0]}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <TrendingUp className="h-3 w-3 text-amber-400" />
                    <span>{accreditation.careerImpact.salaryIncrease}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {Object.entries(accreditation.eligibleFunding).map(([key, value]) => {
                      if (!value) return null;
                      const labels: { [key: string]: string } = {
                        apprenticeshipLevy: "Levy",
                        governmentSupport: "Gov",
                        employerSupport: "Employer",
                        professionalbodyGrants: "Grants"
                      };
                      return (
                        <Badge key={key} variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
                          {labels[key]}
                        </Badge>
                      );
                    })}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3 border-elec-yellow/30 hover:bg-elec-yellow/10"
                    onClick={() => handleViewDetails(accreditation)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAccreditations.length === 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
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

      {/* Information Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-elec-yellow" />
            UK Professional Registration Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-amber-400">Why Get Professionally Registered?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Demonstrates competence and professionalism to employers and clients</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Increases earning potential and career advancement opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Provides international recognition and mobility</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Access to professional networks and development resources</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-amber-400">Application Tips</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Start gathering evidence early in your career</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Seek guidance from existing members</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Attend information sessions and workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span>Consider finding a mentor for guidance</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedProfessionalAccreditation;
