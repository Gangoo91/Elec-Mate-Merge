import { FileText, Zap, Search, Target, AlertTriangle, CheckCircle, BookOpen, Wrench, Settings, Clock } from "lucide-react";
import { AM2SectionLayout } from "@/components/apprentice-courses/AM2SectionLayout";
import { AM2HeroSection } from "@/components/apprentice-courses/AM2HeroSection";
import { AM2ContentCard } from "@/components/apprentice-courses/AM2ContentCard";
import { AM2NavigationFooter } from "@/components/apprentice-courses/AM2NavigationFooter";
import { AM2CriticalWarning } from "@/components/apprentice-courses/AM2CriticalWarning";
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
      reTest: "Continuity test of conductors"
    },
    {
      type: "Short Circuit (L-N)",
      symptom: "MCB trips instantly, IR test ~0 MOhms",
      rectification: "Locate and re-terminate damaged conductor at point of fault",
      reTest: "Insulation resistance (L-N, L-E)"
    },
    {
      type: "Earth Fault (L-E)",
      symptom: "RCD trips, low IR between line and earth",
      rectification: "Remove line contact with earth (e.g. re-terminate in DB)",
      reTest: "IR test (L-E) + RCD test"
    },
    {
      type: "High Resistance Joint",
      symptom: "Circuit works but Zs too high, heating at accessory",
      rectification: "Remake/retighten loose termination at accessory/socket",
      reTest: "Earth fault loop impedance (Zs)"
    },
    {
      type: "Polarity Reversed",
      symptom: "Light permanently on, socket polarity reversed",
      rectification: "Swap line and neutral into correct terminals (at socket or switch)",
      reTest: "Polarity test at point of use"
    },
    {
      type: "Faulty Accessory",
      symptom: "One outlet doesn't work, visual damage",
      rectification: "Replace faulty accessory with new one",
      reTest: "Functional test + polarity"
    },
    {
      type: "Open CPC",
      symptom: "CPC continuity failed, no earth at accessory",
      rectification: "Reconnect CPC in earth bar/socket back box",
      reTest: "Continuity test CPC + Zs"
    },
    {
      type: "Motor Circuit Fault",
      symptom: "Starter not working, no overload protection",
      rectification: "Correct start/stop wiring / set overload correctly / re-terminate SWA",
      reTest: "Functional start/stop test + continuity"
    }
  ];

  const goldenRules = [
    "Never guess - always test logically and record type + location + rectification",
    "Phrase properly: Action + Location + Re-Test",
    "Example: \"Reconnect CPC at socket outlet and re-test continuity and Zs\"",
    "Always state re-testing - forgetting this is one of the top reasons candidates lose marks",
    "Work safe - prove dead before fault-finding, even in assessment conditions",
    "Aim for 3 out of 4 faults correct - this is usually the pass requirement"
  ];

  const quickTestingGuide = [
    { fault: "Open circuits", test: "Continuity" },
    { fault: "Short circuits / Earth faults", test: "Insulation resistance" },
    { fault: "Polarity errors", test: "Polarity test at accessories" },
    { fault: "High resistance", test: "Zs test (compare to BS 7671 limits)" },
    { fault: "Functional errors", test: "Switch, RCD, or motor control tests" }
  ];

  return (
    <AM2SectionLayout
      backHref="/apprentice-courses/am2/module5"
      breadcrumbs={[
        { label: "AM2", href: "/apprentice-courses/am2" },
        { label: "Module 5", href: "/apprentice-courses/am2/module5" },
        { label: "Section 6" }
      ]}
    >
      <AM2HeroSection
        icon={FileText}
        title="AM2 Fault Diagnosis & Rectification"
        description="Essential reference guide for AM2 fault-finding procedures. Keep this handy during your preparation and assessment."
        badge="Quick Reference Sheet"
      />

      <div className="space-y-6">
        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AM2ContentCard>
            <div className="text-center">
              <Search className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <h3 className="text-ios-headline font-semibold text-white">8 Common Faults</h3>
              <p className="text-ios-footnote text-white/70 mt-1">Complete reference table</p>
            </div>
          </AM2ContentCard>
          <AM2ContentCard>
            <div className="text-center">
              <Target className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <h3 className="text-ios-headline font-semibold text-white">Golden Rules</h3>
              <p className="text-ios-footnote text-white/70 mt-1">Never lose marks again</p>
            </div>
          </AM2ContentCard>
          <AM2ContentCard>
            <div className="text-center">
              <Zap className="w-8 h-8 text-elec-yellow mx-auto mb-2" />
              <h3 className="text-ios-headline font-semibold text-white">Quick Testing</h3>
              <p className="text-ios-footnote text-white/70 mt-1">Right test for each fault</p>
            </div>
          </AM2ContentCard>
        </div>

        {/* Fault Types Table */}
        <AM2ContentCard
          title="Fault Types, Rectification & Re-Test"
          icon={Wrench}
        >
          <div className="space-y-4">
            {faultTypes.map((fault, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-ios-footnote font-medium bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30">
                    {fault.type}
                  </span>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-ios-callout font-bold text-white">{index + 1}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div>
                    <h4 className="text-ios-callout font-semibold text-white mb-1">Typical Symptom</h4>
                    <p className="text-ios-footnote text-white/70">{fault.symptom}</p>
                  </div>
                  <div>
                    <h4 className="text-ios-callout font-semibold text-white mb-1">Rectification</h4>
                    <p className="text-ios-footnote text-white/70">{fault.rectification}</p>
                  </div>
                  <div>
                    <h4 className="text-ios-callout font-semibold text-white mb-1">Re-Test Required</h4>
                    <p className="text-ios-footnote text-elec-yellow font-medium">{fault.reTest}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AM2ContentCard>

        {/* Golden Rules */}
        <AM2ContentCard
          title="Golden Rules"
          icon={Target}
          accent
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goldenRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                <div className="w-6 h-6 bg-elec-yellow/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-ios-footnote font-bold text-elec-yellow">{index + 1}</span>
                </div>
                <p className="text-ios-callout text-white/80 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </AM2ContentCard>

        {/* Essential Test Equipment */}
        <AM2ContentCard
          title="Essential Test Equipment"
          icon={Settings}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-callout font-semibold text-white mb-2">Continuity Tester</h4>
              <p className="text-ios-footnote text-white/70">200mA test current for conductor continuity</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-callout font-semibold text-white mb-2">Insulation Tester</h4>
              <p className="text-ios-footnote text-white/70">500V DC for IR between conductors</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-callout font-semibold text-white mb-2">Loop Tester</h4>
              <p className="text-ios-footnote text-white/70">Zs measurements for earth faults</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-callout font-semibold text-white mb-2">RCD Tester</h4>
              <p className="text-ios-footnote text-white/70">Verify RCD operation after earth faults</p>
            </div>
          </div>
        </AM2ContentCard>

        {/* Time Management */}
        <AM2ContentCard
          title="AM2 Time Management"
          icon={Clock}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-ios-headline font-semibold text-white">Typical Time Allocation:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Initial circuit inspection: 5-10 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Fault diagnosis per circuit: 15-20 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Rectification: 10-15 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Re-testing and documentation: 5-10 minutes</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-ios-headline font-semibold text-white">Pro Tips:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Start with obvious visual checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Use logical sequence: dead tests first</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Document as you work, not at the end</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-callout text-white/80">Don't spend too long on one fault</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2ContentCard>

        {/* Quick Testing Guide */}
        <AM2ContentCard
          title="Quick Testing Guide"
          icon={Zap}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickTestingGuide.map((item, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                  <h4 className="text-ios-callout font-semibold text-white">{item.fault}</h4>
                </div>
                <p className="text-ios-footnote text-white/70">→ {item.test}</p>
              </div>
            ))}
          </div>
        </AM2ContentCard>

        {/* Safety Reminders */}
        <AM2CriticalWarning title="Safety First - Always Remember">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">Before Any Work:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Prove circuit is dead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Lock off and tag supply</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Use appropriate PPE</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Check test equipment works</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h4 className="text-ios-headline font-semibold text-white mb-2">During Testing:</h4>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Use GS38 compliant leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Keep one hand in pocket when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Never assume - always verify</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span className="text-ios-footnote text-white/70">Report any unsafe conditions</span>
                </li>
              </ul>
            </div>
          </div>
        </AM2CriticalWarning>

        {/* Success Formula */}
        <AM2ContentCard
          title="Success Formula"
          icon={CheckCircle}
          accent
        >
          <div className="space-y-6">
            <p className="text-ios-body text-white/80 text-center font-medium leading-relaxed">
              If apprentices memorise this sheet, they'll walk into fault-finding with a clear plan:
            </p>

            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="w-full max-w-xs sm:max-w-sm bg-white/5 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                <span className="text-ios-headline font-semibold text-white">1. Diagnose</span>
              </div>

              <div className="text-elec-yellow font-bold text-xl">|</div>

              <div className="w-full max-w-xs sm:max-w-sm bg-white/5 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                <span className="text-ios-headline font-semibold text-white">2. State Rectification</span>
              </div>

              <div className="text-elec-yellow font-bold text-xl">|</div>

              <div className="w-full max-w-xs sm:max-w-sm bg-white/5 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                <span className="text-ios-headline font-semibold text-white">3. State Re-Test</span>
              </div>

              <div className="text-elec-yellow font-bold text-xl">|</div>

              <div className="w-full max-w-xs sm:max-w-sm bg-elec-yellow/20 border border-elec-yellow/30 px-4 py-3 rounded-xl text-center">
                <span className="text-ios-headline font-semibold text-elec-yellow">4. Done</span>
              </div>
            </div>
          </div>
        </AM2ContentCard>

        {/* Module Summary */}
        <AM2ContentCard
          title="Module 5 Complete"
          icon={BookOpen}
        >
          <p className="text-ios-body text-white/80 leading-relaxed">
            You've completed Module 5: Fault Diagnosis and Rectification. This quick reference sheet summarises all the key concepts from the module. Use it as a study aid and refer back to it before your assessment.
          </p>
        </AM2ContentCard>

        {/* Navigation */}
        <AM2NavigationFooter
          previousHref="../section5"
          previousLabel="Re-testing Procedures"
          nextHref="/apprentice-courses/am2/module6"
          nextLabel="Module 6: Documentation"
          currentSection={6}
          totalSections={6}
        />
      </div>
    </AM2SectionLayout>
  );
};

export default AM2Module5Section6;
