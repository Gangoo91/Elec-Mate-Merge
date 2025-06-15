
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Phone, Users, MapPin, Download, AlertTriangle } from "lucide-react";
import CrisisHelplines from "@/components/mental-health/crisis/CrisisHelplines";
import LocalResourceFinder from "@/components/mental-health/crisis/LocalResourceFinder";
import OnlineCrisisSupport from "@/components/mental-health/crisis/OnlineCrisisSupport";
import AndysManClub from "@/components/mental-health/crisis/AndysManClub";
import ResourceDownloads from "@/components/mental-health/crisis/ResourceDownloads";
import EmergencyBanner from "@/components/mental-health/crisis/EmergencyBanner";
import { emergencyContacts, onlineResources } from "@/components/mental-health/crisis/CrisisResourcesData";

const CrisisResourcesTab = () => {
  return (
    <div className="space-y-6">
      <Card className="border-red-500/20 bg-gradient-to-r from-red-500/5 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-500" />
            <CardTitle className="text-red-300">Crisis Support & Emergency Resources</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Immediate support is available 24/7. If you're experiencing a mental health crisis, 
            you're not alone. These resources provide professional help when you need it most.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Phone className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">24/7 Helplines</div>
              <div className="text-xs text-muted-foreground">Free & confidential</div>
            </div>
            <div className="text-center">
              <MapPin className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Local Services</div>
              <div className="text-xs text-muted-foreground">Find help nearby</div>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Peer Support</div>
              <div className="text-xs text-muted-foreground">Connect with others</div>
            </div>
            <div className="text-center">
              <Download className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-sm font-medium text-white mb-1">Resources</div>
              <div className="text-xs text-muted-foreground">Crisis plans & tools</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EmergencyBanner />
      
      <LocalResourceFinder />
      
      <CrisisHelplines emergencyContacts={emergencyContacts} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <AndysManClub />
          <ResourceDownloads />
        </div>
        
        <OnlineCrisisSupport onlineResources={onlineResources} />
      </div>

      <Card className="border-amber-500/20 bg-amber-500/5">
        <CardHeader>
          <CardTitle className="text-amber-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Important Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-amber-500/10 rounded border border-amber-500/20">
              <h4 className="font-medium text-amber-300 mb-1">When to seek immediate help:</h4>
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li>• Thoughts of suicide or self-harm</li>
                <li>• Severe depression or anxiety that interferes with daily life</li>
                <li>• Feeling disconnected from reality</li>
                <li>• Substance abuse affecting your safety or wellbeing</li>
              </ul>
            </div>
            <div className="p-3 bg-blue-500/10 rounded border border-blue-500/20">
              <h4 className="font-medium text-blue-300 mb-1">Remember:</h4>
              <p className="text-muted-foreground text-xs">
                Seeking help is a sign of strength, not weakness. Mental health support is confidential 
                and professional. You deserve support and there are people who want to help you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrisisResourcesTab;
