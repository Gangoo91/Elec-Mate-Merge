import { Button } from "@/components/ui/button";
import { Target, Brain, TrendingUp, BarChart3, Eye, Clock, Award, MapPin, PoundSterling, GraduationCap, ShieldCheck, Building, Briefcase, Home } from "lucide-react";
import { DropdownTabs, DropdownTab } from "@/components/ui/dropdown-tabs";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import EnhancedCareerOverview from "../../../apprentice/career/enhanced/EnhancedCareerOverview";
import UKCareerProgressionTimeline from "../../../apprentice/career/UKCareerProgressionTimeline";
import UKRegionalJobMarkets from "../../../apprentice/career/UKRegionalJobMarkets";

import JIBGradingScheme from "../../../apprentice/career/JIBGradingScheme";
import SkillsDevelopmentMatrix from "../../../apprentice/career/enhanced/SkillsDevelopmentMatrix";
import ProfessionalDevelopmentStrategy from "../../../apprentice/career/enhanced/ProfessionalDevelopmentStrategy";
import IndustryInsightsAnalysis from "../../../apprentice/career/enhanced/IndustryInsightsAnalysis";


const ElectricianCareerPathways = () => {

  const careerPathwaysTabs: DropdownTab[] = [
    {
      value: "overview",
      label: "Overview",
      icon: Eye,
      content: <EnhancedCareerOverview />
    },
    {
      value: "skills-matrix",
      label: "Skills Development",
      icon: Brain,
      content: <SkillsDevelopmentMatrix />
    },
    {
      value: "professional-development",
      label: "Professional Development",
      icon: Target,
      content: <ProfessionalDevelopmentStrategy />
    },
    {
      value: "industry-insights",
      label: "Industry Analysis",
      icon: BarChart3,
      content: <IndustryInsightsAnalysis />
    },
    {
      value: "timeline",
      label: "Timeline",
      icon: Clock,
      content: <UKCareerProgressionTimeline />
    },
    {
      value: "jib",
      label: "JIB Grades",
      icon: Award,
      content: <JIBGradingScheme />
    },
    {
      value: "regions",
      label: "Regional Markets",
      icon: MapPin,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Regions</div>
              <div className="text-xs text-white">UK coverage</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Rates</div>
              <div className="text-xs text-white">Highest areas</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Demand</div>
              <div className="text-xs text-white">Current market</div>
            </div>
            <div className="rounded-lg border border-elec-yellow/20 bg-elec-gray/50 p-3 text-center">
              <div className="text-elec-yellow text-lg font-semibold">Starters</div>
              <div className="text-xs text-white">Best regions</div>
            </div>
          </div>
          <MobileAccordion type="single" collapsible className="w-full">
            <MobileAccordionItem value="regions-overview">
              <MobileAccordionTrigger icon={<MapPin className="h-5 w-5 text-blue-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Explore regions
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3">
                <UKRegionalJobMarkets />
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-wage-bands">
              <MobileAccordionTrigger icon={<PoundSterling className="h-5 w-5 text-green-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                JIB wage bands & allowances
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <p className="text-white text-xs bg-elec-yellow/10 p-2 rounded border-l-2 border-elec-yellow">Reference only — always check the latest JIB rate sheets and company agreements for 2025.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-2 text-sm">2025 JIB Grades & Base Rates</h4>
                      <ul className="space-y-2 text-xs text-white">
                        <li><span className="text-elec-yellow">Electrician:</span> £20.50-£22.50/hr (London +15-20%)</li>
                        <li><span className="text-elec-yellow">Approved Electrician:</span> £22.80-£25.20/hr</li>
                        <li><span className="text-elec-yellow">Technician:</span> £25.50-£28.50/hr</li>
                        <li><span className="text-elec-yellow">Supervisor:</span> £28.00-£32.00/hr</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-2 text-sm">Allowances & Premiums</h4>
                      <ul className="space-y-2 text-xs text-white">
                        <li><span className="text-elec-yellow">Travel:</span> £0.45-0.65/mile (HMRC rates)</li>
                        <li><span className="text-elec-yellow">Overtime:</span> Time-and-a-half after 39hrs</li>
                        <li><span className="text-elec-yellow">Night shift:</span> +25% premium (6pm-6am)</li>
                        <li><span className="text-elec-yellow">Weekend:</span> Double time Saturday/Sunday</li>
                        <li><span className="text-elec-yellow">London weighting:</span> +£3,000-5,000/year</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2 text-sm">Regional Variations (2025)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-elec-yellow/5 p-2 rounded">
                        <div className="text-elec-yellow text-xs font-medium">Scotland/Wales</div>
                        <div className="text-white text-xs">SJIB/WEA rates may differ</div>
                      </div>
                      <div className="bg-elec-yellow/5 p-2 rounded">
                        <div className="text-elec-yellow text-xs font-medium">Northern Ireland</div>
                        <div className="text-white text-xs">NIE Networks agreements</div>
                      </div>
                      <div className="bg-elec-yellow/5 p-2 rounded">
                        <div className="text-elec-yellow text-xs font-medium">Major Projects</div>
                        <div className="text-white text-xs">HS2, Hinckley Point premiums</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-hotspots">
              <MobileAccordionTrigger icon={<TrendingUp className="h-5 w-5 text-orange-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Demand hotspots & top cities
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-3">2025 High Demand Regions</h4>
                      <div className="space-y-2">
                        <div className="bg-green-500/10 p-2 rounded border-l-2 border-green-400">
                          <div className="text-green-400 font-medium text-xs">London & South East</div>
                          <div className="text-white text-xs">Major projects: King's Cross Phase 3, Canary Wharf expansion, Thames Estuary development</div>
                          <div className="text-white text-xs mt-1">Specialities: Data centres (Slough, Maidenhead), EV charging networks, smart buildings</div>
                        </div>
                        <div className="bg-blue-500/10 p-2 rounded border-l-2 border-blue-400">
                          <div className="text-blue-400 font-medium text-xs">Midlands</div>
                          <div className="text-white text-xs">EV manufacturing (JLR, BMW), gigafactory construction, logistics automation</div>
                          <div className="text-white text-xs mt-1">Growth: Battery storage facilities, automated warehousing (Amazon, DHL)</div>
                        </div>
                        <div className="bg-orange-500/10 p-2 rounded border-l-2 border-orange-400">
                          <div className="text-orange-400 font-medium text-xs">North West & North East</div>
                          <div className="text-white text-xs">HS2 Phase 2, offshore wind connections, nuclear (Sizewell C prep)</div>
                          <div className="text-white text-xs mt-1">Emerging: Green hydrogen hubs, carbon capture projects</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-3">Top Cities for Opportunities</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs">London</span>
                          <span className="text-green-400 text-xs">£250-400/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs">Manchester</span>
                          <span className="text-blue-400 text-xs">£180-280/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs">Birmingham</span>
                          <span className="text-blue-400 text-xs">£170-270/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs">Leeds</span>
                          <span className="text-yellow-400 text-xs">£160-250/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs">Bristol</span>
                          <span className="text-blue-400 text-xs">£180-290/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white text-xs">Glasgow</span>
                          <span className="text-yellow-400 text-xs">£150-240/day</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-2 bg-elec-yellow/5 rounded">
                        <h5 className="text-elec-yellow text-xs font-medium mb-1">Best Months for Job Hunting</h5>
                        <div className="text-white text-xs">January-March: Budget releases, new projects</div>
                        <div className="text-white text-xs">September-October: After summer, pre-Christmas push</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">2025 Emerging Markets</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-purple-500/10 p-2 rounded text-center">
                        <div className="text-purple-400 text-xs font-medium">EV Infrastructure</div>
                        <div className="text-white text-xs">50,000+ new charging points</div>
                      </div>
                      <div className="bg-green-500/10 p-2 rounded text-center">
                        <div className="text-green-400 text-xs font-medium">Heat Pumps</div>
                        <div className="text-white text-xs">600,000 installations target</div>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded text-center">
                        <div className="text-blue-400 text-xs font-medium">Battery Storage</div>
                        <div className="text-white text-xs">Grid-scale projects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-apprenticeships">
              <MobileAccordionTrigger icon={<GraduationCap className="h-5 w-5 text-blue-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Apprenticeships & providers
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">2025 Apprenticeship Providers</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <h5 className="text-white font-medium text-xs mb-2">National Providers</h5>
                        <ul className="space-y-1 text-xs text-white">
                          <li><span className="text-elec-yellow">JTL Training:</span> 01923 652 000 (largest electrical training provider)</li>
                          <li><span className="text-elec-yellow">EAL:</span> 0300 303 53 51 (awarding body + training)</li>
                          <li><span className="text-elec-yellow">City & Guilds:</span> Regional centres nationwide</li>
                          <li><span className="text-elec-yellow">NICEIC:</span> Technical training courses</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-xs mb-2">Regional Specialists</h5>
                        <ul className="space-y-1 text-xs text-white">
                          <li><span className="text-elec-yellow">Scotland:</span> Scottish Electrical Charitable Training Trust</li>
                          <li><span className="text-elec-yellow">Wales:</span> CITB Construction Skills</li>
                          <li><span className="text-elec-yellow">N. Ireland:</span> NIFETAC training centres</li>
                          <li><span className="text-elec-yellow">London:</span> Westminster Kingsway College</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-elec-yellow/5 p-3 rounded border-l-2 border-elec-yellow">
                    <h4 className="text-elec-yellow font-medium mb-2 text-xs">2025 Application Timeline</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-white font-medium">September 2025 Intake:</span>
                        <div className="text-white mt-1">Applications: January-June 2025</div>
                        <div className="text-white">Interviews: March-July 2025</div>
                        <div className="text-white">Start: September 2025</div>
                      </div>
                      <div>
                        <span className="text-white font-medium">Entry Requirements:</span>
                        <div className="text-white mt-1">5 GCSEs grade 4+ (inc. Maths & English)</div>
                        <div className="text-white">Colour vision test</div>
                        <div className="text-white">Employer willing to sponsor</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Specialist Pathways (2025)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-green-500/10 p-2 rounded text-center">
                        <div className="text-green-400 text-xs font-medium">Renewables</div>
                        <div className="text-white text-xs">Solar PV, Wind, Heat pumps</div>
                      </div>
                      <div className="bg-blue-500/10 p-2 rounded text-center">
                        <div className="text-blue-400 text-xs font-medium">Data/Telecoms</div>
                        <div className="text-white text-xs">Fibre, 5G, Smart systems</div>
                      </div>
                      <div className="bg-purple-500/10 p-2 rounded text-center">
                        <div className="text-purple-400 text-xs font-medium">Industrial/HV</div>
                        <div className="text-white text-xs">Power systems, Automation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-cost-of-living">
              <MobileAccordionTrigger icon={<Home className="h-5 w-5 text-yellow-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Cost of living & travel
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-2">2025 Living Costs (Monthly)</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-white">London (Zone 2-3):</span>
                          <span className="text-red-400">£800-1500 rent</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">South East:</span>
                          <span className="text-orange-400">£600-1200 rent</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">Midlands:</span>
                          <span className="text-yellow-400">£450-900 rent</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white">North/Scotland:</span>
                          <span className="text-green-400">£400-800 rent</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-2 bg-blue-500/10 rounded">
                        <div className="text-blue-400 text-xs font-medium">Weekly Lodge Rates</div>
                        <div className="text-white text-xs">London: £150-250/week</div>
                        <div className="text-white text-xs">Regional: £100-180/week</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-2">2025 Transport Costs</h4>
                      <div className="space-y-2 text-xs">
                        <div className="bg-red-500/10 p-2 rounded">
                          <div className="text-red-400 font-medium">ULEZ/CAZ Charges</div>
                          <div className="text-white">London ULEZ: £12.50/day</div>
                          <div className="text-white">Birmingham CAZ: £8/day</div>
                          <div className="text-white">Bath/Bristol: £9/day</div>
                        </div>
                        
                        <div className="bg-blue-500/10 p-2 rounded">
                          <div className="text-blue-400 font-medium">Rail Season Tickets</div>
                          <div className="text-white">London (Zone 1-6): £3,456/year</div>
                          <div className="text-white">Commuter lines: £2,000-4,500/year</div>
                        </div>
                        
                        <div className="bg-green-500/10 p-2 rounded">
                          <div className="text-green-400 font-medium">Fuel & Mileage (2025)</div>
                          <div className="text-white">Petrol: ~145p/litre</div>
                          <div className="text-white">HMRC rate: £0.45/mile</div>
                          <div className="text-white">EV charging: £0.10-0.30/mile</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-elec-yellow/5 p-3 rounded border-l-2 border-elec-yellow">
                    <h4 className="text-elec-yellow font-medium mb-2 text-xs">Smart Money Tips for 2025</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-white font-medium">Day Rate vs Location:</span>
                        <div className="text-white mt-1">London: Minimum £250/day to break even</div>
                        <div className="text-white">Regional: £180+ day rate acceptable</div>
                      </div>
                      <div>
                        <span className="text-white font-medium">Travel Time Policies:</span>
                        <div className="text-white mt-1">Portal-to-portal: Full pay for travel time</div>
                        <div className="text-white">Site-to-site: Usually paid at standard rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-compliance">
              <MobileAccordionTrigger icon={<ShieldCheck className="h-5 w-5 text-green-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Compliance & best practice
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">2025 Regulatory Updates</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <h5 className="text-white font-medium text-xs mb-2">BS 7671 (18th Edition)</h5>
                        <div className="space-y-1 text-xs">
                          <div className="bg-green-500/10 p-2 rounded">
                            <span className="text-green-400">Current:</span>
                            <div className="text-white">Amendment 2 (2022) in force</div>
                            <div className="text-white">Amendment 3 expected late 2025</div>
                          </div>
                          <div className="text-white">Key changes: EV charging, energy storage</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-white font-medium text-xs mb-2">Regional Building Regs</h5>
                        <div className="space-y-1 text-xs">
                          <div className="text-white"><span className="text-elec-yellow">England/Wales:</span> Part P scope expanded</div>
                          <div className="text-white"><span className="text-elec-yellow">Scotland:</span> Section 4 (Safety) updates</div>
                          <div className="text-white"><span className="text-elec-yellow">N. Ireland:</span> Technical Booklet R revisions</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Certification Schemes (2025)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-blue-500/10 p-2 rounded">
                        <div className="text-blue-400 text-xs font-medium">England/Wales</div>
                        <div className="text-white text-xs">NICEIC, NAPIT, ECA</div>
                        <div className="text-white text-xs">Part P notification required</div>
                      </div>
                      <div className="bg-green-500/10 p-2 rounded">
                        <div className="text-green-400 text-xs font-medium">Scotland</div>
                        <div className="text-white text-xs">SELECT, NICEIC</div>
                        <div className="text-white text-xs">Building warrant system</div>
                      </div>
                      <div className="bg-purple-500/10 p-2 rounded">
                        <div className="text-purple-400 text-xs font-medium">N. Ireland</div>
                        <div className="text-white text-xs">NICEIC, ECA</div>
                        <div className="text-white text-xs">Building control approval</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-500/10 p-3 rounded border-l-2 border-yellow-400">
                    <h4 className="text-yellow-400 font-medium mb-2 text-xs">2025 Compliance Checklist</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-white font-medium">Essential Renewals:</span>
                        <div className="text-white mt-1">18th Edition: Every 5 years</div>
                        <div className="text-white">ECS Card: Every 5 years</div>
                        <div className="text-white">CSCS: Check expiry date</div>
                      </div>
                      <div>
                        <span className="text-white font-medium">New Requirements:</span>
                        <div className="text-white mt-1">EV charging competence (2919)</div>
                        <div className="text-white">Energy storage awareness</div>
                        <div className="text-white">Net Zero training (optional)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-employers-projects">
              <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-purple-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Key employers & major projects
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-3">Tier 1 Employers (2025)</h4>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-2 rounded">
                          <div className="text-blue-400 font-medium text-xs">Balfour Beatty</div>
                          <div className="text-white text-xs">Major recruitment drive 2025</div>
                          <div className="text-white text-xs">HS2, data centres, rail projects</div>
                          <div className="text-elec-yellow text-xs">Apply: careers.balfourbeatty.com</div>
                        </div>
                        <div className="bg-green-500/10 p-2 rounded">
                          <div className="text-green-400 font-medium text-xs">VINCI Construction</div>
                          <div className="text-white text-xs">Infrastructure specialists</div>
                          <div className="text-white text-xs">Nuclear, transport, energy</div>
                          <div className="text-elec-yellow text-xs">Apply: vinci-construction.co.uk</div>
                        </div>
                        <div className="bg-purple-500/10 p-2 rounded">
                          <div className="text-purple-400 font-medium text-xs">Skanska UK</div>
                          <div className="text-white text-xs">Smart construction focus</div>
                          <div className="text-white text-xs">Hospitals, commercial, residential</div>
                          <div className="text-elec-yellow text-xs">Apply: careers.skanska.co.uk</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-3">Major Projects (2025-2027)</h4>
                      <div className="space-y-2">
                        <div className="bg-red-500/10 p-2 rounded">
                          <div className="text-red-400 font-medium text-xs">HS2 Phase 2</div>
                          <div className="text-white text-xs">Birmingham to Manchester</div>
                          <div className="text-white text-xs">1000+ electrician roles</div>
                          <div className="text-white text-xs">Premium rates: £300-450/day</div>
                        </div>
                        <div className="bg-orange-500/10 p-2 rounded">
                          <div className="text-orange-400 font-medium text-xs">Sizewell C Nuclear</div>
                          <div className="text-white text-xs">Suffolk - early works 2025</div>
                          <div className="text-white text-xs">HV/LV specialists needed</div>
                          <div className="text-white text-xs">Security clearance required</div>
                        </div>
                        <div className="bg-teal-500/10 p-2 rounded">
                          <div className="text-teal-400 font-medium text-xs">Thames Estuary Development</div>
                          <div className="text-white text-xs">London Gateway expansion</div>
                          <div className="text-white text-xs">Data centres, logistics hubs</div>
                          <div className="text-white text-xs">EV infrastructure specialists</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-elec-yellow font-medium mb-2">Getting Hired - Insider Tips (2025)</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-elec-yellow/5 p-2 rounded">
                        <div className="text-elec-yellow text-xs font-medium">CV Essentials</div>
                        <div className="text-white text-xs">Gold Card, 18th Edition, AM2</div>
                        <div className="text-white text-xs">Recent project examples</div>
                        <div className="text-white text-xs">Specialist tickets (EV, Solar)</div>
                      </div>
                      <div className="bg-elec-yellow/5 p-2 rounded">
                        <div className="text-elec-yellow text-xs font-medium">Interview Prep</div>
                        <div className="text-white text-xs">Know current BS 7671 changes</div>
                        <div className="text-white text-xs">Safety record examples</div>
                        <div className="text-white text-xs">Teamwork scenarios</div>
                      </div>
                      <div className="bg-elec-yellow/5 p-2 rounded">
                        <div className="text-elec-yellow text-xs font-medium">Best Approach</div>
                        <div className="text-white text-xs">Apply early in project lifecycle</div>
                        <div className="text-white text-xs">Network at trade events</div>
                        <div className="text-white text-xs">Follow companies on LinkedIn</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>

            <MobileAccordionItem value="regions-agencies">
              <MobileAccordionTrigger icon={<Briefcase className="h-5 w-5 text-pink-400" />} className="bg-elec-gray border border-elec-yellow/20 rounded-lg px-4 py-4">
                Agencies & job boards
              </MobileAccordionTrigger>
              <MobileAccordionContent className="bg-elec-gray border-x border-b border-elec-yellow/20 rounded-b-lg p-3 text-sm">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-3">Specialist Agencies (2025)</h4>
                      <div className="space-y-2">
                        <div className="bg-blue-500/10 p-2 rounded">
                          <div className="text-blue-400 font-medium text-xs">Randstad (Technical)</div>
                          <div className="text-white text-xs">Infrastructure & energy projects</div>
                          <div className="text-white text-xs">0345 266 5566</div>
                          <div className="text-elec-yellow text-xs">Strong HS2 & nuclear pipeline</div>
                        </div>
                        <div className="bg-green-500/10 p-2 rounded">
                          <div className="text-green-400 font-medium text-xs">Hays Construction</div>
                          <div className="text-white text-xs">Commercial & residential</div>
                          <div className="text-white text-xs">020 7259 8800</div>
                          <div className="text-elec-yellow text-xs">London & South East focus</div>
                        </div>
                        <div className="bg-purple-500/10 p-2 rounded">
                          <div className="text-purple-400 font-medium text-xs">Gi Group</div>
                          <div className="text-white text-xs">Industrial & manufacturing</div>
                          <div className="text-white text-xs">0121 633 4499</div>
                          <div className="text-elec-yellow text-xs">Midlands & North specialists</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-elec-yellow font-medium mb-3">Job Boards & Platforms</h4>
                      <div className="space-y-2">
                        <div className="bg-orange-500/10 p-2 rounded">
                          <div className="text-orange-400 font-medium text-xs">CV-Library</div>
                          <div className="text-white text-xs">Largest UK job board</div>
                          <div className="text-white text-xs">Advanced filtering by quals</div>
                          <div className="text-elec-yellow text-xs">cv-library.co.uk</div>
                        </div>
                        <div className="bg-teal-500/10 p-2 rounded">
                          <div className="text-teal-400 font-medium text-xs">Indeed (UK)</div>
                          <div className="text-white text-xs">Company reviews & salaries</div>
                          <div className="text-white text-xs">Direct employer contact</div>
                          <div className="text-elec-yellow text-xs">indeed.co.uk</div>
                        </div>
                        <div className="bg-pink-500/10 p-2 rounded">
                          <div className="text-pink-400 font-medium text-xs">LinkedIn Jobs</div>
                          <div className="text-white text-xs">Professional networking</div>
                          <div className="text-white text-xs">Follow industry leaders</div>
                          <div className="text-elec-yellow text-xs">linkedin.com/jobs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-elec-yellow/5 p-3 rounded border-l-2 border-elec-yellow">
                    <h4 className="text-elec-yellow font-medium mb-2 text-xs">2025 Rate Negotiation Strategy</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-white font-medium">Know Your Worth:</span>
                        <div className="text-white mt-1">Research project-specific rates</div>
                        <div className="text-white">Factor in travel/lodge costs</div>
                        <div className="text-white">Highlight specialist skills</div>
                      </div>
                      <div>
                        <span className="text-white font-medium">Umbrella vs PAYE:</span>
                        <div className="text-white mt-1">Umbrella: Higher headline rate</div>
                        <div className="text-white">PAYE: More take-home security</div>
                        <div className="text-white">Calculate both scenarios</div>
                      </div>
                      <div>
                        <span className="text-white font-medium">Peak Times:</span>
                        <div className="text-white mt-1">January: Budget approvals</div>
                        <div className="text-white">March: End of financial year</div>
                        <div className="text-white">September: Project starts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          </MobileAccordion>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-elec-yellow" />
          UK Electrical Career Pathways
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-3xl mb-3">
          Comprehensive career development framework including skills matrices, professional development strategies, 
          industry insights, and progression pathways for electrical professionals in the UK
        </p>
      </div>

      <DropdownTabs 
        tabs={careerPathwaysTabs}
        defaultValue="overview"
        placeholder="Select career section"
        className="w-full"
      />
    </div>
  );
};

export default ElectricianCareerPathways;