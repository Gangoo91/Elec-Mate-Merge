
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, AlertTriangle, Shield, Lightbulb } from "lucide-react";

const EducationalContent = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Learn While You Assess
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="regulations" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="regulations">Regulations</TabsTrigger>
            <TabsTrigger value="hazards">Hazards</TabsTrigger>
            <TabsTrigger value="ppe">PPE Guide</TabsTrigger>
            <TabsTrigger value="tips">Pro Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regulations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">BS 7671 Requirements</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Section 132: Design requirements</li>
                  <li>• Section 411: Protection against electric shock</li>
                  <li>• Section 531: Devices for protection against overcurrent</li>
                  <li>• Section 611: Common rules for initial verification</li>
                </ul>
              </div>
              
              <div className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Health & Safety Regulations</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Health and Safety at Work Act 1974</li>
                  <li>• Electricity at Work Regulations 1989</li>
                  <li>• CDM Regulations 2015</li>
                  <li>• PPE at Work Regulations 1992</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hazards" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-400 mb-2">High Risk Hazards</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Live electrical conductors</li>
                      <li>• Overhead power lines</li>
                      <li>• Underground cables</li>
                      <li>• Arc flash potential</li>
                      <li>• Stored electrical energy</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">Medium Risk Hazards</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Damaged electrical equipment</li>
                      <li>• Poor environmental conditions</li>
                      <li>• Inadequate lighting</li>
                      <li>• Unstable access equipment</li>
                      <li>• Chemical hazards (COSHH)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ppe" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Essential PPE
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Hard hat:</strong> BS EN 397 with electrical protection</li>
                  <li>• <strong>Safety glasses:</strong> BS EN 166 impact resistant</li>
                  <li>• <strong>Insulated gloves:</strong> Voltage rated for task</li>
                  <li>• <strong>Safety boots:</strong> BS EN ISO 20345</li>
                </ul>
              </div>
              
              <div className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">PPE Inspection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Check for visible damage before use</li>
                  <li>• Verify certification dates</li>
                  <li>• Ensure proper fit and comfort</li>
                  <li>• Replace if damaged or expired</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-4">
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-2">Assessment Best Practices</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Always assess the site before starting any work</li>
                      <li>• Take photos to document conditions and concerns</li>
                      <li>• Involve the whole team in safety discussions</li>
                      <li>• Don't proceed if conditions are unsafe</li>
                      <li>• Regular reassessment as work progresses</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">Documentation Tips</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use clear, specific language in reports</li>
                      <li>• Include measurements where relevant</li>
                      <li>• Note weather and environmental conditions</li>
                      <li>• Record any deviations from normal procedures</li>
                      <li>• Keep digital copies of all assessments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EducationalContent;
