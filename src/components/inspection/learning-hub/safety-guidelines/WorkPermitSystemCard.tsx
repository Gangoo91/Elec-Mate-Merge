import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle2, Clock, Users, AlertTriangle } from 'lucide-react';

const WorkPermitSystemCard = () => {
  const permitTypes = [
    {
      type: 'Electrical Permit to Work',
      description: 'For work on or near live electrical equipment',
      duration: 'Single shift or specified period',
      requirements: ['Isolation confirmation', 'Risk assessment', 'Competent person authorization'],
      color: 'text-red-400'
    },
    {
      type: 'Hot Work Permit',
      description: 'For work involving heat, sparks, or naked flames',
      duration: 'Maximum 8 hours',
      requirements: ['Fire watch', 'Area clearance', 'Firefighting equipment'],
      color: 'text-orange-400'
    },
    {
      type: 'Confined Space Permit',
      description: 'For work in enclosed or restricted spaces',
      duration: 'Specific entry period',
      requirements: ['Atmosphere testing', 'Emergency procedures', 'Communication plan'],
      color: 'text-blue-400'
    },
    {
      type: 'Height Work Permit',
      description: 'For work at height above 2 metres',
      duration: 'Task duration',
      requirements: ['Fall protection', 'Weather conditions', 'Rescue plan'],
      color: 'text-green-400'
    }
  ];

  const permitProcess = [
    {
      stage: 'Planning',
      description: 'Identify work scope and hazards',
      actions: ['Risk assessment', 'Method statements', 'Resource planning'],
      responsible: 'Work Planner'
    },
    {
      stage: 'Authorization',
      description: 'Approve permit and control measures',
      actions: ['Verify isolation', 'Check competency', 'Sign authorization'],
      responsible: 'Authorised Person'
    },
    {
      stage: 'Issue',
      description: 'Brief workers and issue permit',
      actions: ['Safety briefing', 'Hand over permit', 'Start work'],
      responsible: 'Competent Person'
    },
    {
      stage: 'Monitoring',
      description: 'Supervise work and conditions',
      actions: ['Regular checks', 'Condition monitoring', 'Communication'],
      responsible: 'Supervisor'
    },
    {
      stage: 'Completion',
      description: 'Close permit and restore systems',
      actions: ['Work completion check', 'System restoration', 'Permit closure'],
      responsible: 'Authorised Person'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/20">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Work Permit Systems - BS 7671 & HSE Compliance
        </CardTitle>
        <CardDescription className="text-gray-300">
          Formal authorization systems for high-risk electrical and associated work activities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Permit Types */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Types of Work Permits</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {permitTypes.map((permit, index) => (
              <div key={index} className="bg-card rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileText className={`h-5 w-5 ${permit.color} mt-0.5`} />
                  <div className="flex-grow">
                    <h5 className={`font-medium ${permit.color} mb-1`}>{permit.type}</h5>
                    <p className="text-sm text-gray-300 mb-3">{permit.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>Duration: {permit.duration}</span>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">Key Requirements:</p>
                        <div className="space-y-1">
                          {permit.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="flex items-center gap-2 text-xs text-gray-300">
                              <CheckCircle2 className="h-3 w-3 text-green-400" />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permit Process */}
        <div className="bg-card rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-4">Permit to Work Process</h4>
          <div className="space-y-3">
            {permitProcess.map((stage, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-muted rounded-lg">
                <div className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-foreground">{stage.stage}</h5>
                    <span className="text-xs text-elec-yellow bg-elec-yellow/10 px-2 py-1 rounded">
                      {stage.responsible}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{stage.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stage.actions.map((action, actionIndex) => (
                      <span key={actionIndex} className="text-xs bg-accent text-gray-300 px-2 py-1 rounded">
                        {action}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Success Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <h4 className="font-medium text-green-400">Success Factors</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Clear communication between all parties</p>
              <p>• Competent and authorized personnel</p>
              <p>• Regular monitoring and supervision</p>
              <p>• Proper documentation and records</p>
              <p>• Emergency response procedures in place</p>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <h4 className="font-medium text-red-400">Common Failures</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-300">
              <p>• Inadequate hazard identification</p>
              <p>• Poor communication and handovers</p>
              <p>• Insufficient monitoring and supervision</p>
              <p>• Scope creep without permit modification</p>
              <p>• Premature permit closure</p>
            </div>
          </div>
        </div>

        {/* Legal Requirements */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-blue-400" />
            <h4 className="font-medium text-blue-400">Legal and Regulatory Framework</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p className="font-medium text-foreground mb-2">Key Regulations:</p>
              <ul className="space-y-1 text-xs">
                <li>• Electricity at Work Regulations 1989</li>
                <li>• Management of Health and Safety at Work Regulations</li>
                <li>• Construction (Design and Management) Regulations</li>
                <li>• Workplace (Health, Safety and Welfare) Regulations</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">BS 7671 Requirements:</p>
              <ul className="space-y-1 text-xs">
                <li>• Section 514 - Identification and notices</li>
                <li>• Section 537 - Isolation and switching</li>
                <li>• Chapter 61 - Initial verification</li>
                <li>• Chapter 62 - Periodic inspection and testing</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkPermitSystemCard;