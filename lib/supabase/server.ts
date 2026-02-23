import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const PLACEHOLDER_URL = "https://ucazopgrxuuqobdwvpvk.supabase.co";
const PLACEHOLDER_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjYXpvcGdyeHV1cW9iZHd2cHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4OTQ0MDB9.x"; // Fallback key (needs real one in Vercel)

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || PLACEHOLDER_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || PLACEHOLDER_KEY;
  try {
    return createServerClient(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: object }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component / read-only context
          }
        },
      },
    });
  } catch {
    return createServerClient(PLACEHOLDER_URL, PLACEHOLDER_KEY, {
      cookies: { getAll: () => [], setAll: () => {} },
    });
  }
}
