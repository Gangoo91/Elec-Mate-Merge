import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mic, ExternalLink, CheckCircle2, XCircle, HelpCircle, Building2, Wrench, Info } from 'lucide-react';
import { getSetting, setSetting } from '@/services/settingsService';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// Settings keys for different agents
const EMPLOYER_AGENT_KEY = 'elevenlabs_agent_id';
const EMPLOYER_API_KEY = 'elevenlabs_api_key';
const ELECTRICIAN_AGENT_KEY = 'elevenlabs_electrician_agent_id';

interface AgentConfig {
  agentId: string;
  apiKey?: string;
  isSaved: boolean;
  isApiKeySaved?: boolean;
}

const VoiceSettingsTab: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('electrician');

  // Electrician agent state
  const [electricianConfig, setElectricianConfig] = useState<AgentConfig>({
    agentId: '',
    isSaved: false,
  });

  // Employer agent state
  const [employerConfig, setEmployerConfig] = useState<AgentConfig>({
    agentId: '',
    apiKey: '',
    isSaved: false,
    isApiKeySaved: false,
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [electricianAgentId, employerAgentId, employerApiKey] = await Promise.all([
          getSetting(ELECTRICIAN_AGENT_KEY),
          getSetting(EMPLOYER_AGENT_KEY),
          getSetting(EMPLOYER_API_KEY),
        ]);

        if (electricianAgentId) {
          setElectricianConfig({ agentId: electricianAgentId, isSaved: true });
        }
        if (employerAgentId || employerApiKey) {
          setEmployerConfig({
            agentId: employerAgentId || '',
            apiKey: employerApiKey || '',
            isSaved: !!employerAgentId,
            isApiKeySaved: !!employerApiKey,
          });
        }
      } catch (error) {
        console.error('Failed to load voice settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  // Electrician agent handlers
  const saveElectricianAgent = async () => {
    if (electricianConfig.agentId.trim()) {
      try {
        await setSetting(ELECTRICIAN_AGENT_KEY, electricianConfig.agentId.trim());
        setElectricianConfig(prev => ({ ...prev, isSaved: true }));
        toast({
          title: 'Saved',
          description: 'Electrician Voice Agent ID has been saved',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save Agent ID',
          variant: 'destructive',
        });
      }
    }
  };

  const clearElectricianAgent = async () => {
    try {
      await setSetting(ELECTRICIAN_AGENT_KEY, '');
      setElectricianConfig({ agentId: '', isSaved: false });
      toast({
        title: 'Cleared',
        description: 'Electrician Voice Agent ID has been removed',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear Agent ID',
        variant: 'destructive',
      });
    }
  };

  // Employer agent handlers
  const saveEmployerAgent = async () => {
    if (employerConfig.agentId.trim()) {
      try {
        await setSetting(EMPLOYER_AGENT_KEY, employerConfig.agentId.trim());
        setEmployerConfig(prev => ({ ...prev, isSaved: true }));
        toast({
          title: 'Saved',
          description: 'Employer Voice Agent ID has been saved',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save Agent ID',
          variant: 'destructive',
        });
      }
    }
  };

  const clearEmployerAgent = async () => {
    try {
      await setSetting(EMPLOYER_AGENT_KEY, '');
      setEmployerConfig(prev => ({ ...prev, agentId: '', isSaved: false }));
      toast({
        title: 'Cleared',
        description: 'Employer Voice Agent ID has been removed',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear Agent ID',
        variant: 'destructive',
      });
    }
  };

  const saveEmployerApiKey = async () => {
    if (employerConfig.apiKey?.trim()) {
      try {
        await setSetting(EMPLOYER_API_KEY, employerConfig.apiKey.trim());
        setEmployerConfig(prev => ({ ...prev, isApiKeySaved: true }));
        toast({
          title: 'Saved',
          description: 'ElevenLabs API key has been saved',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to save API key',
          variant: 'destructive',
        });
      }
    }
  };

  const clearEmployerApiKey = async () => {
    try {
      await setSetting(EMPLOYER_API_KEY, '');
      setEmployerConfig(prev => ({ ...prev, apiKey: '', isApiKeySaved: false }));
      toast({
        title: 'Cleared',
        description: 'API key has been removed',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear API key',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 h-24" />
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 h-40" />
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 h-64" />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <Mic className="h-6 w-6 text-pink-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Voice Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure AI voice assistants for your hubs
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-yellow/5 border border-elec-yellow/20 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-foreground">
                ELEC-MATE uses <strong>ElevenLabs Conversational AI</strong> for voice assistants.
                Configure separate agents for different areas:
              </p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5 text-elec-yellow" />
                  <span><strong className="text-foreground">Electrician Hub</strong> - Quote building, invoicing, cost engineering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-blue-400" />
                  <span><strong className="text-foreground">Employer Hub</strong> - Team management, jobs, finance, HR</span>
                </li>
              </ul>
              <a
                href="https://elevenlabs.io/app/conversational-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-elec-yellow hover:underline mt-2"
              >
                Create an agent at ElevenLabs <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Agent Selection Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Electrician Hub Card */}
        <button
          onClick={() => setActiveTab('electrician')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'electrician'
              ? 'bg-elec-yellow/10 border-elec-yellow/30'
              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeTab === 'electrician' ? 'bg-elec-yellow/20' : 'bg-white/10'
            }`}>
              <Wrench className={`h-5 w-5 ${activeTab === 'electrician' ? 'text-elec-yellow' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="font-medium text-foreground">Electrician Hub</p>
              <p className="text-xs text-muted-foreground">Quote building & invoicing</p>
            </div>
            {electricianConfig.isSaved && (
              <div className="ml-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
            )}
          </div>
        </button>

        {/* Employer Hub Card */}
        <button
          onClick={() => setActiveTab('employer')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'employer'
              ? 'bg-blue-500/10 border-blue-500/30'
              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeTab === 'employer' ? 'bg-blue-500/20' : 'bg-white/10'
            }`}>
              <Building2 className={`h-5 w-5 ${activeTab === 'employer' ? 'text-blue-400' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <p className="font-medium text-foreground">Employer Hub</p>
              <p className="text-xs text-muted-foreground">Team & business management</p>
            </div>
            {employerConfig.isSaved && (
              <div className="ml-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
            )}
          </div>
        </button>
      </motion.div>

      {/* Configuration Panel */}
      {activeTab === 'electrician' && (
        <motion.div
          key="electrician"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden"
        >
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Wrench className="h-4 w-4 text-elec-yellow" />
              Electrician Voice Assistant
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Voice control for quote building, invoicing, and cost engineering
            </p>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            {/* Agent ID Input */}
            <div className="space-y-2">
              <Label htmlFor="electrician-agent-id" className="text-sm font-medium text-foreground">
                ElevenLabs Agent ID
              </Label>
              <div className="flex gap-2">
                <Input
                  id="electrician-agent-id"
                  value={electricianConfig.agentId}
                  onChange={(e) => {
                    setElectricianConfig(prev => ({
                      ...prev,
                      agentId: e.target.value,
                      isSaved: false
                    }));
                  }}
                  placeholder="Enter your Agent ID..."
                  className="flex-1 bg-white/5 border-white/10 focus:border-elec-yellow/50"
                />
                <Button
                  onClick={saveElectricianAgent}
                  disabled={!electricianConfig.agentId.trim() || electricianConfig.isSaved}
                  className={electricianConfig.isSaved
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark"}
                >
                  {electricianConfig.isSaved ? <CheckCircle2 className="h-4 w-4" /> : 'Save'}
                </Button>
                {electricianConfig.isSaved && (
                  <Button variant="outline" onClick={clearElectricianAgent} className="border-white/10 hover:bg-white/5">
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                This agent will be used in the Electrician Hub (Quote Builder, Invoices, etc.)
              </p>
            </div>

            {/* Status indicator */}
            <div className={`rounded-lg p-4 flex items-center gap-3 ${
              electricianConfig.isSaved
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-white/5 border border-white/10'
            }`}>
              <div className={`h-3 w-3 rounded-full flex-shrink-0 ${
                electricianConfig.isSaved ? 'bg-green-500' : 'bg-muted-foreground'
              }`} />
              <span className="text-sm text-foreground">
                {electricianConfig.isSaved
                  ? 'Voice assistant configured - look for the mic button in the Electrician Hub'
                  : 'Not configured - enter your Agent ID above'}
              </span>
            </div>

            {/* Quick setup guide */}
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-3">
              <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                Quick Setup Guide
              </h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>
                  Create an agent at{' '}
                  <a
                    href="https://elevenlabs.io/app/conversational-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-elec-yellow hover:underline inline-flex items-center gap-1"
                  >
                    ElevenLabs <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>Configure the agent with your desired voice and personality</li>
                <li>Copy the Agent ID and paste above</li>
                <li>Go to the Quote Builder to test the voice assistant</li>
              </ol>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'employer' && (
        <motion.div
          key="employer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden"
        >
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-400" />
              Employer Voice Assistant
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Voice control for team management, jobs, finance, and HR
            </p>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            {/* Agent ID Input */}
            <div className="space-y-2">
              <Label htmlFor="employer-agent-id" className="text-sm font-medium text-foreground">
                ElevenLabs Agent ID
              </Label>
              <div className="flex gap-2">
                <Input
                  id="employer-agent-id"
                  value={employerConfig.agentId}
                  onChange={(e) => {
                    setEmployerConfig(prev => ({
                      ...prev,
                      agentId: e.target.value,
                      isSaved: false
                    }));
                  }}
                  placeholder="Enter your Agent ID..."
                  className="flex-1 bg-white/5 border-white/10 focus:border-blue-500/50"
                />
                <Button
                  onClick={saveEmployerAgent}
                  disabled={!employerConfig.agentId.trim() || employerConfig.isSaved}
                  className={employerConfig.isSaved
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-blue-500 hover:bg-blue-500/90 text-white"}
                >
                  {employerConfig.isSaved ? <CheckCircle2 className="h-4 w-4" /> : 'Save'}
                </Button>
                {employerConfig.isSaved && (
                  <Button variant="outline" onClick={clearEmployerAgent} className="border-white/10 hover:bg-white/5">
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* API Key Input */}
            <div className="space-y-2">
              <Label htmlFor="employer-api-key" className="text-sm font-medium text-foreground">
                ElevenLabs API Key <span className="text-muted-foreground font-normal">(Optional)</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="employer-api-key"
                  type="password"
                  value={employerConfig.apiKey}
                  onChange={(e) => {
                    setEmployerConfig(prev => ({
                      ...prev,
                      apiKey: e.target.value,
                      isApiKeySaved: false
                    }));
                  }}
                  placeholder="Enter your API Key..."
                  className="flex-1 bg-white/5 border-white/10 focus:border-blue-500/50"
                />
                <Button
                  onClick={saveEmployerApiKey}
                  disabled={!employerConfig.apiKey?.trim() || employerConfig.isApiKeySaved}
                  className={employerConfig.isApiKeySaved
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-blue-500 hover:bg-blue-500/90 text-white"}
                >
                  {employerConfig.isApiKeySaved ? <CheckCircle2 className="h-4 w-4" /> : 'Save'}
                </Button>
                {employerConfig.isApiKeySaved && (
                  <Button variant="outline" onClick={clearEmployerApiKey} className="border-white/10 hover:bg-white/5">
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                API key enables automatic tool sync from the Employer Settings panel
              </p>
            </div>

            {/* Status indicator */}
            <div className={`rounded-lg p-4 flex items-center gap-3 ${
              employerConfig.isSaved
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-white/5 border border-white/10'
            }`}>
              <div className={`h-3 w-3 rounded-full flex-shrink-0 ${
                employerConfig.isSaved ? 'bg-green-500' : 'bg-muted-foreground'
              }`} />
              <span className="text-sm text-foreground">
                {employerConfig.isSaved
                  ? 'Voice assistant configured - look for the mic button in the Employer Hub'
                  : 'Not configured - enter your Agent ID above'}
              </span>
            </div>

            {/* Advanced settings hint */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
              <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                For advanced tool configuration, use the Voice Settings panel in{' '}
                <span className="text-foreground font-medium">Employer Hub → Settings</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VoiceSettingsTab;
