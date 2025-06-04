
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Save, User, Building } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useEICR } from '@/contexts/EICRContext';

const EICRSettings = () => {
  const { eicrSession, setAutoPopulate } = useEICR();
  const [installationDetails, setInstallationDetails] = useState({
    address: '',
    description: '',
    estimatedAge: '',
    alterations: false,
    earthing: '',
    supply: '',
    mainSwitch: '',
    mainEarth: '',
    mainBonding: ''
  });
  
  const [inspectorDetails, setInspectorDetails] = useState({
    name: '',
    qualification: '',
    signatureDate: new Date().toISOString().split('T')[0]
  });

  const [inspectionSettings, setInspectionSettings] = useState({
    extentOfInspection: '100% visual inspection, sample testing of circuits',
    limitations: [] as string[],
    departuresFromBs7671: [] as string[],
    nextInspectionDue: ''
  });

  const [autoPopulateEnabled, setAutoPopulateEnabled] = useState(true);

  useEffect(() => {
    if (eicrSession) {
      const { installation_details, inspector_details, inspection_details } = eicrSession.eicr_report;
      
      setInstallationDetails({
        address: installation_details.address,
        description: installation_details.description,
        estimatedAge: installation_details.estimated_age,
        alterations: installation_details.evidence_of_alterations,
        earthing: installation_details.earthing_arrangements,
        supply: installation_details.supply_characteristics,
        mainSwitch: installation_details.main_switch_rating,
        mainEarth: installation_details.main_earthing_conductor,
        mainBonding: installation_details.main_bonding_conductors
      });

      setInspectorDetails({
        name: inspector_details.name,
        qualification: inspector_details.qualification,
        signatureDate: inspector_details.signature_date.toISOString().split('T')[0]
      });

      setInspectionSettings({
        extentOfInspection: inspection_details.extent_of_inspection,
        limitations: inspection_details.limitations,
        departuresFromBs7671: inspection_details.departures_from_bs7671,
        nextInspectionDue: eicrSession.eicr_report.next_inspection_date?.toISOString().split('T')[0] || ''
      });

      setAutoPopulateEnabled(eicrSession.auto_populate);
    }
  }, [eicrSession]);

  const handleSaveSettings = () => {
    // In a real implementation, this would update the EICR context
    console.log('Saving EICR settings:', {
      installationDetails,
      inspectorDetails,
      inspectionSettings,
      autoPopulateEnabled
    });
    
    setAutoPopulate(autoPopulateEnabled);
  };

  if (!eicrSession) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">EICR Settings & Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Configure EICR report details and testing preferences
          </p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      {/* Auto-Population Settings */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Testing Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-populate">Auto-populate EICR from test results</Label>
              <p className="text-sm text-muted-foreground">
                Automatically add faults and populate circuit data during testing
              </p>
            </div>
            <Switch
              id="auto-populate"
              checked={autoPopulateEnabled}
              onCheckedChange={setAutoPopulateEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-elec-yellow" />
            Installation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address">Installation Address</Label>
              <Textarea
                id="address"
                value={installationDetails.address}
                onChange={(e) => setInstallationDetails({...installationDetails, address: e.target.value})}
                placeholder="Full installation address..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="description">Installation Description</Label>
              <Textarea
                id="description"
                value={installationDetails.description}
                onChange={(e) => setInstallationDetails({...installationDetails, description: e.target.value})}
                placeholder="Type of installation..."
                className="bg-elec-dark border-elec-yellow/20"
                rows={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="estimated-age">Estimated Age</Label>
              <Input
                id="estimated-age"
                value={installationDetails.estimatedAge}
                onChange={(e) => setInstallationDetails({...installationDetails, estimatedAge: e.target.value})}
                placeholder="e.g., 15-20 years"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="earthing">Earthing Arrangements</Label>
              <Select 
                value={installationDetails.earthing} 
                onValueChange={(value) => setInstallationDetails({...installationDetails, earthing: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select earthing type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="supply">Supply Characteristics</Label>
              <Select 
                value={installationDetails.supply} 
                onValueChange={(value) => setInstallationDetails({...installationDetails, supply: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select supply type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230V/400V 50Hz">230V/400V 50Hz (3-phase)</SelectItem>
                  <SelectItem value="230V 50Hz">230V 50Hz (single-phase)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="main-switch">Main Switch Rating</Label>
              <Input
                id="main-switch"
                value={installationDetails.mainSwitch}
                onChange={(e) => setInstallationDetails({...installationDetails, mainSwitch: e.target.value})}
                placeholder="e.g., 100A"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="main-earth">Main Earthing Conductor</Label>
              <Input
                id="main-earth"
                value={installationDetails.mainEarth}
                onChange={(e) => setInstallationDetails({...installationDetails, mainEarth: e.target.value})}
                placeholder="e.g., 16mm²"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="main-bonding">Main Bonding Conductors</Label>
              <Input
                id="main-bonding"
                value={installationDetails.mainBonding}
                onChange={(e) => setInstallationDetails({...installationDetails, mainBonding: e.target.value})}
                placeholder="e.g., 10mm²"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="alterations"
              checked={installationDetails.alterations}
              onCheckedChange={(checked) => setInstallationDetails({...installationDetails, alterations: checked})}
            />
            <Label htmlFor="alterations">Evidence of alterations since original installation</Label>
          </div>
        </CardContent>
      </Card>

      {/* Inspector Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-elec-yellow" />
            Inspector Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="inspector-name">Inspector Name</Label>
              <Input
                id="inspector-name"
                value={inspectorDetails.name}
                onChange={(e) => setInspectorDetails({...inspectorDetails, name: e.target.value})}
                placeholder="Full name"
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div>
              <Label htmlFor="qualification">Qualification</Label>
              <Select 
                value={inspectorDetails.qualification} 
                onValueChange={(value) => setInspectorDetails({...inspectorDetails, qualification: value})}
              >
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="City & Guilds 2391-52">City & Guilds 2391-52</SelectItem>
                  <SelectItem value="City & Guilds 2394/2395">City & Guilds 2394/2395</SelectItem>
                  <SelectItem value="EAL 600/4338/4">EAL 600/4338/4</SelectItem>
                  <SelectItem value="NICEIC Qualified">NICEIC Qualified</SelectItem>
                  <SelectItem value="NAPIT Qualified">NAPIT Qualified</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inspection Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Inspection Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="extent-inspection">Extent of Inspection</Label>
            <Textarea
              id="extent-inspection"
              value={inspectionSettings.extentOfInspection}
              onChange={(e) => setInspectionSettings({...inspectionSettings, extentOfInspection: e.target.value})}
              placeholder="Describe extent of inspection..."
              className="bg-elec-dark border-elec-yellow/20"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="next-inspection">Next Inspection Due</Label>
            <Input
              id="next-inspection"
              type="date"
              value={inspectionSettings.nextInspectionDue}
              onChange={(e) => setInspectionSettings({...inspectionSettings, nextInspectionDue: e.target.value})}
              className="bg-elec-dark border-elec-yellow/20"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EICRSettings;
