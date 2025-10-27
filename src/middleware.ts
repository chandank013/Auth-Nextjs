import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for route protection and redirection
 * This function runs before every request to matched routes (see config below).
 * It controls access based on authentication token stored in cookies.
 */
export function middleware(request: NextRequest) {
  // Get the current URL path (e.g., "/", "/profile", "/login", etc.)
  const path = request.nextUrl.pathname

  /**
   * Define public (unprotected) routes
   * These routes can be accessed without authentication.
   * All other routes will be considered protected.
   */
  const isPublicPath =
    path === '/login' ||
    path === '/signup' ||
    path === '/verifyemail'

  /**
   * Get the JWT token from browser cookies
   * If the user is logged in, the backend should have set this cookie.
   */
  const token = request.cookies.get('token')?.value || ''

  /**
   * Case 1: User is already logged in (has token) but trying to access
   * a public page like login/signup — redirect them to home ("/").
   */
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  /**
   * Case 2: User is not logged in (no token) but trying to access
   * a protected page (like "/" or "/profile") — redirect them to login.
   */
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  /**
   * Case 3: All other cases (valid access)
   * Allow the request to continue normally.
   */
  return NextResponse.next()
}

/**
 * Middleware Configuration
 * The `matcher` defines which routes this middleware applies to.
 * Here, it will run for the homepage, profile, login, signup, and verifyemail routes.
 */
export const config = {
  matcher: [
    '/',          // Home route
    '/profile',   // Profile route
    '/login',     // Login route
    '/signup',    // Signup route
    '/verifyemail'// Email verification route
  ]
}
