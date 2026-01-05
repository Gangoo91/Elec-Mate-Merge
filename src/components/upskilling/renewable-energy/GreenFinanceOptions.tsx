import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PoundSterling, CreditCard, TrendingUp, FileText, Calculator, Target, Shield, AlertCircle, CheckCircle, Building, Home, Factory, DollarSign, BarChart3, Users, MapPin, Clock, Percent, Zap, Leaf, Award, Book, Globe, Briefcase, PieChart, Star, Lightbulb, TreePine, Wind, Sun } from 'lucide-react';

const GreenFinanceOptions = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <PoundSterling className="h-6 w-6 text-elec-yellow" />
          Green Finance and Funding Options
        </h2>
        
        <div className="space-y-12">
          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-elec-yellow/10 to-blue-600/10 p-6 rounded-lg border border-elec-yellow/30">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Finance Landscape Overview
            </h3>
            <p className="text-gray-300 mb-4">
              The UK renewable energy finance market has evolved significantly, offering diverse funding mechanisms for projects from domestic installations to large commercial deployments. Government incentives, green lending products, and innovative financing structures have created multiple pathways to project financing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-elec-dark/50 p-4 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="h-4 w-4 text-green-400" />
                  <span className="text-foreground font-semibold">Market Size</span>
                </div>
                <p className="text-2xl font-bold text-green-400">£12.2bn</p>
                <p className="text-xs text-gray-400">Annual UK renewables investment</p>
              </div>
              <div className="bg-elec-dark/50 p-4 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="h-4 w-4 text-blue-400" />
                  <span className="text-foreground font-semibold">Interest Rates</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">2.9-7.9%</p>
                <p className="text-xs text-gray-400">Typical green loan APR range</p>
              </div>
              <div className="bg-elec-dark/50 p-4 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-elec-yellow" />
                  <span className="text-foreground font-semibold">Success Rate</span>
                </div>
                <p className="text-2xl font-bold text-elec-yellow">87%</p>
                <p className="text-xs text-gray-400">Finance approval rate (qualified applications)</p>
              </div>
            </div>
          </div>

          {/* Government Schemes - Expanded */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Building className="h-5 w-5" />
              Government Schemes and Grants
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* National Schemes */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  National Government Schemes
                </h4>
                
                <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-semibold text-foreground">Business Energy Efficiency Grant</h5>
                    <Badge className="bg-green-600/20 text-green-300 border-green-600/30">Active</Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">Available through selected local enterprise partnerships and regional development agencies.</p>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div className="flex justify-between"><span>Grant Amount:</span><span className="text-foreground">Up to £10,000</span></div>
                    <div className="flex justify-between"><span>Match Funding:</span><span className="text-foreground">50% maximum</span></div>
                    <div className="flex justify-between"><span>Min. Investment:</span><span className="text-foreground">£1,000</span></div>
                    <div className="flex justify-between"><span>Energy Audit:</span><span className="text-foreground">Required</span></div>
                  </div>
                  <div className="mt-3 p-3 bg-green-900/20 rounded border border-green-700/50">
                    <p className="text-xs text-green-200"><strong>Eligibility:</strong> SMEs with less than 250 employees, under €50m turnover, energy-saving equipment from approved list</p>
                  </div>
                </div>
              </div>

              {/* Regional and Local Schemes */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  Regional and Local Authority Schemes
                </h4>

                <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-3">Scotland - Home Energy Scotland</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between"><span>Interest-free loans:</span><span className="text-foreground">Up to £38,500</span></div>
                    <div className="flex justify-between"><span>Cashback:</span><span className="text-foreground">Up to £7,500</span></div>
                    <div className="flex justify-between"><span>Technologies:</span><span className="text-foreground">Heat pumps, solar PV, biomass</span></div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-900/20 rounded border border-blue-700/50">
                    <p className="text-xs text-blue-200"><strong>Process:</strong> Home Energy Scotland advice → survey → application → approval → installation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Finance Structures */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Commercial Finance Structures
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bank Loans */}
              <div className="bg-elec-dark p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building className="h-4 w-4 text-blue-400" />
                  Bank and Institutional Loans
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                    <h5 className="font-semibold text-foreground mb-2">Green Business Loans</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
                      <div>APR: <span className="text-foreground">3.2-6.9%</span></div>
                      <div>Term: <span className="text-foreground">1-15 years</span></div>
                      <div>Amount: <span className="text-foreground">£25k-£2m</span></div>
                      <div>LTV: <span className="text-foreground">Up to 80%</span></div>
                    </div>
                    <p className="text-xs text-gray-400">Secured against business assets or property. Preferential rates for energy efficiency measures.</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                    <h5 className="font-semibold text-foreground mb-2">Asset Finance</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
                      <div>APR: <span className="text-foreground">4.1-8.5%</span></div>
                      <div>Term: <span className="text-foreground">2-10 years</span></div>
                      <div>Deposit: <span className="text-foreground">10-30%</span></div>
                      <div>Speed: <span className="text-foreground">5-14 days</span></div>
                    </div>
                    <p className="text-xs text-gray-400">Equipment remains security. Hire purchase or lease purchase options available.</p>
                  </div>
                </div>
              </div>

              {/* Alternative Finance */}
              <div className="bg-elec-dark p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-400" />
                  Alternative Finance Options
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                    <h5 className="font-semibold text-foreground mb-2">Peer-to-Peer Lending</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
                      <div>APR: <span className="text-foreground">5.1-12.9%</span></div>
                      <div>Term: <span className="text-foreground">1-7 years</span></div>
                      <div>Amount: <span className="text-foreground">£10k-£500k</span></div>
                      <div>Decision: <span className="text-foreground">24-48 hours</span></div>
                    </div>
                    <p className="text-xs text-gray-400">Direct matching with individual and institutional investors. FCA regulated platforms.</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded border border-gray-600">
                    <h5 className="font-semibold text-foreground mb-2">Crowdfunding</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
                      <div>Returns: <span className="text-foreground">4-8% p.a.</span></div>
                      <div>Min Investment: <span className="text-foreground">£500-£5k</span></div>
                      <div>Project Size: <span className="text-foreground">£100k-£5m</span></div>
                      <div>Duration: <span className="text-foreground">3-20 years</span></div>
                    </div>
                    <p className="text-xs text-gray-400">Community energy projects, renewable installations. Regulated by FCA.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Power Purchase Agreements */}
            <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-6 rounded-lg border border-purple-500/30 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-400" />
                Power Purchase Agreements (PPAs)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-elec-dark/60 p-4 rounded border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-2">Corporate PPAs</h5>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Duration: <span className="text-foreground">10-25 years</span></div>
                    <div>Min Size: <span className="text-foreground">1MW+</span></div>
                    <div>Price: <span className="text-foreground">£35-55/MWh</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Long-term contracts with large energy users. Provides revenue certainty.</p>
                </div>
                <div className="bg-elec-dark/60 p-4 rounded border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-2">Sleeved PPAs</h5>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Duration: <span className="text-foreground">5-15 years</span></div>
                    <div>Min Size: <span className="text-foreground">500kW+</span></div>
                    <div>Price: <span className="text-foreground">£38-58/MWh</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Supplier intermediated contracts. Suitable for smaller commercial projects.</p>
                </div>
                <div className="bg-elec-dark/60 p-4 rounded border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-2">Virtual PPAs</h5>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Duration: <span className="text-foreground">7-20 years</span></div>
                    <div>Min Size: <span className="text-foreground">5MW+</span></div>
                    <div>Structure: <span className="text-foreground">Financial hedge</span></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Contract for difference structure. No physical electricity delivery required.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Green Loan Products */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Green Loan Products
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Domestic Green Loans */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Home className="h-4 w-4 text-green-400" />
                  Domestic Green Finance
                </h4>
                
                <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-3">Green Mortgages</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-900/20 rounded border border-green-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Halifax Green Living Reward</span>
                        <Badge className="bg-green-600/20 text-green-300 border-green-600/30 text-xs">Popular</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Cashback: <span className="text-foreground">£1,000</span></div>
                        <div>Rate Reduction: <span className="text-foreground">0.1% APR</span></div>
                        <div>EPC Rating: <span className="text-foreground">A or B required</span></div>
                        <div>Max LTV: <span className="text-foreground">90%</span></div>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-900/20 rounded border border-blue-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-foreground">Barclays Green Home Mortgage</span>
                        <Badge className="bg-blue-600/20 text-blue-300 border-blue-600/30 text-xs">New</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Rate Discount: <span className="text-foreground">Up to 0.1%</span></div>
                        <div>Cashback: <span className="text-foreground">Up to £2,000</span></div>
                        <div>Min Property Value: <span className="text-foreground">£125,000</span></div>
                        <div>EPC Rating: <span className="text-foreground">A, B or improvement to A/B</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-3">Personal Green Loans</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between"><span>APR Range:</span><span className="text-foreground">2.9-9.9%</span></div>
                    <div className="flex justify-between"><span>Loan Amount:</span><span className="text-foreground">£1,000-£40,000</span></div>
                    <div className="flex justify-between"><span>Term:</span><span className="text-foreground">1-10 years</span></div>
                    <div className="flex justify-between"><span>Application Time:</span><span className="text-foreground">24-48 hours</span></div>
                  </div>
                  <div className="mt-3 p-3 bg-elec-yellow/5 rounded border border-elec-yellow/20">
                    <p className="text-xs text-elec-yellow"><strong>Eligible technologies:</strong> Solar PV, heat pumps, EV chargers, battery storage, insulation, double glazing</p>
                  </div>
                </div>
              </div>

              {/* Commercial Green Finance */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Factory className="h-4 w-4 text-blue-400" />
                  Commercial Green Finance
                </h4>

                <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-3">Green Business Loans</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded border border-gray-600">
                      <h6 className="text-sm font-medium text-foreground mb-2">NatWest Clean Growth Finance</h6>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Amount: <span className="text-foreground">£100k-£5m</span></div>
                        <div>Term: <span className="text-foreground">Up to 10 years</span></div>
                        <div>Rate: <span className="text-foreground">From 3.2% APR</span></div>
                        <div>Security: <span className="text-foreground">Business assets</span></div>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded border border-gray-600">
                      <h6 className="text-sm font-medium text-foreground mb-2">Santander Green Finance</h6>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                        <div>Amount: <span className="text-foreground">£50k-£2m</span></div>
                        <div>Term: <span className="text-foreground">2-15 years</span></div>
                        <div>Rate Discount: <span className="text-foreground">Up to 0.5% APR</span></div>
                        <div>Arrangement Fee: <span className="text-foreground">From 1%</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                  <h5 className="font-semibold text-foreground mb-3">Equipment Finance</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex justify-between"><span>Hire Purchase APR:</span><span className="text-foreground">4.1-7.9%</span></div>
                    <div className="flex justify-between"><span>Finance Lease APR:</span><span className="text-foreground">3.8-6.9%</span></div>
                    <div className="flex justify-between"><span>Operating Lease:</span><span className="text-foreground">Monthly rentals</span></div>
                    <div className="flex justify-between"><span>Balloon Payment:</span><span className="text-foreground">10-40% available</span></div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-900/20 rounded border border-blue-700/50">
                    <p className="text-xs text-blue-200"><strong>Tax Benefits:</strong> 100% First Year Allowance, 130% Super Deduction (until March 2023)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Finance Variations */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Regional Finance Variations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-400" />
                  England
                </h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>Green Homes Grant: <span className="text-foreground">Ended 2021</span></div>
                  <div>LEP Grants: <span className="text-foreground">Variable by region</span></div>
                  <div>UKIB Funding: <span className="text-foreground">£22bn available</span></div>
                  <div>Local Authority: <span className="text-foreground">Council specific</span></div>
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  Scotland
                </h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>Home Energy Scotland: <span className="text-foreground">£38.5k loans</span></div>
                  <div>SEPA Grants: <span className="text-foreground">£10k business</span></div>
                  <div>Crofting Commission: <span className="text-foreground">Rural support</span></div>
                  <div>SE Funding: <span className="text-foreground">Innovation support</span></div>
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  Wales
                </h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>Nest Scheme: <span className="text-foreground">Free improvements</span></div>
                  <div>Dev Bank Wales: <span className="text-foreground">£50k-£2m loans</span></div>
                  <div>Arbed Scheme: <span className="text-foreground">Area-based grants</span></div>
                  <div>Local Energy: <span className="text-foreground">Community projects</span></div>
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-orange-400" />
                  N. Ireland
                </h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>NISEP Scheme: <span className="text-foreground">Social housing</span></div>
                  <div>Invest NI: <span className="text-foreground">Business support</span></div>
                  <div>Action Renewables: <span className="text-foreground">Advice & grants</span></div>
                  <div>Council Grants: <span className="text-foreground">Local schemes</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment and Due Diligence */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Risk Assessment and Due Diligence
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-elec-dark p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-foreground mb-4">Technical Risk Factors</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-red-900/10 rounded border border-red-700/30">
                    <h5 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      High Risk Elements
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Unproven technology or new market entrants</li>
                      <li>• Complex grid connection requirements</li>
                      <li>• Planning permission uncertainties</li>
                      <li>• Resource assessment inaccuracies (wind/solar)</li>
                      <li>• Equipment delivery and installation delays</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-900/10 rounded border border-green-700/30">
                    <h5 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Risk Mitigation
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Independent technical due diligence</li>
                      <li>• Performance warranties and guarantees</li>
                      <li>• Insurance products (performance, maintenance)</li>
                      <li>• Established installer/manufacturer selection</li>
                      <li>• Staged payment structures</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark p-6 rounded-lg border border-gray-700">
                <h4 className="text-lg font-semibold text-foreground mb-4">Financial Risk Assessment</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-900/10 rounded border border-yellow-700/30">
                    <h5 className="font-semibold text-yellow-300 mb-2">Key Financial Metrics</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                      <div>Debt Service Cover: <span className="text-foreground">Min 1.3x</span></div>
                      <div>Loan to Value: <span className="text-foreground">Max 80%</span></div>
                      <div>IRR Requirement: <span className="text-foreground">8-12%</span></div>
                      <div>Payback Period: <span className="text-foreground">Max 15 years</span></div>
                    </div>
                  </div>
                  <div className="p-4 bg-blue-900/10 rounded border border-blue-700/30">
                    <h5 className="font-semibold text-blue-300 mb-2">Due Diligence Requirements</h5>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• 3 years audited accounts (companies)</li>
                      <li>• Cash flow projections (5-10 years)</li>
                      <li>• Energy yield assessments</li>
                      <li>• Legal title verification</li>
                      <li>• Environmental impact assessment</li>
                      <li>• Grid connection agreements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Finance Application Timeline */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Detailed Application Timeline
            </h3>
            
            <div className="bg-elec-dark p-6 rounded-lg border border-gray-700 mb-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-foreground mb-2">Pre-Application (2-4 weeks)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Documentation Required:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Financial statements (3 years)</li>
                          <li>• Management accounts</li>
                          <li>• Business plan and projections</li>
                          <li>• Technical specifications</li>
                          <li>• Planning permissions</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Initial Assessments:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Credit scoring and checks</li>
                          <li>• Preliminary technical review</li>
                          <li>• Site survey arrangements</li>
                          <li>• Legal title verification</li>
                          <li>• Energy yield modelling</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-foreground mb-2">Formal Application (1-3 weeks)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Detailed Due Diligence:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Independent technical review</li>
                          <li>• Financial model validation</li>
                          <li>• Legal and regulatory compliance</li>
                          <li>• Insurance requirements assessment</li>
                          <li>• Grid connection validation</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Risk Assessment:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Technology and performance risk</li>
                          <li>• Construction and delivery risk</li>
                          <li>• Market and revenue risk</li>
                          <li>• Operational and maintenance risk</li>
                          <li>• Regulatory and policy risk</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-foreground mb-2">Credit Decision (3-7 days)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Credit Committee Review:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Final risk assessment</li>
                          <li>• Terms and conditions setting</li>
                          <li>• Security requirements</li>
                          <li>• Covenant structure</li>
                          <li>• Approval or decline decision</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Terms Negotiation:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Interest rate and fees</li>
                          <li>• Repayment structure</li>
                          <li>• Security and guarantees</li>
                          <li>• Conditions precedent</li>
                          <li>• Ongoing covenants</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-foreground mb-2">Legal Documentation (2-4 weeks)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Document Preparation:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Facility agreement drafting</li>
                          <li>• Security documentation</li>
                          <li>• Guarantee arrangements</li>
                          <li>• Insurance assignments</li>
                          <li>• Account mandates</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Conditions Precedent:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Planning permission evidence</li>
                          <li>• Grid connection agreements</li>
                          <li>• Insurance policy placement</li>
                          <li>• Contractor appointments</li>
                          <li>• Corporate resolutions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                  <div className="flex-grow">
                    <h4 className="font-semibold text-foreground mb-2">Drawdown and Monitoring (Ongoing)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Staged Drawdowns:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Milestone-based releases</li>
                          <li>• Invoice verification</li>
                          <li>• Progress monitoring</li>
                          <li>• Quality assurance checks</li>
                          <li>• Contractor payment</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300 mb-2">Ongoing Requirements:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Monthly/quarterly reporting</li>
                          <li>• Financial covenant testing</li>
                          <li>• Performance monitoring</li>
                          <li>• Insurance renewals</li>
                          <li>• Annual compliance review</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Case Studies */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Book className="h-5 w-5" />
              Finance Case Studies
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 p-6 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <h4 className="text-lg font-semibold text-foreground">Commercial Solar Installation</h4>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    <div>Sector: <span className="text-foreground">Manufacturing</span></div>
                    <div>System Size: <span className="text-foreground">500kW</span></div>
                    <div>Total Investment: <span className="text-foreground">£450,000</span></div>
                    <div>Finance Method: <span className="text-foreground">Asset Finance</span></div>
                  </div>
                  <div className="p-3 bg-elec-dark/50 rounded border border-gray-700">
                    <p className="text-xs text-gray-300 mb-2"><strong>Finance Structure:</strong></p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• 20% deposit (£90,000)</li>
                      <li>• 80% financed over 7 years</li>
                      <li>• 4.2% APR fixed rate</li>
                      <li>• £5,300 monthly repayments</li>
                      <li>• Equipment as security</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded border border-green-700/50">
                    <p className="text-xs text-green-200"><strong>Outcome:</strong> 18% IRR, 6.2 year payback, £180k total energy savings over 25 years</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2 mb-4">
                  <Home className="h-5 w-5 text-blue-400" />
                  <h4 className="text-lg font-semibold text-foreground">Domestic Heat Pump Project</h4>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                    <div>Property Type: <span className="text-foreground">4-bed detached</span></div>
                    <div>Heat Pump: <span className="text-foreground">Air source 12kW</span></div>
                    <div>Total Cost: <span className="text-foreground">£18,000</span></div>
                    <div>Finance Method: <span className="text-foreground">Green loan + BUS</span></div>
                  </div>
                  <div className="p-3 bg-elec-dark/50 rounded border border-gray-700">
                    <p className="text-xs text-gray-300 mb-2"><strong>Finance Structure:</strong></p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• BUS grant: £7,500</li>
                      <li>• Green loan: £10,500</li>
                      <li>• 3.1% APR over 7 years</li>
                      <li>• £140 monthly repayments</li>
                      <li>• Unsecured personal loan</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded border border-blue-700/50">
                    <p className="text-xs text-blue-200"><strong>Outcome:</strong> £1,200 annual heating cost savings, 8.7 year payback including grant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emerging Finance Solutions */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Emerging Finance Solutions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-purple-400" />
                  Energy-as-a-Service
                </h4>
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">Zero upfront cost model where energy companies install, own and maintain systems.</p>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Contract Term: <span className="text-foreground">10-25 years</span></div>
                    <div>Payment Model: <span className="text-foreground">Monthly service fee</span></div>
                    <div>Maintenance: <span className="text-foreground">Included</span></div>
                    <div>Performance Risk: <span className="text-foreground">Provider liability</span></div>
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-purple-200"><strong>Best for:</strong> Risk-averse customers, complex commercial installations</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-green-400" />
                  Green Bonds
                </h4>
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">Debt securities specifically earmarked for environmental projects.</p>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Min Investment: <span className="text-foreground">£1m-£10m</span></div>
                    <div>Term: <span className="text-foreground">5-30 years</span></div>
                    <div>Interest Rate: <span className="text-foreground">0.1-0.5% below conventional</span></div>
                    <div>Reporting: <span className="text-foreground">Annual impact reports</span></div>
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-green-200"><strong>Best for:</strong> Large-scale projects, institutional investors</p>
                  </div>
                </div>
              </div>

              <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  Community Shares
                </h4>
                <div className="space-y-3">
                  <p className="text-xs text-gray-400">Democratic ownership model for local energy projects.</p>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Share Price: <span className="text-foreground">£1-£100 per share</span></div>
                    <div>Returns: <span className="text-foreground">4-7% annual dividend</span></div>
                    <div>Ownership: <span className="text-foreground">One member, one vote</span></div>
                    <div>Tax Relief: <span className="text-foreground">SEIS/EIS eligible</span></div>
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-blue-200"><strong>Best for:</strong> Community energy projects, local ownership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Finance Application Process Summary */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-4">Finance Application Process</h3>
            <div className="bg-elec-dark p-6 rounded-lg border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm">1</div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Documentation</h4>
                  <p className="text-xs text-gray-400">Financial statements, energy bills, planning permissions</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm">2</div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Assessment</h4>
                  <p className="text-xs text-gray-400">Credit checks, project viability, energy yield analysis</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm">3</div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Approval</h4>
                  <p className="text-xs text-gray-400">Terms agreement, legal documentation, security arrangements</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm">4</div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Drawdown</h4>
                  <p className="text-xs text-gray-400">Staged payments, installation milestones, final commissioning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GreenFinanceOptions;