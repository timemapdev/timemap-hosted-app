import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.generated.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:4001',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient<Database>(
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

      const mapUserRes = await supabaseClient.from('map_user').select(`
        id, 
        user_id,
        map_id
      `).eq('user_id', user.id)

      if(mapUserRes.error) {
        throw mapUserRes.error
      }

      const mapIds = mapUserRes.data.map(mapUser => mapUser.map_id)

      // And we can run queries in the context of our authenticated user
      const { data, error } = await supabaseClient.from('map').select(`
        id, 
        subdomain,
        north,
        east,
        south,
        west
      `).in('id', mapIds).limit(1)
      .single()

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify({ map: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    if(req.method === 'POST') {
      const body = await req.json()

      const { subdomain, bounds } = body
      const { north, east, south, west } = bounds

      // Now we can get the session or user object
      const {
        data: { user },
        error: userError
      } = await supabaseClient.auth.getUser()

      if(!user) {
        throw new Error("User not found")
      }

      const mapUserInitRes = await supabaseClient.from('map_user').select(`
        id, 
        user_id,
        map_id
      `).eq('user_id', user.id)

      if(mapUserInitRes.error) {
        throw mapUserInitRes.error
      }

      if(mapUserInitRes.data.length > 1) {
        return new Response(JSON.stringify({ data: { message: "Subdomain already in use"}}), {
          headers: {  ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        })
      }

      // And we can run queries in the context of our authenticated user
      const mapRes = await supabaseClient.from('map').insert({ subdomain, north, east, south, west }).limit(1)
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

    if(req.method === 'PUT') {
      const body = await req.json()

      const { id, subdomain, bounds } = body
      const { north, east, south, west } = bounds

      // Now we can get the session or user object
      const {
        data: { user },
        error: userError
      } = await supabaseClient.auth.getUser()

      if(!user) {
        throw new Error("User not found")
      }

      console.log("UPDATE", id, subdomain, bounds)

      // And we can run queries in the context of our authenticated user
      const mapRes = await supabaseClient.from('map').update({ subdomain, north, east, south, west }).eq('id', id).select().single()
      
      console.log("MAP RES PUT", mapRes)

      if (mapRes.error) {
        throw mapRes.error
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