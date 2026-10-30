/**
 * Google Analytics 4 & Telemetry Event Tracker Helper
 * Securely logs client interactions, payments, and page navigation.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Fail silently
  }
};

export const trackPageView = (path: string, title?: string) => {
  trackEvent('page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};
