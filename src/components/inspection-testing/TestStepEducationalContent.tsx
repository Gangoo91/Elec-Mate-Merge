
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Lightbulb, AlertTriangle, CheckCircle, Zap, Shield } from 'lucide-react';
import { TestStep } from '@/types/inspection-testing';

interface TestStepEducationalContentProps {
  step: TestStep;
  mode: 'electrician' | 'apprentice';
}

const TestStepEducationalContent = ({ step, mode }: TestStepEducationalContentProps) => {
  if (mode !== 'apprentice') return null;

  const getEducationalContent = (stepId: string) => {
    const id = stepId.toLowerCase();
    
    if (id.includes('isolation') || id.includes('safe')) {
      return {
        title: 'Safe Isolation - Foundation of Electrical Safety',
        icon: Shield,
        color: 'red',
        content: (
          <div className="space-y-3">
            <p className="text-sm">Safe isolation is the most critical safety procedure in electrical work. It's your life insurance policy.</p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Why Safe Isolation Matters:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Prevents electrocution:</strong> Ensures no voltage is present before work begins</li>
                <li><strong>Protects equipment:</strong> Prevents damage during testing procedures</li>
                <li><strong>Legal requirement:</strong> Required by health and safety regulations</li>
                <li><strong>Professional standard:</strong> Expected by employers and insurance</li>
              </ul>
            </div>
            <Alert className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              <AlertDescription className="text-amber-200 text-xs">
                <strong>Remember:</strong> PROVE DEAD - TEST - PROVE DEAD. This sequence must never be compromised.
              </AlertDescription>
            </Alert>
          </div>
        )
      };
    }
    
    if (id.includes('continuity') || id.includes('r1') || id.includes('r2')) {
      return {
        title: 'Continuity Testing - Verifying Safety Pathways',
        icon: Zap,
        color: 'blue',
        content: (
          <div className="space-y-3">
            <p className="text-sm">Continuity testing ensures protective conductors can carry fault current safely to earth.</p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">What R1+R2 Testing Tells Us:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Circuit integrity:</strong> Confirms complete path from line to earth</li>
                <li><strong>Connection quality:</strong> High resistance = poor connections</li>
                <li><strong>Safety assurance:</strong> Enables protective device operation</li>
                <li><strong>Zs calculation:</strong> Combines with Ze to predict earth fault loop impedance</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 p-3 rounded border border-blue-500/30">
              <p className="text-xs text-blue-200">
                <strong>Professional Tip:</strong> Typical R1+R2 values for 2.5mm² T&E cable are around 7.41mΩ/m. 
                Values significantly higher suggest loose connections or cable damage.
              </p>
            </div>
          </div>
        )
      };
    }
    
    if (id.includes('insulation')) {
      return {
        title: 'Insulation Resistance - Preventing Electric Shock',
        icon: Lightbulb,
        color: 'green',
        content: (
          <div className="space-y-3">
            <p className="text-sm">Insulation resistance testing finds deteriorated insulation before it becomes dangerous.</p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Understanding the Test:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>High voltage test:</strong> 500V DC reveals weaknesses normal voltage won't show</li>
                <li><strong>Minimum 1MΩ:</strong> BS 7671 requirement for adequate safety margin</li>
                <li><strong>Equipment protection:</strong> Electronics must be disconnected to prevent damage</li>
                <li><strong>Environmental factors:</strong> Moisture and temperature affect readings</li>
              </ul>
            </div>
            <Alert className="bg-green-500/10 border-green-500/30">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-200 text-xs">
                <strong>Good Practice:</strong> Always disconnect SPDs, electronic equipment, and indicator lights before testing.
              </AlertDescription>
            </Alert>
          </div>
        )
      };
    }
    
    if (id.includes('zs') || id.includes('earth-fault-loop')) {
      return {
        title: 'Earth Fault Loop Impedance - Ensuring Fast Disconnection',
        icon: Zap,
        color: 'yellow',
        content: (
          <div className="space-y-3">
            <p className="text-sm">Zs testing proves that protective devices will operate fast enough to prevent dangerous voltages.</p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Why Zs Values Matter:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Disconnection time:</strong> Lower Zs = faster fault clearance</li>
                <li><strong>Touch voltage:</strong> High Zs can allow dangerous voltages during faults</li>
                <li><strong>Protective device operation:</strong> Each device type has maximum Zs limits</li>
                <li><strong>Temperature effects:</strong> Cable resistance increases with temperature</li>
              </ul>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/30">
              <p className="text-xs text-yellow-200">
                <strong>Key Formula:</strong> Zs = Ze + (R1+R2) - This relationship helps verify test results and identify problems.
              </p>
            </div>
          </div>
        )
      };
    }
    
    if (id.includes('rcd')) {
      return {
        title: 'RCD Testing - Life-Saving Protection Verification',
        icon: Shield,
        color: 'purple',
        content: (
          <div className="space-y-3">
            <p className="text-sm">RCD testing ensures these life-saving devices will operate correctly when needed most.</p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">RCD Test Requirements:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>50% test:</strong> Should NOT trip (proves it won't nuisance trip)</li>
                <li><strong>100% test:</strong> Must trip within 300ms (normal protection)</li>
                <li><strong>5x test:</strong> Must trip within 40ms (fast fault clearance)</li>
                <li><strong>Test button:</strong> Only checks mechanics, not electrical operation</li>
              </ul>
            </div>
            <Alert className="bg-purple-500/10 border-purple-500/30">
              <Shield className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-purple-200 text-xs">
                <strong>Life Safety:</strong> RCDs are often the only protection against earth leakage. Regular testing saves lives.
              </AlertDescription>
            </Alert>
          </div>
        )
      };
    }
    
    if (id.includes('polarity')) {
      return {
        title: 'Polarity Testing - Ensuring Safe Switching',
        icon: CheckCircle,
        color: 'orange',
        content: (
          <div className="space-y-3">
            <p className="text-sm">Polarity testing ensures electrical safety by verifying switches and devices are correctly connected.</p>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Critical Polarity Points:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Switch connections:</strong> Must break line conductor, never neutral</li>
                <li><strong>Edison screw holders:</strong> Line to center contact prevents shock</li>
                <li><strong>Socket outlets:</strong> Correct pin connections for equipment safety</li>
                <li><strong>Fuse and MCB connections:</strong> Must be in line conductor path</li>
              </ul>
            </div>
            <div className="bg-orange-500/10 p-3 rounded border border-orange-500/30">
              <p className="text-xs text-orange-200">
                <strong>Safety Impact:</strong> Incorrect polarity can leave equipment live even when switched "off", 
                creating a serious shock risk.
              </p>
            </div>
          </div>
        )
      };
    }
    
    return null;
  };

  const educationalData = getEducationalContent(step.id);
  if (!educationalData) return null;

  const { title, icon: Icon, color, content } = educationalData;

  const colorClasses = {
    red: 'border-red-500/30 bg-red-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    green: 'border-green-500/30 bg-green-500/5',
    yellow: 'border-yellow-500/30 bg-yellow-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5'
  };

  const iconColors = {
    red: 'text-red-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400'
  };

  return (
    <Card className={`${colorClasses[color as keyof typeof colorClasses]} border`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className={`h-5 w-5 ${iconColors[color as keyof typeof iconColors]}`} />
          <span className={iconColors[color as keyof typeof iconColors]}>{title}</span>
          <Badge variant="outline" className="ml-auto text-xs">Learning Mode</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default TestStepEducationalContent;
