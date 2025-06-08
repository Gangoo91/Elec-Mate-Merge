
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Book, 
  AlertTriangle,
  FileCheck,
  Sun,
  MapPin,
  Eye,
  Wrench
} from "lucide-react";

const OutdoorReferenceGuide = () => {
  const standardsAndRegulations = [
    {
      category: "Road Lighting Standards",
      standards: [
        { code: "BS 5489-1", title: "Code of practice for the design of road lighting", scope: "Design principles and calculations" },
        { code: "BS EN 13201 Series", title: "Road lighting performance requirements", scope: "Photometric requirements" },
        { code: "BS EN 40-2", title: "Lighting columns - Concrete lighting columns", scope: "Structural requirements" },
        { code: "BS EN 40-3-1", title: "Lighting columns - Steel lighting columns", scope: "Steel column specifications" }
      ]
    },
    {
      category: "Installation Standards",
      standards: [
        { code: "BS 7671:2018+A2:2022", title: "Requirements for Electrical Installations", scope: "General electrical requirements" },
        { code: "NRSWA 1991", title: "New Roads and Street Works Act", scope: "Legal framework for street works" },
        { code: "BS 5837", title: "Trees in relation to design and construction", scope: "Tree protection during works" },
        { code: "BS 7430", title: "Code of practice for protective earthing", scope: "Earthing and bonding systems" }
      ]
    },
    {
      category: "Environmental Standards",
      standards: [
        { code: "BS EN 60529", title: "Degrees of protection (IP Code)", scope: "Ingress protection ratings" },
        { code: "BS EN 62262", title: "Degrees of protection (IK Code)", scope: "Impact resistance ratings" },
        { code: "BS EN 60598-2-3", title: "Luminaires for road lighting", scope: "Street lighting luminaire requirements" },
        { code: "Wildlife and Countryside Act 1981", title: "Wildlife protection legislation", scope: "Environmental protection requirements" }
      ]
    }
  ];

  const lightingDesignCriteria = [
    {
      roadClass: "A Roads (Trunk/Primary)",
      averageLux: "20-30 lux",
      uniformity: "0.4 minimum",
      glareRating: "50 maximum",
      colorRendering: "≥60 Ra",
      notes: "High speed traffic, good visibility required"
    },
    {
      roadClass: "B Roads (Secondary)",
      averageLux: "15-20 lux", 
      uniformity: "0.3 minimum",
      glareRating: "55 maximum",
      colorRendering: "≥40 Ra",
      notes: "Medium speed, mixed traffic"
    },
    {
      roadClass: "C Roads (Local)",
      averageLux: "10-15 lux",
      uniformity: "0.25 minimum", 
      glareRating: "60 maximum",
      colorRendering: "≥40 Ra",
      notes: "Local traffic, residential areas"
    },
    {
      roadClass: "Footways/Cycleways",
      averageLux: "5-10 lux",
      uniformity: "0.25 minimum",
      glareRating: "Not specified",
      colorRendering: "≥40 Ra", 
      notes: "Pedestrian and cycle safety"
    }
  ];

  const testingProcedures = [
    {
      test: "Initial Illumination Survey",
      equipment: "Calibrated lux meter",
      procedure: "Grid measurement at 1m height",
      acceptance: "Average and uniformity to BS 5489",
      frequency: "Before handover, then 5-yearly"
    },
    {
      test: "Electrical Installation Testing",
      equipment: "Multifunction tester",
      procedure: "As per BS 7671 requirements",
      acceptance: "All values within limits",
      frequency: "Initial verification, then 5-yearly"
    },
    {
      test: "Structural Inspection",
      equipment: "Visual inspection tools",
      procedure: "Column condition and stability",
      acceptance: "No visible defects or deterioration",
      frequency: "Annual inspection programme"
    },
    {
      test: "RCD Trip Testing",
      equipment: "RCD tester",
      procedure: "Test at ½, 1, and 5 times rating",
      acceptance: "≤300ms at 1× rating, ≤40ms at 5×",
      frequency: "6-monthly or as per maintenance schedule"
    }
  ];

  const maintenanceSchedule = [
    {
      interval: "Monthly",
      tasks: [
        "Visual inspection of lighting performance",
        "Report failed lamps and obvious defects",
        "Check control systems operation",
        "Clear obstructions from luminaires"
      ]
    },
    {
      interval: "Quarterly", 
      tasks: [
        "Lamp cleaning programme",
        "Control gear inspection",
        "Photocell cleaning and testing",
        "Time switch verification"
      ]
    },
    {
      interval: "Annual",
      tasks: [
        "Structural column inspection",
        "Door and lock maintenance",
        "Earthing system testing",
        "Complete electrical testing"
      ]
    },
    {
      interval: "5-Yearly",
      tasks: [
        "Full electrical installation testing",
        "Illumination level surveys",
        "Structural engineering assessment",
        "Equipment replacement planning"
      ]
    }
  ];

  const faultDiagnosis = [
    {
      symptom: "Individual Lamp Not Working",
      possibleCauses: [
        "Lamp failure (normal end of life)",
        "Loose connections in luminaire",
        "Control gear failure",
        "Photocell malfunction"
      ],
      diagnosticSteps: [
        "Visual inspection of lamp",
        "Check voltage at luminaire terminals",
        "Test control gear operation",
        "Check photocell switching"
      ]
    },
    {
      symptom: "Section of Lighting Out",
      possibleCauses: [
        "Feeder cable fault",
        "Protection device operation",
        "Joint box failure",
        "Distribution equipment fault"
      ],
      diagnosticSteps: [
        "Check protection devices",
        "Test cable continuity",
        "Inspect joint boxes",
        "Verify supply availability"
      ]
    },
    {
      symptom: "Lights On During Day",
      possibleCauses: [
        "Photocell failure or obstruction",
        "Timer switch malfunction",
        "Control system fault",
        "Wiring fault in control circuit"
      ],
      diagnosticSteps: [
        "Test photocell operation",
        "Check timer settings",
        "Verify control wiring",
        "Test automatic/manual switching"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Outdoor Installation Reference</CardTitle>
          </div>
          <p className="text-muted-foreground">Comprehensive standards, design criteria, and maintenance procedures</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="standards" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="standards">Standards</TabsTrigger>
          <TabsTrigger value="design">Design Criteria</TabsTrigger>
          <TabsTrigger value="testing">Testing & Maintenance</TabsTrigger>
          <TabsTrigger value="faults">Fault Diagnosis</TabsTrigger>
        </TabsList>

        <TabsContent value="standards" className="space-y-4">
          {standardsAndRegulations.map((category, index) => (
            <Card key={index} className="border-blue-500/30 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <CardTitle className="text-blue-300">{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {category.standards.map((standard, stdIndex) => (
                  <div key={stdIndex} className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-blue-300">{standard.code}</h4>
                      <Badge variant="outline" className="border-blue-400 text-blue-300 text-xs w-fit">
                        {standard.scope}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{standard.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <Card className="border-purple-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun className="h-6 w-6 text-purple-400" />
                <CardTitle className="text-purple-300">Lighting Design Criteria</CardTitle>
              </div>
              <p className="text-muted-foreground">BS 5489 photometric requirements by road classification</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {lightingDesignCriteria.map((criteria, index) => (
                <div key={index} className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                  <h3 className="font-semibold text-purple-300 mb-3">{criteria.roadClass}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
                    <div>
                      <span className="text-purple-300 font-medium">Average Lux: </span>
                      <span className="text-muted-foreground">{criteria.averageLux}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Uniformity: </span>
                      <span className="text-muted-foreground">{criteria.uniformity}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Glare Rating: </span>
                      <span className="text-muted-foreground">{criteria.glareRating}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-medium">Color Ra: </span>
                      <span className="text-muted-foreground">{criteria.colorRendering}</span>
                    </div>
                    <div className="md:col-span-1">
                      <span className="text-purple-300 font-medium">Notes: </span>
                      <span className="text-muted-foreground">{criteria.notes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card className="border-green-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCheck className="h-6 w-6 text-green-400" />
                <CardTitle className="text-green-300">Testing Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {testingProcedures.map((test, index) => (
                <div key={index} className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-300 mb-3">{test.test}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-green-300 font-medium">Equipment: </span>
                      <span className="text-muted-foreground">{test.equipment}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Procedure: </span>
                      <span className="text-muted-foreground">{test.procedure}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Acceptance: </span>
                      <span className="text-muted-foreground">{test.acceptance}</span>
                    </div>
                    <div>
                      <span className="text-green-300 font-medium">Frequency: </span>
                      <span className="text-muted-foreground">{test.frequency}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wrench className="h-6 w-6 text-cyan-400" />
                <CardTitle className="text-cyan-300">Maintenance Schedule</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {maintenanceSchedule.map((schedule, index) => (
                <div key={index} className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20">
                  <h3 className="font-semibold text-cyan-300 mb-3">{schedule.interval} Maintenance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {schedule.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faults" className="space-y-4">
          <Card className="border-red-500/30 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <CardTitle className="text-red-300">Fault Diagnosis Guide</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {faultDiagnosis.map((fault, index) => (
                <div key={index} className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  <h3 className="font-semibold text-red-300 mb-3">{fault.symptom}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-red-200 mb-2">Possible Causes</h4>
                      <div className="space-y-1">
                        {fault.possibleCauses.map((cause, causeIndex) => (
                          <div key={causeIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0" />
                            <span className="text-muted-foreground">{cause}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-200 mb-2">Diagnostic Steps</h4>
                      <div className="space-y-1">
                        {fault.diagnosticSteps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center gap-2 text-sm">
                            <span className="text-red-300 font-bold text-xs">{stepIndex + 1}.</span>
                            <span className="text-muted-foreground">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutdoorReferenceGuide;
