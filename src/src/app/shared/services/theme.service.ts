import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'auto';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private currentTheme = signal<Theme>(this.getStoredTheme());

  constructor() {
    // Effect to update color-scheme whenever theme changes
    effect(() => {
      const theme = this.currentTheme();
      if (theme === 'auto') {
        document.documentElement.style.colorScheme = 'light dark';
      } else {
        document.documentElement.style.colorScheme = theme;
      }
      // Store preference in localStorage
      localStorage.setItem('theme', theme);
    });
  }

  /**
   * Get the current theme
   */
  getTheme() {
    return this.currentTheme.asReadonly();
  }

  /**
   * Set the theme to light, dark, or auto (system preference)
   */
  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
  }

  /**
   * Toggle between auto, light, and dark mode
   */
  toggleTheme() {
    const order: Theme[] = ['auto', 'light', 'dark'];
    const current = this.currentTheme();
    const index = order.indexOf(current);
    const next = order[(index + 1) % order.length];
    this.setTheme(next);
  }

  /**
   * Get the effective current theme (resolves 'auto' to actual system preference)
   */
  getEffectiveTheme(): 'light' | 'dark' {
    const theme = this.currentTheme();
    if (theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  }

  /**
   * Check if dark mode is active
   */
  isDarkMode() {
    return this.getEffectiveTheme() === 'dark';
  }

  private getStoredTheme(): Theme {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
      return stored;
    }
    // Default to auto if not set
    return 'auto';
  }
}
