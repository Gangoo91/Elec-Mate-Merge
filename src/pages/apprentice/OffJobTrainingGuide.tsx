
import { useState } from "react";
import { SmartBackButton } from "@/components/ui/smart-back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  Camera,
  BookOpen,
  Target,
  AlertTriangle,
  Calculator,
  Calendar,
  Lightbulb,
  Smartphone,
  FolderOpen,
  PenLine,
  Image,
  Award,
  Timer,
  ClipboardCheck,
  Zap,
  Bell,
  HelpCircle,
  BarChart3,
  Star
} from "lucide-react";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";

const OffJobTrainingGuide = () => {
  const [activeTab, setActiveTab] = useState("what-counts");
  const isMobile = useIsMobile();

  const validActivities = [
    { activity: "College/Training Provider Sessions", description: "All classroom time including theory and practical", hours: "All hours", icon: BookOpen },
    { activity: "Online Learning Modules", description: "Structured e-learning courses and assessments", hours: "Active learning time", icon: Smartphone },
    { activity: "Self-Study with Course Materials", description: "Revision using textbooks, handouts, past papers", hours: "Documented study time", icon: FileText },
    { activity: "Practice Exams & Mock Tests", description: "Exam preparation and timed practice papers", hours: "Time spent testing", icon: ClipboardCheck },
    { activity: "Webinars & Video Tutorials", description: "Educational content from recognised providers", hours: "Duration of content", icon: Camera },
    { activity: "Reading Regulations/Standards", description: "BS 7671, IET Guidance Notes, On-Site Guide", hours: "Study time with notes", icon: BookOpen },
    { activity: "Industry Conferences/Events", description: "Trade shows, manufacturer training, CPD events", hours: "Event duration", icon: Star },
    { activity: "Mentor-led Training Sessions", description: "Structured learning with your workplace mentor", hours: "Planned sessions only", icon: Target }
  ];

  const invalidActivities = [
    { activity: "Watching Random YouTube Videos", reason: "Not structured or recognised learning", icon: XCircle },
    { activity: "General Site Work", reason: "This is on-the-job training (the 80%)", icon: XCircle },
    { activity: "Travel Time to College", reason: "Transport doesn't count as learning", icon: XCircle },
    { activity: "Lunch Breaks at College", reason: "Break time isn't learning time", icon: XCircle },
    { activity: "Shadowing Without Structure", reason: "Must have clear learning objectives", icon: XCircle },
    { activity: "Work Experience Placements", reason: "Already counts as on-the-job", icon: XCircle }
  ];

  const sampleLogEntries = [
    {
      date: "15/03/2024",
      activity: "Level 3 Electrical Installation - Unit 305",
      provider: "City College",
      hours: "6.5",
      description: "AC Theory module covering: RCD operating principles, earth fault loop impedance, and practical circuit installation workshop. Completed Unit 305 assignment.",
      evidence: "College attendance register, Module completion certificate, Assignment submission screenshot",
      category: "College"
    },
    {
      date: "18/03/2024",
      activity: "BS 7671 18th Edition Revision",
      provider: "Self-Study",
      hours: "2.0",
      description: "Studied Part 4: Protection for Safety, focusing on Chapter 41 (Protection against electric shock). Completed 20 practice questions on automatic disconnection times.",
      evidence: "Annotated On-Site Guide pages (photo), Practice test results (screenshot), Study notes",
      category: "Self-Study"
    },
    {
      date: "20/03/2024",
      activity: "Cable Sizing & Voltage Drop Webinar",
      provider: "Electrical Training Ltd",
      hours: "1.5",
      description: "Live CPD webinar covering cable selection methods, voltage drop calculations using mV/A/m method, and correction factors for grouping and thermal insulation.",
      evidence: "Webinar completion certificate (PDF), Completed worksheet, Notes from Q&A session",
      category: "Webinar"
    },
    {
      date: "22/03/2024",
      activity: "EV Charging Installation Training",
      provider: "Manufacturer Training",
      hours: "4.0",
      description: "Product training on Mode 3 EV charger installation, covering: electrical requirements, load management, and compliance with IET Code of Practice.",
      evidence: "Training certificate, Product knowledge assessment score, Installation checklist",
      category: "Training"
    }
  ];

  const evidenceTypes = [
    {
      type: "Screenshots & Photos",
      examples: [
        "Completed online module screens",
        "Quiz/test results",
        "Annotated textbook pages",
        "Whiteboard notes from training"
      ],
      tips: "Include date/time stamp where possible",
      icon: Image
    },
    {
      type: "Certificates & Documents",
      examples: [
        "Course completion certificates",
        "CPD certificates",
        "Attendance records",
        "Manufacturer training certificates"
      ],
      tips: "Save as PDF with clear file names",
      icon: Award
    },
    {
      type: "Written Records",
      examples: [
        "Study notes (handwritten or typed)",
        "Learning journals/reflections",
        "Assignment submissions",
        "Project documentation"
      ],
      tips: "Date all written records clearly",
      icon: PenLine
    },
    {
      type: "Progress Tracking",
      examples: [
        "E-learning platform progress",
        "App activity logs",
        "Assessment tracker updates",
        "Portfolio sign-off sheets"
      ],
      tips: "Regular updates show consistency",
      icon: BarChart3
    }
  ];

  const loggingTips = [
    {
      tip: "Log hours weekly, not monthly",
      detail: "It's much easier to remember details when they're fresh. Set a weekly reminder.",
      priority: "high"
    },
    {
      tip: "Be specific about what you learned",
      detail: "Instead of 'studied wiring regs', write 'Chapter 52 cable selection, focusing on grouping factors'",
      priority: "high"
    },
    {
      tip: "Keep evidence for everything",
      detail: "Screenshot completed modules, photograph notes, save certificates. Better to have too much than too little.",
      priority: "high"
    },
    {
      tip: "Use consistent formatting",
      detail: "Same date format, similar description style. Makes your log look professional and is easier to review.",
      priority: "medium"
    },
    {
      tip: "Round to nearest 30 minutes",
      detail: "1.5 hours, 2.0 hours, etc. More accurate than exact minutes and easier to total.",
      priority: "medium"
    },
    {
      tip: "Link learning to workplace",
      detail: "Note how college learning connects to site work. Shows application of knowledge.",
      priority: "medium"
    }
  ];

  const hoursCalculation = {
    weeklyHours: 37.5,
    ojtPercentage: 20,
    weeklyOJT: 7.5,
    monthlyOJT: 32.5,
    yearlyOJT: 390,
    totalApprenticeship: 1560
  };

  const weeklyTemplate = [
    { day: "College Day", hours: 6.5, type: "formal" },
    { day: "Self-Study", hours: 1.0, type: "informal" },
    { day: "Total", hours: 7.5, type: "total" }
  ];

  const renderWhatCountsTab = () => (
    <div className="space-y-6">
      {/* 20% Requirement Explainer */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-orange-500/5">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-3 bg-elec-yellow/20 rounded-xl flex-shrink-0">
              <Calculator className="h-8 w-8 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">The 20% Off-the-Job Rule</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-4">
                As an apprentice, at least <span className="text-elec-yellow font-semibold">20% of your working hours</span> must
                be spent on off-the-job training. This is learning that happens away from your normal work duties,
                even if it takes place at your workplace.
              </p>

              {/* Hours Calculator */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Per Week", value: `${hoursCalculation.weeklyOJT} hrs`, sublabel: "~1 college day" },
                  { label: "Per Month", value: `${hoursCalculation.monthlyOJT} hrs`, sublabel: "Average" },
                  { label: "Per Year", value: `${hoursCalculation.yearlyOJT} hrs`, sublabel: "Minimum" },
                  { label: "Total (4yr)", value: `${hoursCalculation.totalApprenticeship} hrs`, sublabel: "Required" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center p-3 bg-white/5 border border-white/10 rounded-lg">
                    <div className="text-xl font-bold text-white">{item.value}</div>
                    <div className="text-elec-yellow text-xs">{item.label}</div>
                    <div className="text-white/60 text-xs">{item.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valid Activities */}
      <Card className="border-green-500/20 bg-white/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            What COUNTS as Off-the-Job Training
          </CardTitle>
          <p className="text-white/70 text-sm">These activities can all be logged towards your 20%</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {validActivities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg hover:bg-green-500/10 transition-colors">
                <div className="p-2 bg-green-500/20 rounded-lg flex-shrink-0">
                  <item.icon className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-white text-sm">{item.activity}</h4>
                    <Badge variant="outline" className="text-green-400 border-green-400/30 text-xs flex-shrink-0">
                      Valid
                    </Badge>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{item.description}</p>
                  <p className="text-green-400/80 text-xs mt-1">Log: {item.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invalid Activities */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            What DOESN'T Count
          </CardTitle>
          <p className="text-white/70 text-sm">Don't log these - they won't be accepted</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {invalidActivities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <item.icon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white text-sm">{item.activity}</h4>
                  <p className="text-white/60 text-xs mt-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Quick Rule of Thumb
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-white/80 text-sm">
              Ask yourself: <span className="text-blue-400 font-medium">"Am I learning something new that relates to my apprenticeship?"</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { q: "Is it structured learning?", icon: Target },
                { q: "Can I provide evidence?", icon: FileText },
                { q: "Does it relate to my qualification?", icon: Award }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <item.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{item.q}</span>
                </div>
              ))}
            </div>
            <p className="text-white/60 text-sm">If yes to all three, it probably counts!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderHowToLogTab = () => (
    <div className="space-y-6">
      {/* Sample Log Entries */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Sample Log Entries
          </CardTitle>
          <p className="text-white/70 text-sm">
            Copy this format for professional, complete entries
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleLogEntries.map((entry, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-xl overflow-hidden">
                <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                      {entry.category}
                    </Badge>
                    <span className="text-white font-medium text-sm">{entry.date}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">
                    {entry.hours} hrs
                  </Badge>
                </div>

                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-elec-yellow text-xs font-medium">Activity</span>
                      <p className="text-white text-sm">{entry.activity}</p>
                    </div>
                    <div>
                      <span className="text-elec-yellow text-xs font-medium">Provider</span>
                      <p className="text-white text-sm">{entry.provider}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-elec-yellow text-xs font-medium">Description</span>
                    <p className="text-white/80 text-sm">{entry.description}</p>
                  </div>

                  <div>
                    <span className="text-elec-yellow text-xs font-medium">Evidence</span>
                    <p className="text-white/70 text-sm">{entry.evidence}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typical Week Template */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Typical Weekly Template
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {weeklyTemplate.map((item, idx) => (
                <div key={idx} className={`text-center p-4 rounded-lg ${
                  item.type === 'total' ? 'bg-elec-yellow/20 border border-elec-yellow/30' :
                  item.type === 'formal' ? 'bg-blue-500/10 border border-blue-500/20' :
                  'bg-purple-500/10 border border-purple-500/20'
                }`}>
                  <div className="text-2xl font-bold text-white">{item.hours} hrs</div>
                  <div className={`text-xs ${
                    item.type === 'total' ? 'text-elec-yellow' :
                    item.type === 'formal' ? 'text-blue-400' : 'text-purple-400'
                  }`}>{item.day}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Weekly Breakdown:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-3 w-3 text-blue-400" />
                  <span><strong className="text-blue-400">College day:</strong> 6.5 hours (full day minus lunch)</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-3 w-3 text-purple-400" />
                  <span><strong className="text-purple-400">Self-study:</strong> 1 hour (evening/weekend revision)</span>
                </li>
                <li className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="h-3 w-3 text-elec-yellow" />
                  <span><strong className="text-elec-yellow">Total:</strong> 7.5 hours = 20% of 37.5 hour week</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entry Format Guide */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <PenLine className="h-5 w-5" />
            How to Write Good Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                field: "Activity Title",
                bad: "Studied wiring",
                good: "BS 7671 18th Edition - Part 4 Protection for Safety",
                tip: "Be specific about what you studied"
              },
              {
                field: "Description",
                bad: "Read some regulations",
                good: "Covered Chapter 41, focusing on ADS for TN systems. Completed 15 calculation questions on Zs values.",
                tip: "Include topics, chapters, exercises completed"
              },
              {
                field: "Evidence",
                bad: "Notes",
                good: "Photo of annotated On-Site Guide p.83-87, Screenshot of test score (85%)",
                tip: "Be specific about what evidence you have"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3">{item.field}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                  <div className="p-2 bg-red-500/10 border border-red-500/20 rounded">
                    <span className="text-red-400 text-xs font-medium">❌ Don't write:</span>
                    <p className="text-white/70 text-sm mt-1">"{item.bad}"</p>
                  </div>
                  <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">
                    <span className="text-green-400 text-xs font-medium">✓ Write this:</span>
                    <p className="text-white/90 text-sm mt-1">"{item.good}"</p>
                  </div>
                </div>
                <p className="text-blue-400 text-xs">💡 {item.tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEvidenceTab = () => (
    <div className="space-y-6">
      {/* Evidence Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {evidenceTypes.map((type, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-white/5 hover:border-elec-yellow/40 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-elec-yellow/20 rounded-lg">
                  <type.icon className="h-5 w-5 text-elec-yellow" />
                </div>
                <span className="text-white">{type.type}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-3">
                {type.examples.map((example, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                    <span className="text-white/80">{example}</span>
                  </li>
                ))}
              </ul>
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="text-blue-400 text-xs">💡 Tip: {type.tips}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quality Checklist */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Evidence Quality Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Is the date clearly visible or recorded?",
              "Does it show your name or login?",
              "Is it readable and clear quality?",
              "Does it match your log entry description?",
              "Is it saved in an accessible format?",
              "Have you backed it up?"
            ].map((check, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="w-5 h-5 border-2 border-green-400 rounded flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                </div>
                <span className="text-white/90 text-sm">{check}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Organisation Tips */}
      <Card className="border-purple-500/20 bg-purple-500/5">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Organising Your Evidence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Recommended Folder Structure:</h4>
              <div className="font-mono text-sm text-white/80 space-y-1 bg-white/5 border border-white/10 p-3 rounded">
                <p>📁 OJT Evidence</p>
                <p className="pl-4">📁 2024</p>
                <p className="pl-8">📁 March</p>
                <p className="pl-12">📄 15-03-24_College_Unit305.pdf</p>
                <p className="pl-12">📄 18-03-24_SelfStudy_Part4.jpg</p>
                <p className="pl-12">📄 20-03-24_Webinar_CableSizing.pdf</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { tip: "Use date prefixes", detail: "DD-MM-YY format sorts chronologically" },
                { tip: "Short descriptive names", detail: "Topic_Activity format is clear" },
                { tip: "Cloud backup", detail: "Use Google Drive, OneDrive, or iCloud" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <h5 className="font-semibold text-purple-400 text-sm">{item.tip}</h5>
                  <p className="text-white/70 text-xs mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTipsTab = () => (
    <div className="space-y-6">
      {/* Logging Tips */}
      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Essential Logging Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loggingTips.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                item.priority === 'high' ? 'bg-elec-yellow/5 border-elec-yellow/20' : 'bg-white/5 border-white/10'
              }`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg flex-shrink-0 ${
                    item.priority === 'high' ? 'bg-elec-yellow/20' : 'bg-white/10'
                  }`}>
                    <CheckCircle className={`h-4 w-4 ${
                      item.priority === 'high' ? 'text-elec-yellow' : 'text-white/70'
                    }`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-sm ${
                      item.priority === 'high' ? 'text-elec-yellow' : 'text-white'
                    }`}>{item.tip}</h4>
                    <p className="text-white/70 text-sm mt-1">{item.detail}</p>
                  </div>
                  {item.priority === 'high' && (
                    <Badge className="bg-elec-yellow/20 text-elec-yellow text-xs flex-shrink-0">
                      Priority
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* This App Counts */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/15 via-green-500/10 to-emerald-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Using This App for OJT
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/80 text-sm">
            Time spent learning in this app <span className="text-green-400 font-semibold">counts as off-the-job training!</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
              <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Study Centre</h4>
              <p className="text-white/70 text-xs mt-1">
                All learning modules, practice questions, and revision materials
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
              <Calculator className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Calculators</h4>
              <p className="text-white/70 text-xs mt-1">
                Working through calculation examples and exercises
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
              <FileText className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white text-sm">Guidance Pages</h4>
              <p className="text-white/70 text-xs mt-1">
                Reading regulations guidance and industry information
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-2">How to Log App Usage:</h4>
            <p className="text-white/80 text-sm italic">
              "Self-directed learning using Elec-Mate apprenticeship platform - studied [specific topic],
              completed practice questions on [subject]"
            </p>
            <p className="text-green-400 text-xs mt-2">
              Evidence: Screenshots of completed modules, progress tracking, or notes taken during session
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { mistake: "Leaving logging until end of month", fix: "Log weekly, set a reminder" },
              { mistake: "Vague descriptions", fix: "Be specific about topics covered" },
              { mistake: "No evidence saved", fix: "Screenshot/photograph everything" },
              { mistake: "Forgetting self-study time", fix: "Include revision and homework" },
              { mistake: "Rounding up hours too much", fix: "Be honest, round to nearest 30 mins" },
              { mistake: "Not backing up evidence", fix: "Use cloud storage" }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <XCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/90 text-sm">{item.mistake}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-green-400 text-sm">{item.fix}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Set Up Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 text-sm mb-4">
            Set weekly reminders to keep your OJT log up to date:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { when: "Friday PM", action: "Log this week's OJT hours" },
              { when: "After college", action: "Save evidence immediately" },
              { when: "Monthly", action: "Check hours running total" }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg text-center">
                <div className="text-blue-400 font-semibold text-sm">{item.when}</div>
                <p className="text-white/70 text-xs mt-1">{item.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Mobile Accordion Layout
  const renderMobileContent = () => (
    <MobileAccordion type="single" collapsible defaultValue="what-counts" className="w-full">
      <MobileAccordionItem value="what-counts">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            What Counts
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderWhatCountsTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="how-to-log">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <PenLine className="h-5 w-5" />
            How to Log
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderHowToLogTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="evidence">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Evidence Types
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderEvidenceTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>

      <MobileAccordionItem value="tips">
        <MobileAccordionTrigger className="text-elec-yellow">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Tips & Tools
          </div>
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          {renderTipsTab()}
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <div className="p-3 bg-elec-yellow/20 rounded-2xl mb-4">
          <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3">
          Off-the-Job Training Guide
        </h1>
        <p className="text-white/80 max-w-2xl mb-4 text-sm sm:text-base">
          Everything you need to know about logging your 20% off-the-job training hours correctly
        </p>
        <SmartBackButton />
      </div>

      {/* Key Stat Banner */}
      <Card className="border-elec-yellow/30 bg-gradient-to-r from-elec-yellow/20 to-elec-yellow/5">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-full">
                <Timer className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <h3 className="font-bold text-elec-yellow">20% Requirement</h3>
                <p className="text-white/80 text-sm">
                  Minimum 7.5 hours per week of structured learning
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1,560</div>
                <div className="text-white/60 text-xs">Total hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-white/60 text-xs">Years</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Tabs / Mobile Accordion */}
      {isMobile ? (
        renderMobileContent()
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/5 border border-white/10">
            <TabsTrigger value="what-counts" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">What Counts</span>
            </TabsTrigger>
            <TabsTrigger value="how-to-log" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <PenLine className="h-4 w-4" />
              <span className="hidden sm:inline">How to Log</span>
            </TabsTrigger>
            <TabsTrigger value="evidence" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Evidence</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark py-3 gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Tips</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="what-counts" className="mt-6">
            {renderWhatCountsTab()}
          </TabsContent>

          <TabsContent value="how-to-log" className="mt-6">
            {renderHowToLogTab()}
          </TabsContent>

          <TabsContent value="evidence" className="mt-6">
            {renderEvidenceTab()}
          </TabsContent>

          <TabsContent value="tips" className="mt-6">
            {renderTipsTab()}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default OffJobTrainingGuide;
