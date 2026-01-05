import { Link } from "react-router-dom";
import { ArrowLeft, CheckSquare, Clock, Shield, FileText, Briefcase, Heart, AlertTriangle, CheckCircle, Calendar, MapPin, Phone, Target, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useSEO from "@/hooks/useSEO";

const Level2Module8Section2Section3 = () => {
  useSEO(
    "Exam Day Preparation - Level 2 Electrical Installation",
    "Essential exam day preparation guide for Level 2 electrical installation examinations. Complete checklist, equipment requirements, mental preparation strategies, and emergency protocols for success."
  );

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-6">
      <div>
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <Link 
            to=".." 
            className="inline-flex items-center text-muted-foreground hover:text-emerald-400 transition-colors text-sm sm:text-base touch-target"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to How to Pass Exams</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        
        {/* Hero Section */}
        <div className="text-center mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-card to-muted rounded-lg border border-emerald-500/30">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-full mb-2 sm:mb-3">
            <CheckSquare className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
            Exam Day Preparation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2">
            Complete preparation guide for your Level 2 electrical installation examination day. 
            From equipment checklists to mental preparation strategies - everything you need for success.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-card border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">24 hours</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Preparation window</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">30 mins</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Early arrival time</div>
          </div>
          <div className="bg-card border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-1">95%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Success with good prep</div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Pre-Exam Day Preparation Strategy */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-foreground text-lg sm:text-xl">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                Pre-Exam Day Preparation Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2 text-base sm:text-lg">
                    <Briefcase className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    Essential Equipment Checklist
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm sm:text-base">Calculation Tools (CRITICAL)</div>
                      <div className="text-sm sm:text-sm text-muted-foreground space-y-2 mt-2">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">Scientific calculator (non-programmable) - Bring TWO identical units</span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">Fresh batteries + spare set (AAA/AA depending on calculator)</span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">Test both calculators the night before - ensure all functions work</span>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm leading-relaxed">Memory cleared and settings reset to default</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">BS7671 Wiring Regulations</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Current edition (18th Edition) in good condition</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Properly tabbed with approved index tabs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>No handwritten notes or annotations inside</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Quick reference sheets (if separately provided)</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-emerald-400 text-sm">Writing & Identification</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Multiple black/blue pens (minimum 3)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Pencils + erasers for rough work</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Valid photo ID (driving licence/passport)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span>Exam entry confirmation/booking reference</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Heart className="h-4 w-4 text-emerald-400" />
                    Mental & Physical Preparation
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Sleep schedule:</strong> 7-8 hours sleep for 3 nights before exam</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Nutrition plan:</strong> Balanced meals, avoid heavy foods on exam day</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Hydration:</strong> Regular water intake, but not excessive before exam</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Exercise routine:</strong> Light exercise to reduce stress and improve focus</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Screen time:</strong> Reduce evening screen time for better sleep quality</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Relaxation:</strong> Practice breathing exercises or meditation</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-green-500/30">
                    <h5 className="font-semibold text-green-400 mb-2">24-Hour Countdown Checklist</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>✓ Confirm exam location and arrival time</div>
                      <div>✓ Plan route and transport method</div>
                      <div>✓ Pack equipment bag and check everything twice</div>
                      <div>✓ Set multiple alarms (phone + backup)</div>
                      <div>✓ Prepare next-day clothes and comfortable shoes</div>
                      <div>✓ Have light revision session - no new topics</div>
                      <div>✓ Eat nutritious dinner and hydrate well</div>
                      <div>✓ Early bedtime - aim for 8 hours sleep</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: The Night Before Protocol</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Avoid last-minute cramming! Instead, focus on confidence-building activities and practical preparation.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>6:00 PM:</strong> Light revision of key formulas and regulation numbers only</div>
                  <div><strong>7:00 PM:</strong> Equipment check and bag packing</div>
                  <div><strong>8:00 PM:</strong> Relaxing dinner with family/friends</div>
                  <div><strong>9:00 PM:</strong> Light entertainment (avoid study materials)</div>
                  <div><strong>10:00 PM:</strong> Prepare for bed - no screens after this time</div>
                  <div><strong>10:30 PM:</strong> In bed, practice breathing exercises</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day of Exam Protocol */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 sm:gap-3 text-foreground text-lg sm:text-xl">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
                Day of Exam Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
              <div>
                <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-base sm:text-lg">Timeline for Success</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="flex sm:block">
                      <div className="flex-shrink-0 w-8 h-8 sm:absolute sm:top-3 sm:left-3 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 sm:mr-0">6AM</div>
                      <div className="flex-1 sm:ml-12">
                        <h5 className="font-medium text-emerald-400 text-base sm:text-lg mb-2">Morning Routine (2-3 hours before exam)</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="mb-4 sm:mb-0">
                            <h6 className="text-sm font-medium text-emerald-400 mb-2">PHYSICAL PREPARATION:</h6>
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                              <div>• Wake up naturally - avoid rushing</div>
                              <div>• Shower and dress in comfortable layers</div>
                              <div>• Light breakfast: protein + complex carbs</div>
                              <div>• Moderate caffeine - avoid excess</div>
                              <div>• Final equipment check</div>
                            </div>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-emerald-400 mb-2">MENTAL PREPARATION:</h6>
                            <div className="space-y-1.5 text-sm text-muted-foreground">
                              <div>• 5-minute breathing exercise</div>
                              <div>• Quick review of key formulas only</div>
                              <div>• Positive self-talk and affirmations</div>
                              <div>• Avoid social media and news</div>
                              <div>• Focus on success visualisation</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">8AM</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Departure & Travel (1 hour buffer)</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">TRAVEL CHECKLIST:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Allow 2x normal travel time</div>
                            <div>• Alternative route planned</div>
                            <div>• Emergency contact numbers saved</div>
                            <div>• Arrive 30 minutes early minimum</div>
                            <div>• Parking arrangements confirmed</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">FINAL BAG CHECK:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Photo ID and exam documentation</div>
                            <div>• Calculators + spare batteries</div>
                            <div>• BS7671 + index tabs</div>
                            <div>• Multiple pens and pencils</div>
                            <div>• Water bottle (clear if required)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">9AM</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-green-400 text-lg mb-2">Venue Arrival & Setup (30 mins early)</h5>
                      <div className="text-sm text-muted-foreground mb-3">
                        Use this time to acclimatise to the environment and complete all administrative requirements.
                      </div>
                      <div className="space-y-2">
                        <div className="p-2 bg-green-500/20 rounded text-xs">
                          <strong>Registration Process (10 mins):</strong> Check-in, ID verification, seat allocation
                        </div>
                        <div className="p-2 bg-green-500/20 rounded text-xs">
                          <strong>Workspace Setup (10 mins):</strong> Arrange equipment, test calculator, familiarise with desk
                        </div>
                        <div className="p-2 bg-green-500/20 rounded text-xs">
                          <strong>Final Preparation (10 mins):</strong> Bathroom visit, breathing exercises, positive mindset
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border border-border/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Venue Familiarisation Checklist</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Getting comfortable with your environment reduces anxiety and improves focus.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <div className="space-y-1">
                      <div>✓ Locate toilets and water fountains</div>
                      <div>✓ Identify emergency exits</div>
                      <div>✓ Find invigilator stations</div>
                      <div>✓ Check room temperature and lighting</div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-1">
                      <div>✓ Test desk stability and height</div>
                      <div>✓ Adjust chair position for comfort</div>
                      <div>✓ Check electrical outlets if needed</div>
                      <div>✓ Note clock positions for time management</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* During Exam Management */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Shield className="h-6 w-6 text-emerald-400" />
                During Exam Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-400" />
                    Environmental Control Strategies
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Temperature Management</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Layer clothing for easy adjustment</div>
                        <div>• Request seating change if too hot/cold</div>
                        <div>• Use deep breathing to regulate body temperature</div>
                        <div>• Stay hydrated but avoid excessive water intake</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-400 text-sm">Lighting & Vision Comfort</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Position to minimise glare on screen/paper</div>
                        <div>• Blink regularly to prevent eye strain</div>
                        <div>• Look away from work every 20 minutes</div>
                        <div>• Request desk lamp if lighting inadequate</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-emerald-400 text-sm">Noise & Distraction Control</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Focus on your own workspace only</div>
                        <div>• Use controlled breathing to filter distractions</div>
                        <div>• Don't be concerned by others' pace</div>
                        <div>• Report significant disturbances immediately</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Heart className="h-4 w-4 text-emerald-400" />
                    Stress & Anxiety Management
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>4-7-8 breathing:</strong> Inhale 4, hold 7, exhale 8 counts</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Progressive relaxation:</strong> Tense and release muscle groups</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Positive self-talk:</strong> "I am prepared and capable"</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Grounding technique:</strong> 5 things you see, 4 hear, 3 feel</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Refocus strategy:</strong> Return attention to current question only</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Time perspective:</strong> "This feeling will pass soon"</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-semibold text-emerald-400 mb-2">Panic Attack Protocol</h5>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div><strong>Step 1:</strong> Stop what you're doing, don't try to continue</div>
                        <div><strong>Step 2:</strong> Focus on slow, deep breathing</div>
                        <div><strong>Step 3:</strong> Ground yourself: feel chair, desk, floor</div>
                        <div><strong>Step 4:</strong> Remind yourself: "This will pass in 10 minutes"</div>
                        <div><strong>Step 5:</strong> Signal invigilator if needed</div>
                        <div><strong>Step 6:</strong> Resume when feeling subsides</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-card rounded-lg border border-border/30">
                      <h5 className="font-semibold text-emerald-400 mb-2">Mid-Exam Energy Management</h5>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Stand and stretch during natural breaks</div>
                        <div>• Drink water in small sips regularly</div>
                        <div>• Eat glucose tablets if allowed (energy boost)</div>
                        <div>• Change sitting position every 30 minutes</div>
                        <div>• Use bathroom breaks strategically</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: The 90-Minute Reset Strategy</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Human concentration naturally cycles every 90 minutes. Use this knowledge to maintain peak performance.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>Minutes 0-30:</strong> Peak alertness - tackle difficult questions</div>
                  <div><strong>Minutes 30-60:</strong> Good focus - continue with moderate difficulty</div>
                  <div><strong>Minutes 60-90:</strong> Declining focus - easier questions and review</div>
                  <div><strong>Minute 90:</strong> Natural break point - stretch, breathe, reset</div>
                  <div><strong>Minutes 90-120:</strong> Renewed focus - return to challenging material</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Preparation Strategies */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <Target className="h-6 w-6 text-emerald-400" />
                Advanced Preparation Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Documentation & Reference Setup
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">BS7671 Optimisation Techniques</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Tab system: Use different colours for each Part (1-7)</div>
                        <div>• Index bookmarks for Appendices 1-15</div>
                        <div>• Sticky notes for most-referenced tables</div>
                        <div>• Create quick-find guide for cable sizing tables</div>
                        <div>• Mark earthing arrangements diagrams (Appendix 9)</div>
                        <div>• Highlight protection device characteristics</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-400 text-sm">Quick Reference Sheets (if allowed)</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Ohm's law triangle and power formulas</div>
                        <div>• Common cable sizes and current ratings</div>
                        <div>• Standard protection device ratings</div>
                        <div>• Voltage drop calculation methods</div>
                        <div>• Discrimination factors and ratios</div>
                        <div>• Earth fault loop impedance values</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-purple-500">
                      <div className="font-medium text-emerald-400 text-sm">Calculator Programming (if permitted)</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Store frequently used constants (√3 = 1.732)</div>
                        <div>• Program common formulas if calculator allows</div>
                        <div>• Set up memory banks for multi-step calculations</div>
                        <div>• Practice using statistical functions</div>
                        <div>• Master bracket operations for complex equations</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Brain className="h-4 w-4 text-emerald-400" />
                    Cognitive Performance Enhancement
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Memory palace technique:</strong> Associate regulation numbers with familiar locations</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Mnemonics:</strong> Create memorable phrases for complex sequences</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Visualisation:</strong> Picture circuit diagrams and installation methods</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Active recall:</strong> Test yourself without looking at notes</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Spaced repetition:</strong> Review difficult topics at increasing intervals</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Interleaving:</strong> Mix different topic types during revision</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Week Before Exam Schedule</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div><strong>7 days:</strong> Final comprehensive review - identify weak areas</div>
                      <div><strong>6 days:</strong> Focus on identified weak topics only</div>
                      <div><strong>5 days:</strong> Practice exam under timed conditions</div>
                      <div><strong>4 days:</strong> Review mistakes from practice exam</div>
                      <div><strong>3 days:</strong> Light revision - formulas and key regulations</div>
                      <div><strong>2 days:</strong> Equipment check and mental preparation</div>
                      <div><strong>1 day:</strong> Relaxation and early night</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-border/30">
                    <h5 className="font-semibold text-emerald-400 mb-2">Peak Performance Nutrition</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div><strong>Breakfast:</strong> Porridge with berries (slow-release energy)</div>
                      <div><strong>Pre-exam snack:</strong> Banana or handful of nuts</div>
                      <div><strong>Hydration:</strong> 500ml water 2 hours before exam</div>
                      <div><strong>Avoid:</strong> High sugar, heavy fats, excessive caffeine</div>
                      <div><strong>Brain foods:</strong> Blueberries, dark chocolate, green tea</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: The Confidence Anchor Technique</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Create a physical gesture or mental phrase that you associate with successful practice sessions. 
                  Use this "anchor" during the exam to trigger confident, focused thinking.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>Physical anchor:</strong> Touch your watch or tap your pen three times</div>
                  <div><strong>Mental anchor:</strong> "I know this material and I am prepared"</div>
                  <div><strong>Breathing anchor:</strong> Three deep breaths with specific count pattern</div>
                  <div><strong>Practice:</strong> Use anchor during successful mock exams to strengthen association</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Venue Intelligence */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <MapPin className="h-6 w-6 text-emerald-400" />
                Venue Intelligence & Environment Mastery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-semibold mb-4 text-foreground text-lg">Pre-Visit Reconnaissance</h4>
                <div className="space-y-4">
                  <div className="relative p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">📍</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Location Scouting (1-2 days before)</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">ROUTE PLANNING:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Drive/walk the route at same time as exam day</div>
                            <div>• Identify alternative routes for traffic delays</div>
                            <div>• Locate nearest car parks and costs</div>
                            <div>• Check public transport timetables and delays</div>
                            <div>• Note roadworks or construction that might cause delays</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">FACILITY ASSESSMENT:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Main entrance and registration procedures</div>
                            <div>• Toilet locations and queue patterns</div>
                            <div>• Food/drink facilities nearby</div>
                            <div>• Mobile phone signal strength</div>
                            <div>• Waiting areas and comfort levels</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-green-500/10 to-transparent rounded-lg border border-green-500/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">🏢</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-green-400 text-lg mb-2">Exam Room Environment Analysis</h5>
                      <div className="space-y-3">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <h6 className="font-medium text-green-400 text-sm mb-2">Seating Strategy</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Request seat away from high-traffic areas</div>
                            <div>• Avoid seats near doors or toilets (distractions)</div>
                            <div>• Prefer seats with wall behind (psychological security)</div>
                            <div>• Check desk stability and space for materials</div>
                            <div>• Assess natural light vs artificial lighting</div>
                          </div>
                        </div>
                        <div className="p-3 bg-green-500/20 rounded-lg">
                          <h6 className="font-medium text-green-400 text-sm mb-2">Climate Control Assessment</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Note air conditioning/heating effectiveness</div>
                            <div>• Identify seats near/away from vents</div>
                            <div>• Check window positions for glare issues</div>
                            <div>• Assess noise levels from outside</div>
                            <div>• Plan clothing layers for temperature variation</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border border-border/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Environmental Adaptation Strategies</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Every exam environment presents unique challenges. Prepare for common scenarios:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <h6 className="font-medium text-emerald-400 mb-1">COMMON CHALLENGES:</h6>
                    <div className="space-y-1">
                      <div>• Room too hot/cold for optimal performance</div>
                      <div>• Distracting noises from other candidates</div>
                      <div>• Uncomfortable seating affecting concentration</div>
                      <div>• Poor lighting causing eye strain</div>
                      <div>• Technical issues with computers/systems</div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-emerald-400 mb-1">ADAPTATION TECHNIQUES:</h6>
                    <div className="space-y-1">
                      <div>• Layers clothing for temperature adjustment</div>
                      <div>• Mental focus techniques to filter distractions</div>
                      <div>• Posture adjustments for comfort</div>
                      <div>• Eye exercises and break patterns</div>
                      <div>• Backup plans for technical failures</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Protocols & Backup Plans */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <AlertTriangle className="h-6 w-6 text-emerald-400" />
                Emergency Protocols & Backup Plans
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h4 className="font-semibold mb-4 text-foreground text-lg">Contingency Planning for Common Issues</h4>
                <div className="space-y-4">
                  <div className="relative p-5 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">!</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Technical Equipment Failures</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">CALCULATOR PROBLEMS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Immediately switch to backup calculator</div>
                            <div>• Signal invigilator for replacement if needed</div>
                            <div>• Continue with mental calculation if possible</div>
                            <div>• Don't panic - many calculations are estimations</div>
                            <div>• Use alternative methods learned in training</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">COMPUTER/SYSTEM ISSUES:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Raise hand immediately - don't try to fix</div>
                            <div>• Note exact time and question number</div>
                            <div>• Continue on paper if possible</div>
                            <div>• Request time extension for technical delays</div>
                            <div>• Remain calm - technical staff will resolve</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-red-500/20 rounded text-xs">
                        <strong>Remember:</strong> Technical failures are covered by exam regulations - you won't be penalised
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-orange-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">H</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Health & Medical Emergencies</h5>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">SUDDEN ILLNESS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Signal invigilator immediately</div>
                            <div>• Don't leave seat without permission</div>
                            <div>• Medical conditions are grounds for special consideration</div>
                            <div>• First aid trained staff available</div>
                            <div>• Exam may be paused or rescheduled</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">ANXIETY/PANIC ATTACKS:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Use breathing techniques learned</div>
                            <div>• Signal for assistance if severe</div>
                            <div>• Fresh air break may be permitted</div>
                            <div>• Extra time can be considered</div>
                            <div>• Your wellbeing comes first</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 space-y-2">
                        <div className="p-2 bg-orange-500/20 rounded text-xs">
                          <strong>Medication:</strong> Inform invigilators of any medication needs before exam starts
                        </div>
                        <div className="p-2 bg-orange-500/20 rounded text-xs">
                          <strong>Emergency Contacts:</strong> Centre has procedures for contacting family if needed
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">T</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Travel & Timing Emergencies</h5>
                      <div className="text-sm text-muted-foreground mb-3">
                        Transport delays and unexpected events can happen. Preparation minimises impact.
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">LATE ARRIVAL:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Call exam centre immediately</div>
                            <div>• Explain reason for delay</div>
                            <div>• May be admitted up to 30 minutes late</div>
                            <div>• Lost time usually cannot be recovered</div>
                            <div>• Still worth attempting - partial marks available</div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-emerald-400 mb-1">TRANSPORT FAILURE:</h6>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div>• Use pre-planned alternative route</div>
                            <div>• Call taxi service as backup</div>
                            <div>• Contact centre to explain situation</div>
                            <div>• Keep receipts for any emergency transport</div>
                            <div>• Document reason with photos if possible</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative p-5 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg border border-border/30">
                    <div className="absolute top-3 left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">📞</div>
                    <div className="ml-12">
                      <h5 className="font-medium text-emerald-400 text-lg mb-2">Communication & Support Protocols</h5>
                      <div className="space-y-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Essential Contact Numbers</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Exam centre main number</div>
                            <div>• Emergency transport services</div>
                            <div>• Family/emergency contact</div>
                            <div>• Training provider support line</div>
                            <div>• Your personal doctor if relevant</div>
                          </div>
                        </div>
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                          <h6 className="font-medium text-emerald-400 text-sm mb-2">Communication Protocol</h6>
                          <div className="text-xs text-muted-foreground space-y-1">
                            <div>• Always speak to invigilator first</div>
                            <div>• Be clear and specific about the problem</div>
                            <div>• Ask for written confirmation of any decisions</div>
                            <div>• Note times and names of people you speak to</div>
                            <div>• Keep all documentation for appeals if needed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-lg border border-green-500/30">
                <h5 className="font-semibold text-green-400 mb-2">Recovery Strategies: When Things Go Wrong</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Even with the best preparation, unexpected situations can arise. These strategies help you recover and succeed.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <h6 className="font-medium text-green-400 mb-1">MENTAL RECOVERY:</h6>
                    <div className="space-y-1">
                      <div>• Accept that problems happen to everyone</div>
                      <div>• Focus on what you can control going forward</div>
                      <div>• Use the remaining time effectively</div>
                      <div>• Don't let one issue derail the entire exam</div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-green-400 mb-1">PRACTICAL RECOVERY:</h6>
                    <div className="space-y-1">
                      <div>• Adjust time allocation for remaining questions</div>
                      <div>• Prioritise questions you're confident about</div>
                      <div>• Make educated guesses rather than leave blanks</div>
                      <div>• Document issues for potential appeals</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Post-Exam Protocols */}
          <Card className="border-emerald-500/30 bg-card">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-transparent">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
                Post-Exam Protocols & Results Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    Immediate Post-Exam Actions
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-green-500">
                      <div className="font-medium text-green-400 text-sm">First 30 Minutes After Submission</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Don't discuss answers with other candidates</div>
                        <div>• Avoid immediate post-mortem analysis</div>
                        <div>• Focus on positive aspects of performance</div>
                        <div>• Take deep breaths and practice gratitude</div>
                        <div>• Hydrate and have a light snack</div>
                        <div>• Note any technical issues experienced</div>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border-l-4 border-emerald-500">
                      <div className="font-medium text-emerald-400 text-sm">Administrative Completion</div>
                      <div className="text-xs text-muted-foreground space-y-1 mt-2">
                        <div>• Ensure all required documentation submitted</div>
                        <div>• Confirm contact details for results notification</div>
                        <div>• Keep copy of exam booking reference</div>
                        <div>• Note expected results timeline</div>
                        <div>• Collect any personal materials left at desk</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Heart className="h-4 w-4 text-emerald-400" />
                    Emotional & Mental Recovery
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Positive reframing:</strong> Focus on what went well, not mistakes</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Emotional release:</strong> Allow yourself to feel relief and pride</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Social support:</strong> Contact supportive family/friends</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Physical activity:</strong> Light exercise to release tension</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm"><strong>Reward yourself:</strong> Planned celebration for completing exam</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-card rounded-lg border border-green-500/30">
                    <h5 className="font-semibold text-green-400 mb-2">Results Waiting Strategy</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Understand typical results timescales (2-4 weeks)</div>
                      <div>• Set up email notifications if available</div>
                      <div>• Plan constructive activities during waiting period</div>
                      <div>• Avoid excessive speculation about performance</div>
                      <div>• Prepare mentally for both pass and resit scenarios</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent p-4 rounded-lg border border-emerald-500/30">
                <h5 className="font-semibold text-emerald-400 mb-2">Pro Tip: Learning from the Experience</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Regardless of results, every exam is a learning opportunity. Document insights while they're fresh.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div><strong>What worked well:</strong> Note successful strategies for future use</div>
                  <div><strong>What to improve:</strong> Identify areas for development without self-criticism</div>
                  <div><strong>Unexpected challenges:</strong> Record solutions for similar future situations</div>
                  <div><strong>Knowledge gaps:</strong> Plan targeted learning for any identified weaknesses</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level2Module8Section2Section3;