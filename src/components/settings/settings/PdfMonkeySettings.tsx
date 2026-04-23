import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { pdfMonkeyService } from '@/components/pdf/PdfMonkeyService';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface PdfMonkeySettingsProps {
  onSave?: () => void;
}

export const PdfMonkeySettings: React.FC<PdfMonkeySettingsProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [eicTemplateId, setEicTemplateId] = useState('');
  const [eicrTemplateId, setEicrTemplateId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadConfig = async () => {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const credentials = await offlineStorage.getApiCredentials('pdfMonkey');

      if (credentials.apiKey) setApiKey(credentials.apiKey);
      if (credentials.templateId) setTemplateId(credentials.templateId);

      const eicId = credentials.eicTemplateId;
      const eicrId = credentials.eicrTemplateId;

      if (eicId) setEicTemplateId(eicId);
      if (eicrId) setEicrTemplateId(eicrId);

      if (credentials.apiKey && credentials.templateId) {
        setIsConfigured(true);
        pdfMonkeyService.setConfig(credentials.apiKey, credentials.templateId);
      }
    };
    loadConfig();
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide API key.',
        variant: 'destructive',
      });
      return;
    }

    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.saveApiCredential('pdfMonkey', 'apiKey', apiKey);

    if (templateId.trim()) {
      await offlineStorage.saveApiCredential('pdfMonkey', 'templateId', templateId);
      pdfMonkeyService.setConfig(apiKey, templateId);
    }

    if (eicTemplateId.trim()) {
      await offlineStorage.saveApiCredential('pdfMonkey', 'eicTemplateId', eicTemplateId);
    }
    if (eicrTemplateId.trim()) {
      await offlineStorage.saveApiCredential('pdfMonkey', 'eicrTemplateId', eicrTemplateId);
    }

    setIsConfigured(true);

    toast({
      title: 'Settings Saved',
      description: 'PDF Monkey configuration has been saved successfully.',
    });

    onSave?.();
  };

  const handleTestConnection = async () => {
    if (!apiKey.trim() || !templateId.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please provide both API key and template ID before testing.',
        variant: 'destructive',
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    pdfMonkeyService.setConfig(apiKey, templateId);

    const result = await pdfMonkeyService.testConnection();
    setTestResult(result);
    setIsTesting(false);

    if (result.success) {
      toast({
        title: 'Connection Successful',
        description: 'Successfully connected to PDF Monkey template.',
      });
    } else {
      toast({
        title: 'Connection Failed',
        description: result.error || 'Could not connect to PDF Monkey.',
        variant: 'destructive',
      });
    }
  };

  const handleClear = async () => {
    const { offlineStorage } = await import('@/utils/offlineStorage');
    await offlineStorage.saveApiCredential('pdfMonkey', 'apiKey', null);
    await offlineStorage.saveApiCredential('pdfMonkey', 'templateId', null);
    await offlineStorage.saveApiCredential('pdfMonkey', 'eicTemplateId', null);
    await offlineStorage.saveApiCredential('pdfMonkey', 'eicrTemplateId', null);
    setApiKey('');
    setTemplateId('');
    setEicTemplateId('');
    setEicrTemplateId('');
    setIsConfigured(false);
    setTestResult(null);

    toast({
      title: 'Settings Cleared',
      description: 'PDF Monkey configuration has been cleared.',
    });
  };

  const fields: { id: string; label: string; placeholder: string; value: string; setter: (v: string) => void; description: string; type?: string }[] = [
    {
      id: 'apiKey',
      label: 'PDF Monkey API key',
      placeholder: 'Enter your PDF Monkey API key',
      value: apiKey,
      setter: setApiKey,
      description: 'Available in your PDF Monkey dashboard under API settings.',
      type: 'password',
    },
    {
      id: 'templateId',
      label: 'Minor Works template ID',
      placeholder: 'Enter your Minor Works template ID',
      value: templateId,
      setter: setTemplateId,
      description: 'Template ID for your Minor Works Certificate.',
    },
    {
      id: 'eicTemplateId',
      label: 'EIC template ID',
      placeholder: 'Enter your EIC template ID (UUID format)',
      value: eicTemplateId,
      setter: setEicTemplateId,
      description: 'Template ID for your Electrical Installation Certificate.',
    },
    {
      id: 'eicrTemplateId',
      label: 'EICR template ID',
      placeholder: 'Enter your EICR template ID (UUID format)',
      value: eicrTemplateId,
      setter: setEicrTemplateId,
      description: 'Template ID for your Electrical Installation Condition Report.',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Config card */}
      <section className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
        <header className="px-5 sm:px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <Eyebrow>Integration</Eyebrow>
              <h3 className="mt-1.5 text-lg font-semibold text-white tracking-tight">
                PDF Monkey
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {isConfigured ? (
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                  Configured
                </span>
              ) : (
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-400">
                  Not configured
                </span>
              )}
              {testResult &&
                (testResult.success ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                    Connected
                  </span>
                ) : (
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-red-400">
                    Failed
                  </span>
                ))}
            </div>
          </div>
        </header>

        <div className="px-5 sm:px-6 py-5 space-y-5">
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] p-4">
            <p className="text-[12.5px] text-white/70 leading-relaxed">
              PDF Monkey lets you use custom branded certificate templates. Configure your API
              credentials to generate certificates using your own templates instead of the
              built-in ones.
            </p>
          </div>

          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={field.id} className="text-white font-medium text-[13px]">
                  {field.label}
                </Label>
                <Input
                  id={field.id}
                  type={field.type ?? 'text'}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
                <p className="text-[11.5px] text-white/55">{field.description}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/[0.06]" />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save configuration
            </button>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={!apiKey.trim() || !templateId.trim() || isTesting}
              className="h-11 px-5 rounded-xl border border-white/[0.08] bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? 'Testing…' : 'Test connection'}
            </button>
            {isConfigured && (
              <button
                type="button"
                onClick={handleClear}
                className="h-11 px-5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-[13px] font-medium hover:bg-red-500/20 transition-colors touch-manipulation"
              >
                Clear configuration
              </button>
            )}
          </div>

          {testResult && !testResult.success && (
            <div
              className={cn(
                'rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3'
              )}
            >
              <p className="text-[12.5px] text-red-300 leading-relaxed">
                <span className="font-semibold">Connection error:</span> {testResult.error}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Template requirements */}
      <section className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden">
        <header className="px-5 sm:px-6 py-5 border-b border-white/[0.06]">
          <Eyebrow>Template</Eyebrow>
          <h3 className="mt-1.5 text-lg font-semibold text-white tracking-tight">
            Template requirements
          </h3>
        </header>
        <div className="px-5 sm:px-6 py-5 space-y-3 text-[12.5px] text-white/70 leading-relaxed">
          <p className="font-semibold">Your PDF template should include fields for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Certificate details (certificateNumber, workDate)</li>
            <li>Client information (clientName, propertyAddress)</li>
            <li>Work description (workDescription, workType)</li>
            <li>Supply characteristics (supplyVoltage, earthingArrangement)</li>
            <li>Circuit details (circuitDesignation, protectiveDevice)</li>
            <li>Test results (continuity, insulation, Zs values)</li>
            <li>Declaration (electricianName, position, signatureDate)</li>
          </ul>
          <p className="mt-3">
            <span className="font-semibold">Note:</span> Field names in your template should
            match the form field names for automatic mapping.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PdfMonkeySettings;
