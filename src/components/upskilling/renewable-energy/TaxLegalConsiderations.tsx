import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileCheck, Scale, Shield, AlertTriangle, Calculator, Building, Home, Factory, PoundSterling, Users, Clock, CheckCircle, Target, TrendingUp, FileText, Briefcase, MapPin, Phone, BookOpen } from 'lucide-react';

const TaxLegalConsiderations = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Scale className="h-6 w-6 text-elec-yellow" />
          Tax Implications and Legal Considerations
        </h2>
        
        <div className="space-y-12">
          {/* Executive Summary */}
          <div className="bg-gradient-to-r from-elec-yellow/10 to-purple-600/10 p-6 rounded-lg border border-elec-yellow/30">
            <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-elec-yellow" />
              Legal and Tax Framework Overview
            </h3>
            <p className="text-gray-300 mb-4">
              The UK renewable energy sector operates within a complex regulatory framework encompassing VAT treatment, corporation tax allowances, planning legislation, building regulations, and consumer protection laws. Understanding these requirements is essential for compliant and financially optimised installations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-elec-dark/50 p-4 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <PoundSterling className="h-4 w-4 text-green-400" />
                  <span className="text-foreground font-semibold">VAT Savings</span>
                </div>
                <p className="text-2xl font-bold text-green-400">0%</p>
                <p className="text-xs text-gray-400">Domestic renewable installations (2024-2027)</p>
              </div>
              <div className="bg-elec-dark/50 p-4 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-blue-400" />
                  <span className="text-foreground font-semibold">Tax Relief</span>
                </div>
                <p className="text-2xl font-bold text-blue-400">100%</p>
                <p className="text-xs text-gray-400">First Year Allowance (eligible equipment)</p>
              </div>
              <div className="bg-elec-dark/50 p-4 rounded border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  <span className="text-foreground font-semibold">Compliance</span>
                </div>
                <p className="text-2xl font-bold text-elec-yellow">G98/G99</p>
                <p className="text-xs text-gray-400">DNO connection requirements</p>
              </div>
            </div>
          </div>

          {/* VAT Treatment - Comprehensive */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              VAT Treatment and Implications
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Home className="h-4 w-4 text-elec-yellow" />
                  Domestic Installations
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-5 rounded-lg border border-green-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-semibold text-foreground">0% VAT Rate (Temporary)</h5>
                      <Badge className="bg-green-600/20 text-green-300 border-green-600/30">Until April 2027</Badge>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-300">Applies to qualifying energy-saving materials and installations for residential properties.</p>
                      <div className="bg-green-900/30 p-3 rounded border border-green-700/50">
                        <p className="text-xs text-green-200 mb-2"><strong>Eligible Technologies:</strong></p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">Solar PV panels</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">Battery storage systems</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">Wind turbines</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">Heat pumps</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">Installation services</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-300">Associated equipment</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-900/20 p-3 rounded border border-red-700/50">
                        <p className="text-xs text-red-200"><strong>Important:</strong> Rate reverts to 5% from April 2027 unless extended. Mixed-use properties may have different treatment.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-5 rounded-lg border border-orange-700/50">
                    <h5 className="font-semibold text-foreground mb-3">VAT Savings Calculator</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-800/50 p-3 rounded">
                          <p className="text-gray-400 text-xs mb-1">System Cost (ex VAT)</p>
                          <p className="text-foreground font-semibold">£8,000</p>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded">
                          <p className="text-gray-400 text-xs mb-1">VAT Saved (vs 20%)</p>
                          <p className="text-green-400 font-semibold">£1,600</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-300 space-y-1">
                        <p>• Typical 4.5kW solar system: £1,400-£1,800 VAT saving</p>
                        <p>• Battery storage (10kWh): £600-£800 VAT saving</p>
                        <p>• Heat pump installation: £1,200-£2,400 VAT saving</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building className="h-4 w-4 text-elec-yellow" />
                  Commercial Installations
                </h4>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-5 rounded-lg border border-blue-700/50">
                    <h5 className="font-semibold text-foreground mb-3">Standard 20% VAT Rate</h5>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-300">Commercial and industrial renewable installations are subject to standard VAT rates.</p>
                      <div className="bg-blue-900/30 p-3 rounded border border-blue-700/50">
                        <p className="text-xs text-blue-200 mb-2"><strong>VAT Recovery Options:</strong></p>
                        <div className="space-y-1 text-xs text-gray-300">
                          <p>• Full input VAT recovery for VAT-registered businesses</p>
                          <p>• Partial exemption considerations for mixed activities</p>
                          <p>• Capital goods scheme for assets over £250,000</p>
                          <p>• DIY housebuilders' scheme for new construction</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-5 rounded-lg border border-purple-700/50">
                    <h5 className="font-semibold text-foreground mb-3">Mixed-Use Properties</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-gray-400">Domestic element:</span><br />
                          <span className="text-foreground font-semibold">0% VAT</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Commercial element:</span><br />
                          <span className="text-foreground font-semibold">20% VAT</span>
                        </div>
                      </div>
                      <div className="bg-purple-900/30 p-3 rounded border border-purple-700/50">
                        <p className="text-xs text-purple-200"><strong>Apportionment Required:</strong> Based on floor area, energy consumption, or other reasonable basis</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-900/30 to-teal-800/20 p-5 rounded-lg border border-teal-700/50">
                    <h5 className="font-semibold text-foreground mb-3">VAT Registration Implications</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between"><span>Registration threshold:</span><span className="text-foreground">£90,000 (2025)</span></div>
                      <div className="flex justify-between"><span>Energy sales impact:</span><span className="text-foreground">May trigger registration</span></div>
                      <div className="flex justify-between"><span>SEG payments:</span><span className="text-foreground">Outside scope if domestic</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VAT Documentation Requirements */}
            <div className="bg-elec-dark p-6 rounded-lg border border-gray-700">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                VAT Documentation and Compliance
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Required Documentation</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-3 w-3 text-green-400" />
                      <span>VAT invoice with correct rate applied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-3 w-3 text-green-400" />
                      <span>Property use declaration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-3 w-3 text-green-400" />
                      <span>Installation certificate (MCS)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="h-3 w-3 text-green-400" />
                      <span>Equipment specifications</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Record Keeping</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Maintain records for 6 years minimum</p>
                    <p>• Digital records acceptable</p>
                    <p>• Include all supporting documentation</p>
                    <p>• Separate commercial/domestic elements</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">HMRC Compliance</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• VAT Notice 708 guidance</p>
                    <p>• Regular compliance checks</p>
                    <p>• Penalty regime for errors</p>
                    <p>• Appeal procedures available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Allowances - Comprehensive */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Tax Allowances and Business Reliefs
            </h3>

            {/* Capital Allowances Overview */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 bg-elec-dark/50">
                    <th className="text-left p-4 text-foreground font-semibold">Allowance Type</th>
                    <th className="text-left p-4 text-foreground font-semibold">Rate</th>
                    <th className="text-left p-4 text-foreground font-semibold">Annual Limit</th>
                    <th className="text-left p-4 text-foreground font-semibold">Eligibility</th>
                    <th className="text-left p-4 text-foreground font-semibold">Key Conditions</th>
                    <th className="text-left p-4 text-foreground font-semibold">Expires</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">100% First Year Allowance</p>
                        <p className="text-xs text-gray-400">Energy/water efficient equipment</p>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-green-400 font-bold">100%</span></td>
                    <td className="p-4">No limit</td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>Energy-saving equipment</p>
                        <p>Water efficient equipment</p>
                        <p>Must be on HMRC list</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• New equipment only</p>
                        <p>• Must meet energy criteria</p>
                        <p>• HMRC technology list</p>
                        <p>• Business use required</p>
                      </div>
                    </td>
                    <td className="p-4"><Badge className="bg-green-600/20 text-green-300">Permanent</Badge></td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Annual Investment Allowance</p>
                        <p className="text-xs text-gray-400">General plant & machinery</p>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-blue-400 font-bold">100%</span></td>
                    <td className="p-4">£1,000,000</td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>All qualifying businesses</p>
                        <p>Plant and machinery</p>
                        <p>Integral features</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• First £1m of expenditure</p>
                        <p>• Excludes cars</p>
                        <p>• New or second-hand</p>
                        <p>• Group limits apply</p>
                      </div>
                    </td>
                    <td className="p-4"><Badge className="bg-blue-600/20 text-blue-300">Permanent</Badge></td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Super Deduction</p>
                        <p className="text-xs text-gray-400">Enhanced capital allowances</p>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-red-400 font-bold">Ended</span></td>
                    <td className="p-4">N/A</td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>Ended March 2023</p>
                        <p>130% main rate</p>
                        <p>50% special rate</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• Temporary measure</p>
                        <p>• COVID recovery</p>
                        <p>• No replacement announced</p>
                      </div>
                    </td>
                    <td className="p-4"><Badge className="bg-red-600/20 text-red-300">Expired</Badge></td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Writing Down Allowance</p>
                        <p className="text-xs text-gray-400">Standard rate</p>
                      </div>
                    </td>
                    <td className="p-4"><span className="text-yellow-400 font-bold">18%</span></td>
                    <td className="p-4">No limit</td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>Main pool assets</p>
                        <p>After AIA exhausted</p>
                        <p>Reduces annually</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• Reducing balance basis</p>
                        <p>• Annual claim</p>
                        <p>• Can disclaim</p>
                      </div>
                    </td>
                    <td className="p-4"><Badge className="bg-yellow-600/20 text-yellow-300">Ongoing</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Business Rates and Property Taxes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Building className="h-4 w-4 text-elec-yellow" />
                  Business Rates Treatment
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-5 rounded-lg border border-green-700/50">
                    <h5 className="font-semibold text-foreground mb-3">Rooftop Solar Exemption</h5>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-gray-400">Exemption period:</span><br />
                          <span className="text-foreground font-semibold">Until March 2035</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Scope:</span><br />
                          <span className="text-foreground font-semibold">England & Wales</span>
                        </div>
                        <div>
                          <span className="text-gray-400">System size:</span><br />
                          <span className="text-foreground font-semibold">No limit</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Property type:</span><br />
                          <span className="text-foreground font-semibold">All non-domestic</span>
                        </div>
                      </div>
                      <div className="bg-green-900/30 p-3 rounded border border-green-700/50">
                        <p className="text-xs text-green-200"><strong>Savings:</strong> Typical 100kW system saves £3,000-£5,000 annually in business rates</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-5 rounded-lg border border-blue-700/50">
                    <h5 className="font-semibold text-foreground mb-3">Ground-Mounted Systems</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>• Subject to standard business rates</p>
                      <p>• Assessed as part of property value</p>
                      <p>• May qualify for small business relief</p>
                      <p>• Rural rate relief potentially available</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Home className="h-4 w-4 text-elec-yellow" />
                  Domestic Property Considerations
                </h4>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-5 rounded-lg border border-purple-700/50">
                    <h5 className="font-semibold text-foreground mb-3">Council Tax Impact</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>• Generally no council tax increase for renewable installations</p>
                      <p>• May affect property valuation for future sales</p>
                      <p>• Energy efficiency improvements can increase value</p>
                      <p>• Local authority discretion on individual cases</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-5 rounded-lg border border-orange-700/50">
                    <h5 className="font-semibold text-foreground mb-3">Capital Gains Tax</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>• Principal residence relief usually applies</p>
                      <p>• Commercial use may create liability</p>
                      <p>• Energy generation for profit considerations</p>
                      <p>• Professional advice recommended for complex cases</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Planning Strategies */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 p-6 rounded-lg border border-gray-600">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-elec-yellow" />
                Tax Planning and Optimisation Strategies
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Timing Considerations</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Expenditure timing to maximise allowances</p>
                    <p>• Accounting period planning</p>
                    <p>• Group relief optimisation</p>
                    <p>• Loss carry-forward strategies</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Structure Optimisation</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Corporate vs individual ownership</p>
                    <p>• Partnership structures</p>
                    <p>• Lease vs purchase decisions</p>
                    <p>• Connected company implications</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Professional Advice</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Tax adviser consultation recommended</p>
                    <p>• Regular compliance reviews</p>
                    <p>• Legislative change monitoring</p>
                    <p>• Dispute resolution support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Planning and Legal Requirements - Comprehensive */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Planning Permission and Legal Framework
            </h3>

            {/* Planning Permission Matrix */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 bg-elec-dark/50">
                    <th className="text-left p-4 text-foreground font-semibold">Installation Type</th>
                    <th className="text-left p-4 text-foreground font-semibold">Domestic</th>
                    <th className="text-left p-4 text-foreground font-semibold">Commercial</th>
                    <th className="text-left p-4 text-foreground font-semibold">Listed Buildings</th>
                    <th className="text-left p-4 text-foreground font-semibold">Conservation Areas</th>
                    <th className="text-left p-4 text-foreground font-semibold">Key Restrictions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Roof-mounted Solar PV</p>
                        <p className="text-xs text-gray-400">Panels on existing roof</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-600/20 text-green-300">Permitted Development</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Usually Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Usually Required</Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• No higher than highest part of roof</p>
                        <p>• Not on principal elevation (conservation)</p>
                        <p>• Maximum 1m beyond roof slope</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Ground-mounted Solar</p>
                        <p className="text-xs text-gray-400">Arrays in gardens/fields</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Size Dependent</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• Max 4m high (domestic PD)</p>
                        <p>• 5m from boundary (domestic PD)</p>
                        <p>• Maximum 9m² (domestic PD)</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Wind Turbines</p>
                        <p className="text-xs text-gray-400">All sizes</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Size/Height Limits</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-red-600/20 text-red-300">Always Required</Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• Max 11.5m high (building-mounted)</p>
                        <p>• Max 15m high (standalone domestic)</p>
                        <p>• Noise and safety considerations</p>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-elec-dark/30">
                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-foreground">Battery Storage</p>
                        <p className="text-xs text-gray-400">External units</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-600/20 text-green-300">Permitted Development</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Size Dependent</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Usually Required</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-orange-600/20 text-orange-300">Usually Required</Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-xs">
                        <p>• Max 3m high (domestic)</p>
                        <p>• 1m from boundary</p>
                        <p>• Fire safety regulations</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Building Regulations Compliance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow" />
                  Building Regulations Compliance
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                    <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-elec-yellow" />
                      Part P - Electrical Safety
                    </h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Scope:</strong> All electrical installations in dwellings</p>
                      <p><strong>Requirements:</strong></p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• Competent person scheme registration</li>
                        <li>• Building control notification for notifiable work</li>
                        <li>• Electrical installation certificate</li>
                        <li>• Periodic inspection recommended</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-elec-dark p-5 rounded-lg border border-gray-700">
                    <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Building className="h-4 w-4 text-elec-yellow" />
                      Structural Requirements
                    </h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Roof Loading:</strong></p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• Structural calculations required</li>
                        <li>• Dead load: 10-25 kg/m² typical</li>
                        <li>• Wind uplift considerations</li>
                        <li>• Building control approval may be needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-elec-yellow" />
                  DNO Connection Requirements
                </h4>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-5 rounded-lg border border-blue-700/50">
                    <h5 className="font-semibold text-foreground mb-3">G98 Applications (≤16A per phase)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-gray-400">Capacity limit:</span><br /><span className="text-foreground">3.68kW (single phase)</span></div>
                        <div><span className="text-gray-400">Process:</span><br /><span className="text-foreground">Notification only</span></div>
                        <div><span className="text-gray-400">Timeframe:</span><br /><span className="text-foreground">Connect immediately</span></div>
                        <div><span className="text-gray-400">Cost:</span><br /><span className="text-foreground">Usually free</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 p-5 rounded-lg border border-orange-700/50">
                    <h5 className="font-semibold text-foreground mb-3">G99 Applications (&gt;16A per phase)</h5>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><span className="text-gray-400">Capacity range:</span><br /><span className="text-foreground">&gt;3.68kW to 50MW</span></div>
                        <div><span className="text-gray-400">Process:</span><br /><span className="text-foreground">Formal application</span></div>
                        <div><span className="text-gray-400">Timeframe:</span><br /><span className="text-foreground">20-65 working days</span></div>
                        <div><span className="text-gray-400">Cost:</span><br /><span className="text-foreground">£100-£1,000+</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consumer Protection and Rights */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Consumer Protection and Legal Rights
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-elec-yellow" />
                  Consumer Rights Framework
                </h4>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 p-5 rounded-lg border border-red-700/30">
                    <h5 className="font-semibold text-foreground mb-3">Consumer Rights Act 2015</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Key Protections:</strong></p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• Goods must be of satisfactory quality</li>
                        <li>• Fit for purpose and as described</li>
                        <li>• Right to reject within 30 days</li>
                        <li>• Right to repair/replacement within 6 months</li>
                        <li>• Price reduction or refund after 6 months</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 p-5 rounded-lg border border-blue-700/30">
                    <h5 className="font-semibold text-foreground mb-3">Consumer Contracts Regulations</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Off-Premises Contracts:</strong></p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• 14-day cooling-off period</li>
                        <li>• Mandatory pre-contract information</li>
                        <li>• Right to cancel without penalty</li>
                        <li>• Written cancellation rights notice</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-elec-yellow" />
                  Industry Standards and Certification
                </h4>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 p-5 rounded-lg border border-green-700/30">
                    <h5 className="font-semibold text-foreground mb-3">MCS Certification</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Requirements:</strong></p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• Installer MCS accreditation</li>
                        <li>• MCS-approved equipment</li>
                        <li>• Installation to MCS standards</li>
                        <li>• MCS certificate issued</li>
                        <li>• Required for FiT/SEG eligibility</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 p-5 rounded-lg border border-purple-700/30">
                    <h5 className="font-semibold text-foreground mb-3">Quality Assurance Schemes</h5>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong>Recognised Schemes:</strong></p>
                      <ul className="ml-4 space-y-1 text-xs">
                        <li>• TrustMark (government endorsed)</li>
                        <li>• NICEIC approved contractor</li>
                        <li>• NAPIT certification</li>
                        <li>• Electrical Contractors' Association</li>
                        <li>• RECC (Renewable Energy Consumer Code)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance and Warranty Framework */}
            <div className="bg-elec-dark p-6 rounded-lg border border-gray-700 mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                Insurance and Warranty Requirements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Installer Insurance</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Public Liability</p>
                      <p className="text-xs">Minimum £2m cover required</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Professional Indemnity</p>
                      <p className="text-xs">Design and specification errors</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Product Liability</p>
                      <p className="text-xs">Defective equipment coverage</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Property Insurance</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Buildings Insurance</p>
                      <p className="text-xs">Notify insurer of installation</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Equipment Cover</p>
                      <p className="text-xs">Theft and damage protection</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Business Interruption</p>
                      <p className="text-xs">Loss of generation income</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Warranty Structure</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Equipment Warranties</p>
                      <p className="text-xs">Panels: 20-25 years product/performance</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Installation Warranty</p>
                      <p className="text-xs">Workmanship: minimum 2 years</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded border border-gray-700">
                      <p className="text-foreground font-medium mb-1">Performance Guarantees</p>
                      <p className="text-xs">Energy yield commitments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute Resolution Framework */}
            <div className="bg-gradient-to-r from-red-900/10 to-orange-900/10 p-6 rounded-lg border border-red-700/30">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Scale className="h-4 w-4 text-red-400" />
                Dispute Resolution and Enforcement
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Alternative Dispute Resolution</h5>
                  <div className="space-y-3">
                    <div className="bg-red-900/20 p-3 rounded border border-red-700/50">
                      <p className="text-foreground font-medium mb-1">RECC Dispute Resolution</p>
                      <p className="text-xs text-gray-300">Free mediation and arbitration service for renewable energy disputes</p>
                    </div>
                    <div className="bg-orange-900/20 p-3 rounded border border-orange-700/50">
                      <p className="text-foreground font-medium mb-1">Trading Standards</p>
                      <p className="text-xs text-gray-300">Local authority enforcement of consumer protection laws</p>
                    </div>
                    <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700/50">
                      <p className="text-foreground font-medium mb-1">Ombudsman Services</p>
                      <p className="text-xs text-gray-300">Independent resolution for consumer complaints</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Legal Remedies</h5>
                  <div className="space-y-3">
                    <div className="bg-blue-900/20 p-3 rounded border border-blue-700/50">
                      <p className="text-foreground font-medium mb-1">Small Claims Court</p>
                      <p className="text-xs text-gray-300">Claims up to £10,000 (£5,000 in Scotland)</p>
                    </div>
                    <div className="bg-green-900/20 p-3 rounded border border-green-700/50">
                      <p className="text-foreground font-medium mb-1">Professional Negligence</p>
                      <p className="text-xs text-gray-300">Claims against designers and installers</p>
                    </div>
                    <div className="bg-purple-900/20 p-3 rounded border border-purple-700/50">
                      <p className="text-foreground font-medium mb-1">Statutory Rights</p>
                      <p className="text-xs text-gray-300">Consumer Rights Act and contract law remedies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information and Resources */}
          <div>
            <h3 className="text-xl font-semibold text-elec-yellow mb-6 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Key Contacts and Resources
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Building className="h-4 w-4 text-elec-yellow" />
                  HMRC
                </h5>
                <div className="text-xs text-gray-300 space-y-1">
                  <p><strong>VAT Helpline:</strong> 0300 200 3700</p>
                  <p><strong>Business Tax:</strong> 0300 200 3410</p>
                  <p><strong>Online:</strong> gov.uk/hmrc</p>
                  <p><strong>VAT Notice 708:</strong> Energy-saving materials</p>
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-elec-yellow" />
                  Planning Portal
                </h5>
                <div className="text-xs text-gray-300 space-y-1">
                  <p><strong>Website:</strong> planningportal.co.uk</p>
                  <p><strong>Planning guidance</strong></p>
                  <p><strong>Permitted development rights</strong></p>
                  <p><strong>Application submissions</strong></p>
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-elec-yellow" />
                  MCS
                </h5>
                <div className="text-xs text-gray-300 space-y-1">
                  <p><strong>Phone:</strong> 0333 103 8130</p>
                  <p><strong>Website:</strong> mcscertified.com</p>
                  <p><strong>Installer search</strong></p>
                  <p><strong>Certification standards</strong></p>
                </div>
              </div>
              
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-elec-yellow" />
                  Resources
                </h5>
                <div className="text-xs text-gray-300 space-y-1">
                  <p><strong>RECC:</strong> recc.org.uk</p>
                  <p><strong>Energy Saving Trust</strong></p>
                  <p><strong>Citizens Advice Bureau</strong></p>
                  <p><strong>TrustMark:</strong> trustmark.org.uk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxLegalConsiderations;