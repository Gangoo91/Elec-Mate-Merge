import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, Ear, Eye, Volume2 } from 'lucide-react';

const ProfessionalSkillsTab = () => {
  const coreSkills = [
    {
      skill: 'Active Listening',
      icon: Ear,
      description: 'Understanding instructions and feedback completely',
      level: 85,
      techniques: [
        'Maintain eye contact when receiving instructions',
        "Don't interrupt - wait for the full explanation",
        'Repeat back important details to confirm understanding',
        'Ask questions if anything is unclear',
        'Take notes for complex procedures',
      ],
      practice:
        "Next time you receive instructions, try repeating the key points back: 'So you want me to install the sockets first, then run the lighting circuits, is that right?'",
    },
    {
      skill: 'Clear Speaking',
      icon: Volume2,
      description: 'Expressing yourself clearly and professionally',
      level: 70,
      techniques: [
        'Speak at a steady pace - not too fast when nervous',
        'Use specific technical terms correctly',
        "Avoid filler words like 'um', 'like', 'you know'",
        'Structure your message: problem → impact → solution',
        'Speak loudly enough to be heard over site noise',
      ],
      practice:
        "Practice the 'SBI' model: Situation → Behaviour → Impact. 'In the kitchen (S), the cable run hits a beam (B), so we can't complete the circuit safely (I).'",
    },
    {
      skill: 'Body Language',
      icon: Eye,
      description: 'Professional non-verbal communication',
      level: 75,
      techniques: [
        'Stand or sit up straight - shows confidence and respect',
        'Make appropriate eye contact during conversations',
        'Keep your hands visible and avoid fidgeting',
        "Face the person you're speaking to",
        'Match your expression to the seriousness of the topic',
      ],
      practice:
        'Before important conversations, take a moment to check your posture and facial expression. Are you projecting confidence and professionalism?',
    },
    {
      skill: 'Written Communication',
      icon: MessageCircle,
      description: 'Professional documentation and messages',
      level: 60,
      techniques: [
        'Use proper spelling and grammar in all written communication',
        'Be concise but include all necessary details',
        'Use bullet points for lists and complex information',
        'Include dates, times, and specific locations',
        'Proofread before sending',
      ],
      practice:
        'When writing work reports or messages, use this structure: What happened? When? Where? What action was taken? What happens next?',
    },
  ];

  const professionalLanguage = [
    {
      category: 'Asking for Help',
      examples: [
        {
          poor: "I don't know how to do this",
          better: 'Could you show me the correct procedure for this?',
        },
        {
          poor: 'This is impossible',
          better: "I'm having difficulty with this - could you suggest an approach?",
        },
        {
          poor: "You didn't tell me that",
          better: 'I may have misunderstood - could you clarify this part?',
        },
      ],
    },
    {
      category: 'Reporting Problems',
      examples: [
        { poor: 'This is all wrong', better: "I've identified an issue that needs attention" },
        {
          poor: "It's not working",
          better: "The circuit isn't functioning as expected - here's what I've observed",
        },
        {
          poor: 'Someone messed up',
          better: 'There appears to be a discrepancy with the original plan',
        },
      ],
    },
    {
      category: 'Making Suggestions',
      examples: [
        {
          poor: 'You should do it this way',
          better: 'Would it work better if we tried this approach?',
        },
        { poor: "That's wrong", better: 'I wonder if there might be an alternative method?' },
        {
          poor: 'I know a better way',
          better: "I've seen this done differently - would that be appropriate here?",
        },
      ],
    },
    {
      category: 'Accepting Feedback',
      examples: [
        {
          poor: "That's not fair, I did my best",
          better: 'Thanks for the feedback. What specifically should I do differently next time?',
        },
        {
          poor: "It wasn't my fault",
          better: 'I understand. Can you show me the correct way so I get it right next time?',
        },
        {
          poor: 'Nobody told me that',
          better: "I appreciate you pointing that out - I'll make a note so I remember for next time",
        },
      ],
    },
    {
      category: 'Giving Progress Updates',
      examples: [
        {
          poor: "I'm getting on with it",
          better: "I've completed the first fix in rooms 1 and 2, and I'm about to start room 3",
        },
        {
          poor: "It's taking ages",
          better: 'The cable route is more complex than expected. I estimate another 2 hours to complete this section.',
        },
        {
          poor: "I'm nearly done",
          better: "I've got 3 more sockets to terminate and then I need about 30 minutes for testing",
        },
      ],
    },
    {
      category: 'When You Do Not Know Something',
      examples: [
        {
          poor: "I don't have a clue",
          better: "I haven't come across this before. Could you point me in the right direction?",
        },
        {
          poor: 'I just guessed',
          better: "I wasn't sure about this connection, so I've left it for you to check rather than risk getting it wrong",
        },
        {
          poor: 'Whatever, it will be fine',
          better: "I'd rather check the On-Site Guide than assume - give me 2 minutes",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Essential Communication Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {coreSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="h-6 w-6 text-elec-yellow" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{skill.skill}</h3>
                      <p className="text-sm text-white">{skill.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-elec-yellow font-medium">{skill.level}%</div>
                      <Progress value={skill.level} className="w-20 mt-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-white mb-2">Key Techniques</h4>
                      <ul className="space-y-1">
                        {skill.techniques.map((technique, techIndex) => (
                          <li key={techIndex} className="text-sm text-white flex items-start gap-2">
                            <div className="w-1 h-1 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                            {technique}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                      <h4 className="font-medium text-blue-400 mb-2">Practice Exercise</h4>
                      <p className="text-sm text-white">{skill.practice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-white/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Professional Language Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {professionalLanguage.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="text-xs text-red-400 font-medium mb-1">Avoid saying:</div>
                        <p className="text-sm text-white italic">"{example.poor}"</p>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="text-xs text-green-400 font-medium mb-1">
                          Better approach:
                        </div>
                        <p className="text-sm text-white italic">"{example.better}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Building Confidence */}
      <Card className="border-purple-500/20 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-400">Building Communication Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Many apprentices feel nervous about speaking up on site, especially when surrounded by
            experienced electricians. This is completely normal. Here are strategies to build your
            confidence over time.
          </p>
          <div className="space-y-3">
            {[
              {
                title: 'Start Small',
                detail:
                  'Begin with simple updates and questions. The more you speak up in low-stakes situations, the easier it becomes in high-pressure ones.',
              },
              {
                title: 'Prepare Your Points',
                detail:
                  'Before meetings or conversations with your supervisor, think about what you want to say. Even a few seconds of mental preparation helps.',
              },
              {
                title: 'Use Technical Language Correctly',
                detail:
                  'Learning and using the correct terminology shows you are taking your training seriously. It earns respect from colleagues.',
              },
              {
                title: 'Ask Questions Freely',
                detail:
                  'There is no such thing as a stupid question in a safety-critical trade. Experienced electricians respect apprentices who ask rather than guess.',
              },
              {
                title: 'Accept That Mistakes Happen',
                detail:
                  'Everyone makes mistakes — what matters is how you handle them. Own it, fix it, learn from it. Your credibility grows each time you handle a mistake well.',
              },
              {
                title: 'Practise at College',
                detail:
                  'Use college sessions to practise explaining technical concepts. Presenting to classmates in a safe environment builds confidence for site.',
              },
            ].map((item, index) => (
              <div key={index} className="bg-black/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-1">{item.title}</h4>
                <p className="text-sm text-white">{item.detail}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* EPA Professional Discussion */}
      <Card className="border-amber-500/20 bg-amber-500/10">
        <CardHeader>
          <CardTitle className="text-amber-400">Preparing for EPA Professional Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-white mb-4">
            Your End Point Assessment includes a Professional Discussion where you demonstrate your
            knowledge and communication skills to an independent assessor. Good communication skills
            are not just nice to have — they are graded.
          </p>
          <div className="space-y-3">
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-400 mb-1">What the assessor looks for</p>
              <ul className="space-y-1">
                {[
                  'Clear, structured answers using technical terminology',
                  'Ability to explain your work process and reasoning',
                  'Evidence of professional behaviour and communication on site',
                  'Reflection on what you have learned and how you have developed',
                  'Awareness of health and safety communication requirements',
                ].map((item, idx) => (
                  <li key={idx} className="text-sm text-white flex items-start gap-2">
                    <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-black/20 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-400 mb-1">How to prepare</p>
              <ul className="space-y-1">
                {[
                  'Keep a portfolio of your work with photos and descriptions',
                  'Practise explaining technical processes in your own words',
                  'Think of examples for each knowledge, skill, and behaviour in the standard',
                  'Practise with your supervisor or training provider — mock professional discussions are invaluable',
                  'Record yourself answering practice questions and listen back',
                ].map((item, idx) => (
                  <li key={idx} className="text-sm text-white flex items-start gap-2">
                    <div className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalSkillsTab;
