import { createBrowserClient } from "@supabase/ssr";

const PLACEHOLDER_URL = "https://ucazopgrxuuqobdwvpvk.supabase.co";
const PLACEHOLDER_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjYXpvcGdyeHV1cW9iZHd2cHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4OTQ0MDB9.x"; // Fallback key

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY;
  return createBrowserClient(url, anonKey);
}
