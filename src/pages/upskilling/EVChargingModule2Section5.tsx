import { ArrowLeft, Car, Zap, Info, CheckCircle, AlertTriangle, Settings, Battery, Gauge, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const EVChargingModule2Section5 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-8 pt-8 pb-12">
        <Link to="../ev-charging-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Car className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white">
                  Compatibility by Manufacturer
                </h1>
                <p className="text-lg sm:text-xl text-gray-400">
                  Vehicle-specific charging requirements and compatibility
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 5
              </Badge>
            </div>
          </div>

          {/* Manufacturer Overview */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Info className="h-5 w-5 text-yellow-400" />
                Manufacturer Charging Landscape
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Each vehicle manufacturer has adopted different charging standards, connector types, and 
                communication protocols based on regional requirements, technical preferences, and market 
                timing. Understanding these differences is crucial for EVSE selection and installation planning.
              </p>
              <p>
                This section provides detailed compatibility information for major manufacturers, including 
                charging capabilities, connector types, and specific requirements for optimal charging performance.
              </p>
              <div className="bg-yellow-400/20 border border-blue-600/30 rounded-lg p-4">
                <p className="text-blue-200 font-medium mb-2">Key Considerations:</p>
                <ul className="text-blue-100 text-sm space-y-1">
                  <li>• Regional variations in connector standards</li>
                  <li>• Model year differences in charging capabilities</li>
                  <li>• Software updates affecting charging behaviour</li>
                  <li>• Thermal management and charging curve optimisation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tesla */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Zap className="h-5 w-5 text-yellow-400" />
                Tesla - Proprietary Leadership
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">North American Models</h4>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-red-300 font-medium">Model S/X (2012-2021)</p>
                        <div className="text-red-100 text-sm space-y-1">
                          <p>• AC: 48A (11.5kW) single-phase via Tesla connector</p>
                          <p>• DC: 150kW peak via Supercharger V2</p>
                          <p>• Charging curve: 150kW to 10%, tapering to 75kW at 50%</p>
                          <p>• Preconditioning: Automatic thermal management</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-red-300 font-medium">Model S/X Plaid (2021+)</p>
                        <div className="text-red-100 text-sm space-y-1">
                          <p>• AC: 48A (11.5kW) single-phase</p>
                          <p>• DC: 250kW peak via Supercharger V3</p>
                          <p>• Battery: 100kWh+ with improved thermal management</p>
                          <p>• 10-80% charge time: 27 minutes (Supercharger V3)</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-red-300 font-medium">Model 3/Y</p>
                        <div className="text-red-100 text-sm space-y-1">
                          <p>• AC: 32A (7.7kW) single-phase standard</p>
                          <p>• AC: 48A (11.5kW) with High Power Wall Connector</p>
                          <p>• DC: 250kW peak (Model 3 Performance/Model Y)</p>
                          <p>• DC: 170kW peak (Model 3 Standard Range)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">European/Asian Models</h4>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-blue-300 font-medium">Type 2 AC Charging</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• Three-phase: 16A per phase (11kW total)</p>
                          <p>• Single-phase: 32A (7.4kW) domestic installations</p>
                          <p>• Connector: Standard Type 2 (IEC 62196-2)</p>
                          <p>• Communication: Basic PWM control pilot</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-blue-300 font-medium">CCS2 DC Charging</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• Peak power: 250kW (V3 Superchargers)</p>
                          <p>• Voltage range: 50-500V</p>
                          <p>• Current: Up to 500A</p>
                          <p>• ISO 15118: Plug & Charge capability</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-blue-300 font-medium">Supercharger Network Access</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• Open to non-Tesla vehicles via app</p>
                          <p>• Magic Dock technology (CCS1 adapter)</p>
                          <p>• Regional rollout: Europe 2022, US 2023+</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BMW Group */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Battery className="h-5 w-5 text-yellow-400" />
                BMW Group - Efficient Dynamics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Pure Electric Models</h4>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-blue-300 font-medium">BMW iX (2021+)</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• AC: 22kW three-phase (Type 2)</p>
                          <p>• DC: 195kW peak (CCS)</p>
                          <p>• Battery: 76.6kWh/105.2kWh options</p>
                          <p>• 10-80%: 31 minutes at 150kW+ charger</p>
                          <p>• Preconditioning: GPS-based battery warming</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-blue-300 font-medium">BMW i4 (2021+)</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• AC: 11kW three-phase standard</p>
                          <p>• DC: 205kW peak (i4 M50), 180kW (i4 eDrive40)</p>
                          <p>• Battery: 70kWh/80.7kWh</p>
                          <p>• Charging curve: Optimised for consistent speeds</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-blue-300 font-medium">BMW iX3 (2020+)</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• AC: 11kW three-phase</p>
                          <p>• DC: 150kW peak</p>
                          <p>• Battery: 80kWh usable</p>
                          <p>• 400V architecture</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Plug-in Hybrids (PHEVs)</h4>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-purple-300 font-medium">X5/X3 xDrive45e</p>
                        <div className="text-purple-100 text-sm space-y-1">
                          <p>• AC only: 3.7kW single-phase (Type 2)</p>
                          <p>• Battery: 24kWh gross, 21.3kWh usable</p>
                          <p>• Charge time: 5 hours (3.7kW), 3 hours (7.4kW)</p>
                          <p>• No DC charging capability</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-purple-300 font-medium">3/5 Series PHEVs</p>
                        <div className="text-purple-100 text-sm space-y-1">
                          <p>• AC: 3.7kW standard, 7.4kW optional</p>
                          <p>• Battery: 12-18kWh depending on model</p>
                          <p>• Intelligent charging: Time-of-use optimisation</p>
                          <p>• Remote control via BMW ConnectedDrive</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volkswagen Group */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Settings className="h-5 w-5 text-yellow-400" />
                Volkswagen Group - MEB Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-300 mb-3">Volkswagen ID Series</h4>
                  <div className="text-green-100 text-sm space-y-2">
                    <p><strong>ID.3:</strong></p>
                    <p>• AC: 11kW three-phase (Type 2)</p>
                    <p>• DC: 100kW/120kW (CCS2)</p>
                    <p>• Battery: 45/58/77kWh</p>
                    <p>• Charge speed: 5-80% in 30min</p>
                    
                    <p><strong>ID.4/ID.5:</strong></p>
                    <p>• AC: 11kW three-phase standard</p>
                    <p>• DC: 125kW peak (135kW GTX)</p>
                    <p>• Battery: 52/77kWh options</p>
                    <p>• 800V architecture (future models)</p>
                    
                    <p><strong>Features:</strong></p>
                    <p>• We Charge network integration</p>
                    <p>• Plug & Charge (ISO 15118)</p>
                    <p>• Battery preconditioning</p>
                  </div>
                </div>
                
                <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-300 mb-3">Audi e-tron Series</h4>
                  <div className="text-blue-100 text-sm space-y-2">
                    <p><strong>e-tron/e-tron S:</strong></p>
                    <p>• AC: 22kW three-phase (optional)</p>
                    <p>• DC: 150kW peak</p>
                    <p>• Battery: 95kWh gross, 86kWh usable</p>
                    <p>• Thermal management: Advanced cooling</p>
                    
                    <p><strong>e-tron GT:</strong></p>
                    <p>• AC: 11kW three-phase</p>
                    <p>• DC: 270kW peak (800V)</p>
                    <p>• Battery: 93.4kWh</p>
                    <p>• 5-80%: 22.5 minutes</p>
                    
                    <p><strong>Q4 e-tron:</strong></p>
                    <p>• Based on MEB platform</p>
                    <p>• Similar to ID.4 specifications</p>
                    <p>• Premium charging features</p>
                  </div>
                </div>
                
                <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-300 mb-3">Porsche Taycan</h4>
                  <div className="text-purple-100 text-sm space-y-2">
                    <p><strong>800V Architecture:</strong></p>
                    <p>• AC: 11kW three-phase (22kW option)</p>
                    <p>• DC: 270kW peak (800V native)</p>
                    <p>• Battery: 79.2kWh/93.4kWh</p>
                    <p>• 5-80%: 22.5 minutes</p>
                    
                    <p><strong>Performance Focus:</strong></p>
                    <p>• Consistent high-speed charging</p>
                    <p>• Multiple charge cycles capability</p>
                    <p>• Track-oriented thermal management</p>
                    
                    <p><strong>Charging Network:</strong></p>
                    <p>• IONITY partnership</p>
                    <p>• Premium charging locations</p>
                    <p>• Integrated payment system</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Japanese Manufacturers */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Gauge className="h-5 w-5 text-yellow-400" />
                Japanese Manufacturers - CHAdeMO Legacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Nissan</h4>
                  <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-yellow-300 font-medium">Leaf (2010-2017)</p>
                        <div className="text-yellow-100 text-sm space-y-1">
                          <p>• AC: 6.6kW single-phase (Type 1/2)</p>
                          <p>• DC: 50kW CHAdeMO</p>
                          <p>• Battery: 24kWh/30kWh</p>
                          <p>• Passive thermal management</p>
                          <p>• Limited rapid charging sessions</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-yellow-300 font-medium">Leaf (2018+)</p>
                        <div className="text-yellow-100 text-sm space-y-1">
                          <p>• AC: 6.6kW standard, 22kW (Europe)</p>
                          <p>• DC: 100kW CHAdeMO (62kWh), 70kW (40kWh)</p>
                          <p>• Battery: 40kWh/62kWh options</p>
                          <p>• Improved thermal management</p>
                          <p>• ProPILOT Park integration</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-yellow-300 font-medium">Ariya (2022+)</p>
                        <div className="text-yellow-100 text-sm space-y-1">
                          <p>• AC: 22kW three-phase (Type 2)</p>
                          <p>• DC: 130kW CHAdeMO + CCS2 (Europe)</p>
                          <p>• Battery: 63kWh/87kWh</p>
                          <p>• Bi-directional charging capability</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Toyota/Lexus</h4>
                  <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-green-300 font-medium">bZ4X (2022+)</p>
                        <div className="text-green-100 text-sm space-y-1">
                          <p>• AC: 11kW three-phase (Type 2)</p>
                          <p>• DC: 150kW CCS2 (Europe), CHAdeMO (Japan)</p>
                          <p>• Battery: 71.4kWh (FWD/AWD)</p>
                          <p>• Solar roof option (Europe)</p>
                          <p>• Heat pump standard</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-green-300 font-medium">Prius Prime/Plug-in</p>
                        <div className="text-green-100 text-sm space-y-1">
                          <p>• AC only: 3.3kW/6.6kW (regional)</p>
                          <p>• Battery: 8.8kWh/13.6kWh</p>
                          <p>• Type 1 (US/Japan), Type 2 (Europe)</p>
                          <p>• No DC charging capability</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-green-300 font-medium">Future Platform</p>
                        <div className="text-green-100 text-sm space-y-1">
                          <p>• Transitioning to CCS standards globally</p>
                          <p>• LFP and solid-state battery plans</p>
                          <p>• Enhanced charging speeds (&gt;200kW)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ford and GM */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                North American Manufacturers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Ford</h4>
                  <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-blue-300 font-medium">Mustang Mach-E</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• AC: 10.5kW (48A) single-phase</p>
                          <p>• DC: 150kW CCS1 (RWD), 115kW (AWD)</p>
                          <p>• Battery: 68kWh/88kWh options</p>
                          <p>• 10-80%: 38-45 minutes</p>
                          <p>• FordPass charging network</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-blue-300 font-medium">F-150 Lightning</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• AC: 19.2kW (80A) with Ford Charge Station Pro</p>
                          <p>• DC: 155kW CCS1</p>
                          <p>• Battery: 98kWh/131kWh</p>
                          <p>• Vehicle-to-load: 9.6kW output</p>
                          <p>• Home backup power capability</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-blue-300 font-medium">E-Transit</p>
                        <div className="text-blue-100 text-sm space-y-1">
                          <p>• AC: 11.3kW (48A)</p>
                          <p>• DC: 115kW CCS1</p>
                          <p>• Battery: 68kWh usable</p>
                          <p>• Commercial fleet integration</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">General Motors</h4>
                  <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-purple-300 font-medium">Chevrolet Bolt EV/EUV</p>
                        <div className="text-purple-100 text-sm space-y-1">
                          <p>• AC: 11.5kW (48A) single-phase</p>
                          <p>• DC: 55kW CCS1</p>
                          <p>• Battery: 65kWh (259 miles EPA)</p>
                          <p>• 10-80%: 60 minutes (50kW)</p>
                          <p>• Affordable long-range option</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-purple-300 font-medium">GMC Hummer EV</p>
                        <div className="text-purple-100 text-sm space-y-1">
                          <p>• AC: 19.2kW (80A)</p>
                          <p>• DC: 350kW CCS1 (Ultium platform)</p>
                          <p>• Battery: 212kWh</p>
                          <p>• 10-80%: 40 minutes (350kW)</p>
                          <p>• Crab mode and watts-to-freedom</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-purple-300 font-medium">Cadillac Lyriq</p>
                        <div className="text-purple-100 text-sm space-y-1">
                          <p>• AC: 19.2kW (80A)</p>
                          <p>• DC: 190kW CCS1</p>
                      <p>• Battery: 100kWh+</p>
                          <p>• Luxury charging experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charging Compatibility Matrix */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5 text-yellow-400" />
                Regional Compatibility Matrix
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2 text-white font-medium">Region</th>
                      <th className="text-left p-2 text-white font-medium">AC Standard</th>
                      <th className="text-left p-2 text-white font-medium">DC Standard</th>
                      <th className="text-left p-2 text-white font-medium">Tesla</th>
                      <th className="text-left p-2 text-white font-medium">Typical Power</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">North America</td>
                      <td className="p-2">Type 1 (SAE J1772)</td>
                      <td className="p-2">CCS1 / CHAdeMO</td>
                      <td className="p-2">Proprietary connector</td>
                      <td className="p-2">AC: 7-19kW, DC: 50-350kW</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Europe</td>
                      <td className="p-2">Type 2 (IEC 62196-2)</td>
                      <td className="p-2">CCS2 / CHAdeMO</td>
                      <td className="p-2">CCS2 (post-2019)</td>
                      <td className="p-2">AC: 3-43kW, DC: 50-350kW</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">China</td>
                      <td className="p-2">Type 2 (GB/T AC)</td>
                      <td className="p-2">GB/T DC</td>
                      <td className="p-2">CCS2 via adapter</td>
                      <td className="p-2">AC: 7-22kW, DC: 60-200kW</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2 font-medium">Japan</td>
                      <td className="p-2">Type 1 / Type 2</td>
                      <td className="p-2">CHAdeMO</td>
                      <td className="p-2">Proprietary (limited)</td>
                      <td className="p-2">AC: 3-22kW, DC: 50-150kW</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">Australia</td>
                      <td className="p-2">Type 2</td>
                      <td className="p-2">CCS2 / CHAdeMO</td>
                      <td className="p-2">CCS2 (post-2019)</td>
                      <td className="p-2">AC: 7-22kW, DC: 50-350kW</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Installation Recommendations */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Installation Recommendations by Use Case
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Residential Installations</h4>
                  <div className="space-y-3">
                    <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
                      <p className="text-green-300 font-medium">Universal Compatibility</p>
                      <p className="text-green-100 text-sm">Install tethered Type 2 (Europe) or untethered NEMA 14-50 (US) for maximum compatibility</p>
                    </div>
                    <div className="bg-yellow-400/10 border border-blue-600/20 rounded-lg p-3">
                      <p className="text-blue-300 font-medium">Power Sizing</p>
                      <p className="text-blue-100 text-sm">7-22kW for single vehicle, 22kW+ for multiple vehicles or future-proofing</p>
                    </div>
                    <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-3">
                      <p className="text-purple-300 font-medium">Smart Features</p>
                      <p className="text-purple-100 text-sm">Load balancing, solar integration, time-of-use scheduling for cost optimisation</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">Commercial Installations</h4>
                  <div className="space-y-3">
                    <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-3">
                      <p className="text-orange-300 font-medium">Multi-Standard Support</p>
                      <p className="text-orange-100 text-sm">Dual connector or socket outlets supporting regional standards plus CHAdeMO where required</p>
                    </div>
                    <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-3">
                      <p className="text-red-300 font-medium">Scalable Infrastructure</p>
                      <p className="text-red-100 text-sm">Modular systems with dynamic load management and future expansion capability</p>
                    </div>
                    <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3">
                      <p className="text-yellow-300 font-medium">Payment Integration</p>
                      <p className="text-yellow-100 text-sm">RFID, contactless payment, and app-based systems with multiple payment providers</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../ev-charging-module-2-section-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Complete Module
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingModule2Section5;