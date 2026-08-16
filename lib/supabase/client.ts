import { createBrowserClient } from "@supabase/ssr";

import { getSupabaseEnv } from "@/lib/supabase";

export function createClient() {
  const { url, key } = getSupabaseEnv();

  return createBrowserClient(url, key);
}
