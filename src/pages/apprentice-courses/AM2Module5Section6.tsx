import { ArrowLeft, FileText, Zap, Search, Target, AlertTriangle, CheckCircle, BookOpen, Download, Wrench, Settings, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useSEO from "@/hooks/useSEO";

const AM2Module5Section6 = () => {
  useSEO(
    "AM2 Fault Diagnosis & Rectification Quick Reference Sheet | Module 5 Section 6",
    "Essential quick reference guide for AM2 fault-finding procedures. Fault types, rectification methods and re-testing requirements."
  );

  const faultTypes = [
    {
      type: "Open Circuit",
      symptom: "Dead socket, dead light, no continuity",
      rectification: "Reconnect conductor at CU/socket/rose",
      reTest: "Continuity test of conductors",
      bgColor: "bg-red-100 dark:bg-red-950/30",
      borderColor: "border-red-300 dark:border-red-800/40"
    },
    {
      type: "Short Circuit (L–N)",
      symptom: "MCB trips instantly, IR test ~0 MΩ",
      rectification: "Locate and re-terminate damaged conductor at point of fault",
      reTest: "Insulation resistance (L–N, L–E)",
      bgColor: "bg-orange-100 dark:bg-orange-950/30",
      borderColor: "border-orange-300 dark:border-orange-800/40"
    },
    {
      type: "Earth Fault (L–E)",
      symptom: "RCD trips, low IR between line and earth",
      rectification: "Remove line contact with earth (e.g. re-terminate in DB)",
      reTest: "IR test (L–E) + RCD test",
      bgColor: "bg-amber-100 dark:bg-amber-950/30",
      borderColor: "border-amber-300 dark:border-amber-800/40"
    },
    {
      type: "High Resistance Joint",
      symptom: "Circuit works but Zs too high, heating at accessory",
      rectification: "Remake/retighten loose termination at accessory/socket",
      reTest: "Earth fault loop impedance (Zs)",
      bgColor: "bg-yellow-100 dark:bg-yellow-950/30",
      borderColor: "border-yellow-300 dark:border-yellow-800/40"
    },
    {
      type: "Polarity Reversed",
      symptom: "Light permanently on, socket polarity reversed",
      rectification: "Swap line and neutral into correct terminals (at socket or switch)",
      reTest: "Polarity test at point of use",
      bgColor: "bg-blue-100 dark:bg-blue-950/30",
      borderColor: "border-blue-300 dark:border-blue-800/40"
    },
    {
      type: "Faulty Accessory",
      symptom: "One outlet doesn't work, visual damage",
      rectification: "Replace faulty accessory with new one",
      reTest: "Functional test + polarity",
      bgColor: "bg-purple-100 dark:bg-purple-950/30",
      borderColor: "border-purple-300 dark:border-purple-800/40"
    },
    {
      type: "Open CPC",
      symptom: "CPC continuity failed, no earth at accessory",
      rectification: "Reconnect CPC in earth bar/socket back box",
      reTest: "Continuity test CPC + Zs",
      bgColor: "bg-green-100 dark:bg-green-950/30",
      borderColor: "border-green-300 dark:border-green-800/40"
    },
    {
      type: "Motor Circuit Fault",
      symptom: "Starter not working, no overload protection",
      rectification: "Correct start/stop wiring / set overload correctly / re-terminate SWA",
      reTest: "Functional start/stop test + continuity",
      bgColor: "bg-indigo-100 dark:bg-indigo-950/30",
      borderColor: "border-indigo-300 dark:border-indigo-800/40"
    }
  ];

  const goldenRules = [
    "Never guess — always test logically and record type + location + rectification",
    "Phrase properly: Action + Location + Re-Test",
    'Example: "Reconnect CPC at socket outlet and re-test continuity and Zs"',
    "Always state re-testing — forgetting this is one of the top reasons candidates lose marks",
    "Work safe — prove dead before fault-finding, even in assessment conditions",
    "Aim for 3 out of 4 faults correct — this is usually the pass requirement"
  ];

  const quickTestingGuide = [
    { fault: "Open circuits", test: "Continuity" },
    { fault: "Short circuits / Earth faults", test: "Insulation resistance" },
    { fault: "Polarity errors", test: "Polarity test at accessories" },
    { fault: "High resistance", test: "Zs test (compare to BS 7671 limits)" },
    { fault: "Functional errors", test: "Switch, RCD, or motor control tests" }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" className="min-h-[44px] p-3 text-white hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]" asChild>
            <Link to="..">
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Back to Module 5</span>
              <span className="xs:hidden">Back</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-elec-yellow/10 text-elec-yellow text-sm font-medium rounded-full mb-4">
            <FileText className="w-4 h-4" />
            Quick Reference Sheet
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            AM2 Fault Diagnosis & Rectification
          </h1>
          <p className="text-base sm:text-lg text-white max-w-3xl mx-auto leading-relaxed">
            Essential reference guide for AM2 fault-finding procedures. Keep this handy during your preparation and assessment.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-transparent border-elec-yellow/30 hover:border-elec-yellow/30 transition-colors">
            <CardContent className="p-4 text-center">
              <Search className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <h3 className="font-semibold text-sm">8 Common Faults</h3>
              <p className="text-xs text-white mt-1">Complete reference table</p>
            </CardContent>
          </Card>
          <Card className="bg-transparent border-elec-yellow/30 hover:border-elec-yellow/30 transition-colors">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Golden Rules</h3>
              <p className="text-xs text-white mt-1">Never lose marks again</p>
            </CardContent>
          </Card>
          <Card className="bg-transparent border-elec-yellow/30 hover:border-elec-yellow/30 transition-colors">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Quick Testing</h3>
              <p className="text-xs text-white mt-1">Right test for each fault</p>
            </CardContent>
          </Card>
        </div>

        {/* Fault Types Table */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Wrench className="w-6 h-6" />
              Fault Types, Rectification & Re-Test
            </h2>
            
            <div className="space-y-4">
              {faultTypes.map((fault, index) => (
                <Card key={index} className={`${fault.bgColor} ${fault.borderColor} border`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="text-xs">
                        {fault.type}
                      </Badge>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Typical Symptom</h4>
                        <p className="text-xs text-white">{fault.symptom}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Rectification</h4>
                        <p className="text-xs text-white">{fault.rectification}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Re-Test Required</h4>
                        <p className="text-xs text-white font-medium">{fault.reTest}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Golden Rules */}
        <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Golden Rules
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goldenRules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-elec-yellow/10">
                  <div className="w-6 h-6 bg-elec-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-elec-yellow">{index + 1}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white leading-relaxed">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Common Test Equipment */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Essential Test Equipment
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 border border-white/10 rounded-lg bg-[#1a1a1a]/50">
                <h4 className="font-semibold text-sm mb-2">Continuity Tester</h4>
                <p className="text-xs text-white">200mA test current for conductor continuity</p>
              </div>
              <div className="p-3 border border-white/10 rounded-lg bg-[#1a1a1a]/50">
                <h4 className="font-semibold text-sm mb-2">Insulation Tester</h4>
                <p className="text-xs text-white">500V DC for IR between conductors</p>
              </div>
              <div className="p-3 border border-white/10 rounded-lg bg-[#1a1a1a]/50">
                <h4 className="font-semibold text-sm mb-2">Loop Tester</h4>
                <p className="text-xs text-white">Zs measurements for earth faults</p>
              </div>
              <div className="p-3 border border-white/10 rounded-lg bg-[#1a1a1a]/50">
                <h4 className="font-semibold text-sm mb-2">RCD Tester</h4>
                <p className="text-xs text-white">Verify RCD operation after earth faults</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Time Management Tips */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              AM2 Time Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Typical Time Allocation:</h4>
                <ul className="text-xs text-white space-y-1">
                  <li>• Initial circuit inspection: 5-10 minutes</li>
                  <li>• Fault diagnosis per circuit: 15-20 minutes</li>
                  <li>• Rectification: 10-15 minutes</li>
                  <li>• Re-testing and documentation: 5-10 minutes</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Pro Tips:</h4>
                <ul className="text-xs text-white space-y-1">
                  <li>• Start with obvious visual checks</li>
                  <li>• Use logical sequence: dead tests first</li>
                  <li>• Document as you work, not at the end</li>
                  <li>• Don't spend too long on one fault</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Quick Testing Guide
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickTestingGuide.map((item, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-lg bg-[#1a1a1a]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <h4 className="font-semibold text-sm">{item.fault}</h4>
                  </div>
                  <p className="text-xs text-white">→ {item.test}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Safety Reminders */}
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-red-800 dark:text-red-200 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Safety First - Always Remember
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-red-300 dark:border-red-700 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Before Any Work:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                  <li>• Prove circuit is dead</li>
                  <li>• Lock off and tag supply</li>
                  <li>• Use appropriate PPE</li>
                  <li>• Check test equipment works</li>
                </ul>
              </div>
              <div className="p-4 border border-red-300 dark:border-red-700 rounded-lg">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">During Testing:</h4>
                <ul className="text-sm text-red-700 dark:text-elec-yellow space-y-1">
                  <li>• Use GS38 compliant leads</li>
                  <li>• Keep one hand in pocket when possible</li>
                  <li>• Never assume - always verify</li>
                  <li>• Report any unsafe conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Success Formula */}
        <Card className="bg-transparent border-elec-yellow/30">
          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-elec-yellow mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Success Formula
            </h2>
            
            <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/30 rounded-lg p-4 sm:p-6">
              <p className="text-center text-base sm:text-lg font-bold text-white mb-6">
                If apprentices memorise this sheet, they'll walk into fault-finding with a clear plan:
              </p>
              
              {/* Mobile-First Vertical Layout */}
              <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                <div className="w-full max-w-xs sm:max-w-sm bg-elec-yellow/20 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                  <span className="font-semibold text-white text-sm sm:text-base">1. Diagnose</span>
                </div>
                
                <div className="text-elec-yellow font-bold text-xl">↓</div>
                
                <div className="w-full max-w-xs sm:max-w-sm bg-elec-yellow/20 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                  <span className="font-semibold text-white text-sm sm:text-base">2. State Rectification</span>
                </div>
                
                <div className="text-elec-yellow font-bold text-xl">↓</div>
                
                <div className="w-full max-w-xs sm:max-w-sm bg-elec-yellow/20 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                  <span className="font-semibold text-white text-sm sm:text-base">3. State Re-Test</span>
                </div>
                
                <div className="text-elec-yellow font-bold text-xl">↓</div>
                
                <div className="w-full max-w-xs sm:max-w-sm bg-elec-yellow/20 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                  <span className="font-semibold text-white text-sm sm:text-base">4. Done ✓</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
          {/* Previous Section */}
          <Button variant="outline" className="w-full h-auto p-4 bg-[#1a1a1a] border-border text-white hover:bg-[#1a1a1a]/80" asChild>
            <Link to="../section5">
              <div className="flex items-center justify-center gap-3">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-base font-medium">Previous: Re-testing Procedures</span>
              </div>
            </Link>
          </Button>

          {/* Back to Module */}
          <Button variant="outline" className="w-full h-auto p-4 bg-elec-yellow border-elec-yellow text-black hover:bg-elec-yellow/80" asChild>
            <Link to="..">
              <div className="flex items-center justify-center gap-3">
                <BookOpen className="w-5 h-5" />
                <span className="text-base font-medium">Back to Module 5 Overview</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AM2Module5Section6;