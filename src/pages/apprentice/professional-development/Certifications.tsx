
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Award, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Certifications = () => {
  const certifications = [
    {
      title: "18th Edition BS7671",
      provider: "City & Guilds, EAL, NICEIC",
      level: "Essential",
      duration: "3-5 days",
      cost: "£400-£600",
      description: "Current wiring regulations - mandatory for all electricians"
    },
    {
      title: "Initial Verification & Certification",
      provider: "City & Guilds 2391-10",
      level: "Advanced",
      duration: "5 days",
      cost: "£800-£1200",
      description: "Testing and inspection of new electrical installations"
    },
    {
      title: "Periodic Inspection & Testing",
      provider: "City & Guilds 2391-20",
      level: "Advanced", 
      duration: "5 days",
      cost: "£800-£1200",
      description: "EICR testing and periodic inspection qualifications"
    },
    {
      title: "PAT Testing",
      provider: "Various providers",
      level: "Intermediate",
      duration: "1-2 days",
      cost: "£200-£400",
      description: "Portable appliance testing certification"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Professional Certifications</h1>
          <p className="text-muted-foreground">Essential qualifications to advance your electrical career</p>
        </div>
        <Link to="/apprentice/professional-development" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Professional Development
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certifications.map((cert, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-elec-yellow" />
                  <div>
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <p className="text-sm text-elec-light/70">{cert.provider}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  cert.level === 'Essential' ? 'bg-red-500/10 text-red-400' :
                  cert.level === 'Advanced' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-green-500/10 text-green-400'
                }`}>
                  {cert.level}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">{cert.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm">{cert.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-elec-yellow">{cert.cost}</span>
                </div>
              </div>
              <Button className="w-full" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Find Training Providers
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Certification Planning Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Priority Order</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>1. Complete your apprenticeship</li>
                <li>2. 18th Edition BS7671 (essential)</li>
                <li>3. Initial Verification (2391-10)</li>
                <li>4. Periodic Inspection (2391-20)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Funding Options</h3>
              <ul className="text-sm space-y-1 text-elec-light/80">
                <li>• Employer-sponsored training</li>
                <li>• CITB grants and funding</li>
                <li>• Skills Bank vouchers</li>
                <li>• Personal investment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Certifications;
