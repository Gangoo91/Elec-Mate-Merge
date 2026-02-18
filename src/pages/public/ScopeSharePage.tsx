import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Check,
  Loader2,
  AlertTriangle,
  MapPin,
  User,
  Home,
  Package,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import SignaturePad from '@/components/forms/SignaturePad';

interface ScopeRoom {
  roomName: string;
  items: { itemDescription: string; quantity: number; unit: string }[];
  notes?: string;
}

interface ScopePrompt {
  promptQuestion: string;
  response: string;
}

interface ScopeData {
  customerName?: string;
  customerEmail?: string;
  propertyAddress?: string;
  propertyPostcode?: string;
  propertyType?: string;
  rooms: ScopeRoom[];
  prompts: ScopePrompt[];
  assumptions?: string;
}

interface ScopeLinkData {
  id: string;
  title: string;
  scope_data: ScopeData;
  assumptions: string;
  company_name: string | null;
  requires_signature: boolean;
  status: string;
  client_name: string | null;
  signature_data: string | null;
  signed_at: string | null;
}

type PageState = 'loading' | 'viewing' | 'signed' | 'error' | 'expired';

export default function ScopeSharePage() {
  const { token } = useParams<{ token: string }>();
  const [pageState, setPageState] = useState<PageState>('loading');
  const [scopeLink, setScopeLink] = useState<ScopeLinkData | null>(null);
  const [error, setError] = useState<string>('');
  const [clientName, setClientName] = useState('');
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load scope data
  useEffect(() => {
    const loadScope = async () => {
      if (!token) {
        setError('Invalid link');
        setPageState('error');
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('scope_share_links')
          .select('*')
          .eq('share_token', token)
          .single();

        if (fetchError || !data) {
          setError('Scope of works not found');
          setPageState('error');
          return;
        }

        if (data.status === 'expired' || data.status === 'revoked') {
          setPageState('expired');
          return;
        }

        if (data.status === 'signed') {
          setScopeLink(data);
          setPageState('signed');
          return;
        }

        // Increment view count
        await supabase
          .from('scope_share_links')
          .update({
            view_count: (data.view_count || 0) + 1,
            last_viewed_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        setScopeLink(data);
        setClientName(data.client_name || data.scope_data?.customerName || '');
        setPageState('viewing');
      } catch {
        setError('Failed to load scope of works');
        setPageState('error');
      }
    };

    loadScope();
  }, [token]);

  const handleSubmitSignature = useCallback(async () => {
    if (!scopeLink || !clientName.trim() || !signatureData) return;
    setIsSubmitting(true);

    try {
      const { error: updateError } = await supabase
        .from('scope_share_links')
        .update({
          client_name: clientName.trim(),
          signature_data: signatureData,
          signed_at: new Date().toISOString(),
          status: 'signed',
        })
        .eq('id', scopeLink.id);

      if (updateError) throw updateError;
      setPageState('signed');
    } catch {
      setError('Failed to save signature');
    } finally {
      setIsSubmitting(false);
    }
  }, [scopeLink, clientName, signatureData]);

  // Loading state
  if (pageState === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
      </div>
    );
  }

  // Error state
  if (pageState === 'error') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Scope Not Found</h1>
        <p className="text-sm text-white">{error}</p>
      </div>
    );
  }

  // Expired state
  if (pageState === 'expired') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-400 mb-4" />
        <h1 className="text-xl font-bold text-white mb-2">Link Expired</h1>
        <p className="text-sm text-white">
          This scope of works link has expired. Please contact your electrician.
        </p>
      </div>
    );
  }

  // Signed confirmation
  if (pageState === 'signed') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4"
        >
          <Check className="h-8 w-8 text-white" />
        </motion.div>
        <h1 className="text-xl font-bold text-white mb-2">Scope Signed</h1>
        <p className="text-sm text-white">
          Thank you. The scope of works has been signed and recorded.
        </p>

        {/* Footer */}
        <div className="mt-8 flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-elec-yellow" />
          <span className="text-xs text-white">Powered by Elec-Mate</span>
        </div>
      </div>
    );
  }

  const scope = scopeLink?.scope_data;
  if (!scope) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/[0.02] backdrop-blur-xl border-b border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 h-14">
          <div className="w-9 h-9 rounded-xl bg-elec-yellow flex items-center justify-center">
            <FileText className="h-5 w-5 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-white truncate">
              {scopeLink?.title || 'Scope of Works'}
            </h1>
            {scopeLink?.company_name && (
              <p className="text-[11px] text-white">{scopeLink.company_name}</p>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4 pb-32">
        {/* Client & property */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">
              {scope.customerName || 'Client'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-white">{scope.propertyAddress || '—'}</span>
          </div>
        </div>

        {/* Property assessment */}
        {scope.prompts.length > 0 && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-white">Property Assessment</h3>
            </div>
            <div className="space-y-1">
              {scope.prompts.map((p, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-white">{p.promptQuestion}</span>
                  <span className="text-white font-medium">{p.response}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rooms */}
        {scope.rooms.map((room, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2"
          >
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-white">{room.roomName}</h3>
            </div>
            {room.items.length > 0 ? (
              <div className="space-y-1">
                {room.items.map((item, j) => (
                  <div key={j} className="flex justify-between text-xs">
                    <span className="text-white">{item.itemDescription}</span>
                    <span className="text-white font-medium">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-white">No items specified</p>
            )}
            {room.notes && <p className="text-xs text-white italic">{room.notes}</p>}
          </div>
        ))}

        {/* Assumptions */}
        {scope.assumptions && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
            <h3 className="text-sm font-semibold text-white">Assumptions & Exclusions</h3>
            <p className="text-xs text-white whitespace-pre-line">{scope.assumptions}</p>
          </div>
        )}

        {/* Signing form */}
        {scopeLink?.requires_signature && pageState === 'viewing' && (
          <div className="space-y-4 pt-4 border-t border-white/[0.06] pb-8">
            <div className="space-y-1">
              <label className="text-xs font-medium text-white">Your Name *</label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter your full name"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-white">Signature *</label>
              <SignaturePad onSignatureChange={(data) => setSignatureData(data)} />
            </div>

            <Button
              onClick={handleSubmitSignature}
              disabled={!clientName.trim() || !signatureData || isSubmitting}
              className="w-full h-12 text-base font-semibold touch-manipulation bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Signing...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Confirm & Sign
                </>
              )}
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 py-2 bg-background/80 backdrop-blur-sm border-t border-white/[0.06] flex items-center justify-center gap-1.5">
        <Zap className="h-3 w-3 text-elec-yellow" />
        <span className="text-[10px] text-white">Powered by Elec-Mate</span>
      </div>
    </div>
  );
}
