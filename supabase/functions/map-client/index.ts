import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    if(req.method === 'GET') {
      // Now we can get the session or user object
      const {
        data: { user },
      } = await supabaseClient.auth.getUser()

      // And we can run queries in the context of our authenticated user
      const { data, error } = await supabaseClient.from('map').select(`
        id, 
        subdomain,
        map_user (id)
      `).eq('map_user.user_id', user.id)

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({ data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    if(req.method === 'POST') {
      const body = await req.json()

      const { subdomain } = body

      // Now we can get the session or user object
      const {
        data: { user },
      } = await supabaseClient.auth.getUser()

      // And we can run queries in the context of our authenticated user
      const mapRes = await supabaseClient.from('map').insert({ subdomain }).limit(1)
      .single()
      
      console.log("MAP RES", mapRes)

      if (mapRes.error) {
        throw mapRes.error
      }
      
      const mapUserRes = await supabaseClient.from('map_user').insert({
        map_id: mapRes.data.id,
        user_id: user.id
      })

      if (mapUserRes.error) {
        throw mapUserRes.error;
      }

      return new Response(JSON.stringify({ data: mapRes.data }), {
        headers: {  ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }
    
  } catch (error) {
    console.log(error)

    return new Response(JSON.stringify({ error: error.message }), {
      headers: {  ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})