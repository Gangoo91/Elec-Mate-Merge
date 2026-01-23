package com.elecmate.app;

import android.os.Bundle;
import android.graphics.Color;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Disable edge-to-edge - let status bar have its own space
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);

        // Set status bar to match app background color
        getWindow().setStatusBarColor(Color.parseColor("#0a0a0a"));

        // Set status bar icons to light (white icons for dark background)
        WindowInsetsControllerCompat insetsController = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (insetsController != null) {
            insetsController.setAppearanceLightStatusBars(false);
        }
    }
}
