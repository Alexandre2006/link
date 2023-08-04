// Import Supabase Dependencies
import { createClient } from "@supabase/supabase-js";

// Import credentials
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

// Verify credential validity
if (!PUBLIC_SUPABASE_URL) {
    throw new Error('The PUBLIC_SUPABASE_URL environment variable is not set.');
}

if (!PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('The PUBLIC_SUPABASE_KEY environment variable is not set.');
}

// Create and export supabase client
export const supabase = createClient(PUBLIC_SUPABASE_URL as string, PUBLIC_SUPABASE_ANON_KEY as string);

