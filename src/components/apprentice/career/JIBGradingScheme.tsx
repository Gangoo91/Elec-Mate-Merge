
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, BookOpen, CheckCircle } from "lucide-react";

const JIBGradingScheme = () => {
  const jibGrades = [
    {
      grade: "Apprentice",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      requirements: [
        "Enrolled on approved apprenticeship",
        "Working towards Level 3 qualification",
        "Health & Safety test passed"
      ],
      benefits: ["Apprentice minimum wage protection", "Structured training pathway", "Industry recognition"],
      duration: "Typically 4 years"
    },
    {
      grade: "Improver",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      requirements: [
        "Level 3 NVQ Diploma completed",
        "18th Edition BS 7671",
        "Working towards AM2 assessment"
      ],
      benefits: ["Higher pay rates", "More complex work opportunities", "Preparation for Gold Card"],
      duration: "1-2 years typically"
    },
    {
      grade: "Electrician (Gold Card)",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      requirements: [
        "Level 3 NVQ Diploma",
        "AM2 assessment passed",
        "18th Edition BS 7671",
        "ECS H&S test"
      ],
      benefits: ["JIB Gold Card", "Skilled worker rates", "Industry-wide recognition"],
      duration: "Career level"
    },
    {
      grade: "Approved Electrician (JIB)",
      color: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      requirements: [
        "All Electrician (Gold Card) requirements",
        "Inspection & Testing (2391)",
        "Post-qualification site experience"
      ],
      benefits: ["Enhanced recognition", "Access to JIB resources", "Higher responsibility roles"],
      duration: "Career level"
    },
    {
      grade: "Technician Electrician (JIB)",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      requirements: [
        "Approved Electrician status",
        "Advanced qualifications (2391; HNC/HND preferred)",
        "Design/inspection competence",
        "Significant experience"
      ],
      benefits: ["Technical leadership", "Complex project work", "Design and test authority", "Mentoring responsibilities"],
      duration: "Career level"
    },
    {
      grade: "Supervisor",
      color: "bg-red-500/20 text-red-400 border-red-500/30",
      requirements: [
        "Approved Electrician or Technician Electrician",
        "Management/leadership experience",
        "SSSTS/SMSTS or IOSH Managing Safely",
        "Proven track record on site"
      ],
      benefits: ["Management responsibilities", "Project oversight", "Staff development role", "Strategic planning involvement"],
      duration: "Career level"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            JIB Grading Scheme & ECS Cards
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            The Joint Industry Board (JIB) grading scheme is the UK standard for electrical worker classification and pay scales
          </p>
        </CardHeader>
        <CardContent>
          {/* Overview */}
          <Card className="border-elec-yellow/10 bg-elec-dark/30 mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-elec-yellow mb-2">What is the JIB?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                The Joint Industry Board for the Electrical Contracting Industry (JIB) is the body that sets employment, 
                training and grading standards for electricians in the UK. It operates the ECS (Electrotechnical Certification Scheme) 
                card system that provides industry-wide recognition of skills and qualifications.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-2 bg-elec-yellow/10 rounded">
                  <div className="text-elec-yellow font-semibold">Pay Protection</div>
                  <div className="text-xs">Standardised pay rates</div>
                </div>
                <div className="text-center p-2 bg-elec-yellow/10 rounded">
                  <div className="text-elec-yellow font-semibold">Industry Recognition</div>
                  <div className="text-xs">Accepted nationwide</div>
                </div>
                <div className="text-center p-2 bg-elec-yellow/10 rounded">
                  <div className="text-elec-yellow font-semibold">Career Progression</div>
                  <div className="text-xs">Clear advancement path</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* JIB Grades */}
          <div className="space-y-4">
            {jibGrades.map((grade, index) => (
              <Card key={grade.grade} className="border-elec-yellow/10 bg-elec-dark/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">{grade.grade}</CardTitle>
                    <Badge className={grade.color}>
                      Grade {index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Requirements */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        Requirements
                      </h4>
                      <div className="space-y-1">
                        {grade.requirements.map((req, idx) => (
                          <div key={idx} className="text-xs flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        Benefits
                      </h4>
                      <div className="space-y-1">
                        {grade.benefits.map((benefit, idx) => (
                          <div key={idx} className="text-xs flex items-start gap-2">
                            <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Duration
                      </h4>
                      <div className="text-sm text-muted-foreground">{grade.duration}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ECS Card Benefits */}
          <Card className="border-elec-yellow/10 bg-elec-dark/30 mt-6">
            <CardContent className="p-4">
              <h3 className="font-semibold text-elec-yellow mb-3">ECS Card Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">For Workers:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Site access across the UK</li>
                    <li>• Proof of qualifications and competence</li>
                    <li>• Health & safety training verification</li>
                    <li>• Industry-wide recognition</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">For Employers:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>• Quick verification of worker competence</li>
                    <li>• Standardised pay scales</li>
                    <li>• Reduced training costs</li>
                    <li>• Compliance with industry standards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default JIBGradingScheme;
