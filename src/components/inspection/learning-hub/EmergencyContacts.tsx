import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Clock, AlertTriangle } from 'lucide-react';

const EmergencyContacts = () => {
  const emergencyContacts = [
    {
      service: 'Emergency Services',
      number: '999',
      description: 'Fire, Police, Ambulance',
      availability: '24/7',
      priority: 'critical'
    },
    {
      service: 'Electrical Safety First',
      number: '0207 582 7746',
      description: 'Electrical safety advice and guidance',
      availability: 'Mon-Fri 9-5',
      priority: 'high'
    },
    {
      service: 'HSE Emergency',
      number: '0151 951 4000',
      description: 'Health & Safety Executive incidents',
      availability: '24/7',
      priority: 'high'
    },
    {
      service: 'Local Electricity Provider',
      number: '105',
      description: 'Power cuts and electrical emergencies',
      availability: '24/7',
      priority: 'medium'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Emergency Contacts
        </CardTitle>
        <CardDescription className="text-gray-300">
          Critical contact numbers for electrical emergencies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getPriorityColor(contact.priority)}`}>
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{contact.service}</h4>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 px-2 text-elec-yellow hover:bg-elec-yellow/10"
                    >
                      {contact.number}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{contact.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{contact.availability}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h4 className="font-medium text-red-400">Emergency Protocol</h4>
          </div>
          <p className="text-sm text-gray-300">
            In case of electrical incident: 1) Ensure personal safety, 2) Isolate power if safe to do so, 
            3) Call emergency services, 4) Provide first aid if qualified, 5) Report incident to HSE.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;