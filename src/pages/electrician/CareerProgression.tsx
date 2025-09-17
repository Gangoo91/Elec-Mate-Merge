import { useState } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import EnhancedCareerCard from "@/components/electrician/career/EnhancedCareerCard";
import EnhancedStatsCard from "@/components/electrician/career/EnhancedStatsCard";
import CareerPathways from "@/components/electrician/career/CareerPathways";
import CareerCourses from "@/components/electrician/career/CareerCourses";
import EnhancedFurtherEducation from "@/components/electrician/career/EnhancedFurtherEducation";
import ProfessionalAccreditation from "@/components/electrician/career/ProfessionalAccreditation";
import CPDTracker from "@/components/electrician/career/CPDTracker";
import JobVacancies from "@/pages/electrician/JobVacancies";
import { electricianCareerSections } from "@/components/electrician/career/SectionData";
import { Briefcase, Clock, BookOpen, GraduationCap, Award } from "lucide-react";
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
    <div className="space-y-8 animate-fade-in px-2 sm:px-0">
      <Helmet>
        <title>Electrician Career Progression UK | JIB Timeline & CPD</title>
        <meta name="description" content="Explore UK electrician career progression: JIB grades, timelines, prerequisites, day rates, CPD, and pathways. BS 7671 18th Edition compliant." />
        <link rel="canonical" href="/electrician/career-progression" />
      </Helmet>

      {/* Header */}
      <div className="space-y-3">
        {!activeSection && (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
              Career Progression
            </h1>
            <p className="text-sm sm:text-base text-white text-center max-w-4xl mx-auto px-4">
              Advanced career development resources for qualified electricians. Stay ahead with 2025 industry insights, 
              emerging technologies, and strategic career planning tools designed for professional growth in the electrical sector.
            </p>
          </>
        )}
        {!activeSection && (
          <Link to="/electrician" className="w-full sm:w-auto">
            <Button variant="outline" className="flex items-center gap-2 w-full">
              <ArrowLeft className="h-4 w-4" /> Back to Electrical Hub
            </Button>
          </Link>
        )}
        {activeSection && (
          <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto" onClick={handleBackToSections}>
            <ArrowLeft className="h-4 w-4" /> Back to Sections
          </Button>
        )}
      </div>

      {activeSection === null ? (
        <>

          {/* Career Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            <EnhancedCareerCard 
              title="CPD Tracker"
              description="Track and manage your Continuing Professional Development hours and goals"
              icon={<Clock className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow opacity-80" />}
              onClick={() => setActiveSection("cpd")}
              category="Professional Development"
              popularity={95}
              timeToComplete="Ongoing"
              skillLevel="Beginner"
              certificationRequired={false}
            />
            <EnhancedCareerCard 
              title="Career Pathways"
              description="Explore different career advancement routes in the electrical industry"
              icon={<Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow opacity-80" />}
              onClick={() => setActiveSection("pathways")}
              category="Career Planning"
              popularity={88}
              timeToComplete="2-5 years"
              skillLevel="Intermediate"
              certificationRequired={true}
            />
            <EnhancedCareerCard 
              title="Career Courses"
              description="Professional courses to enhance your electrical career skills"
              icon={<BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow opacity-80" />}
              onClick={() => setActiveSection("courses")}
              category="Skills Development"
              popularity={92}
              timeToComplete="3-12 months"
              skillLevel="Intermediate"
              certificationRequired={true}
            />
            <EnhancedCareerCard 
              title="Further Education"
              description="Degrees and advanced learning opportunities for electrical professionals"
              icon={<GraduationCap className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow opacity-80" />}
              onClick={() => setActiveSection("education")}
              category="Higher Education"
              popularity={76}
              timeToComplete="2-4 years"
              skillLevel="Advanced"
              certificationRequired={false}
            />
            <EnhancedCareerCard 
              title="Professional Accreditation"
              description="Essential qualifications and certifications for career advancement"
              icon={<Award className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow opacity-80" />}
              onClick={() => setActiveSection("accreditation")}
              category="Certifications"
              popularity={85}
              timeToComplete="6-18 months"
              skillLevel="Intermediate"
              certificationRequired={true}
            />
            <EnhancedCareerCard 
              title="Job Vacancies"
              description="Browse current opportunities and apply for electrical positions"
              icon={<Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow opacity-80" />}
              onClick={() => setActiveSection("job-vacancies")}
              category="Job Search"
              popularity={99}
              timeToComplete="Immediate"
              skillLevel="Beginner"
              certificationRequired={false}
            />
          </div>

          {/* Enhanced Professional Development Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <EnhancedStatsCard 
              value={`${marketData?.careerpathways || '12'}+`}
              label="Advanced Pathways"
              subtitle="Updated for 2025"
              trend="up"
            />
            <EnhancedStatsCard 
              value={`${marketData?.totalCourses || '284'}+`}
              label="Professional Courses"
              subtitle="Including Net Zero skills"
              trend="up"
            />
            <EnhancedStatsCard 
              value={marketData?.professionalRange || '£35k-£80k+'}
              label="Salary Range"
              subtitle="2025 market rates"
              trend="up"
            />
            <EnhancedStatsCard 
              value="15%"
              label="Rate Increase"
              subtitle="Skills shortage premium"
              trend="up"
            />
          </div>

          {/* New: 2025 Career Opportunities Spotlight */}
          <div className="bg-elec-grey border border-elec-yellow/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 text-center">
              🎯 Top Career Opportunities in 2025
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-elec-gray/50 rounded-lg p-4 border border-green-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <h4 className="font-semibold text-green-400">EV Charging Specialist</h4>
                </div>
                <p className="text-white text-sm mb-2">Install and maintain electric vehicle charging infrastructure</p>
                <div className="text-green-300 text-xs">£280-420/day • High demand • Future-proof</div>
                <div className="text-white text-xs mt-1">Required: 2919 qualification + 3 years experience</div>
              </div>
              
              <div className="bg-elec-gray/50 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <h4 className="font-semibold text-blue-400">Data Centre Technician</h4>
                </div>
                <p className="text-white text-sm mb-2">Support AI infrastructure and cloud computing facilities</p>
                <div className="text-blue-300 text-xs">£320-480/day • Rapid growth • High tech</div>
                <div className="text-white text-xs mt-1">Required: HV competence + cooling systems knowledge</div>
              </div>
              
              <div className="bg-elec-gray/50 rounded-lg p-4 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  <h4 className="font-semibold text-purple-400">Heat Pump Engineer</h4>
                </div>
                <p className="text-white text-sm mb-2">Install renewable heating systems and heat pump technology</p>
                <div className="text-purple-300 text-xs">£250-380/day • Government-backed • Growing</div>
                <div className="text-white text-xs mt-1">Required: MCS certification + electrical competence</div>
              </div>
            </div>
          </div>

          {/* New: Quick Career Actions */}
          <div className="bg-elec-grey border border-elec-yellow/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-elec-yellow mb-4 text-center">
              ⚡ Quick Career Actions for 2025
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-white">This Month</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow"></div>
                    <span className="text-white">Update CV with latest projects and certifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow"></div>
                    <span className="text-white">Research EV charging or heat pump training courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow"></div>
                    <span className="text-white">Join LinkedIn electrical industry groups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-elec-yellow"></div>
                    <span className="text-white">Check JIB rate cards for 2025 updates</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Next 3 Months</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white">Book specialist training (2919, 2399, MCS)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white">Attend industry trade shows and networking events</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white">Explore contractor vs employed salary comparisons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-white">Consider professional membership (IET, ECA)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {renderSectionContent()}
        </div>
      )}
    </div>
  );
};

export default CareerProgression;
