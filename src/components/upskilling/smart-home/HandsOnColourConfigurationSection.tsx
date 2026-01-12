import { useSearchParams } from 'react-router-dom';
import { Palette, Smartphone, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const HandsOnColourConfigurationSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("colour") || "setup";
  const setActiveTab = (tab: string) => setSearchParams({ colour: tab }, { replace: false });

  return (
    <Card className="bg-gradient-to-br from-rose-50/10 to-pink-50/10 border-rose-200/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-rose-300">
          <Palette className="h-6 w-6" />
          Hands-On Colour Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-elec-gray">
            <TabsTrigger value="setup">Initial Setup</TabsTrigger>
            <TabsTrigger value="scenes">Scene Creation</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-rose-400" />
                <h4 className="font-semibold text-foreground">Basic Configuration Steps</h4>
              </div>
              
              <div className="grid gap-4">
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">Step 1: Device Discovery</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Open manufacturer app (Hue, LIFX, etc.)</li>
                    <li>• Add new devices/bulbs</li>
                    <li>• Test basic on/off functionality</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">Step 2: Colour Calibration</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Test full RGBW colour spectrum</li>
                    <li>• Adjust white balance if needed</li>
                    <li>• Set preferred warm/cool white temperatures</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">Step 3: Room Assignment</h5>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Group bulbs by room/zone</li>
                    <li>• Set logical naming conventions</li>
                    <li>• Test group control functionality</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scenes" className="space-y-4">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Pre-built Scene Examples</h4>
              
              <div className="grid gap-4">
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">🎬 Movie Night</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Colour:</strong> Deep red/purple (10% brightness)</p>
                    <p><strong>Temperature:</strong> 2200K warm</p>
                    <p><strong>Zones:</strong> Living room dimmed, hallway off</p>
                  </div>
                </div>
                
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">💼 Focus Mode</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Colour:</strong> Pure white</p>
                    <p><strong>Temperature:</strong> 5000K cool</p>
                    <p><strong>Zones:</strong> Workspace bright, background dimmed</p>
                  </div>
                </div>
                
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">🎉 Party Mode</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p><strong>Colour:</strong> Cycling rainbow</p>
                    <p><strong>Temperature:</strong> Variable</p>
                    <p><strong>Zones:</strong> All areas, dynamic effects</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-rose-400" />
                <h4 className="font-semibold text-foreground">Advanced Configuration</h4>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">Circadian Rhythm Setup</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Morning: 6500K cool white (energizing)</p>
                    <p>• Afternoon: 4000K neutral (productive)</p>
                    <p>• Evening: 2700K warm (relaxing)</p>
                    <p>• Night: 2200K amber (sleep-friendly)</p>
                  </div>
                </div>
                
                <div className="p-4 bg-rose-900/20 rounded-lg border border-rose-600/30">
                  <h5 className="font-semibold text-rose-300 mb-2">Custom Colour Presets</h5>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Create brand colours for businesses</p>
                    <p>• Holiday-themed colour schemes</p>
                    <p>• Seasonal adjustments</p>
                    <p>• Health condition considerations</p>
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