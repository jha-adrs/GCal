import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
const config = require('../../../config/config.js')
export async function GET(req){
    
    const supabase = createRouteHandlerClient({cookies})
    const {searchParams} = new URL(req.url)
    const code = searchParams.get('code')
    //console.log('callback route',req)
    if(code){
        await supabase.auth.exchangeCodeForSession(code)
          
    }
    return NextResponse.redirect(new URL('/account', req.url))
}