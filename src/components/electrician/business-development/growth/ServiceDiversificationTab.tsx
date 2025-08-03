import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionItem, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Home, 
  Car, 
  Sun, 
  Building, 
  Zap, 
  Clock, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Target,
  BookOpen,
  Settings,
  Award,
  Wrench,
  Calculator,
  PoundSterling,
  BarChart3
} from "lucide-react";

export const ServiceDiversificationTab = () => {
  const isMobile = useIsMobile();

  // Service diversification metrics matching the Pricing Strategies pattern
  const diversificationMetrics = [
    {
      metric: "Market Opportunities",
      data: "6 high-growth sectors identified",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Ready for immediate expansion potential"
    },
    {
      metric: "Investment Range",
      data: "£1K-15K per specialisation",
      icon: <PoundSterling className="h-5 w-5 text-blue-400" />,
      detail: "Including training, equipment and certification"
    },
    {
      metric: "ROI Timeline",
      data: "6-18 months to profitability",
      icon: <TrendingUp className="h-5 w-5 text-green-400" />,
      detail: "Varies by sector complexity and market entry"
    },
    {
      metric: "Revenue Potential",
      data: "£50-200k additional annually",
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      detail: "Through strategic service diversification"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-elec-yellow/50 bg-elec-yellow/10">
        <TrendingUp className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-yellow">
          Strategic service diversification can increase annual revenue by £50-200k while reducing dependency on single service areas.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {diversificationMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        
        <MobileAccordionItem value="smart-home">
          <MobileAccordionTrigger icon={<Home className="h-5 w-5 text-blue-400" />}>
            Smart Home Technology Services
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              <div className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>Smart Home Technology Services</h4>
                    <Badge variant="outline" className={`text-blue-300 border-blue-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      6-12 months implementation
                    </Badge>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Expanding into smart home technology installation and automation services</p>
                </div>

                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>£2,000-3,000 investment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>25-40% premium pricing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-white`}>Medium risk, high reward</span>
                  </div>
                </div>
                
                <div>
                  <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Components</h5>
                  <ul className="space-y-1">
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Smart lighting systems installation
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Home automation hub setup
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Security system wiring
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      Network infrastructure setup
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-blue-400 mt-1`}>1.</span>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Training & Certification (Months 1-2)</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Complete smart home installer courses and manufacturer certifications</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-blue-400 mt-1`}>2.</span>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Tool Investment (Months 3-4)</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Purchase specialised testing equipment and practice installations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-green-400 mt-1`}>3.</span>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Market Entry (Months 5-6)</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Begin offering services and build portfolio of completed projects</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>UK Specific Considerations (2025)</h5>
                  <ul className="space-y-1">
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <AlertTriangle className="h-3 w-3 text-orange-400" />
                      Building Regulations Part P compliance for new circuits
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <AlertTriangle className="h-3 w-3 text-orange-400" />
                      GDPR data protection requirements for connected devices
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <AlertTriangle className="h-3 w-3 text-orange-400" />
                      Rapidly evolving technology standards and compatibility
                    </li>
                    <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                      <AlertTriangle className="h-3 w-3 text-orange-400" />
                      Insurance coverage for smart home installation work
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* EV Charging Infrastructure */}
        <MobileAccordionItem value="ev-charging">
          <MobileAccordionTrigger 
            icon={<Car className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-green-400`} />}
            className="bg-elec-gray/30 border-green-400/20"
          >
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>EV Charging Infrastructure</span>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-green-500/20 text-green-400`}>Very High Demand</Badge>
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-yellow-500/20 text-yellow-400`}>Gov Support</Badge>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="bg-elec-gray/20 border-green-400/20">
              <CardContent className="p-4 space-y-4">
                
                {/* Market Analysis */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-green-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Market Analysis
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300`}>Market Growth</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>850,000+ EVs in UK, target 30M charge points by 2030</p>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300`}>Government Support</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>OZEV grants up to £350 per installation</p>
                    </div>
                  </div>
                </div>

                {/* Services & Revenue */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-green-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Wrench className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Services & Revenue Models
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-green-500/5 rounded-lg p-3">
                      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300 mb-2`}>Residential Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Home charger installation (£500-1,500)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Consumer unit upgrades (£300-800)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Load management systems (£200-500)
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300 mb-2`}>Commercial Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Workplace charging (£2,000-10,000)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Rapid charging hubs (£15,000+)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Fleet charging solutions (£5,000+)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-green-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Implementation Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-green-400`}>1</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 1: OZEV Approval Application</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Complete OZEV installer training and approval process</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-green-400`}>2</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 2: Equipment & Insurance</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Purchase testing equipment, update insurance</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-green-400`}>3</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 3: Market Launch</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Begin installations, build customer base</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & Certifications */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-green-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Award className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Investment & Certifications
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300`}>Initial Investment</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• OZEV training: £500-800</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Testing equipment: £800-1,200</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Insurance upgrade: £200-500</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground font-medium text-green-300`}>Total: £1,500-2,500</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-green-300`}>Required Qualifications</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• OZEV approved installer status</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• EV charger manufacturer training</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Competent person scheme</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Public liability insurance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* UK Regulations */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-green-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <BookOpen className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    UK Regulations & Standards
                  </h4>
                  <div className="bg-green-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-green-300">IET Code of Practice:</strong> Electric vehicle charging equipment installation
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-green-300">BS EN 61851:</strong> Electric vehicle conductive charging system
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-green-300">OZEV Technical Standards:</strong> Government grant scheme requirements
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-green-300">PEN fault protection:</strong> Required for all installations
                    </p>
                  </div>
                </div>

                {/* Risk Mitigation */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-orange-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Shield className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Risk Mitigation
                  </h4>
                  <div className="bg-orange-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Ensure OZEV approval before starting any installations
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Stay updated with changing grant scheme requirements
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Build relationships with multiple charger manufacturers
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Consider commercial market as residential saturates
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Solar & Renewable Energy */}
        <MobileAccordionItem value="solar-renewable">
          <MobileAccordionTrigger 
            icon={<Sun className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-yellow-400`} />}
            className="bg-elec-gray/30 border-yellow-400/20"
          >
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>Solar & Renewable Energy</span>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-green-500/20 text-green-400`}>High Demand</Badge>
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-yellow-500/20 text-yellow-400`}>Very High Profit</Badge>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="bg-elec-gray/20 border-yellow-400/20">
              <CardContent className="p-4 space-y-4">
                
                {/* Market Analysis */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-yellow-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Market Analysis
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-yellow-300`}>Market Size</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>£2.8B UK solar market, net-zero driving growth</p>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-yellow-300`}>Profit Margins</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>25-40% on installations, higher with battery storage</p>
                    </div>
                  </div>
                </div>

                {/* Services & Revenue */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-yellow-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Wrench className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Services & Revenue Models
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-yellow-500/5 rounded-lg p-3">
                      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-yellow-300 mb-2`}>Installation Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Residential solar (£4,000-12,000)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Battery storage (£3,000-8,000)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Heat pump electrical (£1,500-3,000)
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-yellow-300 mb-2`}>Commercial Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Commercial solar arrays (£20,000+)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Industrial storage systems (£50,000+)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Maintenance contracts (£500-2,000/year)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-yellow-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Implementation Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-yellow-400`}>1</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Months 1-3: MCS Certification</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Complete MCS training and assessment process</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-yellow-400`}>2</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Months 4-6: Equipment & Training</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Invest in tools, complete manufacturer training</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-yellow-400`}>3</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Months 7-12: Market Development</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Build portfolio, establish supply chains</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & Certifications */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-yellow-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Award className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Investment & Certifications
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-yellow-300`}>Initial Investment</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• MCS certification: £2,000-4,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Specialist tools: £2,000-5,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Training courses: £1,000-3,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground font-medium text-yellow-300`}>Total: £5,000-12,000</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-yellow-300`}>Required Qualifications</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• MCS installer certification</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Roof work safety training</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• DNO applications knowledge</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Battery safety certification</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* UK Regulations */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-yellow-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <BookOpen className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    UK Regulations & Standards
                  </h4>
                  <div className="bg-yellow-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-yellow-300">MCS Standards:</strong> Mandatory for FIT and RHI eligibility
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-yellow-300">DNO Applications:</strong> G98/G99 for grid connection
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-yellow-300">Building Regulations:</strong> Structural and fire safety requirements
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-yellow-300">CDM Regulations:</strong> Health and safety in construction
                    </p>
                  </div>
                </div>

                {/* Risk Mitigation */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-orange-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Shield className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Risk Mitigation
                  </h4>
                  <div className="bg-orange-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Start with electrical connections, partner for roof work initially
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Build strong supplier relationships for competitive pricing
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Ensure comprehensive insurance covers roof and electrical work
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Stay updated with changing government incentive schemes
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Commercial Services */}
        <MobileAccordionItem value="commercial-services">
          <MobileAccordionTrigger 
            icon={<Building className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-purple-400`} />}
            className="bg-elec-gray/30 border-purple-400/20"
          >
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>Commercial Services</span>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-green-500/20 text-green-400`}>High Demand</Badge>
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-purple-500/20 text-purple-400`}>High Margins</Badge>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="bg-elec-gray/20 border-purple-400/20">
              <CardContent className="p-4 space-y-4">
                
                {/* Market Analysis */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-purple-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Market Analysis
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-300`}>Market Value</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>£4.2B commercial electrical market in UK</p>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-300`}>Profit Potential</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>30-50% higher margins than residential</p>
                    </div>
                  </div>
                </div>

                {/* Services & Revenue */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-purple-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Wrench className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Services & Revenue Models
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-purple-500/5 rounded-lg p-3">
                      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-300 mb-2`}>Project-Based Work</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Office fit-outs (£5,000-50,000)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Retail lighting (£2,000-20,000)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Industrial installations (£10,000+)
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-300 mb-2`}>Ongoing Contracts</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Maintenance contracts (£1,000-10,000/year)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Emergency call-outs (£100-500/call)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Compliance testing (£200-1,000)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-purple-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Implementation Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-purple-400`}>1</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Months 1-2: Commercial Qualifications</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Three-phase systems, commercial installation standards</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-purple-400`}>2</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Months 3-4: Business Development</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Build contractor relationships, tender processes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-purple-400`}>3</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Months 5-6: First Contracts</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Secure initial projects, build portfolio</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & Certifications */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-purple-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Award className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Investment & Certifications
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-300`}>Initial Investment</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Commercial training: £1,500-3,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Equipment upgrade: £2,000-5,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Insurance increase: £500-1,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground font-medium text-purple-300`}>Total: £4,000-9,000</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-300`}>Required Qualifications</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Three-phase installations</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Fire alarm systems (BS 5839)</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Emergency lighting (BS 5266)</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• CDM awareness</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* UK Regulations */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-purple-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <BookOpen className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    UK Regulations & Standards
                  </h4>
                  <div className="bg-purple-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-purple-300">CDM Regulations 2015:</strong> Construction health and safety
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-purple-300">Building Regulations:</strong> Commercial premises compliance
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-purple-300">Fire Safety Order:</strong> Emergency lighting and alarms
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-purple-300">Workplace Regulations:</strong> Electrical safety in workplaces
                    </p>
                  </div>
                </div>

                {/* Risk Mitigation */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-orange-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Shield className={`${isMobile ? 'text-xs' : 'text-sm'}`} />
                    Risk Mitigation
                  </h4>
                  <div className="bg-orange-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Start with smaller commercial projects to build experience
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Ensure adequate public liability insurance (£2M minimum)
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Build strong relationships with main contractors
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Understand tendering and contract processes thoroughly
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Testing, Inspection & Compliance */}
        <MobileAccordionItem value="testing-inspection">
          <MobileAccordionTrigger 
            icon={<Zap className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-cyan-400`} />}
            className="bg-elec-gray/30 border-cyan-400/20"
          >
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>Testing, Inspection & Compliance</span>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-blue-500/20 text-blue-400`}>Steady Demand</Badge>
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-cyan-500/20 text-cyan-400`}>Recurring Revenue</Badge>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="bg-elec-gray/20 border-cyan-400/20">
              <CardContent className="p-4 space-y-4">
                
                {/* Market Analysis */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-cyan-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Market Analysis
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-cyan-300`}>Market Stability</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Regulatory requirements ensure consistent demand</p>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-cyan-300`}>Revenue Model</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Recurring contracts provide predictable income</p>
                    </div>
                  </div>
                </div>

                {/* Services & Revenue */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-cyan-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Wrench className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Services & Revenue Models
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-cyan-500/5 rounded-lg p-3">
                      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-cyan-300 mb-2`}>Testing Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              EICR testing (£150-500)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              PAT testing (£2-8 per item)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Emergency lighting tests (£200-800)
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-cyan-300 mb-2`}>Compliance Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Landlord certificates (£150-300)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Insurance inspections (£300-1,000)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Annual maintenance contracts (£500-5,000)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-cyan-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Implementation Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-cyan-400`}>1</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 1: Testing Equipment</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Purchase multifunction testers, PAT equipment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-cyan-400`}>2</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 2: Training & Certification</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Complete testing and inspection courses</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-cyan-400`}>3</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 3: Service Launch</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Begin offering testing services, build contracts</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & Certifications */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-cyan-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Award className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Investment & Certifications
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-cyan-300`}>Initial Investment</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Multifunction tester: £800-2,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• PAT tester: £300-800</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Training courses: £500-1,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground font-medium text-cyan-300`}>Total: £1,600-3,800</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-cyan-300`}>Required Qualifications</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• 2391 Testing & Inspection</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• PAT testing certification</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Emergency lighting training</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Competent person scheme</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* UK Regulations */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-cyan-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <BookOpen className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    UK Regulations & Standards
                  </h4>
                  <div className="bg-cyan-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-cyan-300">Electrical Safety Standards:</strong> 5-year EICR cycles for rentals
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-cyan-300">Health & Safety at Work Act:</strong> Annual PAT testing requirements
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-cyan-300">BS 5266:</strong> Emergency lighting testing standards
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-cyan-300">Insurance Requirements:</strong> Regular inspections for coverage
                    </p>
                  </div>
                </div>

                {/* Risk Mitigation */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-orange-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Shield className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Risk Mitigation
                  </h4>
                  <div className="bg-orange-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Ensure professional indemnity insurance covers testing work
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Keep testing equipment regularly calibrated
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Build relationships with property management companies
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Stay updated with changing regulatory requirements
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Emergency Services */}
        <MobileAccordionItem value="emergency-services">
          <MobileAccordionTrigger 
            icon={<AlertTriangle className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-red-400`} />}
            className="bg-elec-gray/30 border-red-400/20"
          >
            <span className={`${isMobile ? 'text-sm' : 'text-base'} font-medium`}>Emergency Services</span>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-orange-500/20 text-orange-400`}>24/7 Demand</Badge>
              <Badge variant="secondary" className={`${isMobile ? 'text-xs px-1.5 py-0.5' : 'text-xs'} bg-red-500/20 text-red-400`}>Premium Rates</Badge>
            </div>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <Card className="bg-elec-gray/20 border-red-400/20">
              <CardContent className="p-4 space-y-4">
                
                {/* Market Analysis */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-red-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Clock className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Market Analysis
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-red-300`}>Demand Profile</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>24/7 demand, seasonal peaks in winter</p>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-red-300`}>Premium Rates</p>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>2-3x standard rates for emergency calls</p>
                    </div>
                  </div>
                </div>

                {/* Services & Revenue */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-red-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Wrench className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Services & Revenue Models
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-red-500/5 rounded-lg p-3">
                      <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-red-300 mb-2`}>Emergency Call-outs</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Power failures (£100-500)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Electrical faults (£150-800)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Safety issues (£200-1,000)
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-red-300 mb-2`}>Contract Services</p>
                          <ul className="space-y-1">
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Business continuity (£2,000-10,000/year)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Retail chain support (£5,000+/year)
                            </li>
                            <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground flex items-center gap-2`}>
                              <CheckCircle className="h-3 w-3 text-green-400" />
                              Property management (£1,000-5,000/year)
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-red-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Calendar className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Implementation Timeline
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-red-400`}>1</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 1: Equipment & Van Setup</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Stock van with emergency supplies, testing kit</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-red-400`}>2</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 2: Marketing & Contracts</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Build local business relationships, online presence</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-red-400`}>3</span>
                      </div>
                      <div>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>Month 3: Service Launch</p>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>Begin 24/7 emergency response service</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Investment & Requirements */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-red-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <DollarSign className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Investment & Requirements
                  </h4>
                  <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-red-300`}>Initial Investment</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Van stock: £1,000-2,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Testing equipment: £500-1,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Marketing: £500-1,000</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground font-medium text-red-300`}>Total: £2,000-4,000</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-red-300`}>Key Requirements</p>
                      <ul className="space-y-1">
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• 24/7 availability commitment</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Rapid response capability</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Comprehensive van stock</li>
                        <li className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>• Professional insurance</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Service Standards */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-red-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Settings className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Service Standards & Response
                  </h4>
                  <div className="bg-red-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-red-300">Response Times:</strong> 2-4 hours for emergencies, 1 hour for critical
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-red-300">Coverage Area:</strong> Define realistic geographic boundaries
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-red-300">Safety First:</strong> Ensure safe isolation before repair attempts
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • <strong className="text-red-300">Communication:</strong> Keep customers informed throughout process
                    </p>
                  </div>
                </div>

                {/* Risk Mitigation */}
                <div className="space-y-3">
                  <h4 className={`font-semibold text-orange-400 ${isMobile ? 'text-sm' : 'text-base'} flex items-center gap-2`}>
                    <Shield className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                    Risk Mitigation
                  </h4>
                  <div className="bg-orange-500/5 rounded-lg p-3 space-y-2">
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Start with daytime emergency service before 24/7 commitment
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Ensure adequate personal safety measures for lone working
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Build network of trusted subcontractors for overflow
                    </p>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                      • Consider work-life balance impact of 24/7 service
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </MobileAccordionContent>
        </MobileAccordionItem>

      </MobileAccordion>

      {/* Summary Card */}
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-elec-yellow">
            <Target className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
            Strategic Implementation Approach
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
            <div className="space-y-2">
              <h4 className={`font-medium text-elec-yellow ${isMobile ? 'text-sm' : 'text-base'}`}>Phase 1: Foundation</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Start with 1-2 specialisms that match your current skills and local market demand
              </p>
            </div>
            <div className="space-y-2">
              <h4 className={`font-medium text-elec-yellow ${isMobile ? 'text-sm' : 'text-base'}`}>Phase 2: Growth</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Expand gradually based on market response and available capital for investment
              </p>
            </div>
            <div className="space-y-2">
              <h4 className={`font-medium text-elec-yellow ${isMobile ? 'text-sm' : 'text-base'}`}>Phase 3: Scale</h4>
              <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                Consider subcontracting or hiring to manage multiple service lines effectively
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/10 rounded-lg p-3">
            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground text-center font-medium`}>
              <strong className="text-elec-yellow">Key Success Factor:</strong> Focus on quality and compliance over speed of expansion. 
              Building reputation in one area often leads to natural opportunities in others.
            </p>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};