/**
 * Feature flags for controlling application features
 * Toggle these to enable/disable features without deleting code
 */
export const FEATURES = {
  EMAIL_INTEGRATION_ENABLED: false, // Set to true when ready to enable Gmail/Outlook
  WHATSAPP_SHARING_ENABLED: true,
} as const;
