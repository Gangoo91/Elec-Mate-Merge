import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Heart,
  MessageCircle,
  Loader2,
  AlertTriangle,
  ArrowLeft,
  Plus,
} from 'lucide-react';
import {
  PeerSupporter,
  PeerConversation,
  peerSupporterService,
  peerConversationService,
} from '@/services/peerSupportService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import AvailableSupporters from './AvailableSupporters';
import SupporterDashboard from './SupporterDashboard';
import BecomeSupporter from './BecomeSupporter';

interface PeerSupportHubProps {
  onClose?: () => void;
}

type ViewState = 'hub' | 'become-supporter' | 'chat';

const PeerSupportHub: React.FC<PeerSupportHubProps> = ({ onClose }) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const [viewState, setViewState] = useState<ViewState>('hub');
  const [myProfile, setMyProfile] = useState<PeerSupporter | null>(null);
  const [conversations, setConversations] = useState<PeerConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('browse');

  const loadData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const [profile, convos] = await Promise.all([
        peerSupporterService.getMyProfile(),
        peerConversationService.getMyConversations(),
      ]);
      setMyProfile(profile);
      setConversations(convos);
    } catch (error) {
      console.error('Error loading peer support data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleConnect = async (supporterId: string) => {
    setConnectingId(supporterId);
    try {
      const conversation = await peerConversationService.startConversation(supporterId);
      toast({
        title: "Connected!",
        description: "You can now start chatting. Be kind to each other.",
      });
      await loadData();
      // In a full implementation, this would navigate to the chat view
      setActiveTab('chats');
    } catch (error) {
      console.error('Connection error:', error);
      toast({
        title: "Connection failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setConnectingId(null);
    }
  };

  const handleProfileUpdated = () => {
    loadData();
  };

  // Not logged in
  if (!user) {
    return (
      <Card className="bg-white/[0.02] border-white/10">
        <CardContent className="py-12 text-center">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-2">Sign in Required</h3>
          <p className="text-sm text-white/80 max-w-xs mx-auto">
            Please sign in to access Mental Health Mates and connect with peer supporters.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-10 h-10 text-purple-400 animate-spin mb-4" />
        <p className="text-white/80">Loading Mental Health Mates...</p>
      </div>
    );
  }

  // Become Supporter View
  if (viewState === 'become-supporter') {
    return (
      <BecomeSupporter
        onSuccess={() => {
          loadData();
          setViewState('hub');
        }}
        onBack={() => setViewState('hub')}
      />
    );
  }

  // Main Hub View
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <Users className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Mental Health Mates</h1>
            <p className="text-sm text-white/80">Connect with someone who understands</p>
          </div>
        </div>
      </div>

      {/* Supporter Dashboard (if registered) */}
      {myProfile && (
        <SupporterDashboard
          profile={myProfile}
          onProfileUpdated={handleProfileUpdated}
        />
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/5">
          <TabsTrigger value="browse" className="gap-2 data-[state=active]:bg-purple-500/20">
            <Users className="w-4 h-4" />
            Find Support
          </TabsTrigger>
          <TabsTrigger value="chats" className="gap-2 data-[state=active]:bg-purple-500/20">
            <MessageCircle className="w-4 h-4" />
            My Chats
            {conversations.filter(c => c.status === 'active').length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full">
                {conversations.filter(c => c.status === 'active').length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Browse Supporters Tab */}
        <TabsContent value="browse" className="mt-6 space-y-6">
          {/* Become a Supporter CTA (if not registered) */}
          {!myProfile && (
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <CardContent className="p-5 relative">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/30">
                    <Heart className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-white mb-1">Want to help others?</h3>
                    <p className="text-sm text-white/80">
                      Become a Mental Health Mate and be there for fellow tradespeople
                    </p>
                  </div>
                  <Button
                    onClick={() => setViewState('become-supporter')}
                    className="bg-purple-500 hover:bg-purple-600 text-white gap-2 shadow-lg shadow-purple-500/25"
                  >
                    <Plus className="w-4 h-4" />
                    Sign Up
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Supporters Grid */}
          <AvailableSupporters
            onConnect={handleConnect}
            connectingId={connectingId}
            excludeUserId={user?.id}
          />
        </TabsContent>

        {/* My Chats Tab */}
        <TabsContent value="chats" className="mt-6">
          {conversations.length === 0 ? (
            <Card className="bg-white/[0.02] border-white/10">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-purple-400/50" />
                </div>
                <h3 className="font-semibold text-white mb-2">No conversations yet</h3>
                <p className="text-sm text-white/80 max-w-xs mx-auto mb-4">
                  Connect with a Mental Health Mate to start chatting
                </p>
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('browse')}
                  className="gap-2"
                >
                  <Users className="w-4 h-4" />
                  Find Someone to Chat With
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {conversations.map((convo) => (
                <Card
                  key={convo.id}
                  className={`
                    cursor-pointer transition-all hover:scale-[1.01]
                    ${convo.status === 'active'
                      ? 'bg-white/[0.03] border-purple-500/30 hover:border-purple-400/50'
                      : 'bg-white/[0.01] border-white/10 opacity-60'
                    }
                  `}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-white truncate">
                            {convo.supporter?.display_name || 'Supporter'}
                          </h4>
                          {convo.status === 'active' && (
                            <span className="flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/80">
                          {convo.status === 'active' ? 'Active conversation' : 'Conversation ended'}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        disabled={convo.status !== 'active'}
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30"
                      >
                        <MessageCircle className="w-4 h-4 mr-1.5" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Safety Notice */}
      <Card className="bg-amber-500/10 border-amber-500/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-300 mb-1">Important</p>
              <p className="text-white/80">
                Mental Health Mates are peer supporters, not professional counsellors.
                If you're in crisis, please call <a href="tel:116123" className="text-amber-300 font-medium hover:underline">116 123</a> (Samaritans)
                or text SHOUT to <span className="font-medium text-amber-300">85258</span>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerSupportHub;
