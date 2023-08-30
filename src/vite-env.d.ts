/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SUPABASE_ACCESS_TOKEN: string
  readonly VITE_SUPABASE_ID: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
