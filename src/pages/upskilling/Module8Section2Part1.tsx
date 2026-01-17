import { ArrowLeft, Brain, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Module8Section2Part1 = () => {
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
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Test Day Preparation and Mindset
                </h1>
                <p className="text-lg sm:text-xl text-white mt-1">
                  Section 1 - Stay sharp, focused, and confident
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 8
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Section 2.1
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">What This Helps With</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p>Keeps your head clear and focused on the day — so you don't walk in tense, tired, or second-guessing yourself. Your mental state on exam day can make or break your performance, regardless of how well you know the material.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">The Night Before</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Stop studying by 9pm</strong> — cramming late kills retention and sleep quality</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Prepare your kit:</strong> ID, pens (bring 3), calculator, regulations if allowed</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Set 2 alarms</strong> — one main, one backup 10 minutes later</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Light review only:</strong> flip through key values on flashcards, don't study new material</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Avoid alcohol</strong> — it disrupts sleep quality and morning focus</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Morning Routine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Eat properly:</strong> protein + carbs, avoid sugar crashes</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Arrive 15-20 minutes early</strong> — find the room, settle in, use the toilet</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Dress comfortably:</strong> layers you can adjust, comfortable shoes</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Hydrate well</strong> but don't overdo it — you don't want toilet breaks mid-exam</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Mental Preparation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Treat it like a job:</strong> professional, methodical, no drama</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Ignore other candidates</strong> — their nerves aren't your problem</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Don't discuss answers</strong> during breaks — it just creates doubt</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Have a mantra:</strong> "I know this stuff, I'm ready, one question at a time"</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">During the Exam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Read instructions twice</strong> — don't assume you know the format</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Time management:</strong> quick scan first, tackle what you know, return to tough ones</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Trust your first instinct</strong> — it's usually right, don't overthink</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Don't panic on difficult questions</strong> — mark them, move on, come back</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Stress Management Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Breathing technique:</strong> 4-7-8 breathing (inhale 4, hold 7, exhale 8) when feeling overwhelmed</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Progressive muscle relaxation:</strong> tense and release muscle groups before entering exam room</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Avoid catastrophic thinking:</strong> "If I fail this question, I'll fail everything" - stay present</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Positive self-talk:</strong> "I know this material, I've prepared well, one question at a time"</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Physical Preparation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Exercise the week before:</strong> light exercise reduces cortisol, improves focus</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Avoid new foods:</strong> stick to familiar meals to prevent digestive issues</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Caffeine strategy:</strong> if you normally drink coffee, have your usual amount - don't change routine</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Comfortable clothing:</strong> layers for temperature control, comfortable shoes</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Study Wind-Down Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Last Week Schedule:</p>
                <ul className="space-y-2 text-white text-sm">
                  <li><strong>7 days before:</strong> Complete final practice papers</li>
                  <li><strong>3 days before:</strong> Light review of key values only</li>
                  <li><strong>2 days before:</strong> Read through regulations, no new material</li>
                  <li><strong>1 day before:</strong> Quick flashcard review, then stop studying</li>
                  <li><strong>Day of exam:</strong> No studying - trust your preparation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Emergency Mindset Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>If you panic mid-exam:</strong> put pen down, close eyes, count to 10, breathe deeply</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Reset technique:</strong> stretch shoulders, wiggle fingers, take 3 deep breaths</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Perspective reminder:</strong> "This is just one question, I have many more chances"</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Anchor phrase:</strong> have a pre-planned calming phrase ready - "steady, professional, one step"</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Mini Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div>
                <p className="font-semibold text-white mb-2">Scenario 1: The Nervous Candidate</p>
                <p className="italic mb-2">You arrive, someone says, "What if they ask about AFDDs?" Ignore the noise. You've prepped. Trust it.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 2: The Time Pressure</p>
                <p className="italic mb-2">45 minutes left, 20 questions to go. Don't panic. Quick answers on easy ones, educated guesses on hard ones. Something is better than nothing.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">Scenario 3: The Mind Blank</p>
                <p className="italic mb-2">You hit a question and freeze completely. Skip it. Your brain will sort it while you're working on other questions. Come back later.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Emergency Response Protocols (2025 Update)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">If Things Go Wrong During Exam:</p>
                <ul className="text-sm text-white space-y-2">
                  <li><strong>Technical equipment failure:</strong> Raise hand immediately, don't waste time trying to fix it</li>
                  <li><strong>Feeling unwell mid-exam:</strong> Alert invigilator, document the issue for potential consideration</li>
                  <li><strong>Time running out:</strong> Switch to survival mode - educated guesses on remaining questions</li>
                  <li><strong>Panic attack response:</strong> Stop writing, close eyes, count backwards from 10, breathe slowly</li>
                  <li><strong>Calculator malfunction:</strong> Use manual calculations, show all working for partial marks</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Physical Health Optimisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Sleep schedule:</strong> 7-8 hours for a week before, no cramming after 9pm</span>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Nutrition planning:</strong> Complex carbs for sustained energy, avoid sugar spikes</span>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Avoid new supplements:</strong> Stick to your normal routine, no experiments</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white"><strong>Eye strain prevention:</strong> 20-20-20 rule during study sessions</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Mental Resilience Building</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-gray-600">
                <p className="text-yellow-400 font-semibold mb-3">Confidence Building Techniques:</p>
                <ul className="text-sm text-white space-y-2">
                  <li><strong>Success visualisation:</strong> Picture yourself calmly working through questions</li>
                  <li><strong>Evidence review:</strong> List your qualifications, experience, and preparation</li>
                  <li><strong>Worst-case planning:</strong> "If I fail, I can retake - it's not the end of the world"</li>
                  <li><strong>Positive anchoring:</strong> Remember past successes under pressure</li>
                  <li><strong>Professional identity:</strong> "I am a qualified electrician taking a test"</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Equipment Preparation Checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Essential Items</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Photo ID (driving licence/passport)</li>
                    <li>• 3 black pens (different brands)</li>
                    <li>• Calculator (non-programmable)</li>
                    <li>• BS 7671 copy (if permitted)</li>
                    <li>• Reading glasses (if needed)</li>
                  </ul>
                </div>
                <div className="bg-card p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-semibold mb-2">Backup Items</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Spare batteries for calculator</li>
                    <li>• Pencil and eraser</li>
                    <li>• Tissues</li>
                    <li>• Water bottle (clear plastic)</li>
                    <li>• Light snack (if allowed)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">One-liner</CardTitle>
            </CardHeader>
            <CardContent className="text-white">
              <p className="font-semibold text-yellow-400">You pass the exam before you sit down — show up sharp, ready, and clear-headed.</p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="/study-centre/upskilling/inspection-testing-module-8-section-2">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Overview
              </Button>
            </Link>
            <Link to="/study-centre/upskilling/inspection-testing-module-8-section-2-part-2">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 min-h-[48px]">
                Next: Common Mistakes
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Module8Section2Part1;