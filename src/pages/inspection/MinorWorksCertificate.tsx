import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wrench, Construction, Save, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MinorWorksCertificate() {
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
                <Wrench className="h-6 w-6 text-orange-500" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {isNew ? "New Minor Works" : `Minor Works Certificate`}
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Minor Electrical Installation Works Certificate
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/30">
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
        <Card className="border-2 border-dashed border-orange-500/30">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4">
              <Construction className="h-10 w-10 text-orange-500" />
            </div>
            <CardTitle className="text-2xl">Minor Works Form Integration</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground max-w-md mx-auto">
              The full Minor Works certificate form with all sections
              (Work Details, Circuit Details, Inspection, Testing, and Declaration)
              is ready for integration.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 max-w-lg mx-auto text-left">
              <p className="text-sm font-medium mb-2">Form components available:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>- WorkDetailsSection</li>
                <li>- SmartCircuitDetails</li>
                <li>- InspectionSection</li>
                <li>- TestingSection</li>
                <li>- DeclarationSection</li>
                <li>- ComplianceCheckpoint</li>
                <li>- MinorWorksObservationsList</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              Components located in: <code className="bg-muted px-1 rounded">src/components/inspection/minor-works/</code>
            </p>
          </CardContent>
        </Card>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">What is a Minor Works Certificate?</h3>
              <p className="text-sm text-muted-foreground">
                Used for additions and alterations to existing circuits that do not
                extend to the installation of a new circuit.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Examples of Minor Works</h3>
              <p className="text-sm text-muted-foreground">
                Adding a socket to an existing circuit, replacing a consumer unit
                like-for-like, or adding a light fitting to an existing circuit.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">BS 7671 Compliance</h3>
              <p className="text-sm text-muted-foreground">
                This Minor Works certificate complies with BS 7671:2018+A2:2022
                requirements for minor electrical works.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
