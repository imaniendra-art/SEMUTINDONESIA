import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/session';

export async function proxy(request: NextRequest) {
  // Update session expiration if present
  const res = await updateSession(request);

  // Protect /admin routes (except login)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('session')?.value;
    
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      await decrypt(sessionCookie);
    } catch (e) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return res || NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
