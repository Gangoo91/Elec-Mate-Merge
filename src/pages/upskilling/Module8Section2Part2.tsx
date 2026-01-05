import { ArrowLeft, AlertTriangle, CheckCircle, X, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section2Part2 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-12">
        <Link to="module-8/section-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hints & Tips
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Common Mistakes and How to Avoid Them
                </h1>
                <p className="text-lg sm:text-xl text-white break-words">
                  Section 2 - Don't throw away marks through careless errors
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                Section 2.2
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">What This Helps With</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p>Avoids throwing away marks by rushing, guessing, or writing the wrong thing in the right box. Most failures aren't from lack of knowledge — they're from silly mistakes under pressure.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Reading and Understanding Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Not reading the full question</strong> — missing key words like "maximum," "minimum," or "NOT compliant"</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Assuming question format</strong> — always check if they want single answer, multiple answers, or calculations</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Underline key words</strong> — "initial verification," "periodic inspection," "protective conductor"</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Watch for negatives</strong> — "Which is NOT required," "Incorrect procedure," "Non-compliant"</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Recording Results and Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Wrong column errors</strong> — Zs values in R1+R2 column, measured in expected, etc.</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Copying example numbers</strong> — they give you 0.85Ω as example, you write 0.85Ω as your answer</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Double-check units</strong> — MΩ vs Ω, mA vs A, mm² vs m²</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Always write something</strong> — blank answer = zero marks, educated guess = possible marks</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Safety and Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Think safety first:</strong> if scenario looks risky, you're probably looking at C2 or C1</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Don't overthink C3 vs C2</strong> — ask "would I leave this live?" If no = C2</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Missing earthing = C2</strong> — no debate, always dangerous</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>High Zs values = C2</strong> — if it won't disconnect in time, it's dangerous</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Test Sheet and Form Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Reading forms incorrectly</strong> — EIC vs EICR, different sections for different purposes</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Missing mandatory fields</strong> — date tested, tester signature, next inspection due</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Complete all sections</strong> — don't leave blanks unless genuinely not applicable</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Use standard terminology</strong> — "satisfactory," "unsatisfactory," specific fault codes</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Circuit Identification Errors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Mixing up circuit types</strong> — radial vs ring, lighting vs power</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Wrong protective device rating</strong> — assuming 32A when it's actually 20A MCB</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Always verify circuit details</strong> — check the MCB/fuse rating, circuit type, cable size</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Look for circuit modifications</strong> — added spurs, changed protective devices</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Equipment and Testing Errors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Wrong test leads</strong> — using 13A plug leads when hardwired connection needed</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Incorrect test settings</strong> — 250V when 500V required, wrong scale on meter</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Calibration awareness</strong> — check tester calibration dates, note if overdue</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Prove unit functionality</strong> — test on known circuit before and after main tests</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Real-World Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 4: The Mixed Installation</p>
                <p className="italic mb-2">House has new extension with RCD protection, old part without. You test a socket that looks new but is actually on old wiring. Check which board it's fed from before deciding on RCD requirements.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 5: The Modified Ring</p>
                <p className="italic mb-2">Ring final tests show odd readings. Turns out someone's added spurs and didn't update the circuit chart. Your test results look wrong because you're testing based on wrong assumptions.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 6: The Shared Neutral</p>
                <p className="italic mb-2">Two-way lighting circuit sharing neutral. Your polarity test fails because you're expecting standard radial wiring. Know your circuit types.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Calculation Errors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Decimal point errors</strong> — 1.5 becomes 15, 0.05 becomes 0.5</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Wrong formula use</strong> — using Ohm's law when you need percentage drop calculation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Show your working</strong> — partial marks available even if final answer is wrong</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Sense-check answers</strong> — if you get 50Ω for ring final, you've made an error</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Extended Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 1: The Missing CPC</p>
                <p className="italic mb-2">You're asked about "no CPC on lighting." You freeze. Ask yourself — is it dangerous? Would you leave it live? If the answer is no — it's a C2. Write it and move on.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 2: The Wrong Column</p>
                <p className="italic mb-2">You've got your Zs reading: 0.76Ω. The form has "Expected" and "Measured" columns. You write 0.76 in Expected by mistake. That's marks lost for a result that was correct.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 3: The Calculation Trap</p>
                <p className="italic mb-2">Question shows "4mm² cable, 25A load, 30m run." You calculate voltage drop but forget they want percentage drop. Right method, wrong final step.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Error Analysis (2025 Edition)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Modern Installation Errors:</p>
                <ul className="text-sm text-white space-y-2">
                  <li><strong>EV charging circuits:</strong> Missing Type A RCD, incorrect cable sizing for 7kW loads</li>
                  <li><strong>Smart home integration:</strong> Neutral switching issues with smart switches</li>
                  <li><strong>Heat pump electrical:</strong> Inadequate supply arrangements, missing isolation</li>
                  <li><strong>Solar PV systems:</strong> Missing AC and DC isolators, incorrect earthing arrangements</li>
                  <li><strong>Digital testing equipment:</strong> Not accounting for electronic device interference</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Form Completion Masterclass</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">EIC Critical Fields</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Installation address (full postcode)</li>
                    <li>• Earth fault loop impedance (Ze)</li>
                    <li>• Supply characteristics (TN-S/TN-C-S/TT)</li>
                    <li>• Main protective bonding sizing</li>
                    <li>• Test instrument details & cal dates</li>
                  </ul>
                </div>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">EICR Specific Traps</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Date of last inspection (if known)</li>
                    <li>• Extent and limitations clearly stated</li>
                    <li>• Overall assessment recommendation</li>
                    <li>• Next inspection date calculation</li>
                    <li>• Distributor details (Western Power, etc.)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Equipment Error Prevention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Loop tester polarity:</strong> Always check L-N connection before Zs test</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>RCD tester setup:</strong> Verify rated current setting matches RCD under test</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Insulation tester voltage:</strong> 500V for standard circuits, 250V for electronics</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Continuity leads:</strong> Use appropriate test current, check lead resistance</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Quality Assurance Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Before Submitting Any Form:</p>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Cross-check all readings against expected ranges</li>
                  <li>Verify all decimal points and units are correct</li>
                  <li>Ensure all mandatory fields are completed</li>
                  <li>Check signatures and dates are present</li>
                  <li>Confirm test instrument serial numbers match</li>
                  <li>Review limitation statements for accuracy</li>
                  <li>Validate next inspection recommendations</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">One-liner</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="font-semibold text-yellow-400">Most people don't fail on knowledge — they fail on focus and discipline. Don't be one of them.</p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="module-8/section-2/part-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Test Preparation
              </Button>
            </Link>
            <Link to="module-8/section-2/part-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next: Smart Techniques
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8Section2Part2;