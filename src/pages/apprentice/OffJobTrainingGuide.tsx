
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, CheckCircle, Download } from "lucide-react";

const OffJobTrainingGuide = () => {
  const whatCounts = [
    { activity: "College/Training Provider Sessions", hours: "All classroom time", valid: true },
    { activity: "Online Learning Modules", hours: "Active learning time", valid: true },
    { activity: "Self-Study with Course Materials", hours: "Structured revision", valid: true },
    { activity: "Practice Exams & Mock Tests", hours: "Time spent testing", valid: true },
    { activity: "Webinars & Video Tutorials", hours: "Educational content", valid: true },
    { activity: "Reading Regulations/Standards", hours: "Study time only", valid: true },
    { activity: "Watching YouTube Videos", hours: "Not structured learning", valid: false },
    { activity: "General Site Work", hours: "On-the-job experience", valid: false },
    { activity: "Travel Time to College", hours: "Transport time", valid: false }
  ];

  const sampleLogEntries = [
    {
      date: "15/03/2024",
      activity: "Level 3 Electrical Installation",
      provider: "Local College",
      hours: "6.5",
      description: "AC Theory, RCD testing procedures, and practical circuit installation",
      evidence: "College attendance record, module completion certificate"
    },
    {
      date: "18/03/2024", 
      activity: "18th Edition Revision",
      provider: "Self-study",
      hours: "2.0",
      description: "Studied Part 4 Protection for Safety, completed practice questions on earth fault protection",
      evidence: "Practice test results screenshot, study notes"
    },
    {
      date: "20/03/2024",
      activity: "Cable Sizing Webinar",
      provider: "Industry Training Ltd",
      hours: "1.5",
      description: "Live webinar on cable selection and voltage drop calculations",
      evidence: "Webinar certificate, completed worksheet"
    }
  ];

  const logginTips = [
    "Log hours weekly - don't leave it until the end of the month",
    "Be specific about what you learned, not just what you did",
    "Keep evidence for everything (certificates, screenshots, photos)",
    "Use your apprenticeship app consistently with the same format",
    "Include both formal and informal learning activities",
    "Round to the nearest 30 minutes for accuracy"
  ];

  const evidenceExamples = [
    "Screenshots of completed online modules",
    "Photos of handwritten study notes",
    "College attendance certificates",
    "Webinar completion certificates",
    "Practice exam results",
    "Photos of textbook pages with your annotations"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Off-the-Job Training Explained</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Everything you need to know about logging and managing your off-the-job learning hours
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">What Counts as Off-the-Job Training?</CardTitle>
          <p className="text-muted-foreground text-sm">
            You need 20% of your working hours as off-the-job training. Here's what counts and what doesn't:
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {whatCounts.map((item, index) => (
              <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                item.valid ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
              }`}>
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${item.valid ? 'text-green-400' : 'text-red-400'}`} />
                  <div>
                    <span className="font-medium text-white">{item.activity}</span>
                    <p className="text-sm text-muted-foreground">{item.hours}</p>
                  </div>
                </div>
                <Badge variant={item.valid ? "outline" : "destructive"} className="text-xs">
                  {item.valid ? "Valid" : "Invalid"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Sample Log Entries</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sampleLogEntries.map((entry, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-sm font-medium text-elec-yellow">Date</span>
                    <p className="text-sm text-muted-foreground">{entry.date}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-elec-yellow">Activity</span>
                    <p className="text-sm text-muted-foreground">{entry.activity}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-elec-yellow">Provider</span>
                    <p className="text-sm text-muted-foreground">{entry.provider}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-elec-yellow">Hours</span>
                    <p className="text-sm text-muted-foreground">{entry.hours}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="text-sm font-medium text-elec-yellow">Description</span>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-elec-yellow">Evidence</span>
                  <p className="text-sm text-muted-foreground">{entry.evidence}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-xl text-elec-yellow">Logging Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {logginTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-elec-yellow" />
              <CardTitle className="text-xl text-elec-yellow">Evidence Examples</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {evidenceExamples.map((example, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span className="text-sm text-muted-foreground">{example}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Matching App Usage to Off-the-Job Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">This App Counts!</h4>
              <p className="text-sm text-muted-foreground">
                Time spent learning in the Study Centre, using calculators, and reading guidance materials 
                all count as structured learning.
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">How to Log It</h4>
              <p className="text-sm text-muted-foreground">
                "Self-directed learning using apprenticeship platform - studied [specific topic], 
                completed practice questions"
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-white mb-2">Evidence</h4>
              <p className="text-sm text-muted-foreground">
                Screenshots of completed modules, progress tracking, or notes you've taken during sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffJobTrainingGuide;
