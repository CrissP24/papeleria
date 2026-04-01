import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gpnablxgbcpvsvudnwjm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vw-9SpxOc1rYRAHUj2ocEQ_B3aXr1RK';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
