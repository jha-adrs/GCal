import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req){
    const supabase = createRouteHandlerClient({cookies})
    const { data: {session}} = await supabase.auth.getSession()
    console.log('signout route', JSON.stringify({user_id:session.user.id, user_email: session.user.email, user_name: session.user.user_metadata.full_name}))
    if(session){
        
        await supabase.auth.signOut()
    }
    return NextResponse.redirect(new URL('/', req.url),{
        status:302
    })
}