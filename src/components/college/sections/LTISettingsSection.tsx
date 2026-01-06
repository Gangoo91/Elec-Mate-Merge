import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CollegeSectionHeader } from "@/components/college/CollegeSectionHeader";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Plug,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MoreVertical,
  RefreshCw,
  Copy,
  ExternalLink,
  Key,
  Link2,
  Shield,
  Users,
  FileCheck,
  Trash2,
  ChevronRight,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Zap,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Mock LTI platform data
const initialPlatforms: LTIPlatform[] = [
  {
    id: 'lti-1',
    name: 'Canvas LMS',
    type: 'canvas',
    status: 'Connected',
    url: 'https://college.instructure.com',
    clientId: 'canvas_client_12345',
    deploymentId: '1:abc123',
    lastSync: '2024-01-15T10:30:00Z',
    features: {
      deepLinking: true,
      gradeSync: true,
      rosterSync: true,
    },
    stats: {
      launches: 1234,
      courses: 8,
      users: 156,
    },
  },
];

// Real LTI 1.3 backend (Supabase Edge Functions)
const LTI_BASE = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1';

const ltiConfig = {
  toolUrl: LTI_BASE + "/lti-launch",
  jwksUrl: LTI_BASE + "/lti-jwks",
  deepLinkUrl: LTI_BASE + "/lti-deep-link",
  redirectUris: [LTI_BASE + "/lti-launch"],
  oidcInitUrl: LTI_BASE + "/lti-oidc-init",
};

export function LTISettingsSection() {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<LTIPlatform[]>(initialPlatforms);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<'canvas' | 'moodle' | 'blackboard' | null>(null);
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

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast({
      title: "Copied to clipboard",
      description: "Value has been copied successfully",
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddPlatform = () => {
    if (!newPlatform.name || !newPlatform.url || !newPlatform.clientId) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
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
      title: "Platform added",
      description: "Complete the setup in your LMS to finish connection",
    });
  };

  const handleSync = async (platformId: string) => {
    setIsSyncing(platformId);
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPlatforms(platforms.map(p =>
      p.id === platformId
        ? { ...p, lastSync: new Date().toISOString(), status: 'Connected' as const }
        : p
    ));
    setIsSyncing(null);
    toast({
      title: "Sync complete",
      description: "Platform data has been synchronized",
    });
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(platforms.filter(p => p.id !== platformId));
    toast({
      title: "Platform disconnected",
      description: "The LTI connection has been removed",
    });
  };

  const handleToggleFeature = (platformId: string, feature: keyof LTIPlatform['features']) => {
    setPlatforms(platforms.map(p =>
      p.id === platformId
        ? { ...p, features: { ...p.features, [feature]: !p.features[feature] } }
        : p
    ));
    toast({
      title: "Feature updated",
      description: "Changes will take effect on next launch",
    });
  };

  const openSetupGuide = (type: 'canvas' | 'moodle' | 'blackboard') => {
    setSelectedGuide(type);
    setIsSetupGuideOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Disconnected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Disconnected': return <XCircle className="h-3.5 w-3.5" />;
      case 'Pending': return <AlertTriangle className="h-3.5 w-3.5" />;
      default: return <Plug className="h-3.5 w-3.5" />;
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
    <div className="space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="LTI / VLE Integration"
        description="Connect to Canvas, Moodle, Blackboard and other LMS platforms"
        icon={Plug}
        actions={
          <Button
            className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Platform
          </Button>
        }
      />

      {/* Connection Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">
              {platforms.filter(p => p.status === 'Connected').length}
            </p>
            <p className="text-xs text-muted-foreground">Connected</p>
          </CardContent>
        </Card>
        <Card className="bg-elec-yellow/10 border-elec-yellow/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-elec-yellow">
              {platforms.reduce((sum, p) => sum + p.stats.launches, 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Launches</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-500">
              {platforms.reduce((sum, p) => sum + p.stats.users, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Linked Users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="platforms">
        <TabsList className="grid w-full grid-cols-3 bg-elec-gray">
          <TabsTrigger value="platforms">Connected Platforms</TabsTrigger>
          <TabsTrigger value="config">Tool Configuration</TabsTrigger>
          <TabsTrigger value="guides">Setup Guides</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4 mt-4">
          {platforms.length === 0 ? (
            <Card className="border-dashed border-2 border-elec-yellow/30">
              <CardContent className="p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
                  <Plug className="h-8 w-8 text-elec-yellow" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No platforms connected</h3>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Connect your VLE to enable single sign-on, grade sync, and roster import.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => setIsAddDialogOpen(true)} className="bg-elec-yellow hover:bg-elec-yellow/90 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Platform
                  </Button>
                  <Button variant="outline" onClick={() => openSetupGuide('canvas')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    View Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {platforms.map((platform) => (
                <Card key={platform.id} className="border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className={`h-12 w-12 rounded-lg ${getPlatformColor(platform.type)} flex items-center justify-center shrink-0`}>
                        <Plug className="h-6 w-6 text-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{platform.name}</h3>
                            <p className="text-sm text-muted-foreground">{platform.url}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`${getStatusColor(platform.status)} flex items-center gap-1`}>
                              {getStatusIcon(platform.status)}
                              {platform.status}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-elec-dark border-elec-yellow/20">
                                <DropdownMenuItem onClick={() => {
                                  setSelectedPlatform(platform);
                                  setIsConfigureDialogOpen(true);
                                }}>
                                  <Settings className="h-4 w-4 mr-2" />
                                  Configure
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSync(platform.id)}>
                                  <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing === platform.id ? 'animate-spin' : ''}`} />
                                  Sync Now
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => window.open(platform.url, '_blank')}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Open LMS
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-500 focus:text-red-500"
                                  onClick={() => handleDisconnect(platform.id)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Disconnect
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Feature Toggles */}
                        <div className="flex flex-wrap gap-4 mt-4">
                          <button
                            onClick={() => handleToggleFeature(platform.id, 'deepLinking')}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                          >
                            <Link2 className={`h-4 w-4 ${platform.features.deepLinking ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <span className="text-xs">Deep Linking</span>
                            <Badge variant="outline" className={platform.features.deepLinking ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}>
                              {platform.features.deepLinking ? 'On' : 'Off'}
                            </Badge>
                          </button>
                          <button
                            onClick={() => handleToggleFeature(platform.id, 'gradeSync')}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                          >
                            <FileCheck className={`h-4 w-4 ${platform.features.gradeSync ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <span className="text-xs">Grade Sync</span>
                            <Badge variant="outline" className={platform.features.gradeSync ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}>
                              {platform.features.gradeSync ? 'On' : 'Off'}
                            </Badge>
                          </button>
                          <button
                            onClick={() => handleToggleFeature(platform.id, 'rosterSync')}
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                          >
                            <Users className={`h-4 w-4 ${platform.features.rosterSync ? 'text-green-500' : 'text-muted-foreground'}`} />
                            <span className="text-xs">Roster Sync</span>
                            <Badge variant="outline" className={platform.features.rosterSync ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}>
                              {platform.features.rosterSync ? 'On' : 'Off'}
                            </Badge>
                          </button>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-elec-yellow/10 text-xs text-muted-foreground">
                          <span>{platform.stats.launches.toLocaleString()} launches</span>
                          <span>{platform.stats.courses} courses</span>
                          <span>{platform.stats.users} users</span>
                          {platform.lastSync && (
                            <span>
                              Last sync: {new Date(platform.lastSync).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="config" className="space-y-4 mt-4">
          {/* LTI Tool Configuration */}
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Key className="h-4 w-4 text-elec-yellow" />
                LTI 1.3 Tool Configuration
              </CardTitle>
              <CardDescription>
                Copy these values when registering Elec-Mate in your LMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Tool Launch URL', value: ltiConfig.toolUrl, key: 'toolUrl' },
                { label: 'OIDC Initiation URL', value: ltiConfig.oidcInitUrl, key: 'oidcInitUrl' },
                { label: 'JWKS URL (Public Key Set)', value: ltiConfig.jwksUrl, key: 'jwksUrl' },
                { label: 'Deep Linking URL', value: ltiConfig.deepLinkUrl, key: 'deepLinkUrl' },
                { label: 'Redirect URIs', value: ltiConfig.redirectUris.join(', '), key: 'redirectUris' },
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label className="text-xs text-muted-foreground">{item.label}</Label>
                  <div className="flex gap-2">
                    <Input value={item.value} readOnly className="font-mono text-sm bg-elec-gray border-elec-yellow/20" />
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-elec-yellow/20 hover:bg-elec-yellow/10"
                      onClick={() => copyToClipboard(item.value, item.key)}
                    >
                      {copiedField === item.key ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="border-elec-yellow/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Require State Parameter', desc: 'Enforce state validation for OIDC flow', default: true },
                { label: 'Validate Nonce', desc: 'Prevent replay attacks', default: true },
                { label: 'Auto-provision Users', desc: 'Create accounts on first LTI launch', default: true },
                { label: 'Sync Grades Automatically', desc: 'Push grades to LMS when recorded', default: false },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <Label>{setting.label}</Label>
                    <p className="text-xs text-muted-foreground">{setting.desc}</p>
                  </div>
                  <Switch defaultChecked={setting.default} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Canvas Guide */}
            <Card
              className="cursor-pointer border-elec-yellow/20 hover:border-red-500/50 hover:bg-red-500/5 transition-all group"
              onClick={() => openSetupGuide('canvas')}
            >
              <CardContent className="p-6 text-center">
                <div className="h-14 w-14 mx-auto mb-4 rounded-xl bg-red-500 flex items-center justify-center">
                  <Plug className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Canvas LMS</h3>
                <p className="text-sm text-muted-foreground mb-4">Instructure Canvas setup guide</p>
                <Button variant="outline" className="w-full group-hover:border-red-500/50 group-hover:text-red-500">
                  View Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Moodle Guide */}
            <Card
              className="cursor-pointer border-elec-yellow/20 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
              onClick={() => openSetupGuide('moodle')}
            >
              <CardContent className="p-6 text-center">
                <div className="h-14 w-14 mx-auto mb-4 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Plug className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Moodle</h3>
                <p className="text-sm text-muted-foreground mb-4">Moodle LMS setup guide</p>
                <Button variant="outline" className="w-full group-hover:border-orange-500/50 group-hover:text-orange-500">
                  View Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Blackboard Guide */}
            <Card
              className="cursor-pointer border-elec-yellow/20 hover:border-gray-500/50 hover:bg-gray-500/5 transition-all group"
              onClick={() => openSetupGuide('blackboard')}
            >
              <CardContent className="p-6 text-center">
                <div className="h-14 w-14 mx-auto mb-4 rounded-xl bg-gray-700 flex items-center justify-center">
                  <Plug className="h-7 w-7 text-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Blackboard</h3>
                <p className="text-sm text-muted-foreground mb-4">Blackboard Learn setup guide</p>
                <Button variant="outline" className="w-full group-hover:border-gray-500/50 group-hover:text-gray-400">
                  View Guide
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start */}
          <Card className="border-elec-yellow/20 bg-elec-yellow/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Quick Start Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { step: '1', title: 'Register Tool', desc: 'Add Elec-Mate as an LTI tool in your LMS admin panel' },
                  { step: '2', title: 'Copy Config', desc: 'Use the Tool Configuration values from the Config tab' },
                  { step: '3', title: 'Add Platform', desc: 'Enter your LMS details using the Add Platform button' },
                  { step: '4', title: 'Test Launch', desc: 'Create a test assignment and verify the connection' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-elec-yellow/20 flex items-center justify-center shrink-0 text-elec-yellow font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
              <p className="text-xs text-muted-foreground">
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
            <DialogTitle className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg ${
                selectedGuide === 'canvas' ? 'bg-red-500' :
                selectedGuide === 'moodle' ? 'bg-orange-500' : 'bg-gray-700'
              } flex items-center justify-center`}>
                <Plug className="h-4 w-4 text-foreground" />
              </div>
              {selectedGuide === 'canvas' && 'Canvas LMS Setup Guide'}
              {selectedGuide === 'moodle' && 'Moodle Setup Guide'}
              {selectedGuide === 'blackboard' && 'Blackboard Learn Setup Guide'}
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
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">1</div>
                      Access Developer Keys
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>1. Log in to Canvas as an admin</p>
                    <p>2. Go to <strong>Admin → Developer Keys</strong></p>
                    <p>3. Click <strong>+ Developer Key → + LTI Key</strong></p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">2</div>
                      Configure LTI Key
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Key Name:</strong> Elec-Mate</li>
                      <li><strong>Redirect URIs:</strong> {ltiConfig.redirectUris[0]}</li>
                      <li><strong>Method:</strong> Manual Entry</li>
                      <li><strong>Target Link URI:</strong> {ltiConfig.toolUrl}</li>
                      <li><strong>OpenID Connect Initiation URL:</strong> {ltiConfig.oidcInitUrl}</li>
                      <li><strong>JWK Method:</strong> Public JWK URL</li>
                      <li><strong>Public JWK URL:</strong> {ltiConfig.jwksUrl}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">3</div>
                      Enable Additional Features
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
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
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">4</div>
                      Save and Copy Client ID
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>1. Click <strong>Save</strong></p>
                    <p>2. Set the key state to <strong>ON</strong></p>
                    <p>3. Copy the <strong>Client ID</strong> (shown in Details column)</p>
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
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">1</div>
                      Access External Tools
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>1. Log in to Moodle as an admin</p>
                    <p>2. Go to <strong>Site Administration → Plugins → Activity modules → External tool → Manage tools</strong></p>
                    <p>3. Click <strong>configure a tool manually</strong></p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">2</div>
                      Configure Tool Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Tool name:</strong> Elec-Mate</li>
                      <li><strong>Tool URL:</strong> {ltiConfig.toolUrl}</li>
                      <li><strong>LTI version:</strong> LTI 1.3</li>
                      <li><strong>Public key type:</strong> Keyset URL</li>
                      <li><strong>Public keyset:</strong> {ltiConfig.jwksUrl}</li>
                      <li><strong>Initiate login URL:</strong> {ltiConfig.oidcInitUrl}</li>
                      <li><strong>Redirection URI(s):</strong> {ltiConfig.redirectUris[0]}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">3</div>
                      Enable Services
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
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
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">4</div>
                      Save and Get Credentials
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>1. Click <strong>Save changes</strong></p>
                    <p>2. Click on <strong>View configuration details</strong></p>
                    <p>3. Copy the <strong>Client ID</strong></p>
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
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">1</div>
                      Access LTI Tool Providers
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>1. Log in to Blackboard as an admin</p>
                    <p>2. Go to <strong>System Admin → Integrations → LTI Tool Providers</strong></p>
                    <p>3. Click <strong>Register LTI 1.3/Advantage Tool</strong></p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">2</div>
                      Register the Tool
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>Enter the following values:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Client ID:</strong> (generated by Blackboard)</li>
                      <li><strong>Tool Provider Key:</strong> {ltiConfig.toolUrl}</li>
                      <li><strong>Tool Provider Secret:</strong> (leave blank for LTI 1.3)</li>
                      <li><strong>Tool Provider Domain:</strong> jtwygbeceundfgnkirof.supabase.co</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">3</div>
                      Configure LTI 1.3 Settings
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>In the LTI 1.3 configuration:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>Login Initiation URL:</strong> {ltiConfig.oidcInitUrl}</li>
                      <li><strong>Tool Redirect URL:</strong> {ltiConfig.redirectUris[0]}</li>
                      <li><strong>Tool JWKS URL:</strong> {ltiConfig.jwksUrl}</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="step4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-elec-yellow/20 flex items-center justify-center text-xs font-bold text-elec-yellow">4</div>
                      Complete Registration
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2 pl-9">
                    <p>1. Enable <strong>Course Memberships Service</strong></p>
                    <p>2. Enable <strong>Assignment and Grades Service</strong></p>
                    <p>3. Click <strong>Submit</strong></p>
                    <p>4. Copy the generated <strong>Application ID</strong> (Client ID)</p>
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
              Add Platform
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configure Platform Dialog */}
      <Dialog open={isConfigureDialogOpen} onOpenChange={setIsConfigureDialogOpen}>
        <DialogContent className="max-w-lg bg-elec-dark border-elec-yellow/20">
          <DialogHeader>
            <DialogTitle>Configure {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>
              Update platform settings and features
            </DialogDescription>
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
                  title: "Settings saved",
                  description: "Platform configuration has been updated",
                });
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
