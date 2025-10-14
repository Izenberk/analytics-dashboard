'use client';

/**
 * Client-side Theme Provider for MUI
 *
 * This component must be marked as 'use client' because:
 * 1. MUI's ThemeProvider needs to run in the browser
 * 2. Theme objects contain functions that can't be serialized for Server Components
 * 3. Emotion (MUI's styling solution) requires browser APIs
 *
 * Professional Pattern: Separate providers into dedicated client components
 */

import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "@/theme/theme";

interface ThemeRegistryProps {
  children: React.ReactNode;
}

/**
 * Theme Registry Component
 *
 * Wraps the application with MUI's theme and CSS baseline
 * This is a Client Component that handles all browser-specific MUI setup
 */
export function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}