import { ArrowLeft, ArrowRight, Zap, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule4Section4Quiz } from '@/components/upskilling/quiz/EVChargingModule4Section4Quiz';

const EVChargingModule4Section4 = () => {
  useEffect(() => {
    document.title = 'Earth Rod Installation and Testing - EV Charging Module 4 Section 4';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn proper earth electrode installation and verification for EV charging systems. Covers earth rod selection, installation techniques, testing methods, and BS 7671 compliance.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-4">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 4 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Earth Rod Installation and Testing
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Proper earth electrode installation and verification for EV charging system safety
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Earth electrode installation is a critical safety requirement for EV charging systems, particularly in TT earthing arrangements. Proper earth rod installation and testing ensures effective fault protection and compliance with BS 7671 requirements.
              </p>
              <p>
                Earth electrodes provide a reliable path to earth for fault currents, enabling protective devices to operate effectively during earth fault conditions. The resistance of the earth electrode directly affects the safety and functionality of the earthing system.
              </p>
              <p>
                This section covers earth electrode selection, installation techniques, testing procedures, and maintenance requirements specific to EV charging installations, ensuring both immediate safety and long-term reliability.
              </p>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Select appropriate earth electrode types for different soil conditions</li>
                <li>Install earth rods using correct techniques and equipment</li>
                <li>Perform earth electrode resistance testing and interpret results</li>
                <li>Calculate earth electrode arrangements for low resistance values</li>
                <li>Verify earthing system effectiveness for EV charging installations</li>
                <li>Maintain and monitor earth electrode performance over time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Real-World Examples */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real-World Case Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Case Study 1 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 1: Rural Car Park Installation</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> Installing 22kW EV chargers in a rural car park with sandy soil and no existing earthing infrastructure.</p>
                  <p><strong>Solution:</strong> Multiple earth rods installed in parallel configuration to achieve required earth resistance of less than 100Ω for TT system with 30mA RCD protection.</p>
                  <p><strong>Result:</strong> Four 2.4m copper-bonded steel rods spaced 6m apart achieved 45Ω earth resistance. Installation passed all safety tests and provided reliable earth fault protection.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Soil resistivity testing prior to installation enabled optimal rod spacing and configuration design.</p>
                  </div>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="bg-card/80 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Case Study 2: Industrial Site Upgrade</h4>
                <div className="text-gray-300 space-y-3">
                  <p><strong>Challenge:</strong> Adding EV charging to existing industrial facility with aging earthing system requiring earth resistance verification.</p>
                  <p><strong>Solution:</strong> Comprehensive earth resistance testing revealed degraded connections. New earth mat installed with enhanced electrode configuration.</p>
                  <p><strong>Result:</strong> Earth resistance reduced from 180Ω to 25Ω. System now supports high-power charging with enhanced safety margins.</p>
                  <div className="bg-card p-3 rounded border-l-4 border-yellow-400">
                    <p className="text-blue-200"><strong>Key Learning:</strong> Regular testing and maintenance of earth electrodes is essential for ongoing safety and compliance.</p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Content Sections */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Earth Electrode Types and Selection</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Electrode Materials and Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Copper-Bonded Steel Rods</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Standard diameter: 14.2mm, 16mm, or 19mm</li>
                      <li>Standard lengths: 1.2m, 1.5m, 2.4m, 3m</li>
                      <li>Copper coating thickness: minimum 250 microns</li>
                      <li>Threaded for extension coupling</li>
                      <li>Suitable for most soil conditions</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Stainless Steel Electrodes</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Corrosion resistant in aggressive soils</li>
                      <li>316L grade for marine environments</li>
                      <li>Higher cost but longer service life</li>
                      <li>Excellent for chemical contaminated ground</li>
                      <li>Available in various diameters</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">Selection Criteria</h4>
                <p className="text-sm text-blue-200">
                  Earth electrode selection must consider soil resistivity, corrosion potential, required earth resistance, installation constraints, and long-term maintenance requirements. Always verify material compatibility with soil chemistry.
                </p>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Soil Resistivity and Site Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Pre-Installation Site Assessment</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Soil Resistivity Testing</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Wenner Four-Probe Method:</strong> Most common method using four equally spaced probes</p>
                      <p><strong>Probe Spacing:</strong> Test at multiple spacings (2m, 4m, 8m, 16m) to determine soil layering</p>
                      <p><strong>Seasonal Variation:</strong> Test during dry conditions for worst-case resistance values</p>
                      <p><strong>Multiple Locations:</strong> Test several points across the site to identify optimal installation areas</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Underground Service Location</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Cable Detection:</strong> Use cable avoidance tools (CAT) before excavation</p>
                      <p><strong>Service Plans:</strong> Obtain utility drawings and as-built drawings</p>
                      <p><strong>Trial Holes:</strong> Hand dig trial holes to verify underground services</p>
                      <p><strong>Minimum Clearances:</strong> Maintain 600mm minimum from other buried services</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">⚡ Site Assessment Checklist</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Soil resistivity measurements at multiple depths and locations</li>
                  <li>Underground service detection and mapping</li>
                  <li>Access for installation equipment and future maintenance</li>
                  <li>Drainage and water table considerations</li>
                  <li>Ground contamination or chemical assessment</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Earth Electrode Types and Selection</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Electrode Materials and Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Copper-Bonded Steel Rods</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Standard diameter: 14.2mm, 16mm, or 19mm</li>
                      <li>Standard lengths: 1.2m, 1.5m, 2.4m, 3m</li>
                      <li>Copper coating thickness: minimum 250 microns</li>
                      <li>Threaded for extension coupling</li>
                      <li>Suitable for most soil conditions</li>
                      <li>Cost-effective for standard installations</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Stainless Steel Electrodes</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Corrosion resistant in aggressive soils</li>
                      <li>316L grade for marine environments</li>
                      <li>Higher cost but longer service life</li>
                      <li>Excellent for chemical contaminated ground</li>
                      <li>Available in various diameters</li>
                      <li>Maintenance-free operation</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Alternative Earth Electrode Types</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Copper Strip/Tape Electrodes</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Horizontal installation in trenches</li>
                      <li>Large surface area contact with soil</li>
                      <li>Minimum 25mm width, 3mm thickness</li>
                      <li>Suitable for shallow soil installations</li>
                      <li>Can follow cable routes for economical installation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Earth Mats and Grids</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Multiple interconnected electrodes</li>
                      <li>Very low earth resistance achievable</li>
                      <li>Suitable for large installations</li>
                      <li>Provides equipotential earthing</li>
                      <li>Higher installation costs but excellent performance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">Selection Criteria</h4>
                <p className="text-sm text-blue-200">
                  Earth electrode selection must consider soil resistivity, corrosion potential, required earth resistance, installation constraints, and long-term maintenance requirements. Always verify material compatibility with soil chemistry and local environmental conditions.
                </p>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Installation Techniques and Procedures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Installation Methods</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Driven Installation</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Equipment Required:</strong> Pneumatic hammer, driving head, safety equipment</p>
                      <p><strong>Procedure:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Mark installation position and check for underground services</li>
                        <li>Start rod vertically using driving head to prevent damage</li>
                        <li>Drive to required depth leaving 150mm above ground</li>
                        <li>Remove driving head and fit earth clamp</li>
                        <li>Backfill and compact around electrode</li>
                        <li>Install identification tape and warning markers</li>
                      </ol>
                      <p><strong>Advantages:</strong> Quick installation, minimal excavation, suitable for most soil types</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Augered Installation</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Applications:</strong> Rocky ground, precise placement, minimal surface disruption</p>
                      <p><strong>Benefits:</strong> Better control, reduced ground disturbance, suitable for confined spaces</p>
                      <p><strong>Considerations:</strong> Ensure good soil contact, backfill with suitable material, may require bentonite enhancement</p>
                      <p><strong>Backfill Requirements:</strong> Use low resistivity material such as bentonite clay or conductive concrete</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Multiple Rod Configurations</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Parallel Configuration:</strong> Rods connected in parallel to reduce overall resistance</p>
                      <p><strong>Spacing Requirements:</strong> Minimum 2.5 times rod length apart (preferably 6m)</p>
                      <p><strong>Connection Method:</strong> Use copper tape or cable to interconnect electrodes</p>
                      <p><strong>Testing:</strong> Test each rod individually and combined resistance</p>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-red-400/30">
                <h4 className="font-semibold text-red-300 mb-2">⚠️ Safety Requirements</h4>
                <ul className="text-sm text-red-200 space-y-1 list-disc list-inside">
                  <li>Always locate underground services before excavation using CAT scanners</li>
                  <li>Use appropriate PPE including safety glasses, hard hat, and protective gloves</li>
                  <li>Ensure adequate spacing from other services (minimum 600mm)</li>
                  <li>Install warning tape above buried electrodes at 300mm depth</li>
                  <li>Maintain safe working distances from overhead power lines</li>
                  <li>Use proper lifting techniques for heavy electrode materials</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Earth Resistance Testing and Verification</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Testing Methods and Equipment</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Fall-of-Potential Method</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Most accurate method for earth resistance measurement</li>
                      <li>Requires current and potential probes</li>
                      <li>Probe spacing: 10 times maximum electrode dimension</li>
                      <li>Multiple readings at different probe positions</li>
                      <li>Suitable for new installations and verification</li>
                      <li>Complies with BS 7430 test requirements</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-yellow-400">Clamp-On Testing</h4>
                    <ul className="space-y-1 text-sm list-disc list-inside">
                      <li>Non-intrusive testing of existing electrodes</li>
                      <li>Requires parallel earth path for measurement</li>
                      <li>Quick verification of electrode condition</li>
                      <li>Limited accuracy in high resistance systems</li>
                      <li>Useful for routine maintenance checks</li>
                      <li>Cannot be used for single isolated electrodes</li>
                    </ul>
                  </div>

                </div>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">Detailed Test Procedure Steps</h4>
                <ol className="space-y-2 text-sm list-decimal list-inside">
                  <li>Disconnect earth electrode from installation earthing conductor using removable link</li>
                  <li>Position current probe (C2) at distance D (10 times electrode length) in direction away from installation</li>
                  <li>Position potential probe (P2) at 0.62D from earth electrode under test</li>
                  <li>Connect earth resistance tester with appropriate test leads</li>
                  <li>Perform initial measurement and record reading</li>
                  <li>Repeat readings with potential probe at 0.52D and 0.72D positions</li>
                  <li>Verify readings are within ±5% of each other for test validity</li>
                  <li>Record highest reading as the earth resistance value</li>
                  <li>Document test conditions including weather and soil moisture</li>
                  <li>Reconnect earth electrode to installation earthing system</li>
                </ol>
              </div>

              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">Test Results Interpretation</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>TT System Requirements:</strong> Earth resistance should not exceed 200Ω (50V ÷ 0.25A for 30mA RCD)</p>
                  <p><strong>Practical Targets:</strong> Aim for less than 100Ω to allow for seasonal variation and aging</p>
                  <p><strong>Measurement Accuracy:</strong> ±2% of reading ±3 digits typical for quality instruments</p>
                  <p><strong>Temperature Correction:</strong> Apply correction factors for extreme temperature conditions</p>
                  <p><strong>Seasonal Variations:</strong> Resistance typically 3-5 times higher in dry conditions</p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border border-yellow-400/30">
                <h4 className="font-semibold text-blue-300 mb-2">💡 Testing Best Practices</h4>
                <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
                  <li>Test during dry conditions for worst-case resistance values</li>
                  <li>Use proper test lead connections to avoid measurement errors</li>
                  <li>Check for stray currents that may affect readings (switch off nearby equipment)</li>
                  <li>Document soil conditions, weather, and time of year during testing</li>
                  <li>Calibrate test instruments annually to maintain accuracy</li>
                  <li>Keep detailed records for future comparison and trend analysis</li>
                </ul>
              </div>

            </CardContent>
          </Card>

          <Card className="bg-card border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Earth Enhancement Techniques</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6">
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Improving Earth Resistance</h3>
                <div className="space-y-4">
                  
                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Bentonite Clay Treatment</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Application:</strong> Surround electrode with bentonite clay mixture</p>
                      <p><strong>Benefits:</strong> Absorbs moisture, reduces soil resistivity, maintains low resistance</p>
                      <p><strong>Installation:</strong> Mix with water to form slurry, pour around electrode</p>
                      <p><strong>Improvement:</strong> Can reduce earth resistance by 30-70% in suitable conditions</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Chemical Enhancement</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Conductive Compounds:</strong> Sodium chloride, magnesium sulphate, copper sulphate</p>
                      <p><strong>Application Method:</strong> Create wells around electrode and apply chemical solution</p>
                      <p><strong>Maintenance:</strong> Requires periodic reapplication (annually)</p>
                      <p><strong>Environmental Considerations:</strong> Check local regulations for chemical use restrictions</p>
                    </div>
                  </div>

                  <div className="bg-card/80 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-400 mb-3">Physical Improvements</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Longer Electrodes:</strong> Use extended rods to reach lower resistivity layers</p>
                      <p><strong>Multiple Electrodes:</strong> Install additional rods in parallel configuration</p>
                      <p><strong>Enhanced Contact:</strong> Increase electrode surface area with larger diameter rods</p>
                      <p><strong>Deep Electrodes:</strong> Consider deep bore electrodes for problem soils</p>
                    </div>
                  </div>

                </div>
              </div>

            </CardContent>
          </Card>

          {/* Quick Check */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Eye className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quick Check</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-blue-200 font-medium">Test your understanding:</p>
                <div className="space-y-3">
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: What is the minimum earth resistance required for a TT system with 30mA RCD protection?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        The earth resistance should not exceed 1667Ω (50V ÷ 0.03A), but practically aim for less than 100Ω to ensure reliable RCD operation and allow for electrode deterioration over time.
                      </p>
                    </details>
                  </div>
                  <div className="bg-card/80 p-4 rounded-lg">
                    <p className="text-white font-medium mb-2">Question: How should multiple earth rods be spaced for optimal effectiveness?</p>
                    <details className="text-gray-300">
                      <summary className="cursor-pointer text-yellow-400 hover:text-blue-300">Show Answer</summary>
                      <p className="mt-2 text-sm">
                        Earth rods should be spaced at least 2.5 times their length apart, preferably 6m minimum, to avoid mutual interference and achieve additive resistance reduction.
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQs */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="space-y-4">
                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How deep should earth rods be installed?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Earth rods should penetrate to a minimum depth of 2.4m in most soil types. For shallow installations, horizontal earth electrodes may be more appropriate. The rod should extend below the frost line and reach moist soil layers for optimal performance. In rocky conditions, consider augered installation or alternative electrode types.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can I use existing foundation steel as earth electrode?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Foundation earth electrodes can be used if properly designed and accessible for testing. The steel must be in direct contact with earth, not isolated by membranes or coatings. Connection points must be accessible and verifiable. However, many modern buildings use isolated foundations, making this option unsuitable.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What causes earth electrode resistance to change over time?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Earth resistance varies with soil moisture, temperature, and seasonal changes. Corrosion, loose connections, and changes in soil chemistry can increase resistance. Regular testing and maintenance are essential for ongoing safety. Bentonite enhancement may wash away over time, requiring renewal.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How do I improve earth resistance in high resistivity soil?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Use multiple rods in parallel, consider longer rods, add bentonite clay around electrodes, or install horizontal earth tape. Soil treatment with conductive compounds can also reduce resistance in problematic soils. Deep bore electrodes may be necessary in extreme cases where shallow soil has very high resistivity.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What maintenance is required for earth electrodes?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Annual visual inspection of connections, earth resistance testing every 5 years or when changes occur, verification of electrode integrity, and cleaning of connection points. Document all test results and maintain records. Check for corrosion, mechanical damage, and ensure protective covers remain intact.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">Can earth rods be installed horizontally?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Horizontal earth electrodes are permitted and effective, especially in shallow soil or rocky conditions. They must be buried at least 600mm deep and may require longer lengths to achieve equivalent resistance to vertical rods. Copper strip or cable is typically used for horizontal installations.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">What soil conditions affect earth electrode performance?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Clay soils generally provide lower resistance than sandy or rocky soils. Moisture content significantly affects resistance - dry soil has much higher resistance. Chemical contamination, salt content, and pH levels all influence electrode performance. Seasonal freeze-thaw cycles can damage electrodes and connections.</p>
                  </div>
                </details>

                <details className="bg-card/80 p-4 rounded-lg">
                  <summary className="cursor-pointer text-yellow-400 font-medium">How do I calculate the number of earth rods needed?</summary>
                  <div className="mt-3 text-gray-300 text-sm space-y-2">
                    <p>Start with soil resistivity measurements and single rod resistance calculations. For parallel rods, the combined resistance is approximately R_total = R_single / (n × efficiency_factor), where efficiency decreases with closer spacing. Use computer modelling software for complex installations or consult earth electrode specialists.</p>
                  </div>
                </details>

              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <CardTitle className="text-white">Section Summary</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-green-200 space-y-4">
              <p>
                Earth electrode installation and testing is fundamental to EV charging system safety. Proper selection, installation, and verification of earth electrodes ensures effective fault protection and long-term system reliability.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Key Installation Points:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Select appropriate electrode type for soil conditions</li>
                    <li>Install to adequate depth with proper spacing</li>
                    <li>Ensure secure connections and protection</li>
                    <li>Document installation details and test results</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-green-300">Testing Requirements:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Use fall-of-potential method for accuracy</li>
                    <li>Test during worst-case conditions</li>
                    <li>Verify resistance meets system requirements</li>
                    <li>Schedule regular maintenance testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule4Section4Quiz />

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link to="../ev-charging-module-4-section-3">
              <Button
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-card/80 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-4-section-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-400">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default EVChargingModule4Section4;