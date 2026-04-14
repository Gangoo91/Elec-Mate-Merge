package com.elecmate.app;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Android 15 (API 35+) mandates edge-to-edge — setDecorFitsSystemWindows is
        // ignored. Opt in explicitly and let the WebView handle inset padding itself
        // via CSS env(safe-area-inset-*) which the web code already uses.
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

        // Pad the Capacitor bridge root view with the system bar insets so the
        // WebView content doesn't render underneath the status / nav bars on
        // older APIs. CSS safe-area-inset handles the visual offset — this just
        // ensures the WebView's layout rect reflects the full window.
        final View root = findViewById(android.R.id.content);
        if (root != null) {
            ViewCompat.setOnApplyWindowInsetsListener(root, (v, windowInsets) -> {
                Insets sysBars = windowInsets.getInsets(
                    WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout()
                );
                v.setPadding(sysBars.left, sysBars.top, sysBars.right, sysBars.bottom);
                return WindowInsetsCompat.CONSUMED;
            });
        }
    }
}
