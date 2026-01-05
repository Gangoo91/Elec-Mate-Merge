import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, TestTube, Lightbulb, Zap } from 'lucide-react';

export const PolarityMethodsContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Core Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Testing Method Overview</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Polarity tests are done before energising, using a continuity setting on your multifunction 
              tester (MFT) or dedicated continuity tester. The installation must be safely isolated and 
              proven dead.
            </p>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <TestTube className="h-5 w-5 text-blue-400" />
              <h4 className="text-blue-200 font-medium">Test Equipment Setup</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• Use continuity setting on MFT (typically 200Ω range)</li>
              <li>• Ensure installation is safely isolated and proven dead</li>
              <li>• Use known reference points at the distribution board</li>
              <li>• Test between DB outgoing line terminal and accessory terminals</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Socket Outlet Testing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                <h4 className="text-green-200 font-medium mb-3">Standard Testing</h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Test between DB line terminal and socket line terminal</li>
                  <li>• Verify line and neutral are not reversed</li>
                  <li>• Check earth terminal connection separately</li>
                  <li>• Use plug-in tester for verification if needed</li>
                </ul>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                <h4 className="text-yellow-200 font-medium mb-3">What to Look For</h4>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>• Continuity reading on correct terminal only</li>
                  <li>• No reading on neutral when testing line</li>
                  <li>• Correct terminal identification markings</li>
                  <li>• Proper cable entry and termination</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Lighting Circuit Testing</h3>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-purple-400" />
                <h4 className="text-purple-200 font-medium">Switch and Lampholder Testing</h4>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground text-sm font-medium mb-2">Switch Testing:</p>
                  <ul className="space-y-1 text-foreground text-sm ml-4">
                    <li>• Test at switch to confirm it breaks the line, not the neutral</li>
                    <li>• Check continuity from DB line to switch line terminal</li>
                    <li>• Verify no continuity to neutral terminal</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium mb-2">Lampholder Testing:</p>
                  <ul className="space-y-1 text-foreground text-sm ml-4">
                    <li>• Centre contact must be connected to line conductor</li>
                    <li>• Screw thread connects to neutral</li>
                    <li>• Test continuity from DB terminals to correct lampholder parts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Reference Points and Procedure</h3>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-green-400" />
                <h4 className="text-green-200 font-medium">Standard Procedure</h4>
              </div>
              <ol className="space-y-2 text-foreground text-sm">
                <li>1. Ensure installation is safely isolated and proven dead</li>
                <li>2. Use DB outgoing line terminal as reference point</li>
                <li>3. Test continuity to each accessory's line terminal</li>
                <li>4. Verify no continuity to neutral terminals during line testing</li>
                <li>5. Check protective devices are on line conductor</li>
                <li>6. Document all test results clearly</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};