import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://anoheoskqelbhachmtev.supabase.co'; // Your Supabase URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFub2hlb3NrcWVsYmhhY2htdGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MTM4MzgsImV4cCI6MjA0NDA4OTgzOH0.J_8WpqOOKZs15i53y_cPt69Y7Rz1YgckOO4MKLpBro4'; // Your Supabase anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
