
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const rawNext = searchParams.get('next')
    // Ensure "next" is a relative path and does not start with "//" (protocol relative)
    const next = (rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//'))
        ? rawNext
        : '/dashboard'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Successful login. 
            // We could create the profile here, but let's rely on the ProfileListener 
            // to keep logic unified for both OAuth and Email/Password users.

            return NextResponse.redirect(new URL(next, origin))
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/login?error=auth_code_error`)
}
