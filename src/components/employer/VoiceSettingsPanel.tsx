import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  inputClass,
  fieldLabelClass,
  PrimaryButton,
  SecondaryButton,
} from './editorial';
import { cn } from '@/lib/utils';
import {
  Mic,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  Download,
  FileJson,
  Search,
  Wand2,
  RotateCcw,
  CloudUpload,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { getSetting, setSetting } from '@/services/settingsService';
import { supabase } from '@/integrations/supabase/client';
import { VoiceCommandCheatSheet } from './VoiceCommandCheatSheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ElevenLabsToolCard } from './ElevenLabsToolCard';
import { ElevenLabsSetupWizard } from './ElevenLabsSetupWizard';
import { useToolConfigProgress } from '@/hooks/useToolConfigProgress';
import {
  voiceToolsRegistry,
  getCategories,
  getToolsByCategory,
  searchTools,
  getTotalToolCount,
  formatToolForElevenLabs,
  exportAllToolsJSON,
  ELEC_MATE_SYSTEM_PROMPT,
  type VoiceTool,
} from '@/config/voiceToolsRegistry';
import { copyToClipboard as clipboardCopy } from '@/utils/clipboard';

const SETTINGS_KEY = 'elevenlabs_agent_id';
const API_KEY_SETTINGS_KEY = 'elevenlabs_api_key';

interface SyncResult {
  success: boolean;
  message: string;
  created: number;
  skipped: number;
  failed: number;
  totalAssigned: number;
  firstError?: string | null;
  details?: {
    createdTools: string[];
    skippedTools: string[];
    failedTools: { name: string; error: string }[];
  };
  systemPromptUpdated?: boolean;
}

// Navigation section enum values for reference
const NAVIGATION_SECTIONS = [
  'overview',
  'dashboard',
  'home',
  'peoplehub',
  'financehub',
  'jobshub',
  'safetyhub',
  'employees',
  'elecid',
  'timesheets',
  'comms',
  'talentpool',
  'vacancies',
  'quotes',
  'invoices',
  'tenders',
  'expenses',
  'procurement',
  'financials',
  'reports',
  'signatures',
  'pricebook',
  'jobpacks',
  'jobs',
  'jobboard',
  'timeline',
  'tracking',
  'progresslogs',
  'issues',
  'testing',
  'quality',
  'clientportal',
  'fleet',
  'photogallery',
  'rams',
  'incidents',
  'policies',
  'contracts',
  'training',
  'briefings',
  'compliance',
  'settings',
];

const DIALOG_OPTIONS = [
  'quote',
  'job',
  'employee',
  'invoice',
  'expense',
  'timeentry',
  'certification',
  'order',
  'supplier',
  'vacancy',
  'jobpack',
  'rams',
  'tender',
  'incident',
  'training',
  'briefing',
  'skill',
  'note',
  'workhistory',
];

// Generate full export for ElevenLabs
const generateFullExport = () => {
  const totalTools = getTotalToolCount();
  const categories = getCategories();

  return `# ELEC-MATE Voice Assistant Configuration for ElevenLabs
# Generated: ${new Date().toISOString()}
# Total Tools: ${totalTools}
# Categories: ${categories.length}

================================================================================
## SYSTEM PROMPT
================================================================================
Copy this ENTIRE section into your ElevenLabs agent's "System Prompt" field:

${ELEC_MATE_SYSTEM_PROMPT}

================================================================================
## TOOLS CONFIGURATION
================================================================================
Add each tool in the ElevenLabs "Client tools" section.
Total: ${totalTools} tools across ${categories.length} categories.

${categories
  .map((cat) => {
    const tools = getToolsByCategory(cat);
    return `### ${cat} (${tools.length} tools)
${tools.map((t) => `- ${t.name}: ${t.description}`).join('\n')}`;
  })
  .join('\n\n')}

================================================================================
## NAVIGATION REFERENCE (${NAVIGATION_SECTIONS.length} sections)
================================================================================
${NAVIGATION_SECTIONS.join(', ')}

================================================================================
## DIALOG OPTIONS (${DIALOG_OPTIONS.length} forms)
================================================================================
${DIALOG_OPTIONS.join(', ')}

================================================================================
## RECOMMENDED AGENT SETTINGS
================================================================================
- Voice: British English (George, Charlotte, or custom clone)
- Stability: 0.5 (balanced expressiveness)
- Similarity: 0.75 (close to original voice)
- Response format: Keep responses concise
- Silence detection: 1500ms
- Interruption sensitivity: Medium-High
- Max response length: Short to medium
- Enable ALL ${totalTools} tools listed above
- First message: "ELEC-MATE here. What can I help you with?"

================================================================================
## TOOLS JSON (for bulk import if supported)
================================================================================
${exportAllToolsJSON()}
`;
};

// Convert VoiceTool to format expected by ElevenLabsToolCard
const convertToolForCard = (tool: VoiceTool) => ({
  name: tool.name,
  description: tool.description,
  parameters: tool.parameters.map((p) => ({
    name: p.name,
    type: p.type,
    description: p.description,
    required: p.required,
    enum: p.enumValues,
  })),
  category: tool.category,
  waitForResponse: tool.waitForResponse,
  disableInterruptions: tool.disableInterruptions,
  executionMode: tool.executionMode === 'wait' ? ('deferred' as const) : ('immediate' as const),
});

const VoiceSettingsPanel: React.FC = () => {
  const { toast } = useToast();
  const [agentId, setAgentId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isApiKeySaved, setIsApiKeySaved] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'configured' | 'unconfigured'>('all');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [syncIncludePrompt, setSyncIncludePrompt] = useState(true);

  const {
    configuredTools,
    lastToolIndex,
    toggleToolConfigured,
    markToolConfigured,
    updateLastToolIndex,
    isToolConfigured,
    getConfiguredCount,
    resetProgress,
  } = useToolConfigProgress();

  const totalTools = getTotalToolCount();
  const categories = getCategories();
  const configuredCount = getConfiguredCount();
  const progressPercent = (configuredCount / totalTools) * 100;

  // Get grouped tools by category
  const groupedTools = categories.reduce(
    (acc, cat) => {
      acc[cat] = getToolsByCategory(cat);
      return acc;
    },
    {} as Record<string, VoiceTool[]>
  );

  // Filter tools based on search and filter mode
  const getFilteredTools = () => {
    let tools = searchQuery ? searchTools(searchQuery) : voiceToolsRegistry;

    if (filterMode === 'configured') {
      tools = tools.filter((t) => isToolConfigured(t.name));
    } else if (filterMode === 'unconfigured') {
      tools = tools.filter((t) => !isToolConfigured(t.name));
    }

    return tools;
  };

  const filteredTools = getFilteredTools();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const [agentIdValue, apiKeyValue] = await Promise.all([
          getSetting(SETTINGS_KEY),
          getSetting(API_KEY_SETTINGS_KEY),
        ]);
        if (agentIdValue) {
          setAgentId(agentIdValue);
          setIsSaved(true);
        }
        if (apiKeyValue) {
          setApiKey(apiKeyValue);
          setIsApiKeySaved(true);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

  const saveAgentId = async () => {
    if (agentId.trim()) {
      try {
        await setSetting(SETTINGS_KEY, agentId.trim());
        setIsSaved(true);
        toast({
          title: 'Saved',
          description: 'Voice assistant Agent ID has been saved',
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

  const clearAgentId = async () => {
    try {
      await setSetting(SETTINGS_KEY, '');
      setAgentId('');
      setIsSaved(false);
      toast({
        title: 'Cleared',
        description: 'Voice assistant Agent ID has been removed',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear Agent ID',
        variant: 'destructive',
      });
    }
  };

  const saveApiKey = async () => {
    if (apiKey.trim()) {
      try {
        await setSetting(API_KEY_SETTINGS_KEY, apiKey.trim());
        setIsApiKeySaved(true);
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

  const clearApiKey = async () => {
    try {
      await setSetting(API_KEY_SETTINGS_KEY, '');
      setApiKey('');
      setIsApiKeySaved(false);
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

  const syncToElevenLabs = async () => {
    if (!apiKey.trim() || !agentId.trim()) {
      toast({
        title: 'Missing Configuration',
        description: 'Please enter both Agent ID and API Key before syncing',
        variant: 'destructive',
      });
      return;
    }

    setIsSyncing(true);
    setSyncResult(null);

    try {
      // Call the elec-mate-merge edge function directly
      const response = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/sync-elevenlabs-tools',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            apiKey: apiKey.trim(),
            agentId: agentId.trim(),
            tools: voiceToolsRegistry,
            systemPrompt: syncIncludePrompt ? ELEC_MATE_SYSTEM_PROMPT : undefined,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      setSyncResult(data as SyncResult);

      if (data.success) {
        toast({
          title: 'Sync Complete',
          description: data.message,
        });
      } else {
        toast({
          title: 'Sync Failed',
          description: data.error || 'Unknown error occurred',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: 'Sync Failed',
        description: error instanceof Error ? error.message : 'Failed to sync tools',
        variant: 'destructive',
      });
      setSyncResult({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to sync tools',
        created: 0,
        skipped: 0,
        failed: totalTools,
        totalAssigned: 0,
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    await clipboardCopy(text);
    toast({
      title: 'Copied',
      description: `${label} copied to clipboard`,
    });
  };

  const copyToolForElevenLabs = (tool: VoiceTool) => {
    const formatted = formatToolForElevenLabs(tool);
    copyToClipboard(JSON.stringify(formatted, null, 2), tool.name);
  };

  if (isLoading) {
    return (
      <Card className="bg-[hsl(0_0%_12%)] border border-white/[0.06]">
        <CardContent className="py-8 text-center text-white">
          Loading settings...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[hsl(0_0%_12%)] border border-white/[0.06]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Mic className="h-5 w-5" />
          Voice Assistant Settings
        </CardTitle>
        <CardDescription className="text-white">
          Configure ELEC-MATE voice assistant powered by ElevenLabs -{' '}
          <strong>{totalTools} tools</strong>, {NAVIGATION_SECTIONS.length} navigation sections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="agent-id" className={fieldLabelClass}>
              ElevenLabs Agent ID
            </label>
            <div className="flex gap-2">
              <Input
                id="agent-id"
                value={agentId}
                onChange={(e) => {
                  setAgentId(e.target.value);
                  setIsSaved(false);
                }}
                placeholder="Enter your ElevenLabs Agent ID..."
                className={cn(inputClass, 'flex-1')}
              />
              <PrimaryButton onClick={saveAgentId} disabled={!agentId.trim() || isSaved}>
                {isSaved ? <CheckCircle2 className="h-4 w-4" /> : 'Save'}
              </PrimaryButton>
              {isSaved && (
                <SecondaryButton onClick={clearAgentId}>
                  <XCircle className="h-4 w-4" />
                </SecondaryButton>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="api-key" className={fieldLabelClass}>
              ElevenLabs API Key
            </label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setIsApiKeySaved(false);
                }}
                placeholder="Enter your ElevenLabs API Key..."
                className={cn(inputClass, 'flex-1')}
              />
              <PrimaryButton onClick={saveApiKey} disabled={!apiKey.trim() || isApiKeySaved}>
                {isApiKeySaved ? <CheckCircle2 className="h-4 w-4" /> : 'Save'}
              </PrimaryButton>
              {isApiKeySaved && (
                <SecondaryButton onClick={clearApiKey}>
                  <XCircle className="h-4 w-4" />
                </SecondaryButton>
              )}
            </div>
            <p className="text-[11px] text-white">
              Get your API key from{' '}
              <a
                href="https://elevenlabs.io/app/settings/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-elec-yellow hover:underline"
              >
                ElevenLabs Settings
              </a>
            </p>
          </div>
        </div>

        {/* Automatic Sync Section */}
        <div className="rounded-xl border border-elec-yellow/50 p-4 bg-elec-yellow/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold flex items-center gap-2 text-white">
                <CloudUpload className="h-5 w-5 text-elec-yellow" />
                Automatic Tool Sync
              </h4>
              <p className="text-sm text-white mt-1">
                Push all {totalTools} tools to ElevenLabs with one click
              </p>
            </div>
            <PrimaryButton
              onClick={syncToElevenLabs}
              disabled={isSyncing || !agentId.trim() || !apiKey.trim()}
            >
              {isSyncing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All Tools
                </>
              )}
            </PrimaryButton>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-prompt"
              checked={syncIncludePrompt}
              onChange={(e) => setSyncIncludePrompt(e.target.checked)}
              className="h-4 w-4 rounded border border-white/20 bg-[hsl(0_0%_9%)] accent-elec-yellow"
            />
            <label htmlFor="include-prompt" className={cn(fieldLabelClass, 'cursor-pointer mb-0')}>
              Also update system prompt
            </label>
          </div>

          {/* Sync Result */}
          {syncResult && (
            <div
              className={`rounded-lg p-3 ${syncResult.success ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
            >
              <p
                className={`font-medium ${syncResult.success ? 'text-green-400' : 'text-red-400'}`}
              >
                {syncResult.success ? '✓ ' : '✗ '}
                {syncResult.message}
              </p>
              <div className="mt-2 grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-green-500/20 rounded p-2">
                  <div className="font-bold text-green-400">{syncResult.created}</div>
                  <div className="text-white">Created</div>
                </div>
                <div className="bg-blue-500/20 rounded p-2">
                  <div className="font-bold text-blue-400">{syncResult.skipped}</div>
                  <div className="text-white">Existed</div>
                </div>
                <div className="bg-red-500/20 rounded p-2">
                  <div className="font-bold text-red-400">{syncResult.failed}</div>
                  <div className="text-white">Failed</div>
                </div>
                <div className="bg-elec-yellow/20 rounded p-2">
                  <div className="font-bold text-elec-yellow">{syncResult.totalAssigned}</div>
                  <div className="text-white">Total</div>
                </div>
              </div>
              {syncResult.firstError && (
                <div className="mt-2 p-2 bg-red-500/10 rounded text-xs">
                  <p className="text-red-400 font-medium">Error:</p>
                  <p className="text-red-300 break-all">{syncResult.firstError}</p>
                </div>
              )}
              {syncResult.systemPromptUpdated && (
                <p className="text-xs text-white mt-2">System prompt was also updated</p>
              )}
            </div>
          )}

          {(!agentId.trim() || !apiKey.trim()) && (
            <p className="text-xs text-amber-400">
              Enter both Agent ID and API Key above to enable sync
            </p>
          )}
        </div>

        {/* Progress Tracker */}
        <div className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.04] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-white">Configuration Progress</h4>
            <Badge
              variant={progressPercent === 100 ? 'default' : 'secondary'}
              className={
                progressPercent === 100
                  ? 'bg-emerald-500 text-black'
                  : 'bg-white/[0.06] text-white'
              }
            >
              {configuredCount} / {totalTools} tools
            </Badge>
          </div>
          <Progress value={progressPercent} className="h-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-white">{Math.round(progressPercent)}% complete</span>
            <div className="flex items-center gap-2">
              <SecondaryButton
                size="sm"
                onClick={resetProgress}
                disabled={configuredCount === 0}
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </SecondaryButton>
              <PrimaryButton size="sm" onClick={() => setShowWizard(true)}>
                <Wand2 className="h-3 w-3 mr-1" />
                Setup Wizard
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Quick Export Actions */}
        <div className="rounded-xl border border-white/[0.06] p-4 bg-elec-yellow/5 space-y-3">
          <h4 className="font-medium flex items-center gap-2 text-white">
            <Download className="h-4 w-4" />
            Quick Export to ElevenLabs
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <SecondaryButton
              size="sm"
              onClick={() => copyToClipboard(ELEC_MATE_SYSTEM_PROMPT, 'System prompt')}
              className="justify-start"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy System Prompt
            </SecondaryButton>
            <SecondaryButton
              size="sm"
              onClick={() => copyToClipboard(exportAllToolsJSON(), 'Tools JSON')}
              className="justify-start"
            >
              <FileJson className="h-4 w-4 mr-2" />
              Copy All Tools (JSON)
            </SecondaryButton>
            <SecondaryButton
              size="sm"
              onClick={() => copyToClipboard(generateFullExport(), 'Full configuration')}
              className="justify-start"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Everything
            </SecondaryButton>
          </div>
          <p className="text-[11px] text-white">
            Copy to ElevenLabs: System prompt → paste in System Prompt field, then use the Setup
            Wizard to add each tool
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.06] p-4 bg-white/[0.04]">
          <h4 className="font-medium mb-2 text-white">Quick Setup Guide</h4>
          <ol className="text-sm text-white space-y-1 list-decimal list-inside">
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
            <li>Use "Copy System Prompt" and paste into the System Prompt field</li>
            <li>Add each tool from the Tools section below (click to copy)</li>
            <li>Configure recommended settings (voice, stability, etc.)</li>
            <li>Copy your Agent ID and paste above</li>
          </ol>
        </div>

        {/* Tool Statistics */}
        <div className="rounded-xl border border-white/[0.06] p-4">
          <h4 className="font-medium mb-3 text-white">Tool Categories ({categories.length})</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = getToolsByCategory(cat).length;
              const isActive = selectedCategory === cat;
              return (
                <Badge
                  key={cat}
                  variant={isActive ? 'default' : 'outline'}
                  className={cn(
                    'cursor-pointer',
                    isActive
                      ? 'bg-elec-yellow text-black'
                      : 'border-white/[0.1] text-white bg-white/[0.04]'
                  )}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {cat} ({count})
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Navigation Reference Card */}
        <div className="rounded-xl border border-white/[0.06] p-4">
          <h4 className="font-medium mb-2 text-white">
            Navigation Sections ({NAVIGATION_SECTIONS.length})
          </h4>
          <p className="text-[11px] text-white mb-2">
            Voice can navigate to any of these sections using aliases:
          </p>
          <div className="text-xs font-mono bg-white/[0.06] text-white p-2 rounded-lg max-h-24 overflow-y-auto">
            {NAVIGATION_SECTIONS.join(', ')}
          </div>
        </div>

        {/* ALL TOOLS SECTION - Shown directly, not hidden */}
        <div className="space-y-4 rounded-xl border border-white/[0.06] p-4 bg-[hsl(0_0%_10%)]">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg text-white">All {totalTools} Tools</h4>
            <SecondaryButton
              size="sm"
              onClick={() => copyToClipboard(exportAllToolsJSON(), 'Tools JSON')}
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy All JSON
            </SecondaryButton>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2 flex-1 w-full">
              <Search className="h-4 w-4 text-white" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(inputClass, 'flex-1')}
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={filterMode === 'all' ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer',
                  filterMode === 'all'
                    ? 'bg-elec-yellow text-black'
                    : 'border-white/[0.1] text-white bg-white/[0.04]'
                )}
                onClick={() => setFilterMode('all')}
              >
                All ({totalTools})
              </Badge>
              <Badge
                variant={filterMode === 'configured' ? 'default' : 'outline'}
                className="cursor-pointer bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                onClick={() => setFilterMode('configured')}
              >
                ✓ Done ({configuredCount})
              </Badge>
              <Badge
                variant={filterMode === 'unconfigured' ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer',
                  filterMode === 'unconfigured'
                    ? 'bg-elec-yellow text-black'
                    : 'border-white/[0.1] text-white bg-white/[0.04]'
                )}
                onClick={() => setFilterMode('unconfigured')}
              >
                Remaining ({totalTools - configuredCount})
              </Badge>
            </div>
          </div>

          {/* Showing X of Y indicator */}
          <div className="flex items-center justify-between text-sm text-white border-b border-white/[0.06] pb-2">
            <span>
              Showing {filteredTools.length} of {totalTools} tools
            </span>
            {(searchQuery || filterMode !== 'all') && (
              <SecondaryButton
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setFilterMode('all');
                }}
              >
                Clear filters
              </SecondaryButton>
            )}
          </div>

          {/* Tools List - Large scroll area */}
          <ScrollArea className="h-[70vh] max-h-[800px]">
            <div className="space-y-2 pr-4">
              {filteredTools.map((tool, index) => (
                <ElevenLabsToolCard
                  key={tool.name}
                  tool={convertToolForCard(tool)}
                  index={voiceToolsRegistry.findIndex((t) => t.name === tool.name)}
                  totalTools={totalTools}
                  isConfigured={isToolConfigured(tool.name)}
                  onToggleConfigured={toggleToolConfigured}
                />
              ))}
              {filteredTools.length === 0 && (
                <div className="text-center text-white py-8">
                  No tools match your search/filter criteria
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Voice Command Cheat Sheet */}
        <div className="mt-6">
          <VoiceCommandCheatSheet />
        </div>
      </CardContent>

      {/* Setup Wizard Modal */}
      {showWizard && (
        <ElevenLabsSetupWizard
          tools={voiceToolsRegistry.map(convertToolForCard)}
          configuredTools={configuredTools}
          lastToolIndex={lastToolIndex}
          onMarkConfigured={markToolConfigured}
          onUpdateLastIndex={updateLastToolIndex}
          onClose={() => setShowWizard(false)}
        />
      )}
    </Card>
  );
};

export default VoiceSettingsPanel;
