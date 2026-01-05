import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, Zap, AlertTriangle, Hash } from 'lucide-react';

export const BMSModule5Section4ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-elec-yellow" />
          KNX Topology
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          KNX uses a bus topology where all devices connect to a two-wire twisted-pair bus. 
          The topology is flexible, supporting line, tree, and star layouts, but loops are strictly prohibited 
          as they cause signal reflections and communication errors.
        </p>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold mb-2">Bus Structure</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-foreground">• Two-wire twisted pair bus (typically green-sheathed)</p>
                <p className="text-foreground">• 24V DC power and data on same pair</p>
                <p className="text-foreground">• Polarity-sensitive connections</p>
              </div>
              <div className="space-y-1">
                <p className="text-foreground">• Maximum 1000m bus cable length</p>
                <p className="text-foreground">• Maximum 700m between power supply and furthest device</p>
                <p className="text-foreground">• Built-in bus termination in devices</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Hash className="h-4 w-4 text-elec-yellow" />
              Segments and Lines
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground font-medium">Line Capacity:</p>
              <p className="text-foreground">• Up to 64 devices per line (including couplers)</p>
              <p className="text-foreground">• Devices consume different amounts of bus current</p>
              <p className="text-foreground">• Total current consumption must not exceed power supply capacity</p>
              
              <p className="text-foreground font-medium mt-3">System Expansion:</p>
              <p className="text-foreground">• Lines linked with line couplers for larger systems</p>
              <p className="text-foreground">• Up to 15 lines per area (plus main line)</p>
              <p className="text-foreground">• Up to 15 areas per system</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Power Supply Requirements
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">• KNX bus requires 24V DC (29V nominal)</p>
              <p className="text-foreground">• Must use KNX-certified power supplies with integrated choke</p>
              <p className="text-foreground">• Choke prevents mains interference on bus</p>
              <p className="text-foreground">• Power supplies typically provide 160-640mA</p>
              <p className="text-foreground">• Multiple power supplies can be used per line</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold mb-2">Topology Examples</h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-foreground font-medium text-green-400">Line Topology:</p>
              <p className="text-foreground">Devices connected in sequence along the bus cable</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-blue-400">Tree Topology:</p>
              <p className="text-foreground">Main bus with branches to different areas</p>
            </div>
            <div>
              <p className="text-foreground font-medium text-purple-400">Star Topology:</p>
              <p className="text-foreground">Central junction box with cables to individual devices</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="text-foreground font-semibold flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4" />
            Critical Topology Rules
          </h4>
          <div className="space-y-1 text-sm">
            <p className="text-foreground font-medium text-red-300">Never create loops:</p>
            <p className="text-foreground">• Loops cause signal reflections and communication failures</p>
            <p className="text-foreground">• Always maintain tree or star structure</p>
            <p className="text-foreground">• Use couplers to connect separate lines, not loops</p>
            <p className="text-foreground font-medium text-red-300 mt-2">Polarity matters:</p>
            <p className="text-foreground">• Red/positive to red/positive, black/negative to black/negative</p>
            <p className="text-foreground">• Incorrect polarity prevents device communication</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};