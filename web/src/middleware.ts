import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userRole = user?.user_metadata?.role

  if (request.nextUrl.pathname.startsWith('/dashboard/creator') && userRole !== 'creator') {
    return NextResponse.redirect(new URL('/dashboard/backer', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/dashboard/backer') && userRole !== 'backer') {
    return NextResponse.redirect(new URL('/dashboard/creator', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
