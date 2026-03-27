'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
	const email = formData.get('email') as string
	const password = formData.get('password') as string

	const supabase = await createClient()
	const { error } = await supabase.auth.signInWithPassword({ email, password })

	if (error) return { error: error.message }

	redirect('/board')
}

export async function registerAction(formData: FormData) {
	const email = formData.get('email') as string
	const password = formData.get('password') as string
	const full_name = formData.get('full_name') as string

	const supabase = await createClient()
	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { full_name } },
	})

	if (error) return { error: error.message }

	redirect('/check-email')
}

export async function forgotPasswordAction(formData: FormData) {
	const email = formData.get('email') as string

	const supabase = await createClient()
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
	})

	if (error) return { error: error.message }

	return { success: true }
}

export async function resetPasswordAction(formData: FormData) {
	const password = formData.get('password') as string
	const confirm = formData.get('confirm') as string

	if (password !== confirm) return { error: 'Passwords do not match' }

	const supabase = await createClient()
	const { error } = await supabase.auth.updateUser({ password })

	if (error) return { error: error.message }

	redirect('/login')
}

export async function logoutAction() {
	const supabase = await createClient()
	await supabase.auth.signOut()
	redirect('/login')
}
