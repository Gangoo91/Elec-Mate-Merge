
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Phone, MessageCircle, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const MentalHealthSupport = () => {
  const crisisResources = [
    {
      service: "Samaritans",
      contact: "116 123",
      description: "Free 24/7 emotional support",
      availability: "24/7"
    },
    {
      service: "Campaign Against Living Miserably (CALM)",
      contact: "0800 58 58 58",
      description: "Support for men aged 15-35",
      availability: "5pm-midnight daily"
    },
    {
      service: "Mind Info Line",
      contact: "0300 123 3393",
      description: "Mental health information and support",
      availability: "Mon-Fri 9am-6pm"
    }
  ];

  const apprenticeStressors = [
    {
      stressor: "Financial Pressure",
      symptoms: ["Worrying about low apprentice wages", "Struggling to afford tools/transport"],
      solutions: ["Create a budget", "Look into apprentice grants", "Discuss with employer about advance payments"]
    },
    {
      stressor: "College Workload",
      symptoms: ["Feeling overwhelmed by assignments", "Struggling to balance work and study"],
      solutions: ["Create study schedule", "Form study groups", "Ask tutors for extra support"]
    },
    {
      stressor: "Workplace Integration",
      symptoms: ["Feeling like an outsider", "Imposter syndrome", "Fear of making mistakes"],
      solutions: ["Remember everyone was new once", "Ask questions openly", "Find a workplace buddy"]
    },
    {
      stressor: "Future Uncertainty",
      symptoms: ["Doubting career choice", "Worried about job prospects after apprenticeship"],
      solutions: ["Talk to qualified electricians", "Research career paths", "Focus on current learning"]
    }
  ];

  const copingStrategies = [
    {
      strategy: "Time Management",
      techniques: [
        "Use calendar apps to track college and work commitments",
        "Set realistic daily goals",
        "Take regular breaks during study sessions",
        "Prioritise tasks by importance and deadline"
      ]
    },
    {
      strategy: "Building Confidence",
      techniques: [
        "Keep a daily achievement log",
        "Celebrate small wins",
        "Ask for feedback regularly",
        "Practice new skills in a safe environment"
      ]
    },
    {
      strategy: "Social Support",
      techniques: [
        "Connect with other apprentices",
        "Maintain friendships outside work",
        "Join apprentice online communities",
        "Talk to family about your experiences"
      ]
    }
  ];

  const warningSignsData = [
    {
      category: "Physical Signs",
      signs: ["Persistent fatigue", "Changes in appetite", "Sleep problems", "Frequent headaches"]
    },
    {
      category: "Emotional Signs", 
      signs: ["Feeling hopeless", "Increased irritability", "Loss of motivation", "Anxiety about work/college"]
    },
    {
      category: "Behavioural Signs",
      signs: ["Avoiding social situations", "Procrastinating on college work", "Increased absence", "Substance use"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Crisis Support - Get Help Now
          </CardTitle>
          <p className="text-sm text-muted-foreground">If you're in crisis, reach out immediately</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {crisisResources.map((resource, index) => (
              <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-red-500/20">
                <h4 className="font-medium text-white mb-2">{resource.service}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-400" />
                    <span className="text-lg font-bold text-red-400">{resource.contact}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                    {resource.availability}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
            <p className="text-sm text-red-300 text-center">
              <strong>Emergency:</strong> If you're in immediate danger, call 999 or go to your nearest A&E
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/30 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Common Apprentice Mental Health Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apprenticeStressors.map((item, index) => (
              <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-white mb-3">{item.stressor}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-orange-400 mb-2">Common Symptoms:</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {item.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-orange-400 mt-1">•</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-green-400 mb-2">Helpful Solutions:</h5>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      {item.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Healthy Coping Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {copingStrategies.map((strategy, index) => (
              <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-blue-500/20">
                <h4 className="font-medium text-white mb-3">{strategy.strategy}</h4>
                <ul className="space-y-2">
                  {strategy.techniques.map((technique, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      {technique}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-yellow-500/30 bg-yellow-500/10">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Warning Signs to Watch For
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            If you notice these signs in yourself or others, it may be time to seek support
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {warningSignsData.map((category, index) => (
              <div key={index} className="p-4 bg-elec-gray/50 rounded-lg border border-yellow-500/20">
                <h4 className="font-medium text-white mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.signs.map((sign, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Additional Mental Health Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-white">ElecMate Mental Health Hub</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Access our comprehensive mental health resources designed specifically for electrical apprentices
              </p>
              <Link to="/apprentice/mental-health">
                <Button className="w-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-black">
                  Visit Mental Health Hub
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-white">Professional Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• GP referral for counselling services</p>
                <p>• Employee Assistance Programmes (EAP)</p>
                <p>• ACAS helpline for workplace issues</p>
                <p>• Union support and advocacy</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthSupport;
