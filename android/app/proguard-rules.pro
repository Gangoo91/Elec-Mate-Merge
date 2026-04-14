# Preserve stack traces so Play Console crash reports remain useful.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# ============================================================================
# Capacitor core — reflection-based plugin loading
# ============================================================================
-keep class com.getcapacitor.** { *; }
-keep class com.getcapacitor.plugin.** { *; }
-keep @com.getcapacitor.annotation.CapacitorPlugin class * { *; }
-keepclassmembers class * {
    @com.getcapacitor.PluginMethod public *;
}

# Capacitor plugins installed in this project
-keep class com.capacitorjs.plugins.** { *; }

# ============================================================================
# RevenueCat (in-app purchases / subscriptions)
# ============================================================================
-keep class com.revenuecat.purchases.** { *; }
-keepclassmembers class com.revenuecat.purchases.** { *; }

# Google Play Billing
-keep class com.android.vending.billing.** { *; }
-keep class com.android.billingclient.api.** { *; }

# ============================================================================
# Firebase / Google Services (FCM push notifications)
# ============================================================================
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }

# ============================================================================
# WebView JavaScript bridge — anything called from JS must survive minification
# ============================================================================
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Capacitor uses reflection for the Bridge
-keep public class * extends com.getcapacitor.Plugin
-keep public class * extends com.getcapacitor.BridgeActivity

# ============================================================================
# Cordova plugins (pulled in via capacitor-cordova-android-plugins)
# ============================================================================
-keep class org.apache.cordova.** { *; }

# ============================================================================
# AndroidX / Kotlin metadata (rarely needed but cheap to keep)
# ============================================================================
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**
-dontwarn org.jetbrains.annotations.**
