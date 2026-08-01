/**
 * Existing Client Select Component
 *
 * Dropdown to select previous fire alarm certificate clients:
 * - Queries previous fire alarm certificates from Supabase
 * - Shows client name, address, and date
 * - Auto-fills client details when selected
 * - Supports filtering/search
 */

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

export interface PreviousClient {
  id: string;
  reportId: string;
  clientName: string;
  clientAddress?: string;
  clientTelephone?: string;
  clientEmail?: string;
  premisesName?: string;
  premisesAddress?: string;
  premisesType?: string;
  floorsCount?: number;
  inspectionDate?: string;
  lastUpdated: string;
}

export interface ClientFormData {
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;
  premisesName: string;
  premisesAddress: string;
  premisesType: string;
  floorsCount: number;
}

interface ExistingClientSelectProps {
  onClientSelect: (client: ClientFormData | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function ExistingClientSelect({
  onClientSelect,
  placeholder = 'Load previous client...',
  className,
  disabled = false,
}: ExistingClientSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [clients, setClients] = React.useState<PreviousClient[]>([]);
  const [selectedClientId, setSelectedClientId] = React.useState<string | null>(null);
  const { toast } = useToast();

  // Fetch previous clients when popover opens
  const fetchPreviousClients = React.useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        setClients([]);
        return;
      }

      // Query fire alarm reports
      const { data, error } = await supabase
        .from('reports')
        .select(
          'id, report_id, client_name, installation_address, inspection_date, updated_at, data'
        )
        .eq('user_id', session.user.id)
        .eq('report_type', 'fire-alarm')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Map to client objects, deduplicating by client name
      const clientMap = new Map<string, PreviousClient>();

      (data || []).forEach((report) => {
        const clientName = report.client_name || report.data?.clientName;
        if (!clientName) return;

        // Use client name as key for deduplication (keep most recent)
        if (!clientMap.has(clientName)) {
          clientMap.set(clientName, {
            id: report.id,
            reportId: report.report_id,
            clientName,
            clientAddress: report.data?.clientAddress || '',
            clientTelephone: report.data?.clientTelephone || '',
            clientEmail: report.data?.clientEmail || '',
            premisesName: report.data?.premisesName || '',
            premisesAddress: report.installation_address || report.data?.premisesAddress || '',
            premisesType: report.data?.premisesType || '',
            floorsCount: report.data?.floorsCount || 1,
            inspectionDate: report.inspection_date || report.data?.inspectionDate,
            lastUpdated: report.updated_at,
          });
        }
      });

      setClients(Array.from(clientMap.values()));
    } catch (error) {
      console.error('[ExistingClientSelect] Failed to fetch clients:', error);
      toast({
        title: 'Failed to load clients',
        description: 'Could not retrieve previous clients.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Fetch when popover opens
  React.useEffect(() => {
    if (open) {
      fetchPreviousClients();
    }
  }, [open, fetchPreviousClients]);

  // Filter clients based on search
  const filteredClients = React.useMemo(() => {
    if (!search.trim()) return clients;

    const searchLower = search.toLowerCase();
    return clients.filter(
      (client) =>
        client.clientName.toLowerCase().includes(searchLower) ||
        (client.premisesAddress && client.premisesAddress.toLowerCase().includes(searchLower)) ||
        (client.premisesName && client.premisesName.toLowerCase().includes(searchLower))
    );
  }, [clients, search]);

  // Handle client selection
  const handleSelect = React.useCallback(
    (clientId: string) => {
      const client = clients.find((c) => c.id === clientId);
      if (!client) return;

      setSelectedClientId(clientId);
      onClientSelect({
        clientName: client.clientName,
        clientAddress: client.clientAddress || '',
        clientTelephone: client.clientTelephone || '',
        clientEmail: client.clientEmail || '',
        premisesName: client.premisesName || '',
        premisesAddress: client.premisesAddress || '',
        premisesType: client.premisesType || '',
        floorsCount: client.floorsCount || 1,
      });

      setOpen(false);
      setSearch('');

      toast({
        title: 'Client loaded',
        description: `Loaded details for ${client.clientName}`,
      });
    },
    [clients, onClientSelect, toast]
  );

  // Format date for display
  const formatDate = (dateStr?: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return '';
    }
  };

  // Get selected client name
  const selectedClient = React.useMemo(() => {
    if (!selectedClientId) return null;
    return clients.find((c) => c.id === selectedClientId);
  }, [selectedClientId, clients]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'w-full h-11 px-3.5 flex items-center justify-between rounded-xl text-left touch-manipulation active:scale-[0.98] transition-all',
            'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <span
            className={cn(
              'truncate text-sm',
              selectedClient ? 'font-medium text-white' : 'text-white/80'
            )}
          >
            {selectedClient ? selectedClient.clientName : placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border-white/[0.08] shadow-xl z-[100]"
        align="start"
        sideOffset={4}
      >
        <Command className="bg-background" shouldFilter={false}>
          <div className="px-3 pt-1 pb-2.5">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients"
              className={searchInputCn}
            />
          </div>
          <CommandList className="max-h-[300px]">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
                <span className="ml-2 text-sm text-white/80">Loading clients…</span>
              </div>
            ) : (
              <>
                <CommandEmpty className="py-6 text-center">
                  <p className="text-white text-sm">
                    {clients.length === 0
                      ? 'No previous fire alarm clients found.'
                      : 'No matching clients.'}
                  </p>
                </CommandEmpty>

                {filteredClients.length > 0 && (
                  <CommandGroup heading="Previous clients" className="py-2">
                    {filteredClients.map((client) => {
                      const isSelected = selectedClientId === client.id;
                      return (
                        <CommandItem
                          key={client.id}
                          value={client.id}
                          onSelect={handleSelect}
                          className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                        >
                          <div
                            className={cn(
                              'w-full rounded-xl p-2.5 cursor-pointer transition-all touch-manipulation active:scale-[0.98]',
                              isSelected
                                ? 'bg-elec-yellow border border-elec-yellow'
                                : 'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]'
                            )}
                          >
                            <span
                              className={cn(
                                'block text-sm font-medium truncate',
                                isSelected ? 'text-black' : 'text-white'
                              )}
                            >
                              {client.clientName}
                            </span>
                            {(client.premisesAddress || client.premisesName) && (
                              <span
                                className={cn(
                                  'block text-xs truncate mt-0.5',
                                  isSelected ? 'text-black/70' : 'text-white/85'
                                )}
                              >
                                {client.premisesName || client.premisesAddress}
                              </span>
                            )}
                            {client.inspectionDate && (
                              <span
                                className={cn(
                                  'block text-xs mt-0.5',
                                  isSelected ? 'text-black/70' : 'text-white/85'
                                )}
                              >
                                Last: {formatDate(client.inspectionDate)}
                              </span>
                            )}
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ExistingClientSelect;
