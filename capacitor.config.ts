import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.elecmate.app',
  appName: 'Elec-Mate',
  webDir: 'dist',

  // Server configuration
  server: {
    // Allow navigation to your Supabase domain for OAuth
    allowNavigation: [
      'jtwygbeceundfgnkirof.supabase.co',
      '*.stripe.com',
      '*.youtube.com',
      '*.youtube-nocookie.com',
      '*.googlevideo.com',
      'www.elec-mate.com',
    ],
    // Enable mixed content for local development
    androidScheme: 'https',
    iosScheme: 'https',
  },

  // Plugin configurations
  plugins: {
    // Splash Screen
    // Note: on Android 12+ the system SplashScreen API takes over (configured
    // via AppTheme.NoActionBarLaunch in styles.xml). This Capacitor plugin
    // covers older Android + iOS. CENTER_INSIDE keeps the bulb mark at its
    // authored size instead of zooming to fill the screen like CENTER_CROP.
    SplashScreen: {
      launchAutoHide: false, // We hide manually after first React paint
      launchFadeOutDuration: 300, // Smooth fade into the app
      backgroundColor: '#1c1c1c', // = the app's ground (hsl 0 0% 11%), so splash → app has no flash
      showSpinner: false,
      androidScaleType: 'CENTER_INSIDE',
      splashFullScreen: true,
      splashImmersive: true,
    },

    // Status Bar
    StatusBar: {
      style: 'DARK', // Light text on dark background
      backgroundColor: '#1c1c1c',
    },

    // Push Notifications
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },

    // Keyboard — 'native' shrinks the WebView when the keyboard opens, so
    // fixed bottom sheets sit above the keyboard automatically. On Android
    // the inset is applied by Capacitor's SystemBars plugin; its Android-only
    // `resizeOnFullScreen` workaround conflicts with that and is omitted
    // (SystemBars logs a warning if it is set). ELE-1802.
    Keyboard: {
      resize: 'native',
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
    backgroundColor: '#1c1c1c',
    preferredContentMode: 'mobile',
  },

  // Android specific configuration
  android: {
    backgroundColor: '#1c1c1c',
    allowMixedContent: false,
    // `captureInput` is deliberately NOT set (ELE-1802). It swaps Chromium's
    // input connection for a bare BaseInputConnection meant for games that
    // read raw keys: with it on, Gboard glide typing and suggestions were
    // dead on every field and the focused field was never scrolled above the
    // keyboard, because Chromium's IME adapter never saw the keyboard.
    webContentsDebuggingEnabled: false, // Set to true for debugging
  },
};

export default config;
