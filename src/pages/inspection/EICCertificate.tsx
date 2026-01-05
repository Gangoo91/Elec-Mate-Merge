import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Construction, Save, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EICCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate("/electrician/inspection-testing")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-green-500" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {isNew ? "New EIC" : `EIC Certificate`}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Electrical Installation Certificate
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                Draft
              </Badge>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" disabled>
                <Download className="h-4 w-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-2 border-dashed border-green-500/30">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Construction className="h-10 w-10 text-green-500" />
            </div>
            <CardTitle className="text-2xl">EIC Form Integration</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-md mx-auto">
              The full EIC form with all sections (Client Details, Installation Details,
              Supply Characteristics, Schedule of Inspections, Schedule of Tests,
              and Declarations) is ready for integration.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-lg mx-auto text-left">
              <p className="text-sm font-medium mb-2">Form components available:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- EICFormTabs (tabbed form interface)</li>
                <li>- EICInstallationDetails</li>
                <li>- EICScheduleOfInspections</li>
                <li>- EICScheduleOfTesting</li>
                <li>- EICDeclarations</li>
                <li>- EICObservationsSection</li>
                <li>- EICValidationPanel</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Components located in: <code className="bg-muted px-1 rounded">src/components/inspection/eic/</code>
            </p>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What is an EIC?</h3>
              <p className="text-sm text-muted-foreground">
                An Electrical Installation Certificate is issued for new electrical
                installations or for alterations/additions to an existing installation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">When Required?</h3>
              <p className="text-sm text-muted-foreground">
                Required for all new electrical work including new consumer units,
                new circuits, rewires, and significant alterations to existing systems.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">BS 7671 Compliance</h3>
              <p className="text-sm text-muted-foreground">
                This EIC form complies with BS 7671:2018+A2:2022 (18th Edition)
                requirements for installation certification.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
