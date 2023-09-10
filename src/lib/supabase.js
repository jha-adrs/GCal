import { createClient } from '@supabase/supabase-js'
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
let supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL 
let supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY 

const executeQuery = async (user_id) => {
  const supabase = createServerComponentClient({ cookies })
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("session |", session);
        const data = await supabase.from('profiles')
        .update({calendar_status: 0})
        .eq('id', user_id);
      return data;
}

export {  executeQuery}