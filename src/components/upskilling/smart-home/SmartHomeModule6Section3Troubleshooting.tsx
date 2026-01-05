import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Tag, TestTube, FileText } from 'lucide-react';
import TroubleshootingQuickCheck from '@/components/upskilling/smart-home/TroubleshootingQuickCheck';

const SmartHomeModule6Section3Troubleshooting = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">4. Troubleshooting and Best Practice</h2>
          
          <div className="space-y-6">
            <div className="grid gap-4">
              {/* Clear Naming */}
              <Card className="bg-elec-dark/50 border-amber-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <Tag className="h-6 w-6 text-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Clear Device Naming</h3>
                      <p className="text-foreground mb-3">Ensure devices are named clearly in apps for reliable voice recognition.</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                          <p className="text-red-300 text-sm font-mono">❌ "Device 1", "Light 2"</p>
                        </div>
                        <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                          <p className="text-green-300 text-sm font-mono">✅ "Kitchen Light", "Bedroom Lamp"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step-by-Step Testing */}
              <Card className="bg-elec-dark/50 border-blue-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <TestTube className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Step-by-Step Testing</h3>
                      <p className="text-foreground mb-3">Test routines thoroughly before presenting to clients.</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-foreground text-sm">
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">1</span>
                          Test individual device responses
                        </div>
                        <div className="flex items-center gap-2 text-foreground text-sm">
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">2</span>
                          Test complete routine sequence
                        </div>
                        <div className="flex items-center gap-2 text-foreground text-sm">
                          <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">3</span>
                          Test edge cases and error conditions
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Avoid Complexity */}
              <Card className="bg-elec-dark/50 border-purple-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Keep It Simple</h3>
                      <p className="text-foreground mb-3">Avoid over-complicated logic that may confuse end users.</p>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                        <p className="text-foreground text-sm">
                          <strong>Rule:</strong> Start with basic routines, add complexity gradually as users become comfortable.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documentation */}
              <Card className="bg-elec-dark/50 border-green-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Client Documentation</h3>
                      <p className="text-foreground mb-3">Document routines for clients so they know how to adjust them.</p>
                      <div className="space-y-2 text-sm text-foreground">
                        <div>• List all routine names and trigger phrases</div>
                        <div>• Explain what each routine does</div>
                        <div>• Provide basic editing instructions</div>
                        <div>• Include troubleshooting contact information</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <TroubleshootingQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section3Troubleshooting;