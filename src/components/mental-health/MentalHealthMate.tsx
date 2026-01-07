
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MessageCircle,
  UserPlus,
  Users,
  Bot,
  Send,
  Loader2,
  Heart,
  Phone,
  ChevronDown,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Lightbulb,
  Wind,
  Target,
  BookHeart
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";

interface MentalHealthMateProps {
  onBecomeMate?: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  suggestions?: string[];
  action?: {
    type: 'breathing' | 'grounding' | 'crisis' | 'journal';
    label: string;
  };
}

const MentalHealthMate = ({ onBecomeMate }: MentalHealthMateProps) => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPeers, setShowPeers] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userName, setUserName] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Load user's first name if available
  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      const firstName = user.user_metadata.full_name.split(' ')[0];
      setUserName(firstName);
    }
  }, [user]);

  const handleBecomeMate = () => {
    setIsVolunteer(true);
    toast.success("Thank you for becoming a Mental Health Mate!", {
      description: "You are now available to help others in need.",
    });
    if (onBecomeMate) {
      onBecomeMate();
    }
  };

  const detectMood = (message: string): 'crisis' | 'low' | 'anxious' | 'stressed' | 'neutral' | 'positive' => {
    const lower = message.toLowerCase();

    // Crisis detection (highest priority)
    const crisisWords = ['suicide', 'kill myself', 'end it all', 'don\'t want to live', 'want to die', 'self harm', 'hurt myself', 'no point', 'give up on life'];
    if (crisisWords.some(word => lower.includes(word))) return 'crisis';

    // Low mood
    const lowWords = ['depressed', 'hopeless', 'worthless', 'empty', 'alone', 'lonely', 'sad', 'crying', 'can\'t cope', 'struggle', 'struggling', 'miserable', 'hate myself', 'failure'];
    if (lowWords.some(word => lower.includes(word))) return 'low';

    // Anxiety
    const anxiousWords = ['anxious', 'anxiety', 'panic', 'scared', 'terrified', 'worried', 'fear', 'nervous', 'can\'t breathe', 'heart racing', 'overthinking'];
    if (anxiousWords.some(word => lower.includes(word))) return 'anxious';

    // Stress
    const stressWords = ['stressed', 'stress', 'pressure', 'overwhelmed', 'too much', 'exhausted', 'burnt out', 'burnout', 'tired', 'can\'t sleep', 'deadline', 'workload'];
    if (stressWords.some(word => lower.includes(word))) return 'stressed';

    // Positive
    const positiveWords = ['good', 'great', 'happy', 'better', 'fine', 'okay', 'thanks', 'thank you', 'helped', 'feeling better'];
    if (positiveWords.some(word => lower.includes(word))) return 'positive';

    return 'neutral';
  };

  const generateResponse = (message: string): ChatMessage => {
    const mood = detectMood(message);
    const lower = message.toLowerCase();
    const isFirstMessage = chatMessages.filter(m => m.type === 'user').length === 0;
    const namePrefix = userName ? `${userName}, ` : '';

    // Update conversation context
    setConversationContext(prev => [...prev, mood].slice(-5));

    // Crisis response - always prioritise safety
    if (mood === 'crisis') {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `${namePrefix}I'm really concerned about what you've shared. Your life matters, and I want you to get the right support right now.\n\nPlease reach out to one of these services immediately - they're trained professionals who are there for you 24/7:\n\n• Samaritans: 116 123 (free, 24/7)\n• Text SHOUT to 85258\n• Emergency: 999\n\nYou don't have to face this alone. Would you like me to stay with you while you make that call?`,
        action: { type: 'crisis', label: 'Call Samaritans Now' }
      };
    }

    // Low mood responses with validation and gentle support
    if (mood === 'low') {
      const lowResponses = [
        {
          content: `${namePrefix}I hear you, and I'm sorry you're feeling this way. What you're experiencing sounds really difficult. It takes courage to share these feelings.\n\nCan you tell me a bit more about what's been happening? Sometimes just putting things into words can help make sense of them.`,
          suggestions: ['Work has been really hard', 'I feel isolated from others', 'I don\'t know what\'s wrong']
        },
        {
          content: `${namePrefix}Thank you for trusting me with this. Feeling ${lower.includes('alone') ? 'alone' : 'low'} is painful, and your feelings are completely valid.\n\nRemember - in the electrical industry, we face unique pressures that many people don't understand. You're not weak for struggling.\n\nWould you like to talk about what's contributing to these feelings?`,
          suggestions: ['The job is getting to me', 'Things at home are hard', 'I just feel stuck']
        },
        {
          content: `${namePrefix}I'm here for you. Depression and low mood are more common in our industry than people realise - you're definitely not alone in this.\n\nHave you been able to talk to anyone else about how you're feeling? Sometimes that first conversation is the hardest.`,
          suggestions: ['No, I haven\'t told anyone', 'I tried but they didn\'t understand', 'I don\'t know who to talk to']
        }
      ];

      const response = lowResponses[Math.floor(Math.random() * lowResponses.length)];
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: response.content,
        suggestions: response.suggestions
      };
    }

    // Anxiety responses with grounding offers
    if (mood === 'anxious') {
      const anxiousResponses = [
        {
          content: `${namePrefix}Anxiety can feel overwhelming, but you're doing the right thing by reaching out. Let's work through this together.\n\nFirst, let's try to ground you in the present moment. Would you like to try a quick breathing exercise? It only takes 2 minutes and can really help calm your nervous system.`,
          action: { type: 'breathing' as const, label: 'Start Breathing Exercise' },
          suggestions: ['Yes, let\'s try that', 'Tell me more about anxiety', 'What else can help?']
        },
        {
          content: `${namePrefix}I understand - anxiety can be really intense, especially when it hits at work or on site.\n\nThere's a technique called 5-4-3-2-1 grounding that can help bring you back to the present moment. Would you like me to guide you through it?`,
          action: { type: 'grounding' as const, label: 'Try Grounding Exercise' },
          suggestions: ['Yes please', 'What causes my anxiety?', 'I need something quick']
        }
      ];

      const response = anxiousResponses[Math.floor(Math.random() * anxiousResponses.length)];
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: response.content,
        action: response.action,
        suggestions: response.suggestions
      };
    }

    // Stress responses with practical support
    if (mood === 'stressed') {
      const stressResponses = [
        {
          content: `${namePrefix}Work stress in the electrical industry is incredibly common - tight deadlines, demanding clients, physical exhaustion. It's a lot to handle.\n\nWhat's feeling most overwhelming right now? Sometimes breaking it down helps us see what we can actually control.`,
          suggestions: ['Too much work, not enough time', 'Difficult people to deal with', 'I can\'t switch off after work']
        },
        {
          content: `${namePrefix}Stress can build up without us noticing until it becomes overwhelming. The fact that you're recognising it is important.\n\nHave you been able to take any breaks today? Even a 5-minute breather can help reset your stress levels.`,
          action: { type: 'breathing' as const, label: 'Take a Quick Break' },
          suggestions: ['I don\'t have time for breaks', 'Work won\'t let up', 'I feel guilty resting']
        },
        {
          content: `${namePrefix}When we're stressed, our body goes into fight-or-flight mode. On site, this can actually be dangerous for decision-making.\n\nLet's try a quick technique: Can you name 3 things you can see right now? This simple exercise helps bring your focus back to the present.`,
          suggestions: ['Okay, I see...', 'Why does this help?', 'I need to vent first']
        }
      ];

      const response = stressResponses[Math.floor(Math.random() * stressResponses.length)];
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: response.content,
        action: response.action,
        suggestions: response.suggestions
      };
    }

    // Positive responses
    if (mood === 'positive') {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `That's great to hear${userName ? `, ${userName}` : ''}! It's good to check in even when things are going well.\n\nWould you like to log this as a positive entry in your wellbeing journal? Tracking good days helps build resilience for the harder ones.`,
        action: { type: 'journal' as const, label: 'Log to Journal' },
        suggestions: ['Yes, save this', 'What else can I do?', 'Just wanted to say hi']
      };
    }

    // Specific topic detection
    if (lower.includes('sleep') || lower.includes('tired') || lower.includes('insomnia')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `${namePrefix}Sleep problems are really common, especially with the early starts and physical demands of electrical work.\n\nPoor sleep affects everything - mood, concentration, even safety on site. Let's look at what might be disrupting your rest.\n\nAre you having trouble falling asleep, staying asleep, or both?`,
        suggestions: ['Can\'t fall asleep', 'Keep waking up', 'Mind won\'t switch off']
      };
    }

    if (lower.includes('relationship') || lower.includes('partner') || lower.includes('wife') || lower.includes('husband') || lower.includes('family')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `${namePrefix}Relationships can be challenging, especially when work demands are high. Long hours and physical exhaustion don't leave much energy for our loved ones.\n\nWould you like to talk about what's happening? I'm here to listen without judgment.`,
        suggestions: ['We keep arguing', 'I feel disconnected', 'Work is affecting us']
      };
    }

    if (lower.includes('money') || lower.includes('financial') || lower.includes('bills') || lower.includes('debt')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `${namePrefix}Financial worries can be incredibly stressful. They affect our sleep, relationships, and mental health.\n\nDid you know the Electrical Industries Charity offers financial support and advice specifically for people in our sector? They can help with debt advice, grants, and more.\n\nWould you like their contact details?`,
        suggestions: ['Yes, tell me more', 'I need practical help', 'It\'s affecting my mental health']
      };
    }

    // First message / neutral responses
    if (isFirstMessage || mood === 'neutral') {
      const greetings = [
        {
          content: `Hi${userName ? ` ${userName}` : ''}! I'm here to support you - whether you want to talk through something specific, learn some coping techniques, or just need someone to listen.\n\nHow are you feeling today?`,
          suggestions: ['I\'m struggling a bit', 'Feeling okay, just checking in', 'I need some advice']
        },
        {
          content: `Welcome${userName ? `, ${userName}` : ''}. This is a safe space where you can share anything that's on your mind.\n\nAs someone who understands the electrical industry, I know the unique pressures you face. What's brought you here today?`,
          suggestions: ['Work stress', 'Personal stuff', 'Just exploring']
        }
      ];

      const response = greetings[Math.floor(Math.random() * greetings.length)];
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: response.content,
        suggestions: response.suggestions
      };
    }

    // Default engaged response
    const defaultResponses = [
      {
        content: `${namePrefix}Thanks for sharing that with me. Can you tell me more about what's going on? The more I understand, the better I can support you.`,
        suggestions: ['It\'s about work', 'Something personal', 'I\'m not sure how to explain']
      },
      {
        content: `${namePrefix}I appreciate you opening up. What would be most helpful right now - would you like to talk more, try a calming technique, or get some information about support services?`,
        suggestions: ['Let\'s keep talking', 'Show me a technique', 'What support is available?']
      }
    ];

    const response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response.content,
      suggestions: response.suggestions
    };
  };

  const handleAIChat = async (customMessage?: string) => {
    const messageToSend = customMessage || inputMessage;
    if (!messageToSend.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: messageToSend
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate thinking time for more natural feel
    const thinkingTime = 1000 + Math.random() * 1000;

    setTimeout(() => {
      const aiResponse = generateResponse(messageToSend);
      setChatMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, thinkingTime);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleAIChat(suggestion);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;

    switch (action.type) {
      case 'breathing':
        // Navigate to breathing exercise or trigger modal
        toast.info('Opening breathing exercise...', { duration: 1500 });
        break;
      case 'grounding':
        // Add grounding guidance
        const groundingMessage: ChatMessage = {
          id: Date.now().toString(),
          type: 'ai',
          content: `Let's do the 5-4-3-2-1 grounding technique together:\n\n**5 things you can SEE** - Look around and name 5 things\n\n**4 things you can TOUCH** - Feel your feet on the floor, clothes on your skin\n\n**3 things you can HEAR** - Listen carefully to sounds around you\n\n**2 things you can SMELL** - Notice any scents nearby\n\n**1 thing you can TASTE** - What taste is in your mouth?\n\nTake your time with each one. Let me know when you're done.`,
          suggestions: ['I\'ve done it', 'This is helping', 'I need more help']
        };
        setChatMessages(prev => [...prev, groundingMessage]);
        break;
      case 'crisis':
        window.location.href = 'tel:116123';
        break;
      case 'journal':
        toast.info('Opening wellbeing journal...', { duration: 1500 });
        break;
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    setConversationContext([]);
  };

  const quickPrompts = [
    { text: "I'm stressed at work", icon: Target },
    { text: "Feeling anxious", icon: Wind },
    { text: "Need to talk", icon: MessageCircle },
    { text: "Having a tough day", icon: Heart }
  ];

  const availableMates = [
    { id: "1", name: "Sarah T.", role: "Mental Health First Aider", status: "Available", badge: "Trained" },
    { id: "2", name: "Michael C.", role: "Foreman", status: "Available", badge: null },
    { id: "3", name: "James W.", role: "Apprentice", status: "Busy", badge: null },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/20 mb-3 relative">
          <Bot className="h-8 w-8 text-purple-400" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-foreground" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Mental Health Mate</h2>
        <p className="text-sm text-white">
          Your 24/7 AI companion - here to listen, support, and guide
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-transparent overflow-hidden">
        <CardContent className="p-0">
          {/* Chat Header */}
          <div className="p-3 border-b border-purple-500/20 flex items-center justify-between bg-purple-500/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-white">AI Mate is online</span>
            </div>
            {chatMessages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="h-7 px-2 text-xs text-white hover:text-foreground"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                New chat
              </Button>
            )}
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {chatMessages.length === 0 ? (
              <div className="space-y-4">
                {/* Welcome Message */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-purple-500/10 rounded-2xl rounded-tl-none p-4">
                      <p className="text-sm text-foreground leading-relaxed">
                        Hey{userName ? ` ${userName}` : ''}! I'm your Mental Health Mate - an AI companion designed to support electricians and apprentices like you.
                      </p>
                      <p className="text-sm text-foreground/80 mt-2 leading-relaxed">
                        Whether you're stressed, anxious, or just need someone to talk to, I'm here 24/7. Everything you share stays private.
                      </p>
                      <p className="text-xs text-white mt-3">
                        What would you like to talk about?
                      </p>
                    </div>

                    {/* Quick Prompts */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {quickPrompts.map((prompt, i) => {
                        const Icon = prompt.icon;
                        return (
                          <button
                            key={i}
                            onClick={() => handleAIChat(prompt.text)}
                            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-full bg-white/10 text-foreground/80
                              hover:bg-white/20 active:scale-95 transition-all border border-white/10"
                          >
                            <Icon className="h-3 w-3" />
                            {prompt.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-blue-500'
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {message.type === 'user' ? (
                        <Users className="h-5 w-5 text-foreground" />
                      ) : (
                        <Bot className="h-5 w-5 text-foreground" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                      <div className={`max-w-[85%] rounded-2xl p-4 ${
                        message.type === 'user'
                          ? 'bg-blue-500 rounded-tr-none'
                          : 'bg-purple-500/10 rounded-tl-none'
                      }`}>
                        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{message.content}</p>

                        {/* Action Button */}
                        {message.action && (
                          <Button
                            onClick={() => handleActionClick(message.action)}
                            className={`mt-3 w-full ${
                              message.action.type === 'crisis'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-purple-500 hover:bg-purple-600'
                            }`}
                            size="sm"
                          >
                            {message.action.type === 'breathing' && <Wind className="h-4 w-4 mr-2" />}
                            {message.action.type === 'grounding' && <Target className="h-4 w-4 mr-2" />}
                            {message.action.type === 'crisis' && <Phone className="h-4 w-4 mr-2" />}
                            {message.action.type === 'journal' && <BookHeart className="h-4 w-4 mr-2" />}
                            {message.action.label}
                          </Button>
                        )}
                      </div>

                      {/* Suggestions */}
                      {message.type === 'ai' && message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-foreground/70
                                hover:bg-white/10 active:scale-95 transition-all border border-white/10"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="h-5 w-5 text-foreground animate-spin" />
                </div>
                <div className="bg-purple-500/10 rounded-2xl rounded-tl-none p-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-purple-400/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-purple-500/20 p-3 bg-purple-500/5">
            <div className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Share what's on your mind..."
                className="flex-1 min-h-[48px] max-h-32 resize-none bg-white/5 border-white/10 text-sm"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAIChat();
                  }
                }}
              />
              <Button
                onClick={() => handleAIChat()}
                disabled={!inputMessage.trim() || isLoading}
                className="h-12 w-12 p-0 bg-purple-500 hover:bg-purple-600"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crisis Banner */}
      <Card className="border-red-500/40 bg-gradient-to-r from-red-500/20 to-red-600/10">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-400">In crisis?</p>
              <p className="text-xs text-red-300/80">
                Call <a href="tel:116123" className="font-bold underline">116 123</a> (Samaritans 24/7) or text SHOUT to 85258
              </p>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600 flex-shrink-0" asChild>
              <a href="tel:116123">
                <Phone className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Peer Support Section */}
      <Card className="border-white/10 bg-white/5 overflow-hidden">
        <button
          onClick={() => setShowPeers(!showPeers)}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground text-sm">Talk to a Real Person</h3>
              <p className="text-xs text-white">Connect with trained peer supporters</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {availableMates.filter(m => m.status === 'Available').slice(0, 3).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-green-500/30 border-2 border-background flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              ))}
            </div>
            <ChevronDown className={`h-5 w-5 text-white transition-transform ${showPeers ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {showPeers && (
          <CardContent className="p-3 pt-0 space-y-3">
            {/* Available Mates */}
            <div className="space-y-2">
              {availableMates.map(mate => (
                <Link
                  key={mate.id}
                  to={`/messages?contact=${mate.id}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10
                    active:scale-[0.98] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-400" />
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${
                        mate.status === "Available" ? "bg-green-500" : "bg-amber-500"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-foreground">{mate.name}</p>
                        {mate.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400">
                            {mate.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white">{mate.role}</p>
                    </div>
                  </div>
                  <MessageCircle className="h-5 w-5 text-green-400" />
                </Link>
              ))}
            </div>

            {/* Become a Mate */}
            {!isVolunteer ? (
              <button
                onClick={handleBecomeMate}
                className="w-full p-4 rounded-lg border border-dashed border-purple-500/30 bg-purple-500/5
                  flex flex-col items-center gap-2 text-sm
                  hover:bg-purple-500/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <UserPlus className="h-6 w-6 text-purple-400" />
                </div>
                <span className="font-medium text-purple-300">Become a Mental Health Mate</span>
                <span className="text-xs text-white text-center">
                  Volunteer to support fellow electricians
                </span>
              </button>
            ) : (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Heart className="h-6 w-6 text-green-400 fill-current" />
                  <span className="font-medium text-green-400">You're a Mental Health Mate</span>
                  <span className="text-xs text-white">Thank you for supporting others</span>
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Features Hint */}
      <div className="flex items-center justify-center gap-4 text-xs text-white">
        <div className="flex items-center gap-1">
          <Lightbulb className="h-3 w-3" />
          <span>AI learns your preferences</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
        <div className="flex items-center gap-1">
          <Heart className="h-3 w-3" />
          <span>100% confidential</span>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthMate;
