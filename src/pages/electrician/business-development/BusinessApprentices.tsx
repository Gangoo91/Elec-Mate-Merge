
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Award, Briefcase, FileText, HandHelping, User, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import GoogleMapsLoader from "@/components/job-vacancies/GoogleMapsLoader";
import TrainingProviderMap from "@/components/apprentice/TrainingProviderMap";

const BusinessApprentices = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMap, setShowMap] = useState(false);

  const handleOpenMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Apprentices for Sole Traders</h1>
      </div>
      
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-elec-yellow" />
            <div>
              <CardTitle>Sole Trader Apprenticeship Guide</CardTitle>
              <CardDescription>A comprehensive resource to help sole traders take on apprentices in the electrical industry</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Taking on an apprentice as a sole trader is a rewarding way to grow your business whilst supporting
            the next generation of electricians. This guide will help you navigate the process, understand the financial
            support available, and maximise the benefits for your business.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="flex flex-wrap mb-4 bg-elec-dark">
              <TabsTrigger value="overview" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                Overview
              </TabsTrigger>
              <TabsTrigger value="funding" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                Funding & Grants
              </TabsTrigger>
              <TabsTrigger value="process" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                Onboarding Process
              </TabsTrigger>
              <TabsTrigger value="benefits" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                Business Benefits
              </TabsTrigger>
              <TabsTrigger value="checklist" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
                Apprentice Checklist
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab Content */}
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-elec-yellow" />
                      Why Take on an Apprentice?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Grow your business capacity whilst managing costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Train someone in your preferred methods and standards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Significant government funding support specifically for sole traders</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Add value to your business and local community</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Plan for future growth or potential succession</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-elec-yellow/20 bg-elec-gray">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <HandHelping className="h-5 w-5 text-elec-yellow" />
                      Support Available
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Government incentive payments (up to £1,000 per apprentice)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>95-100% funding for apprentice training costs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Support with recruitment and paperwork from training providers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Mentoring for sole traders to effectively manage apprentices</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <span>Local business network support groups</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Sole Trader Advantages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    As a sole trader, you have unique advantages when taking on an apprentice compared to larger companies:
                  </p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-elec-dark/60 p-3 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">One-to-One Mentoring</h4>
                      <p className="text-xs">
                        Your apprentice will benefit from direct mentoring and consistent guidance, providing
                        a more personal learning experience than in larger companies where oversight may be divided.
                      </p>
                    </div>
                    <div className="bg-elec-dark/60 p-3 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Flexible Learning</h4>
                      <p className="text-xs">
                        You can adapt training to match your specific business needs and client base,
                        creating a highly skilled apprentice tailored to your niche.
                      </p>
                    </div>
                    <div className="bg-elec-dark/60 p-3 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Higher Completion Rates</h4>
                      <p className="text-xs">
                        Studies show apprenticeships with sole traders have higher completion rates due to the
                        personalised support and broader range of experiences gained.
                      </p>
                    </div>
                    <div className="bg-elec-dark/60 p-3 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2 text-sm">Priority Access</h4>
                      <p className="text-xs">
                        Small businesses often receive priority access to certain funding schemes and
                        additional support from training providers to ensure success.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Funding & Grants Tab Content */}
            <TabsContent value="funding" className="space-y-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PoundSterling className="h-5 w-5 text-elec-yellow" />
                      Financial Support for Sole Traders
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    As a sole trader taking on an apprentice, you have access to significant financial support specifically
                    designed to make apprenticeships viable for small businesses.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Government Apprenticeship Funding</h4>
                      <p className="text-sm mb-2">
                        For small employers (including sole traders) who don't pay the apprenticeship levy:
                      </p>
                      <ul className="space-y-1.5 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>95% of apprenticeship training costs covered by the government</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>100% funding for apprentices aged 16-18 or under specific circumstances</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Additional £1,000 payment for training apprentices aged 16-18</span>
                        </li>
                      </ul>
                      <div className="mt-3 border-t border-elec-yellow/20 pt-3">
                        <h5 className="text-sm font-medium mb-1">Useful Links:</h5>
                        <ul className="space-y-1.5 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.gov.uk/employing-an-apprentice" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              GOV.UK: Employing an apprentice
                            </a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.apprenticeships.gov.uk/employers/funding-an-apprenticeship-non-levy" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              Apprenticeships.gov.uk: Non-Levy Funding Guide
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Local Authority Grants</h4>
                      <p className="text-sm mb-2">Many local authorities offer additional funding:</p>
                      <ul className="space-y-1.5 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Training subsidies specific to electrical apprenticeships</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Equipment grants to cover tools and PPE costs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Wage subsidies during the initial training period</span>
                        </li>
                      </ul>
                      <div className="mt-3 border-t border-elec-yellow/20 pt-3">
                        <h5 className="text-sm font-medium mb-1">Find Local Funding:</h5>
                        <ul className="space-y-1.5 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.gov.uk/apply-apprenticeship-grant" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              Apprenticeship Grant Finder
                            </a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.lepnetwork.net/about-leps/location-map/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              Local Enterprise Partnerships Network
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Industry-Specific Support</h4>
                      <p className="text-sm mb-2">The electrical industry offers additional support:</p>
                      <ul className="space-y-1.5 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>JIB grants for apprentice training and development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>ECS subsidised card schemes for apprentices</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>NICEIC/NAPIT trainee registration discounts</span>
                        </li>
                      </ul>
                      <div className="mt-3 border-t border-elec-yellow/20 pt-3">
                        <h5 className="text-sm font-medium mb-1">Industry Resources:</h5>
                        <ul className="space-y-1.5 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.jib.org.uk/apprentice" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              JIB Apprenticeship Support
                            </a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.ecscard.org.uk/card-types/apprentice/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              ECS Apprentice Card Scheme
                            </a>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <a href="https://www.eca.co.uk/business-industry-support/skills-development/apprenticeships" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                              ECA Apprenticeship Support
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 border border-elec-yellow/30 rounded-lg">
                    <h4 className="font-medium text-lg mb-2">How to Access Funding</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm pl-1">
                      <li>Contact your local college or training provider to discuss available courses and funding</li>
                      <li>Register with the National Apprenticeship Service (<a href="https://www.gov.uk/apprenticeships-guide" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">gov.uk/apprenticeships</a>)</li>
                      <li>Apply for additional local grants through your <a href="https://www.lepnetwork.net/about-leps/location-map/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">Local Enterprise Partnership (LEP)</a></li>
                      <li>Contact industry bodies such as <a href="https://www.jib.org.uk" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">JIB</a>, <a href="https://www.eca.co.uk" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">ECA</a> or <a href="https://www.niceic.com" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">NICEIC</a> for specific electrical grants</li>
                      <li>Use the <a href="https://accounts.manage-apprenticeships.service.gov.uk/service/index" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">apprenticeship service account</a> to manage your funding and payments</li>
                    </ol>

                    <Button 
                      className="mt-4 bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
                      onClick={handleOpenMap}
                    >
                      Find Local Training Providers
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-elec-yellow" />
                    Additional Support Schemes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-elec-dark/60 p-4 rounded-lg">
                    <h4 className="font-medium text-elec-yellow mb-2">Traineeships</h4>
                    <p className="text-sm">
                      Before committing to a full apprenticeship, consider a traineeship. These 6-week to 6-month 
                      programmes include work experience and can be fully funded, allowing you to assess if the 
                      candidate is right for your business before offering an apprenticeship.
                    </p>
                    <div className="mt-2 pt-2 border-t border-elec-yellow/20">
                      <a href="https://www.gov.uk/guidance/traineeship-information-for-employers" target="_blank" rel="noopener noreferrer" className="text-sm text-elec-yellow hover:underline">
                        Learn more about traineeships
                      </a>
                    </div>
                  </div>

                  <div className="bg-elec-dark/60 p-4 rounded-lg">
                    <h4 className="font-medium text-elec-yellow mb-2">T-Level Industry Placements</h4>
                    <p className="text-sm">
                      T-Level students need industry placements of at least 45 days. As a sole trader, offering 
                      these placements can lead to recruiting well-prepared apprentices with technical knowledge,
                      and there's often funding available to support placement providers.
                    </p>
                    <div className="mt-2 pt-2 border-t border-elec-yellow/20">
                      <a href="https://www.tlevels.gov.uk/employers" target="_blank" rel="noopener noreferrer" className="text-sm text-elec-yellow hover:underline">
                        T-Level industry placement information
                      </a>
                    </div>
                  </div>

                  <div className="bg-elec-dark/60 p-4 rounded-lg">
                    <h4 className="font-medium text-elec-yellow mb-2">Mentoring Support</h4>
                    <p className="text-sm">
                      The "Small Business Mentoring" programme connects sole traders with experienced mentors
                      who have successfully employed apprentices. This free service provides guidance on
                      management, training and making the most of having an apprentice.
                    </p>
                    <div className="mt-2 pt-2 border-t border-elec-yellow/20">
                      <a href="https://www.fsb.org.uk/resources-page/supporting-apprenticeships.html" target="_blank" rel="noopener noreferrer" className="text-sm text-elec-yellow hover:underline">
                        Federation of Small Businesses apprenticeship support
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-elec-dark/60 p-4 rounded-lg">
                    <h4 className="font-medium text-elec-yellow mb-2">Additional Financial Support</h4>
                    <p className="text-sm mb-2">
                      Other funding options that may be available to support your apprenticeship programme:
                    </p>
                    <ul className="space-y-1.5 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <a href="https://www.gov.uk/guidance/incentive-payments-for-hiring-a-new-apprentice" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                          Incentive payments for hiring new apprentices
                        </a>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <a href="https://www.citb.co.uk/levy-grants-and-funding/grants-funding/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                          CITB grants and funding (for construction-related electrical work)
                        </a>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                        <a href="https://www.talentedapprenticeships.com/incentives/" target="_blank" rel="noopener noreferrer" className="text-elec-yellow hover:underline">
                          Current apprenticeship incentives and bonuses
                        </a>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Process Tab Content */}
            <TabsContent value="process" className="space-y-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-elec-yellow" />
                    Apprentice Onboarding: Step by Step
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Find a Training Provider</h4>
                        <p className="text-sm mb-2">
                          Partner with a college or training provider who will handle much of the administration and
                          provide the off-site training component.
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Local colleges offering electrical installation courses</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Independent training providers specialising in electrical apprenticeships</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Group Training Associations that can act as the apprentice's employer</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator className="bg-elec-yellow/20" />

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Apprentice Recruitment</h4>
                        <p className="text-sm mb-2">
                          Finding the right apprentice is crucial. Most training providers will help with recruitment,
                          or you can use these channels:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Find Apprenticeship service on GOV.UK</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Local college apprentice matching services</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Local advertising or word of mouth in your community</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator className="bg-elec-yellow/20" />

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Legal Requirements</h4>
                        <p className="text-sm mb-2">
                          There are several legal considerations when taking on an apprentice:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Employment contract and apprenticeship agreement</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Employer liability insurance (must cover apprentices)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Health and safety risk assessment updates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Payment of at least the apprentice minimum wage</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <Separator className="bg-elec-yellow/20" />

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="bg-elec-yellow text-elec-dark h-8 w-8 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Setting Up for Success</h4>
                        <p className="text-sm mb-2">
                          Prepare your business to effectively support an apprentice:
                        </p>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Create a structured training plan aligned with college learning</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Set up regular progress reviews (typically every 8-12 weeks)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Ensure your jobs cover the required apprenticeship standards</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                            <span>Prepare basic tools and PPE for your apprentice</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="p-4 bg-elec-dark/60 rounded-lg mt-4">
                      <h4 className="font-medium text-elec-yellow mb-2">Time Commitment</h4>
                      <p className="text-sm">
                        As a sole trader, be realistic about the time commitment. Your apprentice will typically:
                      </p>
                      <ul className="space-y-1 text-sm mt-2">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Spend 1 day per week at college (or block weeks throughout the year)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Require supervision and support on job sites</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>Need time for portfolio building and assessment preparation</span>
                        </li>
                      </ul>
                      <p className="text-sm mt-2">
                        Many sole traders find they can remain productive while training by carefully 
                        planning the types of jobs scheduled during different stages of the apprenticeship.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Benefits Tab Content */}
            <TabsContent value="benefits" className="space-y-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">The Business Case for Apprentices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Financial Benefits</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Increased Capacity:</strong> Extra pair of hands allows you to take on more jobs
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Cost-Effective Growth:</strong> Lower wage costs while training
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Access to More Tenders:</strong> Many contracts favour businesses with apprentices
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Return on Investment:</strong> Research shows apprentices typically deliver net gains within 2 years
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Business Development</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Future-Proofing:</strong> Address the industry skills shortage for your business
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Business Continuity:</strong> Potential for future partnership or succession planning
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Fresh Perspectives:</strong> New ideas and up-to-date knowledge from college training
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-elec-yellow mt-2"></span>
                          <span>
                            <strong>Customer Appeal:</strong> Many customers value businesses that invest in training
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Real Impact: Sole Trader Case Studies</h4>
                    
                    <div className="bg-elec-dark/60 p-4 rounded-lg mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-elec-yellow font-medium">Martin's Electrical Services, Leeds</h5>
                        <span className="text-xs bg-elec-dark px-2 py-1 rounded-full">Year 1-3</span>
                      </div>
                      <p className="text-sm">
                        "Taking on Josh as an apprentice allowed me to grow my business by 30%. 
                        By year two, he was handling basic installations under supervision, and I could 
                        focus on more complex jobs and quoting. The government funding covered his training, 
                        and the local council provided a £1,500 grant for his tools and safety equipment."
                      </p>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-elec-yellow font-medium">Sarah's Electrical, Bristol</h5>
                        <span className="text-xs bg-elec-dark px-2 py-1 rounded-full">Year 2-4</span>
                      </div>
                      <p className="text-sm">
                        "As a female electrician, I wanted to encourage more women into the trade. 
                        Taking on Emma as an apprentice not only helped my business grow but allowed me 
                        to offer domestic customers the option of all-female electricians—a unique selling 
                        point. The training provider handled all the paperwork, making it much easier than I expected."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Productivity Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Understanding the typical productivity development of an apprentice helps set realistic expectations:
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/4">
                        <div className="bg-elec-yellow p-3 rounded-lg text-elec-dark font-medium text-center">
                          Months 1-6
                        </div>
                      </div>
                      <div className="w-full sm:w-3/4 bg-elec-dark/60 p-3 rounded-lg">
                        <p className="text-sm">
                          <strong>Limited Productivity:</strong> Focus on safety, basic skills, and familiarisation with tools.
                          Apprentice can help with preparation, clean-up, and simple tasks under close supervision.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/4">
                        <div className="bg-elec-yellow p-3 rounded-lg text-elec-dark font-medium text-center">
                          Months 7-12
                        </div>
                      </div>
                      <div className="w-full sm:w-3/4 bg-elec-dark/60 p-3 rounded-lg">
                        <p className="text-sm">
                          <strong>Building Capability:</strong> Can handle routine tasks with supervision.
                          Basic wiring, fixture mounting, and cable runs becoming more independent.
                          Typically productive for 30-40% of the working day.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/4">
                        <div className="bg-elec-yellow p-3 rounded-lg text-elec-dark font-medium text-center">
                          Year 2
                        </div>
                      </div>
                      <div className="w-full sm:w-3/4 bg-elec-dark/60 p-3 rounded-lg">
                        <p className="text-sm">
                          <strong>Increasing Independence:</strong> Can work on standard installations with periodic checks.
                          Understanding of regulations improving with study.
                          Productivity around 50-60% of a qualified electrician.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="w-full sm:w-1/4">
                        <div className="bg-elec-yellow p-3 rounded-lg text-elec-dark font-medium text-center">
                          Year 3-4
                        </div>
                      </div>
                      <div className="w-full sm:w-3/4 bg-elec-dark/60 p-3 rounded-lg">
                        <p className="text-sm">
                          <strong>Near Qualified Level:</strong> Working independently on most tasks.
                          Preparing for final assessments and qualifications.
                          Productivity at 70-90% of qualified electrician, with increasing value to your business.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Apprentice Checklist Tab Content */}
            <TabsContent value="checklist" className="space-y-4">
              <Card className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-elec-yellow" />
                      Sole Trader Readiness Checklist
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Use this checklist to ensure you're fully prepared to take on an apprentice:
                  </p>

                  <div className="space-y-6">
                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Business Readiness</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Stable workflow with consistent jobs for at least the next 6-12 months</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Financial capacity to pay apprentice wages (even during college days)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Updated public liability and employer's liability insurance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Variety of work that covers apprenticeship standard requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Transportation arrangements for apprentice to job sites</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Administrative Preparations</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>PAYE system set up for wage processing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Employment contract template ready (apprenticeship-specific)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Apprenticeship agreement and commitment statement prepared</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Record-keeping system for apprentice progress and evidence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Registered with apprenticeship service and funding arranged</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Training Partnership</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Training provider selected and relationship established</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Clear understanding of college attendance schedule</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Communication channels with college assessor established</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Schedule for apprentice reviews and assessments understood</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-elec-dark/60 p-4 rounded-lg">
                      <h4 className="font-medium text-elec-yellow mb-2">Mentorship Preparation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Training plan aligned with apprenticeship standard</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Schedule for regular feedback and development conversations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Basic tools and PPE prepared for apprentice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="h-5 w-5 border border-elec-yellow/50 rounded flex-shrink-0"></span>
                          <span>Health and safety induction materials prepared</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark">
                    Download Complete Checklist (PDF)
                  </Button>
                </CardContent>
                <CardFooter className="bg-elec-dark/30 p-4 rounded-b-lg">
                  <p className="text-sm">
                    <strong className="text-elec-yellow">Support Available:</strong> Remember that training providers, local business support services, and industry bodies can help you with most of these preparations. Don't feel you need to tackle everything alone.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Training Provider Map */}
      {showMap && (
        <GoogleMapsLoader>
          <TrainingProviderMap onClose={handleCloseMap} />
        </GoogleMapsLoader>
      )}
    </div>
  );
};

export default BusinessApprentices;
