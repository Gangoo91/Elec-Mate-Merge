import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getClientSummaries,
  getClients,
  createClient,
  updateClient,
  deleteClient,
  getClientLinkedRecords,
  getClientDocuments,
  type EmployerClientInput,
} from '@/services/employerClientService';

const CLIENTS_KEY = ['employer-clients'];

export const useClientSummaries = () =>
  useQuery({ queryKey: [...CLIENTS_KEY, 'summaries'], queryFn: getClientSummaries });

export const useClients = () =>
  useQuery({ queryKey: CLIENTS_KEY, queryFn: getClients });

export const useClientLinkedRecords = (clientId: string | undefined) =>
  useQuery({
    queryKey: [...CLIENTS_KEY, clientId, 'linked'],
    queryFn: () => getClientLinkedRecords(clientId as string),
    enabled: !!clientId,
  });

export const useClientDocuments = (clientId: string | undefined) =>
  useQuery({
    queryKey: [...CLIENTS_KEY, clientId, 'documents'],
    queryFn: () => getClientDocuments(clientId as string),
    enabled: !!clientId,
  });

export const useCreateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: EmployerClientInput) => createClient(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: CLIENTS_KEY }),
  });
};

export const useUpdateClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<EmployerClientInput> }) =>
      updateClient(id, updates),
    onSuccess: () => qc.invalidateQueries({ queryKey: CLIENTS_KEY }),
  });
};

export const useDeleteClient = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteClient(id),
    // Refresh the lists but not the deleted client's own queries (its sheet is
    // still mounted while it closes, and refetching a deleted client 403s).
    onSuccess: (_data, id) =>
      qc.invalidateQueries({ queryKey: CLIENTS_KEY, predicate: (q) => q.queryKey[1] !== id }),
  });
};
