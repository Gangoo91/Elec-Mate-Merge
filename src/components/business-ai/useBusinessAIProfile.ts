import { useAuth } from '@/contexts/AuthContext';

export type BusinessAIState = 'sales' | 'onboarding' | 'active';

export function useBusinessAIProfile() {
  const { profile } = useAuth();

  const businessAiEnabled = profile?.business_ai_enabled === true;
  const agentStatus = profile?.agent_status ?? null;
  const isAgentActive = agentStatus === 'active';
  const phoneVerified = profile?.agent_phone_verified === true;
  const whatsappNumber = profile?.agent_whatsapp_number ?? null;

  let state: BusinessAIState = 'sales';
  if (businessAiEnabled && isAgentActive) {
    state = 'active';
  } else if (businessAiEnabled) {
    state = 'onboarding';
  }

  return {
    state,
    profile,
    businessAiEnabled,
    agentStatus,
    isAgentActive,
    phoneVerified,
    whatsappNumber,
  };
}
