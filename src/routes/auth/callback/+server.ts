import { error, redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Get new session
  const {error: authError, data: authData} = await supabase.auth.getSession()

  // Check if authentication was successful
  console.log("AUTHGENTICATED USER")
  if (authError || !authData) {
    throw error(500, 'Failed to authenticate user')
  } else if (authData.session == null) {
    throw redirect(303, '/login')
  } else {
    throw redirect(303, '/dashboard')
  }
}