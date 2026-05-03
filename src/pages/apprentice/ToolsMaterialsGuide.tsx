import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Wrench,
  CheckCircle,
  Cable,
  Shield,
  Settings,
  Zap,
  AlertTriangle,
  BadgePoundSterling,
} from 'lucide-react';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const ToolsMaterialsGuide = () => {
  const navigate = useNavigate();
  const essentialTools = [
    'Multifunction tester (insulation, continuity, RCD testing)',
    'Voltage tester and proving unit (GS38 compliant)',
    'Socket tester for quick outlet verification',
    'Cable strippers and crimping tools',
    'SWA cable stripping knife and gland spanners',
    'Cordless drill and SDS for cable runs',
  ];

  const consumables = [
    'Twin & Earth cable (1.5mm², 2.5mm², 6mm², 10mm²)',
    'SWA cable for external runs',
    'Cable clips, trunking and conduit systems',
    'MCBs, RCBOs and consumer units',
    'Wago connectors and terminal blocks',
    'Cable glands and grommets',
  ];

  const safetyEquipment = [
    'Voltage tester and proving unit',
    'Insulated tools (VDE approved)',
    'Safety boots and hard hat',
    'RCD plug tester',
    'Lock-off devices and safety signs',
    'First aid kit and emergency contacts',
  ];

  const testingEquipment = [
    {
      tool: 'Multifunction Tester',
      purpose: 'Insulation resistance, continuity, loop impedance, RCD testing',
      cost: '£300-800',
      features: ['Auto-ranging', 'Bluetooth connectivity', 'Memory storage', 'PC software'],
      brands: ['Megger', 'Fluke', 'Kewtech', 'Metrel'],
    },
    {
      tool: 'Voltage Tester',
      purpose: 'Proving dead before work (GS38 compliant)',
      cost: '£15-50',
      features: [
        'LED/LCD display',
        'Audible indication',
        'Proving unit compatible',
        'CAT III rated',
      ],
      brands: ['Fluke', 'Martindale', 'Kewtech', 'Megger'],
    },
    {
      tool: 'Socket Tester',
      purpose: 'Quick verification of socket wiring and RCD operation',
      cost: '£20-60',
      features: ['Wiring fault indication', 'RCD test button', 'Earth loop test', 'Portable'],
      brands: ['Martindale', 'Megger', 'Socket & See', 'Kewtech'],
    },
  ];

  const handTools = [
    {
      category: 'Cutting Tools',
      tools: [
        { name: 'Side cutters', cost: '£20-60', purpose: 'Cable cutting and stripping' },
        { name: 'Cable strippers', cost: '£15-40', purpose: 'Insulation removal' },
        { name: 'SWA stripping knife', cost: '£30-50', purpose: 'SWA cable preparation' },
      ],
    },
    {
      category: 'Screwdrivers',
      tools: [
        { name: 'VDE screwdriver set', cost: '£30-80', purpose: 'Insulated work near live parts' },
        { name: 'Terminal screwdrivers', cost: '£15-30', purpose: 'Small terminal work' },
        { name: 'Pozi/Phillips set', cost: '£20-40', purpose: 'General electrical work' },
      ],
    },
    {
      category: 'Spanners & Keys',
      tools: [
        { name: 'Gland spanners', cost: '£25-60', purpose: 'SWA gland installation' },
        { name: 'MCB lock-off keys', cost: '£10-25', purpose: 'Circuit breaker isolation' },
        { name: 'Meter tail crimps', cost: '£40-80', purpose: 'Main supply connections' },
      ],
    },
  ];

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Toolkit"
          title="Tools & materials guide"
          description="Essential tools, equipment and materials for professional UK electrical installations. Complete guide to building your apprentice toolkit — basics first, specialists later."
          tone="yellow"
        />
      </motion.div>

      {/* Essential Tools Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Essential Tools</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {essentialTools.map((tool, index) => (
                <li key={index} className="text-sm text-white flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  {tool}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cable className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Consumables</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {consumables.map((item, index) => (
                <li key={index} className="text-sm text-white flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-elec-yellow" />
              <CardTitle className="text-elec-yellow">Safety Equipment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <ul className="space-y-2">
              {safetyEquipment.map((item, index) => (
                <li key={index} className="text-sm text-white flex items-start gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Testing Equipment Detail */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Testing Equipment</CardTitle>
          </div>
          <p className="text-white">Essential testing tools for electrical installation work</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-6">
            {testingEquipment.map((equipment, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-5 rounded-lg">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h4 className="font-medium text-white text-lg">{equipment.tool}</h4>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {equipment.cost}
                      </Badge>
                    </div>
                    <p className="text-sm text-white mb-3">{equipment.purpose}</p>
                    <div className="mb-3">
                      <h5 className="text-sm font-medium text-elec-yellow mb-2">Key Features:</h5>
                      <div className="grid grid-cols-2 gap-1">
                        {equipment.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-elec-yellow mb-1">
                        Recommended Brands:
                      </h5>
                      <p className="text-xs text-white">{equipment.brands.join(', ')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hand Tools */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Hand Tools</CardTitle>
          </div>
          <p className="text-white">Essential hand tools for electrical installation work</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {handTools.map((category, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <h4 className="font-medium text-white mb-4">{category.category}</h4>
                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div
                      key={toolIndex}
                      className="border-b border-elec-yellow/20 pb-2 last:border-b-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-sm font-medium text-elec-yellow">{tool.name}</h5>
                        <span className="text-xs text-green-300">{tool.cost}</span>
                      </div>
                      <p className="text-xs text-white">{tool.purpose}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Planning */}
      <Card className="border-elec-yellow/30 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BadgePoundSterling className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Tool Budget Planning</CardTitle>
          </div>
          <p className="text-white">Strategic approach to building your electrical toolkit</p>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
              <h4 className="font-medium text-white mb-3">Apprentice Year 1</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Budget:</span>
                  <span className="text-green-300">£200-400</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white">Focus:</span>
                  <span className="text-elec-yellow">Basic tools & PPE</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-white">
                <li>• Basic hand tools</li>
                <li>• Safety equipment</li>
                <li>• Simple multimeter</li>
                <li>• Tool bag/storage</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
              <h4 className="font-medium text-white mb-3">Apprentice Year 2</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Budget:</span>
                  <span className="text-green-300">£400-800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white">Focus:</span>
                  <span className="text-elec-yellow">Testing equipment</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-white">
                <li>• Multifunction tester</li>
                <li>• Advanced hand tools</li>
                <li>• Power tools</li>
                <li>• Specialised equipment</li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-lg">
              <h4 className="font-medium text-white mb-3">Qualified Electrician</h4>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Budget:</span>
                  <span className="text-green-300">£300-600</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white">Focus:</span>
                  <span className="text-elec-yellow">Specialisation</span>
                </div>
              </div>
              <ul className="space-y-1 text-xs text-white">
                <li>• Specialist tools</li>
                <li>• Additional test gear</li>
                <li>• Professional storage</li>
                <li>• Vehicle fit-out</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Important Safety Notice */}
      <Card className="border-orange-500/50 bg-gradient-to-r from-orange-500/10 to-red-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-400" />
            <CardTitle className="text-orange-300">Tool Safety Requirements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            <p className="text-sm text-white">
              <strong className="text-orange-300">VDE Tools Required:</strong> All screwdrivers and
              hand tools used near live parts must be individually tested to 10,000V and marked with
              VDE approval.
            </p>
            <p className="text-sm text-white">
              <strong className="text-orange-300">GS38 Compliance:</strong> Voltage testers must
              comply with GS38 Health and Safety guidance including fused test leads and proving
              units.
            </p>
            <p className="text-sm text-white">
              <strong className="text-orange-300">Regular Calibration:</strong> Test equipment must
              be calibrated annually to maintain accuracy and ensure reliable results.
            </p>
          </div>
        </CardContent>
      </Card>
    </PageFrame>
  );
};

export default ToolsMaterialsGuide;
