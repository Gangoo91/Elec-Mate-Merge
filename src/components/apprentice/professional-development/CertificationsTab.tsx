
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, Clock, PoundSterling, CheckCircle } from "lucide-react";

const CertificationsTab = () => {
  const certifications = [
    {
      title: "18th Edition IET Wiring Regulations (BS 7671)",
      provider: "Multiple providers",
      duration: "3-5 days",
      cost: "£300-500",
      priority: "Essential",
      description: "Required for all electrical work. Must be renewed every 3-5 years.",
      benefits: ["Legal requirement", "Industry standard", "Higher pay rates"],
      renewalPeriod: "3-5 years"
    },
    {
      title: "Part P Building Regulations",
      provider: "NICEIC, NAPIT, ELECSA",
      duration: "1-2 days",
      cost: "£200-400",
      priority: "Essential",
      description: "Required for domestic electrical work in England and Wales.",
      benefits: ["Domestic work compliance", "Self-certification", "Customer confidence"],
      renewalPeriod: "Annual assessment"
    },
    {
      title: "PAT Testing Certification",
      provider: "City & Guilds, EAL",
      duration: "1-2 days",
      cost: "£150-300",
      priority: "Recommended",
      description: "Portable Appliance Testing for workplace electrical safety.",
      benefits: ["Additional income stream", "Workplace safety", "Business opportunities"],
      renewalPeriod: "3 years"
    },
    {
      title: "Solar PV Installation (MCS)",
      provider: "Solar Trade Association",
      duration: "3-5 days",
      cost: "£800-1200",
      priority: "Specialist",
      description: "Microgeneration Certification Scheme for solar installations.",
      benefits: ["Growing market", "Higher earnings", "Green technology"],
      renewalPeriod: "Annual"
    },
    {
      title: "Electric Vehicle Charging Points",
      provider: "Various providers",
      duration: "2-3 days",
      cost: "£500-800",
      priority: "High Demand",
      description: "Installation and maintenance of EV charging infrastructure.",
      benefits: ["Future-proof skill", "Government backing", "High demand"],
      renewalPeriod: "3 years"
    },
    {
      title: "Emergency Lighting BS 5266",
      provider: "ILP, SLL",
      duration: "2-3 days",
      cost: "£400-600",
      priority: "Specialist",
      description: "Design, installation, and testing of emergency lighting systems.",
      benefits: ["Commercial opportunities", "Compliance requirement", "Specialist knowledge"],
      renewalPeriod: "5 years"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Essential": return "bg-red-500/20 text-red-400 border-red-500/40";
      case "High Demand": return "bg-green-500/20 text-green-400 border-green-500/40";
      case "Recommended": return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "Specialist": return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/40";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Award className="h-5 w-5" />
            Professional Certifications & Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{cert.title}</h3>
                      <Badge className={`text-xs ${getPriorityColor(cert.priority)}`}>
                        {cert.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{cert.description}</p>
                    <div className="flex items-center gap-4 text-sm text-elec-light/70">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {cert.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <PoundSterling className="h-3 w-3" />
                        {cert.cost}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-elec-yellow text-sm mb-2">Key Benefits:</h4>
                    <ul className="space-y-1">
                      {cert.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-elec-light/80 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-elec-yellow text-sm mb-2">Training Details:</h4>
                    <div className="space-y-1 text-xs text-elec-light/80">
                      <p><span className="text-elec-yellow">Provider:</span> {cert.provider}</p>
                      <p><span className="text-elec-yellow">Renewal:</span> {cert.renewalPeriod}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-500/30 bg-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Certification Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-blue-400 text-sm mb-1">Priority Order:</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Complete essential certifications first</li>
                  <li>2. Focus on high-demand specialist areas</li>
                  <li>3. Consider your career goals and interests</li>
                  <li>4. Plan for renewal schedules</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-500/10">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <PoundSterling className="h-5 w-5" />
              Investment Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-green-400 text-sm mb-1">Funding Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Employer training budgets</li>
                  <li>• Government skills vouchers</li>
                  <li>• Professional development loans</li>
                  <li>• Tax deductible as business expense</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CertificationsTab;
