import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://azjgnoxfyygbnquzecyw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6amdub3hmeXlnYm5xdXplY3l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MDkzNjEsImV4cCI6MjA2MzA4NTM2MX0.GmVIOQHpW2daZdESx8Vyct3bJ_OYYNb5IuWhwtUp2K4";

export const supabase = createClient(supabaseURL, supabaseAnonKey)