import { useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SimpleCareerCard from "@/components/electrician/career/SimpleCareerCard";
import CareerPathways from "@/components/electrician/career/CareerPathways";
import CareerCourses from "@/components/electrician/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/electrician/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/electrician/career/ProfessionalAccreditation";
import CPDTracker from "@/components/electrician/career/CPDTracker";
import JobVacancies from "@/pages/electrician/JobVacancies";
import { electricianCareerSections } from "@/components/electrician/career/SectionData";
import { Briefcase } from "lucide-react";
import { useLiveMarketData } from "@/hooks/useLiveMarketData";

const CareerProgression = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { marketData } = useLiveMarketData();
  
  const handleBackToSections = () => {
    setActiveSection(null);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "pathways":
        return <CareerPathways />;
      case "courses":
        return <CareerCourses />;
      case "education":
        return <EnhancedFurtherEducation />;
      case "accreditation":
        return <ProfessionalAccreditation />;
      case "cpd":
        return <CPDTracker />;
      case "job-vacancies":
        return <JobVacancies onBack={handleBackToSections} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <Helmet>
        <title>Electrician Career Progression UK | JIB Timeline & CPD</title>
        <meta name="description" content="Explore UK electrician career progression: JIB grades, timelines, prerequisites, day rates, CPD, and pathways. BS 7671 18th Edition compliant." />
        <link rel="canonical" href="/electrician/career-progression" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-elec-dark via-elec-gray to-elec-dark">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto text-center">
            {!activeSection && (
              <>
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-sm font-medium">
                    ⚡ Professional Development Hub
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 gradient-text leading-tight">
                  Career Progression
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Comprehensive career development resources for qualified electricians. Explore emerging technologies, 
                  strategic career planning tools, and professional growth opportunities in the rapidly evolving electrical sector.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/electrician" className="group">
                    <Button variant="outline" className="flex items-center gap-2 h-12 px-6 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-300">
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
                      Back to Electrical Hub
                    </Button>
                  </Link>
                </div>
              </>
            )}
            {activeSection && (
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 mx-auto h-12 px-6 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 transition-all duration-300" 
                  onClick={handleBackToSections}
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Sections
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-8 px-4 sm:px-6 lg:px-8 py-8">

      {activeSection === null ? (
        <>


          {/* Career Sections Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Choose Your Path</h2>
              <p className="text-white/80 max-w-2xl mx-auto">Select a career development area to explore resources, opportunities, and strategic guidance</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {electricianCareerSections.map((section, index) => (
                <Card 
                  key={section.id}
                  className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-dark overflow-hidden h-full hover:border-elec-yellow/40 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl hover:shadow-elec-yellow/10"
                  onClick={() => setActiveSection(section.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="relative p-6 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                        {section.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-elec-yellow transition-colors duration-300">{section.title}</h3>
                      <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{section.description}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                      <div className="flex items-center gap-2 text-xs text-elec-yellow opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="font-medium">Explore Now</span>
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Job Vacancies Card */}
              <Card 
                className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-dark overflow-hidden h-full hover:border-elec-yellow/40 transition-all duration-500 cursor-pointer group hover:scale-105 hover:shadow-2xl hover:shadow-elec-yellow/10"
                onClick={() => setActiveSection("job-vacancies")}
                style={{ animationDelay: `${electricianCareerSections.length * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="relative p-6 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="h-12 w-12 text-elec-yellow opacity-80" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-elec-yellow transition-colors duration-300">Job Vacancies</h3>
                    <p className="text-sm text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">Browse current electrical job opportunities and positions</p>
                  </div>
                  <div className="mt-6 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-xs text-elec-yellow opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="font-medium">Explore Now</span>
                      <ArrowLeft className="h-3 w-3 rotate-180" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Industry Statistics */}
          <div className="max-w-6xl mx-auto">
            <Card className="relative border-elec-yellow/20 bg-gradient-to-br from-elec-gray via-elec-dark to-elec-gray overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <CardContent className="relative p-8">
                <div className="text-center mb-10">
                  <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-4">Industry Overview</h3>
                  <p className="text-white/80 max-w-2xl mx-auto">Real-time insights into the UK electrical industry landscape</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center group">
                    <div className="bg-elec-yellow/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-elec-yellow/20 transition-colors duration-300">
                      <div className="text-4xl font-bold text-elec-yellow">
                        {marketData?.careerpathways || '15'}+
                      </div>
                    </div>
                    <div className="text-lg text-white font-semibold mb-1">Specialist Pathways</div>
                    <div className="text-sm text-white/70">Available career routes</div>
                  </div>
                  <div className="text-center group">
                    <div className="bg-blue-500/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                      <div className="text-4xl font-bold text-blue-400">
                        {marketData?.totalCourses || '350'}+
                      </div>
                    </div>
                    <div className="text-lg text-white font-semibold mb-1">Training Courses</div>
                    <div className="text-sm text-white/70">Professional development</div>
                  </div>
                  <div className="text-center group">
                    <div className="bg-green-500/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
                      <div className="text-2xl font-bold text-green-400">
                        {marketData?.professionalRange || '£30k-£85k+'}
                      </div>
                    </div>
                    <div className="text-lg text-white font-semibold mb-1">Salary Range</div>
                    <div className="text-sm text-white/70">Current market rates</div>
                  </div>
                  <div className="text-center group">
                    <div className="bg-purple-500/10 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                      <div className="text-4xl font-bold text-purple-400">18%</div>
                    </div>
                    <div className="text-lg text-white font-semibold mb-1">Growth Forecast</div>
                    <div className="text-sm text-white/70">Next 5 years</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* High-Demand Career Opportunities */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-6 text-center">
                🎯 High-Demand Career Opportunities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-elec-dark/50 rounded-lg p-5 border border-green-500/30 hover:border-green-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    <h4 className="font-semibold text-green-400 text-lg">EV Charging Specialist</h4>
                  </div>
                  <p className="text-white text-sm mb-3 leading-relaxed">
                    Design, install and maintain electric vehicle charging infrastructure for commercial and residential applications
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-green-300 font-medium">£280-420/day • High demand • Future-proof</div>
                    <div className="text-white/80">Required: 2919 qualification + 3 years experience</div>
                    <div className="text-white/60 text-xs">Growth: 300% increase in demand over 3 years</div>
                  </div>
                </div>
                
                <div className="bg-elec-dark/50 rounded-lg p-5 border border-blue-500/30 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                    <h4 className="font-semibold text-blue-400 text-lg">Data Centre Technician</h4>
                  </div>
                  <p className="text-white text-sm mb-3 leading-relaxed">
                    Support critical AI infrastructure and cloud computing facilities with advanced electrical systems
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-blue-300 font-medium">£320-480/day • Rapid growth • High tech</div>
                    <div className="text-white/80">Required: HV competence + cooling systems knowledge</div>
                    <div className="text-white/60 text-xs">Growth: AI boom driving massive expansion</div>
                  </div>
                </div>
                
                <div className="bg-elec-dark/50 rounded-lg p-5 border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                    <h4 className="font-semibold text-purple-400 text-lg">Heat Pump Engineer</h4>
                  </div>
                  <p className="text-white text-sm mb-3 leading-relaxed">
                    Install renewable heating systems and advanced heat pump technology for domestic and commercial use
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-purple-300 font-medium">£250-380/day • Government-backed • Growing</div>
                    <div className="text-white/80">Required: MCS certification + electrical competence</div>
                    <div className="text-white/60 text-xs">Growth: Net Zero targets driving demand</div>
                  </div>
                </div>
                
                <div className="bg-elec-dark/50 rounded-lg p-5 border border-orange-500/30 hover:border-orange-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                    <h4 className="font-semibold text-orange-400 text-lg">Solar PV Installer</h4>
                  </div>
                  <p className="text-white text-sm mb-3 leading-relaxed">
                    Design and install solar photovoltaic systems with battery storage and grid connection expertise
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-orange-300 font-medium">£240-350/day • Renewable focus • Expanding</div>
                    <div className="text-white/80">Required: 2399 qualification + MCS accreditation</div>
                    <div className="text-white/60 text-xs">Growth: Record installations year on year</div>
                  </div>
                </div>
                
                <div className="bg-elec-dark/50 rounded-lg p-5 border border-red-500/30 hover:border-red-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full bg-red-400"></div>
                    <h4 className="font-semibold text-red-400 text-lg">Smart Building Engineer</h4>
                  </div>
                  <p className="text-white text-sm mb-3 leading-relaxed">
                    Integrate IoT systems, BMS controls, and intelligent building automation with electrical installations
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-red-300 font-medium">£300-450/day • Technology focus • Premium</div>
                    <div className="text-white/80">Required: BMS knowledge + electrical qualification</div>
                    <div className="text-white/60 text-xs">Growth: Smart city initiatives accelerating</div>
                  </div>
                </div>
                
                <div className="bg-elec-dark/50 rounded-lg p-5 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                    <h4 className="font-semibold text-cyan-400 text-lg">Electrical Project Manager</h4>
                  </div>
                  <p className="text-white text-sm mb-3 leading-relaxed">
                    Lead complex electrical projects from design through commissioning with team management responsibilities
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="text-cyan-300 font-medium">£400-600/day • Leadership • Strategic</div>
                    <div className="text-white/80">Required: Degree/HNC + 5+ years experience</div>
                    <div className="text-white/60 text-xs">Growth: Infrastructure investment boom</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Development Roadmap */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-elec-yellow mb-4 sm:mb-6 text-center">
                ⚡ Professional Development Roadmap
              </h3>
              
              {/* Grid with equal height columns and proper dividers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:divide-x md:divide-elec-yellow/10 items-stretch">
                {/* Column 1: Immediate Actions */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4 h-16">
                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-elec-yellow font-semibold text-sm">1</span>
                    </div>
                    <h4 className="font-semibold text-white text-base sm:text-lg leading-tight">Immediate Actions</h4>
                  </div>
                  
                  <div className="flex-1">
                    <ul aria-label="Immediate actions for career development" className="space-y-3">
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                        <span className="text-white text-sm leading-relaxed">Update CV with latest projects and certifications</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                        <span className="text-white text-sm leading-relaxed">Research emerging technology training (EV, heat pumps, solar)</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                        <span className="text-white text-sm leading-relaxed">Join professional networking groups and LinkedIn communities</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                        <span className="text-white text-sm leading-relaxed">Review current JIB grade and advancement requirements</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-elec-yellow"></span>
                        <span className="text-white text-sm leading-relaxed">Set up job alerts for specialist roles</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Column 2: 3-Month Goals */}
                <div className="flex flex-col h-full md:pl-6">
                  <div className="flex items-center gap-3 mb-4 h-16">
                    <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 font-semibold text-sm">2</span>
                    </div>
                    <h4 className="font-semibold text-white text-base sm:text-lg leading-tight">3-Month Goals</h4>
                  </div>
                  
                  <div className="flex-1">
                    <ul aria-label="Three month career development goals" className="space-y-3">
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span className="text-white text-sm leading-relaxed">Book specialist training courses (2919, 2399, MCS certification)</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span className="text-white text-sm leading-relaxed">Attend industry trade shows and networking events</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span className="text-white text-sm leading-relaxed">Complete market research on day rates vs salary positions</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span className="text-white text-sm leading-relaxed">Apply for professional membership (IET, ECA, NAPIT)</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                        <span className="text-white text-sm leading-relaxed">Start building portfolio of specialist work examples</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Column 3: Long-term Strategy */}
                <div className="flex flex-col h-full md:pl-6">
                  <div className="flex items-center gap-3 mb-4 h-16">
                    <div className="w-8 h-8 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 font-semibold text-sm">3</span>
                    </div>
                    <h4 className="font-semibold text-white text-base sm:text-lg leading-tight">Long-term Strategy</h4>
                  </div>
                  
                  <div className="flex-1">
                    <ul aria-label="Long-term career strategy items" className="space-y-3">
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <span className="text-white text-sm leading-relaxed">Complete advanced qualifications in chosen specialisation</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <span className="text-white text-sm leading-relaxed">Build reputation as subject matter expert through projects</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <span className="text-white text-sm leading-relaxed">Consider further education (HNC/HND/Degree) if applicable</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <span className="text-white text-sm leading-relaxed">Evaluate contracting vs employment career paths</span>
                      </li>
                      <li className="relative pl-4">
                        <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <span className="text-white text-sm leading-relaxed">Explore business ownership or partnership opportunities</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Industry Insights */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-elec-yellow mb-6 text-center">
                📊 Current Industry Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                    <span className="text-green-400">↗</span> Market Trends
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">Net Zero Skills Premium</span>
                      <span className="text-green-400 font-medium">+25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">EV Infrastructure Demand</span>
                      <span className="text-green-400 font-medium">+300%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">Smart Home Integration</span>
                      <span className="text-blue-400 font-medium">+180%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">Data Centre Growth</span>
                      <span className="text-purple-400 font-medium">+220%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white text-lg flex items-center gap-2">
                    <span className="text-blue-400">💼</span> Regional Opportunities
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">London & South East</span>
                      <span className="text-elec-yellow font-medium">£350-500/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">Manchester & North West</span>
                      <span className="text-elec-yellow font-medium">£280-400/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">Scotland (Edinburgh/Glasgow)</span>
                      <span className="text-elec-yellow font-medium">£300-420/day</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                      <span className="text-white">Wales & South West</span>
                      <span className="text-elec-yellow font-medium">£260-380/day</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-elec-gray to-elec-dark rounded-2xl border border-elec-yellow/20 overflow-hidden">
            {renderSectionContent()}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CareerProgression;
