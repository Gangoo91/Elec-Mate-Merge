import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  PageFrame,
  PageHero,
  StatStrip,
  Pill,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LTIPlatform {
  id: string;
  name: string;
  type: 'canvas' | 'moodle' | 'blackboard' | 'other';
  status: 'Connected' | 'Disconnected' | 'Pending';
  url: string;
  clientId: string;
  deploymentId?: string;
  lastSync: string | null;
  features: {
    deepLinking: boolean;
    gradeSync: boolean;
    rosterSync: boolean;
  };
  stats: {
    launches: number;
    courses: number;
    users: number;
  };
}

const initialPlatforms: LTIPlatform[] = [];

// Real LTI 1.3 backend (Supabase Edge Functions)
const LTI_BASE = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1';

const ltiConfig = {
  toolUrl: LTI_BASE + '/lti-launch',
  jwksUrl: LTI_BASE + '/lti-jwks',
  deepLinkUrl: LTI_BASE + '/lti-deep-link',
  redirectUris: [LTI_BASE + '/lti-launch'],
  oidcInitUrl: LTI_BASE + '/lti-oidc-init',
};

export function LTISettingsSection() {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<LTIPlatform[]>(initialPlatforms);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<'canvas' | 'moodle' | 'blackboard' | null>(
    null
  );
  const [isConfigureDialogOpen, setIsConfigureDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<LTIPlatform | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  // New platform form state
  const [newPlatform, setNewPlatform] = useState({
    name: '',
    type: 'canvas' as const,
    url: '',
    clientId: '',
    deploymentId: '',
  });

  const handleCopyToClipboard = (text: string, field: string) => {
    copyToClipboard(text);
    setCopiedField(field);
    toast({
      title: 'Copied to clipboard',
      description: 'Value has been copied successfully',
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddPlatform = () => {
    if (!newPlatform.name || !newPlatform.url || !newPlatform.clientId) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const platform: LTIPlatform = {
      id: `lti-${Date.now()}`,
      name: newPlatform.name,
      type: newPlatform.type,
      status: 'Pending',
      url: newPlatform.url,
      clientId: newPlatform.clientId,
      deploymentId: newPlatform.deploymentId,
      lastSync: null,
      features: {
        deepLinking: false,
        gradeSync: false,
        rosterSync: false,
      },
      stats: {
        launches: 0,
        courses: 0,
        users: 0,
      },
    };

    setPlatforms([...platforms, platform]);
    setNewPlatform({ name: '', type: 'canvas', url: '', clientId: '', deploymentId: '' });
    setIsAddDialogOpen(false);
    toast({
      title: 'Platform added',
      description: 'Complete the setup in your LMS to finish connection',
    });
  };

  const handleSync = async (platformId: string) => {
    toast({
      title: 'Sync unavailable',
      description:
        'LTI edge functions are not yet deployed. Deploy lti-launch, lti-jwks, lti-deep-link, and lti-oidc-init first.',
    });
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.filter((p) => p.id !== platformId));
    toast({
      title: 'Platform disconnected',
      description: 'The LTI connection has been removed',
    });
  };

  const handleToggleFeature = (platformId: string, feature: keyof LTIPlatform['features']) => {
    setPlatforms(
      platforms.map((p) =>
        p.id === platformId
          ? { ...p, features: { ...p.features, [feature]: !p.features[feature] } }
          : p
      )
    );
    toast({
      title: 'Feature updated',
      description: 'Changes will take effect on next launch',
    });
  };

  const openSetupGuide = (type: 'canvas' | 'moodle' | 'blackboard') => {
    setSelectedGuide(type);
    setIsSetupGuideOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Disconnected':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Pending':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default:
        return 'bg-muted text-white';
    }
  };

  const getPlatformColor = (type: string) => {
    const colors: Record<string, string> = {
      canvas: 'bg-red-500',
      moodle: 'bg-orange-500',
      blackboard: 'bg-gray-700',
      other: 'bg-elec-yellow',
    };
    return colors[type] || 'bg-elec-yellow';
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · VLE Integration"
          title="LTI & VLE integration"
          description="Connect to Canvas, Moodle, Blackboard and other LMS platforms via LTI 1.3."
          tone="blue"
          actions={
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add platform →
            </button>
          }
        />
      </motion.div>

      {/* Connection Overview */}
      <motion.div variants={itemVariants}>
        <StatStrip
          columns={3}
          stats={[
            {
              value: platforms.filter((p) => p.status === 'Connected').length,
              label: 'Connected',
              sub: 'Active platforms',
              tone: 'green',
            },
            {
              value: platforms.reduce((sum, p) => sum + p.stats.launches, 0),
              label: 'Launches',
              sub: 'Total tool launches',
              tone: 'yellow',
            },
            {
              value: platforms.reduce((sum, p) => sum + p.stats.users, 0),
              label: 'Users',
              sub: 'Linked accounts',
              tone: 'blue',
            },
          ]}
        />
      </motion.div>

      <Tabs defaultValue="platforms">
        <TabsList className="inline-flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full h-auto w-auto">
          <TabsTrigger
            value="platforms"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Platforms
          </TabsTrigger>
          <TabsTrigger
            value="config"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Configuration
          </TabsTrigger>
          <TabsTrigger
            value="guides"
            className="px-4 py-1.5 rounded-full text-[12.5px] font-medium data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/70"
          >
            Setup guides
          </TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-5 mt-6">
          {platforms.length === 0 ? (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-8 sm:p-12 text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                No platforms connected
              </div>
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Connect your first VLE
              </h3>
              <p className="mt-3 text-[13px] text-white/55 max-w-md mx-auto leading-relaxed">
                Link Canvas, Moodle or Blackboard via LTI 1.3 for single sign-on, grade sync and
                roster import.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
                >
                  Add platform →
                </button>
                <button
                  onClick={() => openSetupGuide('canvas')}
                  className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
                >
                  View guide
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {platforms.map((platform) => {
                const platformTone: Tone =
                  platform.type === 'canvas'
                    ? 'red'
                    : platform.type === 'moodle'
                      ? 'orange'
                      : platform.type === 'blackboard'
                        ? 'indigo'
                        : 'yellow';
                const statusTone: Tone =
                  platform.status === 'Connected'
                    ? 'green'
                    : platform.status === 'Disconnected'
                      ? 'red'
                      : 'amber';
                return (
                  <div
                    key={platform.id}
                    className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden"
                  >
                    <div
                      className={cn(
                        'h-px',
                        platformTone === 'red' && 'bg-red-400/60',
                        platformTone === 'orange' && 'bg-orange-400/60',
                        platformTone === 'indigo' && 'bg-indigo-400/60',
                        platformTone === 'yellow' && 'bg-elec-yellow/60'
                      )}
                    />
                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                            {platform.type}
                          </div>
                          <h3 className="mt-1 text-lg sm:text-xl font-semibold text-white tracking-tight">
                            {platform.name}
                          </h3>
                          <p className="mt-0.5 text-[12px] text-white/50 truncate">
                            {platform.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Pill tone={statusTone}>{platform.status}</Pill>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="text-white/50 hover:text-white text-[18px] leading-none px-1 touch-manipulation"
                                aria-label="Options"
                              >
                                ⋯
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => {
                                  setSelectedPlatform(platform);
                                  setIsConfigureDialogOpen(true);
                                }}
                              >
                                Configure
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => handleSync(platform.id)}
                              >
                                {isSyncing === platform.id ? 'Syncing…' : 'Sync now'}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="h-11"
                                onClick={() => openExternalUrl(platform.url)}
                              >
                                Open LMS
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="h-11 text-red-400"
                                onClick={() => handleDisconnect(platform.id)}
                              >
                                Disconnect
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Feature Toggles */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { key: 'deepLinking' as const, label: 'Deep linking' },
                          { key: 'gradeSync' as const, label: 'Grade sync' },
                          { key: 'rosterSync' as const, label: 'Roster sync' },
                        ].map((feat) => {
                          const enabled = platform.features[feat.key];
                          return (
                            <button
                              key={feat.key}
                              onClick={() => handleToggleFeature(platform.id, feat.key)}
                              className="flex items-center justify-between px-4 py-3 bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl hover:bg-[hsl(0_0%_13%)] transition-colors touch-manipulation text-left"
                            >
                              <span className="text-[12px] text-white/70">{feat.label}</span>
                              <Pill tone={enabled ? 'green' : 'yellow'}>
                                {enabled ? 'On' : 'Off'}
                              </Pill>
                            </button>
                          );
                        })}
                      </div>

                      {/* Stats */}
                      <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-wrap items-center gap-x-5 gap-y-1 text-[11.5px] text-white/50">
                        <span className="tabular-nums">
                          {platform.stats.launches.toLocaleString()} launches
                        </span>
                        <span className="tabular-nums">{platform.stats.courses} courses</span>
                        <span className="tabular-nums">{platform.stats.users} users</span>
                        {platform.lastSync && (
                          <span className="tabular-nums">
                            Last sync{' '}
                            {new Date(platform.lastSync).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="config" className="space-y-6 mt-6">
          {/* LTI Tool Configuration */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              LTI 1.3 Tool Configuration
            </div>
            <p className="mt-2 text-[12.5px] text-white/55 leading-relaxed">
              Copy these values when registering Elec-Mate as an LTI tool in your LMS.
            </p>

            <div className="mt-5 space-y-3">
              {[
                { label: 'Tool launch URL', value: ltiConfig.toolUrl, key: 'toolUrl' },
                {
                  label: 'OIDC initiation URL',
                  value: ltiConfig.oidcInitUrl,
                  key: 'oidcInitUrl',
                },
                { label: 'JWKS URL (public key set)', value: ltiConfig.jwksUrl, key: 'jwksUrl' },
                { label: 'Deep linking URL', value: ltiConfig.deepLinkUrl, key: 'deepLinkUrl' },
                {
                  label: 'Redirect URIs',
                  value: ltiConfig.redirectUris.join(', '),
                  key: 'redirectUris',
                },
              ].map((item) => (
                <div key={item.key}>
                  <Label className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                    {item.label}
                  </Label>
                  <div className="mt-1.5 flex gap-2">
                    <input
                      value={item.value}
                      readOnly
                      className="flex-1 h-11 px-4 font-mono text-[12.5px] bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
                    />
                    <button
                      onClick={() => handleCopyToClipboard(item.value, item.key)}
                      className="h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] text-white rounded-xl text-[12.5px] font-medium hover:bg-[hsl(0_0%_13%)] transition-colors touch-manipulation whitespace-nowrap"
                    >
                      {copiedField === item.key ? 'Copied ✓' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Security Settings
            </div>
            <div className="mt-4 divide-y divide-white/[0.06]">
              {[
                {
                  label: 'Require state parameter',
                  desc: 'Enforce state validation for the OIDC flow.',
                  default: true,
                },
                {
                  label: 'Validate nonce',
                  desc: 'Prevents replay attacks on authentication tokens.',
                  default: true,
                },
                {
                  label: 'Auto-provision users',
                  desc: 'Create accounts automatically on first LTI launch.',
                  default: true,
                },
                {
                  label: 'Sync grades automatically',
                  desc: 'Push grades to LMS when recorded in Elec-Mate.',
                  default: false,
                },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-medium text-white">{setting.label}</div>
                    <div className="mt-0.5 text-[11.5px] text-white/50">{setting.desc}</div>
                  </div>
                  <Switch defaultChecked={setting.default} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {[
              { type: 'canvas' as const, name: 'Canvas LMS', desc: 'Instructure Canvas', tone: 'red' as Tone },
              { type: 'moodle' as const, name: 'Moodle', desc: 'Moodle LMS 4.x', tone: 'orange' as Tone },
              { type: 'blackboard' as const, name: 'Blackboard', desc: 'Blackboard Learn', tone: 'indigo' as Tone },
            ].map((guide) => (
              <button
                key={guide.type}
                onClick={() => openSetupGuide(guide.type)}
                className="group relative bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 text-left touch-manipulation flex flex-col min-h-[180px]"
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px opacity-70 group-hover:opacity-100 transition-opacity',
                    guide.tone === 'red' && 'bg-red-400',
                    guide.tone === 'orange' && 'bg-orange-400',
                    guide.tone === 'indigo' && 'bg-indigo-400'
                  )}
                />
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Setup Guide
                </div>
                <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white tracking-tight">
                  {guide.name}
                </h3>
                <p className="mt-1 text-[12.5px] text-white/50">{guide.desc}</p>
                <div className="flex-grow" />
                <div className="mt-4 text-[12px] font-medium text-elec-yellow/80 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all">
                  View guide →
                </div>
              </button>
            ))}
          </div>

          {/* Quick Start */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
              Quick Start
            </div>
            <h3 className="mt-2 text-lg sm:text-xl font-semibold text-white tracking-tight">
              Four steps to connect
            </h3>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  step: '01',
                  title: 'Register tool',
                  desc: 'Add Elec-Mate as an LTI tool in your LMS admin panel.',
                },
                {
                  step: '02',
                  title: 'Copy config',
                  desc: 'Use the values from the Configuration tab.',
                },
                {
                  step: '03',
                  title: 'Add platform',
                  desc: 'Enter your LMS details in the Platforms tab.',
                },
                {
                  step: '04',
                  title: 'Test launch',
                  desc: 'Create a test assignment and verify the connection.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-[hsl(0_0%_10%)] border border-white/[0.06] rounded-xl p-4"
                >
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Step {item.step}
                  </div>
                  <h4 className="mt-2 text-[14px] font-semibold text-white">{item.title}</h4>
                  <p className="mt-1 text-[11.5px] text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Platform Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>Add LTI Platform</DialogTitle>
            <DialogDescription>
              Connect a new Learning Management System using LTI 1.3
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Platform Name *</Label>
              <Input
                placeholder="e.g., Canvas Production"
                value={newPlatform.name}
                onChange={(e) => setNewPlatform({ ...newPlatform, name: e.target.value })}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label>Platform Type *</Label>
              <Select
                value={newPlatform.type}
                onValueChange={(value: 'canvas' | 'moodle' | 'blackboard' | 'other') =>
                  setNewPlatform({ ...newPlatform, type: value })
                }
              >
                <SelectTrigger className="bg-elec-gray border-elec-yellow/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="canvas">Canvas</SelectItem>
                  <SelectItem value="moodle">Moodle</SelectItem>
                  <SelectItem value="blackboard">Blackboard</SelectItem>
                  <SelectItem value="other">Other LTI 1.3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Platform URL *</Label>
              <Input
                placeholder="https://your-lms.example.com"
                value={newPlatform.url}
                onChange={(e) => setNewPlatform({ ...newPlatform, url: e.target.value })}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
            <div className="space-y-2">
              <Label>Client ID *</Label>
              <Input
                placeholder="Enter the client ID from your LMS"
                value={newPlatform.clientId}
                onChange={(e) => setNewPlatform({ ...newPlatform, clientId: e.target.value })}
                className="bg-elec-gray border-elec-yellow/20"
              />
              <p className="text-xs text-white">
                Found in your LMS after registering Elec-Mate as an LTI tool
              </p>
            </div>
            <div className="space-y-2">
              <Label>Deployment ID (optional)</Label>
              <Input
                placeholder="Enter deployment ID if available"
                value={newPlatform.deploymentId}
                onChange={(e) => setNewPlatform({ ...newPlatform, deploymentId: e.target.value })}
                className="bg-elec-gray border-elec-yellow/20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              onClick={handleAddPlatform}
            >
              Add Platform
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Setup Guide Dialog */}
      <Dialog open={isSetupGuideOpen} onOpenChange={setIsSetupGuideOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>
              {selectedGuide === 'canvas' && 'Canvas LMS setup guide'}
              {selectedGuide === 'moodle' && 'Moodle setup guide'}
              {selectedGuide === 'blackboard' && 'Blackboard Learn setup guide'}
            </DialogTitle>
            <DialogDescription>
              Follow these steps to connect your LMS to Elec-Mate
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {selectedGuide === 'canvas' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        1
                      </div>
                      Access Developer Keys
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>1. Log in to Canvas as an admin</p>
                    <p>
                      2. Go to <strong>Admin → Developer Keys</strong>
                    </p>
                    <p>
                      3. Click <strong>+ Developer Key → + LTI Key</strong>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        2
                      </div>
                      Configure LTI Key
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Key Name:</strong> Elec-Mate
                      </li>
                      <li>
                        <strong>Redirect URIs:</strong> {ltiConfig.redirectUris[0]}
                      </li>
                      <li>
                        <strong>Method:</strong> Manual Entry
                      </li>
                      <li>
                        <strong>Target Link URI:</strong> {ltiConfig.toolUrl}
                      </li>
                      <li>
                        <strong>OpenID Connect Initiation URL:</strong> {ltiConfig.oidcInitUrl}
                      </li>
                      <li>
                        <strong>JWK Method:</strong> Public JWK URL
                      </li>
                      <li>
                        <strong>Public JWK URL:</strong> {ltiConfig.jwksUrl}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        3
                      </div>
                      Enable Additional Features
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Under LTI Advantage Services, enable:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Can create and view assignment data in the gradebook</li>
                      <li>Can view assignment data in the gradebook</li>
                      <li>Can view submission data for assignments</li>
                      <li>Can access Names and Roles Provisioning</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        4
                      </div>
                      Save and Copy Client ID
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>
                      1. Click <strong>Save</strong>
                    </p>
                    <p>
                      2. Set the key state to <strong>ON</strong>
                    </p>
                    <p>
                      3. Copy the <strong>Client ID</strong> (shown in Details column)
                    </p>
                    <p>4. Add this platform in Elec-Mate using the Client ID</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {selectedGuide === 'moodle' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        1
                      </div>
                      Access External Tools
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>1. Log in to Moodle as an admin</p>
                    <p>
                      2. Go to{' '}
                      <strong>
                        Site Administration → Plugins → Activity modules → External tool → Manage
                        tools
                      </strong>
                    </p>
                    <p>
                      3. Click <strong>configure a tool manually</strong>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        2
                      </div>
                      Configure Tool Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Tool name:</strong> Elec-Mate
                      </li>
                      <li>
                        <strong>Tool URL:</strong> {ltiConfig.toolUrl}
                      </li>
                      <li>
                        <strong>LTI version:</strong> LTI 1.3
                      </li>
                      <li>
                        <strong>Public key type:</strong> Keyset URL
                      </li>
                      <li>
                        <strong>Public keyset:</strong> {ltiConfig.jwksUrl}
                      </li>
                      <li>
                        <strong>Initiate login URL:</strong> {ltiConfig.oidcInitUrl}
                      </li>
                      <li>
                        <strong>Redirection URI(s):</strong> {ltiConfig.redirectUris[0]}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        3
                      </div>
                      Enable Services
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Under Services, set these to "Use this service":</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>IMS LTI Assignment and Grade Services</li>
                      <li>IMS LTI Names and Role Provisioning Services</li>
                    </ul>
                    <p className="mt-2">Under Privacy, set:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Share launcher's name: Always</li>
                      <li>Share launcher's email: Always</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        4
                      </div>
                      Save and Get Credentials
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>
                      1. Click <strong>Save changes</strong>
                    </p>
                    <p>
                      2. Click on <strong>View configuration details</strong>
                    </p>
                    <p>
                      3. Copy the <strong>Client ID</strong>
                    </p>
                    <p>4. Add this platform in Elec-Mate using the Client ID</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {selectedGuide === 'blackboard' && (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="step1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        1
                      </div>
                      Access LTI Tool Providers
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>1. Log in to Blackboard as an admin</p>
                    <p>
                      2. Go to <strong>System Admin → Integrations → LTI Tool Providers</strong>
                    </p>
                    <p>
                      3. Click <strong>Register LTI 1.3/Advantage Tool</strong>
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        2
                      </div>
                      Register the Tool
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Client ID:</strong> (generated by Blackboard)
                      </li>
                      <li>
                        <strong>Tool Provider Key:</strong> {ltiConfig.toolUrl}
                      </li>
                      <li>
                        <strong>Tool Provider Secret:</strong> (leave blank for LTI 1.3)
                      </li>
                      <li>
                        <strong>Tool Provider Domain:</strong> jtwygbeceundfgnkirof.supabase.co
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        3
                      </div>
                      Configure LTI 1.3 Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>In the LTI 1.3 configuration:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Login Initiation URL:</strong> {ltiConfig.oidcInitUrl}
                      </li>
                      <li>
                        <strong>Tool Redirect URL:</strong> {ltiConfig.redirectUris[0]}
                      </li>
                      <li>
                        <strong>Tool JWKS URL:</strong> {ltiConfig.jwksUrl}
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">
                        4
                      </div>
                      Complete Registration
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-white space-y-2 pl-9">
                    <p>
                      1. Enable <strong>Course Memberships Service</strong>
                    </p>
                    <p>
                      2. Enable <strong>Assignment and Grades Service</strong>
                    </p>
                    <p>
                      3. Click <strong>Submit</strong>
                    </p>
                    <p>
                      4. Copy the generated <strong>Application ID</strong> (Client ID)
                    </p>
                    <p>5. Add this platform in Elec-Mate</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSetupGuideOpen(false)}>
              Close
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              onClick={() => {
                setIsSetupGuideOpen(false);
                setIsAddDialogOpen(true);
              }}
            >
              Add Platform →
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure Platform Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent className="max-w-lg bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>Configure {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>Update platform settings and features</DialogDescription>
          </DialogHeader>
          {selectedPlatform && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Platform Name</Label>
                <Input
                  defaultValue={selectedPlatform.name}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Platform URL</Label>
                <Input
                  defaultValue={selectedPlatform.url}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="space-y-2">
                <Label>Client ID</Label>
                <Input
                  defaultValue={selectedPlatform.clientId}
                  className="bg-elec-gray border-elec-yellow/20"
                />
              </div>
              <div className="pt-4 border-t border-elec-yellow/10">
                <h4 className="font-medium mb-3">Features</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Deep Linking</Label>
                    <Switch defaultChecked={selectedPlatform.features.deepLinking} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Grade Sync</Label>
                    <Switch defaultChecked={selectedPlatform.features.gradeSync} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Roster Sync</Label>
                    <Switch defaultChecked={selectedPlatform.features.rosterSync} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigureDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              onClick={() => {
                setIsConfigureDialogOpen(false);
                toast({
                  title: 'Settings saved',
                  description: 'Platform configuration has been updated',
                });
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageFrame>
  );
}
