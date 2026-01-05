
import React from 'react';
import { Wrench, Users, Brain, Target, AlertCircle, BookOpen, TrendingUp, Shield } from 'lucide-react';

const PracticalGuidanceSection = () => (
  <div className="space-y-6">
    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Wrench className="h-4 w-4 text-green-400" />
        <h4 className="font-medium text-green-400">Practical Implementation Strategies</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Building Effective Isolation Habits:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-green-400 mb-2">Daily Practice Integration:</p>
              <ul className="space-y-1 text-xs">
                <li>• Start every job with isolation checklist review</li>
                <li>• Use same sequence every time - build muscle memory</li>
                <li>• Verbalise each step aloud to reinforce process</li>
                <li>• Take photos of isolation points for records</li>
                <li>• Set phone reminders for tester proving</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-green-400 mb-2">Equipment Organisation:</p>
              <ul className="space-y-1 text-xs">
                <li>• Dedicated isolation kit with all required tools</li>
                <li>• Regular calibration schedule for test equipment</li>
                <li>• Spare padlocks and tags always available</li>
                <li>• Quick reference cards laminated for durability</li>
                <li>• Equipment condition checks before each use</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
          <p className="font-medium text-blue-400 mb-2">The "SAFELY" Mnemonic:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <p><strong>S</strong> - Switch off at origin</p>
              <p><strong>A</strong> - Apply isolation device</p>
              <p><strong>F</strong> - Fix with locks and tags</p>
            </div>
            <div>
              <p><strong>E</strong> - Examine isolation device</p>
              <p><strong>L</strong> - Look for voltage at work point</p>
              <p><strong>Y</strong> - Yield to tester proving process</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Users className="h-4 w-4 text-blue-400" />
        <h4 className="font-medium text-blue-400">Team Communication and Coordination</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Effective Communication Protocols:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">Pre-Work Briefing:</p>
              <ul className="space-y-1 text-xs">
                <li>• Identify all personnel involved in work</li>
                <li>• Discuss isolation points and responsibilities</li>
                <li>• Agree on communication methods and frequencies</li>
                <li>• Establish emergency contact procedures</li>
                <li>• Set clear start and finish times</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-blue-400 mb-2">During Work Communication:</p>
              <ul className="space-y-1 text-xs">
                <li>• Regular check-ins between team members</li>
                <li>• Clear hand signals in noisy environments</li>
                <li>• Two-way radio protocols where applicable</li>
                <li>• Written log of significant events/changes</li>
                <li>• Immediate notification of any problems</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Handover Procedures:</p>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3">
            <p className="font-medium text-orange-400 mb-2">Shift Changes and Handovers:</p>
            <ul className="space-y-1 text-sm">
              <li>• Face-to-face handover with written documentation</li>
              <li>• Physical tour of isolation points and work areas</li>
              <li>• Transfer of personal locks to new shift workers</li>
              <li>• Review of work completed and remaining tasks</li>
              <li>• Confirmation of isolation status before previous shift leaves</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Brain className="h-4 w-4 text-purple-400" />
        <h4 className="font-medium text-purple-400">Psychological Safety and Error Prevention</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Creating a Safety-First Mindset:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-purple-400 mb-2">Individual Strategies:</p>
              <ul className="space-y-1 text-xs">
                <li>• Personal pre-job risk assessment routine</li>
                <li>• "Stop and think" moments before critical steps</li>
                <li>• Challenge your own assumptions regularly</li>
                <li>• Learn from near-misses and close calls</li>
                <li>• Maintain physical and mental fitness for work</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-purple-400 mb-2">Team Culture Building:</p>
              <ul className="space-y-1 text-xs">
                <li>• Encourage questioning and peer checking</li>
                <li>• No blame culture for honest mistakes</li>
                <li>• Recognition for good safety practices</li>
                <li>• Regular safety discussions and toolbox talks</li>
                <li>• Senior workers modelling best practices</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Combating Complacency:</p>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
            <p className="font-medium text-yellow-400 mb-2">Staying Vigilant in Routine Work:</p>
            <ul className="space-y-1 text-sm">
              <li>• Vary your approach to familiar tasks slightly</li>
              <li>• Use checklists even for "simple" jobs</li>
              <li>• Actively look for what could go wrong</li>
              <li>• Take scheduled breaks to maintain concentration</li>
              <li>• Discuss safety with colleagues regularly</li>
              <li>• Review accident reports from similar work</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-4 w-4 text-orange-400" />
        <h4 className="font-medium text-orange-400">Scenario-Based Learning</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 1: Emergency Call-Out</p>
          <div className="space-y-2">
            <p><strong>Situation:</strong> 2 AM fault call to restore power to critical care unit</p>
            <p><strong>Pressures:</strong> Time pressure, patient safety concerns, tired state</p>
            <p><strong>Safe Approach:</strong></p>
            <ul className="ml-4 space-y-1 text-xs">
              <li>• Take time to properly assess the situation</li>
              <li>• Follow full isolation procedure despite urgency</li>
              <li>• Request additional support if feeling rushed</li>
              <li>• Use checklists to maintain focus when tired</li>
              <li>• Consider if you're fit to work safely</li>
            </ul>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 2: Multi-Supply System</p>
          <div className="space-y-2">
            <p><strong>Situation:</strong> Industrial site with main supply, generator, and UPS systems</p>
            <p><strong>Challenges:</strong> Multiple isolation points, complex switching arrangements</p>
            <p><strong>Safe Approach:</strong></p>
            <ul className="ml-4 space-y-1 text-xs">
              <li>• Obtain detailed electrical drawings before starting</li>
              <li>• Identify ALL possible supply sources</li>
              <li>• Test at multiple points to verify isolation</li>
              <li>• Coordinate with facilities management team</li>
              <li>• Document the isolation sequence used</li>
            </ul>
          </div>
        </div>
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">Scenario 3: Voltage Tester Failure</p>
          <div className="space-y-2">
            <p><strong>Situation:</strong> Voltage indicator fails to show voltage on known live source</p>
            <p><strong>Dilemma:</strong> Unsure if installation is actually dead or tester is faulty</p>
            <p><strong>Safe Approach:</strong></p>
            <ul className="ml-4 space-y-1 text-xs">
              <li>• STOP work immediately - do not proceed</li>
              <li>• Obtain alternative voltage indicator</li>
              <li>• Re-test the installation with backup device</li>
              <li>• Report faulty equipment to prevent future use</li>
              <li>• Consider if previous tests were reliable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="h-4 w-4 text-cyan-400" />
        <h4 className="font-medium text-cyan-400">Technology and Modern Challenges</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Modern Electrical Systems Challenges:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-cyan-400 mb-2">Smart Systems:</p>
              <ul className="space-y-1 text-xs">
                <li>• Smart meters with remote switching capability</li>
                <li>• Building management systems with override functions</li>
                <li>• IoT devices maintaining network connections</li>
                <li>• Automated transfer switches for backup supplies</li>
                <li>• Remote monitoring and control systems</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-cyan-400 mb-2">Renewable Energy:</p>
              <ul className="space-y-1 text-xs">
                <li>• Solar PV systems with island protection</li>
                <li>• Battery energy storage systems</li>
                <li>• Wind generation with variable output</li>
                <li>• Micro-hydro installations</li>
                <li>• Combined heat and power (CHP) units</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Technology-Assisted Safety:</p>
          <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
            <p className="font-medium text-green-400 mb-2">Digital Tools and Apps:</p>
            <ul className="space-y-1 text-sm">
              <li>• Electronic permit-to-work systems</li>
              <li>• QR code scanning for equipment verification</li>
              <li>• Mobile apps for isolation checklists</li>
              <li>• Digital photography for isolation documentation</li>
              <li>• Real-time communication systems</li>
              <li>• Bluetooth-enabled voltage detectors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-yellow-400" />
        <h4 className="font-medium text-yellow-400">Continuous Professional Development</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Maintaining Competency:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-yellow-400 mb-2">Regular Training:</p>
              <ul className="space-y-1 text-xs">
                <li>• Annual refresher courses on safe isolation</li>
                <li>• Updates on new equipment and technologies</li>
                <li>• Incident analysis and lessons learned sessions</li>
                <li>• Peer observation and feedback programmes</li>
                <li>• Cross-training on different system types</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-yellow-400 mb-2">Knowledge Sharing:</p>
              <ul className="space-y-1 text-xs">
                <li>• Industry forums and professional networks</li>
                <li>• Technical publications and safety bulletins</li>
                <li>• Conference attendance and presentations</li>
                <li>• Mentoring of junior colleagues</li>
                <li>• Contributing to safety procedure development</li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium text-foreground">Self-Assessment Tools:</p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
            <p className="font-medium text-blue-400 mb-2">Regular Competency Checks:</p>
            <ul className="space-y-1 text-sm">
              <li>• Monthly self-assessment against isolation procedure</li>
              <li>• Peer review of isolation practices</li>
              <li>• Mock emergency scenarios and response</li>
              <li>• Equipment knowledge and familiarity tests</li>
              <li>• Review of personal safety performance metrics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="h-4 w-4 text-red-400" />
        <h4 className="font-medium text-red-400">Quality Improvement and Learning</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div>
          <p className="font-medium text-foreground">Continuous Improvement Culture:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-card rounded p-3">
              <p className="font-medium text-red-400 mb-2">Data Collection:</p>
              <ul className="space-y-1 text-xs">
                <li>• Track near-miss incidents and close calls</li>
                <li>• Monitor isolation procedure compliance rates</li>
                <li>• Record equipment failure frequencies</li>
                <li>• Measure time taken for isolation procedures</li>
                <li>• Document lessons learned from each job</li>
              </ul>
            </div>
            <div className="bg-card rounded p-3">
              <p className="font-medium text-red-400 mb-2">Analysis and Action:</p>
              <ul className="space-y-1 text-xs">
                <li>• Regular review of safety performance data</li>
                <li>• Root cause analysis of incidents</li>
                <li>• Benchmarking against industry best practices</li>
                <li>• Implementation of improvement suggestions</li>
                <li>• Sharing of good practices across teams</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Innovation in Safety:</p>
          <p className="text-sm text-gray-300">
            Stay open to new technologies and methods that can improve safety. Whether it's new test equipment,
            improved lockout devices, or digital systems for managing isolation procedures, embrace innovations
            that enhance worker protection while maintaining the fundamental principles of safe isolation.
          </p>
        </div>
      </div>
    </div>

    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-4 w-4 text-indigo-400" />
        <h4 className="font-medium text-indigo-400">Personal Safety Philosophy</h4>
      </div>
      <div className="space-y-3 text-sm text-gray-300">
        <div className="bg-card rounded p-3">
          <p className="font-medium text-foreground mb-2">The Professional Mindset:</p>
          <div className="space-y-2 text-sm">
            <p className="italic">"Every procedure I follow correctly today ensures I return home safely to my family."</p>
            <p className="italic">"My commitment to safety protects not just me, but everyone around me."</p>
            <p className="italic">"Professionalism means never compromising on safety, regardless of external pressures."</p>
            <p className="italic">"The few extra minutes spent on proper isolation could prevent a lifetime of regret."</p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded p-3">
          <p className="font-medium text-green-400 mb-2">Your Safety Commitment:</p>
          <p className="text-sm text-foreground">
            Make a personal commitment to excellence in safe isolation. Your professionalism, attention to detail,
            and unwavering commitment to safety procedures can inspire others and contribute to a safer industry
            for everyone. Remember: you are not just protecting yourself - you are setting an example that others will follow.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PracticalGuidanceSection;
