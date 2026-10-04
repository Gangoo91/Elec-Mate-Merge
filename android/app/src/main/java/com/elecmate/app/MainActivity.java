package com.elecmate.app;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Android 15 (API 35+) mandates edge-to-edge. Opt in explicitly on
        // older APIs too so every version behaves the same.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        // Transparent system bars so the WebView can paint edge-to-edge underneath.
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getWindow().setNavigationBarColor(Color.TRANSPARENT);
        }

        // Light icons on the dark app background.
        WindowInsetsControllerCompat insetsController =
            WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (insetsController != null) {
            insetsController.setAppearanceLightStatusBars(false);
            insetsController.setAppearanceLightNavigationBars(false);
        }

        // Window insets — status bar, navigation bar, display cutout AND the
        // keyboard — are handled by Capacitor's SystemBars plugin (registered
        // automatically since Capacitor 8). It pads the decor view by the
        // keyboard height while the keyboard is up, so the WebView shrinks and
        // Chromium scrolls the focused field into view, and it exposes the
        // safe-area insets to CSS. ELE-1802: this activity used to install its
        // own OnApplyWindowInsetsListener on android.R.id.content that padded
        // for the system bars only and returned CONSUMED — it replaced the
        // Keyboard plugin's listener on the same view and swallowed the IME
        // inset, so the keyboard opened over the page. Do not add one back.
    }
}
