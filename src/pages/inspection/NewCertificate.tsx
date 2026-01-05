import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileCheck, FileText, Wrench } from "lucide-react";

export default function NewCertificate() {
  const navigate = useNavigate();

  const certificateTypes = [
    {
      id: "eicr",
      title: "EICR",
      fullName: "Electrical Installation Condition Report",
      description: "For periodic inspection and testing of existing installations",
      icon: FileCheck,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30 hover:border-blue-500/50"
    },
    {
      id: "eic",
      title: "EIC",
      fullName: "Electrical Installation Certificate",
      description: "For new installations or major alterations/additions",
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30 hover:border-green-500/50"
    },
    {
      id: "minor-works",
      title: "Minor Works",
      fullName: "Minor Electrical Installation Works Certificate",
      description: "For small additions to existing circuits",
      icon: Wrench,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30 hover:border-orange-500/50"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground p-0 mb-4"
            onClick={() => navigate("/electrician/inspection-testing")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Certificates
          </Button>
          <h1 className="text-2xl font-bold text-foreground">New Certificate</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Select the type of certificate you want to create
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {certificateTypes.map((cert) => (
            <Card
              key={cert.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${cert.borderColor}`}
              onClick={() => navigate(`/electrician/inspection-testing/${cert.id}/new`)}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 rounded-full ${cert.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <cert.icon className={`h-8 w-8 ${cert.color}`} />
                </div>
                <CardTitle className="text-xl">{cert.title}</CardTitle>
                <CardDescription className="text-xs font-medium">
                  {cert.fullName}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
