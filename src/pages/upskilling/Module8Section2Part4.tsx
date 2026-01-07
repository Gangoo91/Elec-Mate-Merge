import { ArrowLeft, BookOpen, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section2Part4 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="module-8/section-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md min-h-[48px]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hints & Tips
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Memorising Key Test Values and Sequences
                </h1>
                <p className="text-lg sm:text-xl text-white break-words">
                  Section 4 - Essential values and procedures to commit to memory
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                Section 2.4
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">What This Helps With</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p>Makes sure key numbers and procedures are in your head — not forgotten under pressure. When you're stressed, drilled facts become your safety net.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Critical Test Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Insulation resistance:</strong> 1 MΩ minimum at 500V for new installations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Max Zs for 32A Type B MCB:</strong> 1.37Ω (get the whole chart memorised)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>RCD trip times:</strong> ≤300ms at 1x, ≤40ms at 5x rated current</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Test voltages:</strong> 250V for SELV, 500V for standard circuits</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Ring final resistance:</strong> R1+R2 should be roughly double the live conductor resistance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Test Sequence (CRITICAL)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-2">Memorise This Order:</p>
                <ol className="list-decimal list-inside space-y-1 text-white">
                  <li><strong>Visual inspection</strong> (always first)</li>
                  <li><strong>Continuity of protective conductors</strong></li>
                  <li><strong>Continuity of ring final circuits</strong></li>
                  <li><strong>Insulation resistance</strong></li>
                  <li><strong>Polarity</strong></li>
                  <li><strong>Earth fault loop impedance (Zs)</strong></li>
                  <li><strong>RCD operation</strong></li>
                  <li><strong>Functional testing</strong></li>
                </ol>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Memory aid:</strong> "Very Careful Contractors Install Properly, Ensuring Really Fine" work</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Never do Zs before IR</strong> — you could damage your tester</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Zs Values - CRITICAL TEMPERATURE FACTOR</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 mb-4">
                <p className="text-red-400 font-semibold mb-2">⚠️ IMPORTANT: 80% Rule for Zs Testing</p>
                <p className="text-white text-sm">When testing at ambient temperature (cold conductors), compare your readings against 80% of the tabulated Zs values. This accounts for conductor temperature rise during fault conditions.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Type B MCB (80% of tabulated)</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>6A: 5.49Ω (80% of 6.86Ω)</li>
                      <li>16A: 2.20Ω (80% of 2.75Ω)</li>
                      <li>20A: 1.75Ω (80% of 2.19Ω)</li>
                      <li>32A: 1.10Ω (80% of 1.37Ω)</li>
                      <li>40A: 0.87Ω (80% of 1.09Ω)</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Type C MCB (80% of tabulated)</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>6A: 2.74Ω (80% of 3.43Ω)</li>
                      <li>16A: 1.10Ω (80% of 1.37Ω)</li>
                      <li>20A: 0.87Ω (80% of 1.09Ω)</li>
                      <li>32A: 0.55Ω (80% of 0.69Ω)</li>
                      <li>40A: 0.44Ω (80% of 0.55Ω)</li>
                    </ul>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-2">When to Use 80% Rule:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Testing at ambient temperature (conductors cold)</li>
                  <li>• Most practical testing situations</li>
                  <li>• Initial verification and periodic inspection</li>
                  <li>• When conductors haven't been carrying load</li>
                </ul>
              </div>
              
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Exam trap:</strong> Questions may ask for tabulated values OR test limits - read carefully!</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Essential Test Voltages and Current Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Insulation Resistance Test Voltages</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>SELV/PELV circuits: 250V DC</li>
                      <li>Up to 500V nominal: 500V DC</li>
                      <li>Above 500V nominal: 1000V DC</li>
                      <li>Motor circuits: 500V DC minimum</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">RCD Test Currents</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>½ × IΔn: should NOT trip</li>
                      <li>1 × IΔn: should trip ≤300ms</li>
                      <li>5 × IΔn: should trip ≤40ms</li>
                      <li>Standard 30mA RCD: test at 15mA, 30mA, 150mA</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Continuity Test Current</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Minimum test current: 200mA</li>
                      <li>Protective conductor: 200mA minimum</li>
                      <li>Ring final circuit: 200mA minimum</li>
                      <li>Low resistance ohmmeter preferred</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Acceptable IR Values</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>SELV circuits: ≥0.25 MΩ</li>
                      <li>Standard circuits: ≥1 MΩ</li>
                      <li>Fire alarm circuits: ≥0.5 MΩ</li>
                      <li>Heating cables: ≥1 MΩ</li>
                    </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Memory Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">The Story Method for Test Sequence:</p>
                <p className="text-white text-sm italic mb-2">"Very Careful Contractors Install Proper Equipment, Ensuring Really Fine jobs."</p>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li><strong>Very</strong> = Visual inspection</li>
                  <li><strong>Careful</strong> = Continuity (protective conductors)</li>
                  <li><strong>Contractors</strong> = Continuity (ring finals)</li>
                  <li><strong>Install</strong> = Insulation resistance</li>
                  <li><strong>Proper</strong> = Polarity</li>
                  <li><strong>Equipment</strong> = Earth fault loop impedance</li>
                  <li><strong>Ensuring</strong> = (RCD) Every circuit tested</li>
                  <li><strong>Really</strong> = RCD operation</li>
                  <li><strong>Fine</strong> = Functional testing</li>
                </ol>
              </div>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Number Association Tricks:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>32A = 1.37Ω:</strong> "32 year old weighs 137 pounds"</li>
                  <li><strong>20A = 2.19Ω:</strong> "20 years old in 2019"</li>
                  <li><strong>RCD 40ms:</strong> "40 is life begins" (critical safety time)</li>
                  <li><strong>IR 1MΩ:</strong> "1 Million reasons to be safe"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Cable and Circuit Specific Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Ring Final Circuit Values</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>2.5mm² T&E: ~19.5mΩ/m (live)</li>
                      <li>R1 + R2 = 1.67 × R1 (for 2.5/1.5mm²)</li>
                      <li>End-to-end resistance ÷ 4 = R1</li>
                      <li>Cross-connection reading = R1 + R2</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Voltage Drop Calculations</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>2.5mm² T&E: 18mV/A/m</li>
                      <li>4mm² T&E: 11mV/A/m</li>
                      <li>6mm² T&E: 7.3mV/A/m</li>
                      <li>Max drop: 3% lighting, 5% other</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">MCB Characteristics</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Type B: 3-5 × In (magnetic trip)</li>
                      <li>Type C: 5-10 × In (magnetic trip)</li>
                      <li>Type D: 10-20 × In (magnetic trip)</li>
                      <li>Thermal trip: 1.13 × In (1 hour)</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Special Circuit Values</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>Bathroom circuits: 30mA RCD</li>
                      <li>TT system: 100mA time delayed RCD</li>
                      <li>Fire alarm: Class II cable required</li>
                      <li>Emergency lighting: 3 hour duration</li>
                    </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Testing Equipment Calibration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Calibration Requirements:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>Annual calibration:</strong> All electrical test equipment</li>
                  <li><strong>Calibration certificate:</strong> Must be valid and traceable</li>
                  <li><strong>Accuracy requirements:</strong> ±2% of reading (typical)</li>
                  <li><strong>Prove unit tests:</strong> Before and after each test sequence</li>
                  <li><strong>GS38 compliance:</strong> Test leads and probes</li>
                </ul>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Exam tip:</strong> Always check calibration dates in scenarios - expired calibration = invalid results</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Practice Drills and Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Daily Practice Routine:</p>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li><strong>Morning drill:</strong> Recite test sequence before coffee</li>
                  <li><strong>Lunchtime flash:</strong> 5 minutes with Zs value cards</li>
                  <li><strong>Evening review:</strong> Test one random value/sequence</li>
                  <li><strong>Weekend practice:</strong> Write out complete test procedures</li>
                  <li><strong>Mock exam prep:</strong> Random value tests under time pressure</li>
                </ol>
              </div>
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Retention Techniques:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>Spaced repetition:</strong> Review values at increasing intervals</li>
                  <li><strong>Active recall:</strong> Test yourself without looking</li>
                  <li><strong>Visual association:</strong> Create mental images for numbers</li>
                  <li><strong>Practical connection:</strong> Link values to real job experiences</li>
                  <li><strong>Teach others:</strong> Explain values to colleagues/apprentices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Extended Practice Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 4: The Mixed Board Test</p>
                <p className="italic mb-2">You're testing a consumer unit with mixed Type B and Type C MCBs. Quick - what's the 80% test limit for a 20A Type C? Answer: 0.87Ω (80% of 1.09Ω). If you had to think about it, drill more.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 5: The RCD Test Confusion</p>
                <p className="italic mb-2">Testing 100mA RCD. At 50mA it shouldn't trip, at 100mA it should trip within 300ms, at 500mA within 40ms. Know these cold - no calculation time in the exam.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 6: The Ring Final Check</p>
                <p className="italic mb-2">Ring final R1+R2 reading is 0.95Ω. Is this reasonable for 2.5mm² cable? Quick mental check: 2.5mm² should be around 0.8-1.2Ω depending on length. Know your cable resistances.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 7: The IR Test Pressure</p>
                <p className="italic mb-2">Your IR reading is 0.8MΩ. Pass or fail? Answer: Fail - needs 1MΩ minimum for standard circuits. These binary decisions need to be instant.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Memory Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Use flashcards</strong> — physical cards work better than apps for most people</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Voice recordings</strong> — record yourself saying values, play back while driving</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Create associations</strong> — 32A/1.37Ω = "32 year old weighs 137 pounds"</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Practice daily</strong> — 5 minutes every morning with coffee</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Don't mix up R1 + R2 with Zs</strong> — they're different tests measuring different things</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Detailed Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 1: The Pressure Moment</p>
                <p className="italic mb-2">You're mid-test and can't remember the RCD time. You've drilled it: 40 milliseconds at 5x. You write it confidently. That's a mark saved.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 2: The Mixed-Up Test</p>
                <p className="italic mb-2">"What's the max Zs for this 20A circuit?" Your mind goes blank. But you remember: Type B = 2.19Ω. You're confident because you've drilled it 100 times.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 3: The Sequence Question</p>
                <p className="italic mb-2">"List the test sequence." Start writing: Visual, continuity, IR... your memory kicks in because the sequence is automatic.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">One-liner</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="font-semibold text-yellow-400">When you're tired, stressed, or unsure — drilled facts carry you through.</p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../module-8/section-2/part-3">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Smart Techniques
              </Button>
            </Link>
            <Link to="../module-8/section-2/part-5">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 min-h-[48px]">
                Next: Using Regulations
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8Section2Part4;