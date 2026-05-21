/**
 * Vercel Speed Insights initialization
 * This script initializes Vercel Speed Insights for tracking web vitals
 * For static HTML sites deployed on Vercel
 */
(function() {
  'use strict';
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Initialize the Speed Insights queue
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };
  
  // Prevent duplicate script injection
  var scriptSrc = '/_vercel/speed-insights/script.js';
  if (document.querySelector('script[src="' + scriptSrc + '"]')) {
    return;
  }
  
  // Create and load the Speed Insights script
  var script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  
  // Add error handler
  script.onerror = function() {
    console.log('[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled and try again.');
  };
  
  // Append to head
  document.head.appendChild(script);
})();
