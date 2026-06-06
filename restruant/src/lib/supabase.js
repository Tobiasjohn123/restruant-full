import { createClient } from '@supabase/supabase-js';

// Your Supabase project URL
const supabaseUrl = 'https://cnephkhzxkecgplfdehp.supabase.co';

// Your anon key - go to Supabase → Project Settings → API → copy this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZXBoa2h6eGtlY2dwbGZkZWhwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0OTc5MzYsImV4cCI6MjA5NjA3MzkzNn0.mc35PsmedsFxgH7RsuXYYMfvMBnNXyVQ2YqiYbc9-Io';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);