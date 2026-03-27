'use client';

import { useEffect, type ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LogProvider } from '@/contexts/LogContext';
import { UserSettingsProvider } from '@/contexts/UserSettingsContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { PanelProvider } from '@/contexts/PanelContext';
import { ConfirmationProvider } from '@/contexts/ConfirmationContext';
import PanelContainer from '@/components/panels/PanelContainer/PanelContainer';
import ToastContainer from '@/components/ToastContainer/ToastContainer';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog/ConfirmationDialog';

export default function WebsiteProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if (isChrome) {
      document.documentElement.classList.add('is-chrome');
      const s = document.createElement('style');
      s.textContent = 'html.is-chrome *,html.is-chrome *::before,html.is-chrome *::after{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}';
      document.head.appendChild(s);
    }
  }, []);

  return (
    <ThemeProvider>
      <LogProvider>
      <UserSettingsProvider>
        <ToastProvider>
          <PanelProvider>
            <ConfirmationProvider>
              {children}
              <PanelContainer />
              <ToastContainer />
              <ConfirmationDialog />
            </ConfirmationProvider>
          </PanelProvider>
        </ToastProvider>
      </UserSettingsProvider>
      </LogProvider>
    </ThemeProvider>
  );
}
