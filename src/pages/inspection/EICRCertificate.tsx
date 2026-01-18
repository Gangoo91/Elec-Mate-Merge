import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileCheck, Construction, Save, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EICRCertificate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  return (
    <div className="bg-background">
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
                <FileCheck className="h-6 w-6 text-blue-500" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {isNew ? "New EICR" : `EICR Certificate`}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Electrical Installation Condition Report
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
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
        <Card className="border-2 border-dashed border-primary/30">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Construction className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">EICR Form Integration</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-md mx-auto">
              The full EICR form with all sections (Client Details, Supply Characteristics,
              Earthing & Bonding, Schedule of Inspections, Schedule of Tests, Observations,
              and Declaration) is ready for integration.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-lg mx-auto text-left">
              <p className="text-sm font-medium mb-2">Form components available:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- EICRFormProvider (context & state management)</li>
                <li>- EICRFormHeader (header with actions)</li>
                <li>- EarthingBondingSection</li>
                <li>- Client Details, Supply Characteristics</li>
                <li>- Schedule of Inspections & Tests</li>
                <li>- Observations & Declarations</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Components located in: <code className="bg-muted px-1 rounded">src/components/inspection/eicr/</code>
            </p>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What is an EICR?</h3>
              <p className="text-sm text-muted-foreground">
                An Electrical Installation Condition Report assesses the safety of
                electrical installations in a property, identifying any deterioration,
                defects or dangerous conditions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">When Required?</h3>
              <p className="text-sm text-muted-foreground">
                Required for rental properties, change of tenancy, commercial premises,
                and recommended every 5 years for domestic properties or 10 years for
                owner-occupied homes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">BS 7671 Compliance</h3>
              <p className="text-sm text-muted-foreground">
                This EICR form complies with BS 7671:2018+A2:2022 (18th Edition)
                requirements for periodic inspection reporting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
