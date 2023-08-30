import { createClient } from '@supabase/supabase-js'
import { Database } from 'openapi/database.generated'

export const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
)
