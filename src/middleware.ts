import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forgotpass';
    const token = request.cookies.get('token')?.value || '';

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

//See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/(.*)',
        '/login',
        '/signup',
        '/verifyemail',
        '/forgotpass'
    ]
}