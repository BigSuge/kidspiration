export const HTTN_MAGAZINE_URL = 'https://httn.kidspiration.org';

// Local development URL for Supabase Edge Functions, customizable via env
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:54321/functions/v1/server';
// In production, this would be: 'https://<project-ref>.supabase.co/functions/v1/make-server-17ebb09b'
