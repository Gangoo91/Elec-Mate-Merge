
import React from 'react';
import { AlertTriangle, Shield, Heart, Zap, Users, TrendingUp, Activity, BookOpen, Brain } from 'lucide-react';

const WhyIsolateSection = () => (
  <div className="space-y-6">
    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Critical Life-Saving Protection</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="flex items-start gap-2">
          <Heart className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Prevention of Fatal Electric Shock</p>
            <p>Safe isolation prevents contact with live conductors that could cause ventricular fibrillation. The human heart can be stopped by currents as low as 50mA, and muscular control is lost at just 10-20mA, preventing the victim from releasing their grip on live conductors.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Protection Against Arc Flash</p>
            <p>Electrical arcs can reach temperatures of 19,000°C (hotter than the sun's surface) and cause severe burns, blindness, and hearing damage. Proper isolation eliminates the energy source that creates these dangerous arc flash conditions.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Workplace Safety Culture</p>
            <p>Demonstrating rigorous isolation procedures builds confidence in electrical safety practices, protects colleagues and clients, and establishes professional credibility. Poor isolation practices can lead to accidents affecting multiple people.</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-foreground">Equipment and Property Protection</p>
            <p>Accidental energisation can damage expensive test equipment, cause fires, and result in significant property damage. Insurance claims may be invalidated if proper isolation procedures were not followed.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Activity className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">The Science Behind Electrical Hazards</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Physiological Effects of Electric Current:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Current Levels & Body Response:</p>
              <div className="space-y-1 text-xs">
                <p>• <strong>0.5-1mA:</strong> Threshold of perception - slight tingling</p>
                <p>• <strong>1-5mA:</strong> Barely perceptible - no painful sensation</p>
                <p>• <strong>5-10mA:</strong> Painful but muscular control maintained</p>
                <p>• <strong>10-20mA:</strong> Let-go threshold exceeded - muscular paralysis</p>
                <p>• <strong>20-50mA:</strong> Severe muscular contractions, breathing difficulty</p>
                <p>• <strong>50-100mA:</strong> Ventricular fibrillation possible, usually fatal</p>
                <p>• <strong>100mA+:</strong> Certain ventricular fibrillation and cardiac arrest</p>
              </div>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Factors Affecting Severity:</p>
              <div className="space-y-1 text-xs">
                <p>• <strong>Current path:</strong> Hand-to-hand most dangerous (through heart)</p>
                <p>• <strong>Duration:</strong> Longer contact = greater tissue damage</p>
                <p>• <strong>Frequency:</strong> 50-60Hz most dangerous for heart rhythm</p>
                <p>• <strong>Body resistance:</strong> Wet/broken skin = lower resistance</p>
                <p>• <strong>Voltage level:</strong> Higher voltage overcomes skin resistance</p>
                <p>• <strong>Health factors:</strong> Heart conditions increase vulnerability</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Arc Flash Hazards:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="font-medium text-foreground mb-1">Thermal Effects:</p>
              <p>• Arc temperatures: 19,000°C (3.5× sun's surface)</p>
              <p>• Copper vapour expansion: 67,000× original volume</p>
              <p>• Third-degree burns possible at 1.2 cal/cm²</p>
              <p>• Clothing ignition and sustained burning</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Pressure Effects:</p>
              <p>• Sound levels: 140dB+ (permanent hearing damage)</p>
              <p>• Pressure waves: can throw workers across rooms</p>
              <p>• Molten metal spray at high velocity</p>
              <p>• Toxic vapours from vaporised materials</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Human Factors in Electrical Accidents</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Common cognitive biases leading to accidents:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="space-y-2">
              <p>• <strong>Familiarity bias:</strong> "I've done this hundreds of times"</p>
              <p>• <strong>Time pressure:</strong> Shortcuts taken under deadline stress</p>
              <p>• <strong>Normalisation of deviance:</strong> Gradual acceptance of lower standards</p>
              <p>• <strong>Overconfidence:</strong> Overestimating personal skill and experience</p>
            </div>
            <div className="space-y-2">
              <p>• <strong>Complacency:</strong> Reduced vigilance from routine work</p>
              <p>• <strong>Confirmation bias:</strong> Seeing what we expect to see</p>
              <p>• <strong>Production pressure:</strong> Speed prioritised over safety</p>
              <p>• <strong>Authority gradient:</strong> Not questioning senior colleagues</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          <p className="font-medium text-yellow-400 mb-2">The Swiss Cheese Model in Electrical Safety:</p>
          <p className="text-sm text-gray-300">
            Accidents occur when multiple safety barriers fail simultaneously. Safe isolation is your final barrier - when all else fails,
            proper isolation prevents accidents. Each step in the procedure represents a layer of protection that must remain intact.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Real-World Accident Case Studies</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Case 1: Failure to Test Dead (Manufacturing Plant)</p>
          <p className="mb-2">An experienced electrician assumed a circuit was dead after switching off the main isolator:</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• <strong>What went wrong:</strong> Alternative supply via UPS system remained connected</p>
            <p className="text-red-400">• <strong>Consequence:</strong> Severe burns and 6-month recovery period</p>
            <p className="text-green-400">• <strong>Prevention:</strong> Proper testing would have revealed the alternative supply</p>
            <p className="text-blue-400">• <strong>Lesson:</strong> Never assume - always test every conductor to earth</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Case 2: Inadequate Securing (Commercial Building)</p>
          <p className="mb-2">Maintenance staff restored power while electrician was still working:</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• <strong>What went wrong:</strong> Communication breakdown and no physical lock</p>
            <p className="text-red-400">• <strong>Consequence:</strong> Electric shock and fall from ladder - broken ribs</p>
            <p className="text-green-400">• <strong>Prevention:</strong> Personal locks and proper permit-to-work system</p>
            <p className="text-blue-400">• <strong>Lesson:</strong> Physical security is essential - verbal agreements fail</p>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Case 3: Wrong Circuit Identified (Residential)</p>
          <p className="mb-2">Electrician isolated wrong circuit due to poor labelling:</p>
          <div className="ml-4 space-y-1">
            <p className="text-red-400">• <strong>What went wrong:</strong> Relied on incorrect circuit chart</p>
            <p className="text-red-400">• <strong>Consequence:</strong> Contact with 230V while installing socket outlet</p>
            <p className="text-green-400">• <strong>Prevention:</strong> Physical verification of correct circuit before isolation</p>
            <p className="text-blue-400">• <strong>Lesson:</strong> Verify the circuit you're working on is actually isolated</p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Legal and Professional Obligations</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">UK Legal Framework:</p>
          <div className="ml-4 space-y-1">
            <p>• <strong>Health and Safety at Work Act 1974:</strong> Duty of care to ensure safety</p>
            <p>• <strong>Electricity at Work Regulations 1989:</strong> Specific electrical safety requirements</p>
            <p>• <strong>Management of Health and Safety at Work Regulations 1999:</strong> Risk assessment duties</p>
            <p>• <strong>Corporate Manslaughter and Corporate Homicide Act 2007:</strong> Organisational liability</p>
            <p>• <strong>Construction (Design and Management) Regulations 2015:</strong> Construction site safety</p>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Professional Standards:</p>
          <div className="ml-4 space-y-1">
            <p>• <strong>BS 7671 Requirements:</strong> Regulation 537.2.1 - Safe isolation procedure</p>
            <p>• <strong>IET Code of Practice:</strong> Professional competence and safety standards</p>
            <p>• <strong>City & Guilds Requirements:</strong> Competency demonstration in assessments</p>
            <p>• <strong>JIB Standards:</strong> Industry recognised safe working practices</p>
            <p>• <strong>NICEIC/NAPIT Requirements:</strong> Contractor assessment and monitoring</p>
          </div>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
          <p className="font-medium text-red-400 mb-2">Consequences of Non-Compliance:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-1">Legal Consequences:</p>
              <p>• Unlimited fines for health and safety breaches</p>
              <p>• Up to 2 years imprisonment for individuals</p>
              <p>• Corporate manslaughter charges possible</p>
              <p>• Civil litigation for damages and compensation</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Professional Consequences:</p>
              <p>• Loss of professional registration/membership</p>
              <p>• Invalidated insurance coverage</p>
              <p>• Reputational damage and loss of business</p>
              <p>• Prohibition from working in electrical industry</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Economic Impact of Electrical Accidents</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Direct costs of electrical accidents:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-cyan-400 mb-2">Immediate Costs:</p>
              <div className="space-y-1 text-xs">
                <p>• Emergency medical treatment: £5,000-£50,000+</p>
                <p>• Ambulance and emergency services: £500-£2,000</p>
                <p>• Equipment damage and replacement: £1,000-£100,000+</p>
                <p>• Site shutdown and lost production: £10,000-£1,000,000+</p>
                <p>• Emergency repairs and remedial work: £5,000-£50,000</p>
              </div>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-cyan-400 mb-2">Long-term Costs:</p>
              <div className="space-y-1 text-xs">
                <p>• Compensation claims: £100,000-£5,000,000+</p>
                <p>• Legal fees and court costs: £50,000-£500,000</p>
                <p>• Increased insurance premiums: 50-200% increase</p>
                <p>• HSE investigation and fines: £10,000-£2,000,000</p>
                <p>• Lost business and reputation damage: Immeasurable</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Return on Investment in Safety:</p>
          <p className="text-sm text-gray-300">
            Proper isolation procedures cost minutes of time but prevent accidents costing hundreds of thousands of pounds. 
            The HSE estimates that every £1 spent on health and safety returns £4-£7 in avoided costs and increased productivity.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default WhyIsolateSection;
