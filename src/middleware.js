import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req, ev) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req,res});
    const {data: {user}} = await supabase.auth.getUser();
    console.log('middleware route', req.url)
    if(user && req.url === '/account') {
        console.log("Extra permissions",req.url)
        return 
    }
    if(user && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/account', req.url));
    }
    
    if( !user && req.nextUrl.pathname !== '/'){
        return NextResponse.redirect(new URL('/', req.url))
    }
    
    return res;
}

export const config = {
    matcher: ['/', '/account'],
  }