export const HTTN_MAGAZINE_URL = 'https://httn.kidspiration.org';

// Local development URL for Supabase Edge Functions, customizable via env
const PROJECT_REF = 'rmprgydhttgrbqxwursx'; // Extracted from deployment logs
const PROD_URL = `https://${PROJECT_REF}.supabase.co/functions/v1/server`;
const LOCAL_URL = 'http://localhost:54321/functions/v1/server';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? PROD_URL : LOCAL_URL);
// In production, this would be: 'https://<project-ref>.supabase.co/functions/v1/make-server-17ebb09b'
