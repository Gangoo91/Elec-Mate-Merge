import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elecmate.app',
  appName: 'Elec-Mate',
  webDir: 'dist',

  // Server configuration
  server: {
    // Allow navigation to your Supabase domain for OAuth
    allowNavigation: ['jtwygbeceundfgnkirof.supabase.co', '*.stripe.com'],
    // Enable mixed content for local development
    androidScheme: 'https',
    iosScheme: 'https',
  },

  // Plugin configurations
  plugins: {
    // Splash Screen
    SplashScreen: {
      launchAutoHide: false, // We hide manually after first React paint
      launchFadeOutDuration: 300, // Smooth fade into the app
      backgroundColor: '#0a0a0a', // Dark background matching app
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },

    // Status Bar
    StatusBar: {
      style: 'DARK', // Light text on dark background
      backgroundColor: '#0a0a0a',
    },

    // Push Notifications
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },

    // Keyboard
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },

    // iOS specific
    ios: {
      contentInset: 'automatic',
      allowsLinkPreview: true,
      scrollEnabled: true,
    },
  },

  // iOS specific configuration
  ios: {
    backgroundColor: '#0a0a0a',
    preferredContentMode: 'mobile',
  },

  // Android specific configuration
  android: {
    backgroundColor: '#0a0a0a',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false, // Set to true for debugging
  },
};

export default config;
