
import BackButton from "@/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen, Briefcase, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProfessionalDevelopment = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in overflow-hidden">
      <div className="flex flex-col items-center justify-center mb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Development</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Explore opportunities to advance your electrical career, gain new qualifications, and build your professional network in the industry.
        </p>
        <BackButton customUrl="/apprentice/hub" label="Back to Apprentice Hub" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="p-6 h-full">
            <div className="flex items-start gap-4">
              <div className="bg-elec-yellow/10 p-3 rounded-lg">
                <GraduationCap className="h-8 w-8 text-elec-yellow" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Career Progression Paths</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-elec-yellow">JIB Grading and Advancement</h3>
                    <p className="text-muted-foreground mt-1">
                      The Joint Industry Board (JIB) grading system provides a structured career path for electricians in the UK. Progress from Apprentice to Approved Electrician, Technician, and Advanced roles.
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>Apprentice/Trainee: Initial entry position while training</li>
                      <li>Electrician (ECS Gold Card): Qualified electrician who has completed NVQ Level 3</li>
                      <li>Approved Electrician: 2+ years experience after qualifying with completion of inspection and testing qualifications</li>
                      <li>Technician Electrician: Advanced qualifications in specialised areas</li>
                      <li>Site Management: Progressing to supervisor and site management roles</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-elec-yellow">Specialisation Options</h3>
                    <p className="text-muted-foreground mt-1">
                      Develop expertise in specific electrical disciplines to enhance your career prospects:
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>Renewable Energy Installation (solar, wind, heat pumps)</li>
                      <li>Industrial Automation and Control Systems</li>
                      <li>Fire and Security Systems</li>
                      <li>Hazardous Area Installation (CompEx)</li>
                      <li>Data Network Infrastructure</li>
                      <li>Electric Vehicle Charging Infrastructure</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="link" size="sm" className="text-elec-yellow">
                      Learn more <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="p-6 h-full">
            <div className="flex items-start gap-4">
              <div className="bg-elec-yellow/10 p-3 rounded-lg">
                <Award className="h-8 w-8 text-elec-yellow" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Professional Certifications</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-elec-yellow">ECS Gold Card</h3>
                    <p className="text-muted-foreground mt-1">
                      The Electrotechnical Certification Scheme (ECS) Gold Card is the industry-recognised identification and competence card for electricians in the UK.
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>Requirements: NVQ Level 3 in Electrotechnical Services and BS7671 qualification</li>
                      <li>Valid for 3 years before requiring renewal</li>
                      <li>Access to more job opportunities and sites that require ECS cardholders</li>
                      <li>Apply through JIB or SJIB (in Scotland)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-elec-yellow">Key Industry Certifications</h3>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>18th Edition (BS7671) - Required for all practising electricians</li>
                      <li>Inspection & Testing (2391/2394/2395) - For testing electrical installations</li>
                      <li>CompEx - For working in explosive atmospheres</li>
                      <li>PAT Testing - For testing portable appliances</li>
                      <li>EV Charging Point Installation - OZEV approved installer qualification</li>
                      <li>NICEIC/ELECSA Registration - Demonstrates competence to customers</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="link" size="sm" className="text-elec-yellow">
                      Certification guide <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="p-6 h-full">
            <div className="flex items-start gap-4">
              <div className="bg-elec-yellow/10 p-3 rounded-lg">
                <BookOpen className="h-8 w-8 text-elec-yellow" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Continuing Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-elec-yellow">Staying Current</h3>
                    <p className="text-muted-foreground mt-1">
                      The electrical industry is constantly evolving with new technologies, regulations, and best practices. Ongoing education is essential to maintain competence.
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>BS7671 Wiring Regulations updates (current version: 18th Edition Amendment 2)</li>
                      <li>Courses on renewable technologies and energy efficiency</li>
                      <li>Manufacturer-specific product training for new equipment</li>
                      <li>Technical seminars hosted by industry bodies</li>
                      <li>Building control system integration and smart home technologies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-elec-yellow">Higher Education Pathways</h3>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>HNC/HND in Electrical Engineering (Level 4/5)</li>
                      <li>Foundation Degree in Electrical Electronic Engineering</li>
                      <li>BEng/BSc in Electrical Engineering</li>
                      <li>Management qualifications (ILM, CMI)</li>
                      <li>Degree Apprenticeships in Electrical Engineering</li>
                      <li>Master's degrees in specialised electrical disciplines</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="link" size="sm" className="text-elec-yellow">
                      Educational resources <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20">
          <CardContent className="p-6 h-full">
            <div className="flex items-start gap-4">
              <div className="bg-elec-yellow/10 p-3 rounded-lg">
                <Briefcase className="h-8 w-8 text-elec-yellow" />
              </div>
              <div className="space-y-3">
                <h2 className="text-xl font-bold">Industry Networking</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-elec-yellow">Professional Associations</h3>
                    <p className="text-muted-foreground mt-1">
                      Joining professional associations provides access to industry connections, continuing professional development (CPD), and career resources.
                    </p>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>IET (Institution of Engineering and Technology)</li>
                      <li>ECA (Electrical Contractors' Association)</li>
                      <li>SELECT (Scotland's electrical trade association)</li>
                      <li>Electrical Safety First</li>
                      <li>NAPIT (National Association of Professional Inspectors and Testers)</li>
                      <li>Unite the Union - Electrical Engineering section</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-elec-yellow">Industry Events and Resources</h3>
                    <ul className="list-disc list-inside mt-2 text-sm text-muted-foreground">
                      <li>Trade shows: Elex, CEF Live, Electrical Design & Installation Expo</li>
                      <li>Industry forums: Electrical Forum UK, IET forums</li>
                      <li>Publications: Professional Electrician, IET Wiring Matters</li>
                      <li>Local networking meetups for electricians</li>
                      <li>Annual industry awards and recognition events</li>
                      <li>Social media groups and professional online communities</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="link" size="sm" className="text-elec-yellow">
                      Find local events <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDevelopment;
