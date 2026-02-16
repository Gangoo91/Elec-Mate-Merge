import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Wrench, Shield, Clock, HardHat, Briefcase } from 'lucide-react';

const WorkplaceCommunicationTab = () => {
  const communicationTypes = [
    {
      title: 'With Your Supervisor',
      icon: Users,
      color: 'border-blue-500/20 bg-blue-500/10',
      iconColor: 'text-blue-400',
      scenarios: [
        {
          situation: 'Daily Check-ins',
          good: "Morning, I've checked the schedule and I'm ready to start on the kitchen circuits. Should I begin with the ring main or the lighting circuit first?",
          tips: ['Be proactive', "Show you've prepared", 'Ask specific questions'],
        },
        {
          situation: 'Reporting Problems',
          good: "I've found an issue with the cable run behind the kitchen units. There's a gas pipe in the way. I've stopped work and marked the area. What's the best alternative route?",
          tips: [
            'Stop work immediately',
            'Be specific about the problem',
            'Suggest solutions if possible',
          ],
        },
        {
          situation: 'Asking for Help',
          good: 'I want to make sure I terminate this DB correctly. Could you check my work before I energise the circuit?',
          tips: [
            'Ask before making mistakes',
            'Show initiative',
            'Be specific about what you need',
          ],
        },
        {
          situation: 'Requesting Time Off or Adjustments',
          good: "I have a college assessment on Thursday that I need to prepare for. Would it be possible to finish an hour early on Wednesday so I can revise? I'll make sure my current work is at a good stopping point.",
          tips: [
            'Give plenty of notice',
            'Show you have considered the impact on the job',
            'Offer solutions to cover the time',
          ],
        },
        {
          situation: 'End of Day Handover',
          good: "I've completed the first fix on rooms 3 and 4. Room 5 still needs back boxes chopping out. I've left the cable drums in the store and locked up. The drawings are on the table with my notes.",
          tips: [
            'Summarise what you did',
            'Flag what is left to do',
            'Mention anything unusual',
          ],
        },
      ],
    },
    {
      title: 'With Experienced Colleagues',
      icon: Wrench,
      color: 'border-yellow-500/20 bg-yellow-500/10',
      iconColor: 'text-yellow-400',
      scenarios: [
        {
          situation: 'Learning Techniques',
          good: "I've seen you do that cable termination really quickly. Could you show me your technique when you have a spare minute?",
          tips: [
            'Show respect for their experience',
            "Don't interrupt their work",
            'Be specific about what you want to learn',
          ],
        },
        {
          situation: 'Working as a Team',
          good: "I'll start pulling the cables while you mark up the DB. Shall we meet back here in an hour to connect everything up?",
          tips: ['Coordinate your work', 'Be clear about timing', 'Confirm the plan'],
        },
        {
          situation: 'Sharing Information',
          good: "Just so you know, the client mentioned they want an extra socket in the study. I've told them we'll discuss it with you first.",
          tips: [
            'Keep everyone informed',
            "Don't make promises you can't keep",
            'Be clear about what was said',
          ],
        },
        {
          situation: 'When You Disagree',
          good: "I understand why you would run it that way. I was taught a different method at college — would it be worth trying it this way to see if it works better here?",
          tips: [
            'Respect their experience',
            'Frame as a question not a challenge',
            'Be open to learning why their way works',
          ],
        },
      ],
    },
    {
      title: 'With Clients/Customers',
      icon: Shield,
      color: 'border-green-500/20 bg-green-500/10',
      iconColor: 'text-green-400',
      scenarios: [
        {
          situation: 'Explaining Work',
          good: "We're installing a new consumer unit today, which is like the main control box for your electricity. It'll take about 4 hours and you'll be without power for 2 hours while we make the connections.",
          tips: ['Use simple language', 'Explain the impact on them', 'Give realistic timeframes'],
        },
        {
          situation: 'Dealing with Concerns',
          good: "I understand you're worried about the dust. We'll lay dust sheets and use a vacuum as we work. Is there anything specific you'd like us to be extra careful with?",
          tips: [
            'Listen to their concerns',
            'Explain your precautions',
            'Ask about their priorities',
          ],
        },
        {
          situation: 'Changes to Work',
          good: "We've found some old wiring that needs updating for safety. I'll need to discuss this with my supervisor and get back to you with options and costs.",
          tips: [
            "Don't make decisions beyond your authority",
            'Explain the safety implications',
            'Be clear about next steps',
          ],
        },
        {
          situation: 'Saying No Politely',
          good: "I understand you would like us to add sockets to the garage as well, but that was not included in the original quote. I can ask my supervisor to price it up for you — would that be helpful?",
          tips: [
            'Never do extra work without authorisation',
            'Be helpful but firm',
            'Offer the correct next step',
          ],
        },
      ],
    },
    {
      title: 'With Other Trades',
      icon: HardHat,
      color: 'border-purple-500/20 bg-purple-500/10',
      iconColor: 'text-purple-400',
      scenarios: [
        {
          situation: 'Coordinating Access',
          good: "We need to get our first fix cables in before you plasterboard this section. Can we agree a time today so neither of us is waiting around?",
          tips: [
            'Plan ahead to avoid clashes',
            'Be flexible where possible',
            'Respect their schedule too',
          ],
        },
        {
          situation: 'Protecting Your Work',
          good: "Just a heads up — we've got cables running behind that stud wall. Can you check with us before you drill or nail into that section? I can mark the cable routes for you.",
          tips: [
            'Be polite but clear about safety risks',
            'Offer to help (marking routes, photos)',
            'Report damage immediately',
          ],
        },
        {
          situation: 'Resolving Clashes',
          good: "It looks like your pipework and our cable tray are both planned for the same route. Can we sit down with the drawings and work out who goes where? Maybe we can share the containment.",
          tips: [
            'Approach it as a shared problem',
            'Use the drawings as a reference',
            'Involve the site manager if needed',
          ],
        },
      ],
    },
    {
      title: 'With Site Managers',
      icon: Briefcase,
      color: 'border-cyan-500/20 bg-cyan-500/10',
      iconColor: 'text-cyan-400',
      scenarios: [
        {
          situation: 'Site Inductions',
          good: "Thank you for the induction. Could you clarify the emergency muster point and confirm where we can store our tools and materials overnight?",
          tips: [
            'Pay attention and ask questions',
            'Take notes on key information',
            'Know the emergency procedures',
          ],
        },
        {
          situation: 'Reporting Delays',
          good: "We are running behind on the lighting because the ceiling grid was not ready when we arrived. We have moved to another area to keep productive. We should be back on schedule by Thursday.",
          tips: [
            'Report early, not at the last minute',
            'Explain the cause clearly',
            'Show you have a plan to recover',
          ],
        },
        {
          situation: 'Raising Safety Concerns',
          good: "I have noticed that the scaffold on level 2 does not have toe boards. Before we can work up there, could you arrange for the scaffolders to make it safe?",
          tips: [
            'Be specific about the hazard',
            'Reference the relevant regulation if you know it',
            'Do not work in unsafe conditions',
          ],
        },
      ],
    },
  ];

  const communicationChannels = [
    {
      method: 'Face-to-face',
      when: 'Complex instructions, safety issues, learning new skills, client discussions',
      pros: ['Clear understanding', 'Immediate feedback', 'Shows respect', 'Best for sensitive topics'],
    },
    {
      method: 'Radio/Phone',
      when: 'Quick updates, coordination between areas, urgent issues',
      pros: ['Immediate contact', 'Efficient for simple messages', 'Works across large sites'],
    },
    {
      method: 'Text/WhatsApp',
      when: 'Non-urgent updates, sharing photos of work, material requests',
      pros: ['Record of communication', 'Can include images', 'No interruption', 'Evidence trail'],
    },
    {
      method: 'Written Notes/Reports',
      when: 'Handovers, detailed instructions, material lists, snagging',
      pros: ['Permanent record', 'Can be referenced later', 'Reduces errors', 'Professional documentation'],
    },
    {
      method: 'Email',
      when: 'Formal requests, quotes, confirming verbal agreements, complaints',
      pros: ['Formal record', 'Timestamped evidence', 'Can attach documents', 'Suitable for office-based contacts'],
    },
    {
      method: 'Site Drawings/Markups',
      when: 'Cable routes, accessory positions, distribution board layouts',
      pros: ['Visual clarity', 'Avoids misunderstandings', 'Reference for all trades', 'Part of project record'],
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Key Workplace Relationships</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {communicationTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className={`border rounded-lg p-6 ${type.color}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`h-6 w-6 ${type.iconColor}`} />
                    <h3 className="text-xl font-semibold text-white">{type.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {type.scenarios.map((scenario, scenarioIndex) => (
                      <div key={scenarioIndex} className="bg-black/20 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">{scenario.situation}</h4>
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-3">
                          <p className="text-sm text-white italic">"{scenario.good}"</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {scenario.tips.map((tip, tipIndex) => (
                            <Badge
                              key={tipIndex}
                              variant="outline"
                              className="text-xs border-white/20"
                            >
                              {tip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">
              Communication Methods & When to Use Them
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {communicationChannels.map((channel, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{channel.method}</h4>
                <p className="text-sm text-white mb-3">{channel.when}</p>
                <div className="space-y-1">
                  {channel.pros.map((pro, proIndex) => (
                    <div key={proIndex} className="text-xs text-green-400 flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                      {pro}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* First Day Tips */}
      <Card className="border-cyan-500/20 bg-cyan-500/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-cyan-400" />
            <CardTitle className="text-cyan-400">First Day on a New Site</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Starting on a new site can be nerve-wracking. Here is a checklist of things to communicate
            and ask about on your first day.
          </p>
          <div className="space-y-2">
            {[
              'Introduce yourself to the site manager and your direct supervisor',
              'Complete the site induction and sign the attendance register',
              'Ask where the welfare facilities are (toilets, canteen, drying room)',
              'Find out the emergency procedures and muster point location',
              'Ask where to store your tools and materials securely',
              'Get the Wi-Fi password and any site-specific app logins',
              'Ask about parking and access arrangements',
              'Find out the working hours and break times for this site',
              'Get phone numbers for your supervisor and the site office',
              'Ask if there are any site-specific safety rules (hot works permits, asbestos register, etc.)',
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-2 bg-black/20 rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-cyan-400">{index + 1}</span>
                </div>
                <p className="text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Phrases */}
      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400">Useful Phrases for Site</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                situation: 'When you do not understand',
                phrase: 'Could you explain that again? I want to make sure I get it right.',
              },
              {
                situation: 'When you need to say no',
                phrase: 'I am not comfortable doing that without checking with my supervisor first.',
              },
              {
                situation: 'When you have finished a task',
                phrase: 'I have finished the sockets in room 2. What would you like me to move on to?',
              },
              {
                situation: 'When you spot a hazard',
                phrase: 'Hold on, I have noticed something that does not look safe. Can we check this before we continue?',
              },
              {
                situation: 'When you need materials',
                phrase: 'We are running low on 2.5mm twin and earth. We will need another drum before tomorrow.',
              },
              {
                situation: 'When handing over to someone else',
                phrase: 'I have got as far as the second fix in room 3. The cables are all pulled in but not terminated. The drawings are on the table.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-3">
                <p className="text-xs font-medium text-green-400 mb-1">{item.situation}</p>
                <p className="text-sm text-white italic">"{item.phrase}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkplaceCommunicationTab;
