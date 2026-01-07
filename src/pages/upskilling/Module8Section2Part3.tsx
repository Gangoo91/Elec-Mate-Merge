import { ArrowLeft, Target, CheckCircle, AlertTriangle, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section2Part3 = () => {
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
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white break-words">
                  Smart Techniques for Answering Questions
                </h1>
                <p className="text-lg sm:text-xl text-white break-words">
                  Section 3 - Strategic approaches for exam success
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black text-xs sm:text-sm">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white text-xs sm:text-sm">
                Section 2.3
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">What This Helps With</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p>Gives you strategies to stay in control, even when the question looks long, confusing, or unfamiliar. Smart exam technique can turn a difficult paper into a manageable one.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Question Analysis Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Break down long questions</strong> — identify the scenario, what they're asking, what info you need</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Underline key words</strong> — circuit type, test required, expected outcome</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Look for context clues</strong> — "commercial kitchen" suggests different regs than "domestic garage"</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Identify what's being tested</strong> — knowledge, application, calculation, or regulation reference</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Multiple Choice Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Eliminate obviously wrong answers first</strong> — usually narrows it to 2 options</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Watch for similar answers</strong> — if two answers look similar, one is often a trap</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Beware of "always" and "never"</strong> — absolutes are often wrong in electrical work</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Trust your first instinct</strong> — if you know the topic, don't second-guess yourself</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Use practical experience</strong> — what would you actually do on site?</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Written Answer Technique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Don't rush extended answers</strong> — think before you write, be clear and complete</span>
              </div>
              <div className="flex items-start gap-3">
                <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Avoid one-word answers</strong> — "safety" doesn't show understanding, "prevents electric shock" does</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Use bullet points</strong> — easier to read, less chance of rambling</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Reference regulations</strong> — shows deeper understanding</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Time Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Quick scan first</strong> — identify easy wins and time-heavy questions</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Mark difficult questions</strong> — come back when you're in flow with easier ones</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Allocate time by marks</strong> — 5-mark question deserves more time than 1-mark</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Keep 10 minutes for review</strong> — check you've answered everything</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Question Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Scenario identification:</strong> domestic vs commercial, new vs existing, wet vs dry locations</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Circuit type recognition:</strong> ring vs radial, lighting vs power, fixed vs socket outlets</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Special location flags:</strong> bathroom zones, outdoor installations, agricultural premises</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Calculation Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Step-by-Step Approach:</p>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Identify what they're asking for</li>
                  <li>List the given information</li>
                  <li>Choose the correct formula</li>
                  <li>Substitute values carefully</li>
                  <li>Calculate step by step</li>
                  <li>Check answer makes sense</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Detailed Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 1: The Memory Block</p>
                <p className="italic mb-2">"List the test order for initial verification." You go blank. Break it down: earth continuity, ring continuity, insulation, polarity… start writing — your memory will follow your pen.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 2: The Complex Calculation</p>
                <p className="italic mb-2">Multi-step voltage drop calc with correction factors. Break it down: find basic mV/A/m, apply length, apply current, apply correction factors. One step at a time.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 3: The Regulation Question</p>
                <p className="italic mb-2">"What does BS 7671 require for this situation?" You're not sure of the exact reg. Write what safety requires — protection, isolation, etc. Often gets you most marks.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Question Type Recognition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Knowledge Questions</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>• "What is the purpose of..."</li>
                      <li>• "Define the term..."</li>
                      <li>• "List the requirements for..."</li>
                      <li>• Strategy: Direct recall, use precise terminology</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Application Questions</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>• "In this scenario, what would you..."</li>
                      <li>• "Which regulation applies..."</li>
                      <li>• "How would you test..."</li>
                      <li>• Strategy: Apply knowledge to situation</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Calculation Questions</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>• "Calculate the voltage drop..."</li>
                      <li>• "Determine the Zs value..."</li>
                      <li>• "Find the cable size required..."</li>
                      <li>• Strategy: Show working, check units</li>
                    </ul>
                  </div>
                  <div className="bg-card p-3 rounded border border-gray-600">
                    <p className="text-yellow-400 font-semibold mb-2">Analysis Questions</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>• "Explain why this is unsafe..."</li>
                      <li>• "Compare these two methods..."</li>
                      <li>• "Evaluate the suitability..."</li>
                      <li>• Strategy: Think critically, give reasons</li>
                    </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Advanced Multiple Choice Tactics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">The Process of Elimination:</p>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Read all options before eliminating any</li>
                  <li>Cross out obviously wrong answers</li>
                  <li>Look for precise vs vague language</li>
                  <li>Check for technical accuracy in remaining options</li>
                  <li>Choose the most complete/specific answer</li>
                </ol>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong>Distractor patterns:</strong> Look for answers that are close but have wrong units, values, or regulation numbers</span>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong>Trap answers:</strong> "All of the above" and "None of the above" - read carefully before selecting</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong>Length clue:</strong> Often the correct answer is longer/more detailed than distractors</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Reading and Interpretation Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Key Words to Watch For:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-white font-semibold mb-2">Action Words:</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>• Calculate, Determine, Find</li>
                      <li>• List, State, Define</li>
                      <li>• Explain, Describe, Compare</li>
                      <li>• Evaluate, Assess, Analyse</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-2">Qualifier Words:</p>
                    <ul className="text-sm text-white space-y-1">
                      <li>• Maximum, Minimum, Optimum</li>
                      <li>• Most suitable, Least appropriate</li>
                      <li>• Primary, Secondary, Additional</li>
                      <li>• Initial, Periodic, Emergency</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Negative questions:</strong> "Which is NOT required" or "Incorrect procedure" - easy to miss the negative</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Stress Response Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">When You Hit a Mental Block:</p>
                <ol className="list-decimal list-inside space-y-1 text-white text-sm">
                  <li>Stop writing, put pen down</li>
                  <li>Take three slow, deep breaths</li>
                  <li>Re-read the question slowly</li>
                  <li>Write down any relevant keywords you know</li>
                  <li>Start with what you're certain about</li>
                  <li>Build your answer from there</li>
                </ol>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong>Confidence building:</strong> Answer easier questions first to build momentum and confidence</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong>Perspective reminder:</strong> One difficult question won't fail you - keep going</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Extended Practice Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 4: The Trick Question</p>
                <p className="italic mb-2">"Which cable is suitable for this installation?" You see familiar cable types but notice "outdoor" in the scenario. Stop - check if UV resistance is mentioned. Details matter.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 5: The Calculation Trap</p>
                <p className="italic mb-2">Voltage drop calculation with "4mm² cable, 25A load, 30m run." Easy calculation but they want percentage drop, not voltage. Read what they're actually asking for.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 6: The Multiple Requirements</p>
                <p className="italic mb-2">"List THREE safety measures for bathroom installations." Don't write four (you won't get marks for extra). Count your points, stick to what's asked.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 7: The Time Crunch</p>
                <p className="italic mb-2">5 minutes left, complex written question. Bullet points, key facts only. "RCD required, 30mA, bathroom zone 1, protection against shock." Get the marks, move on.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">One-liner</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="font-semibold text-yellow-400">Answering smart is as important as answering right — don't just write, think first.</p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../module-8/section-2/part-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Common Mistakes
              </Button>
            </Link>
            <Link to="../module-8/section-2/part-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 min-h-[48px]">
                Next: Key Values
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8Section2Part3;