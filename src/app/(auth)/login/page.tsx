'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)

	async function handleLogin() {
		const supabase = createClient()
		const { error } = await supabase.auth.signInWithPassword({ email, password })
		if (error) {
			setError(error.message)
			return
		}
		router.push('/board')
	}

	async function handleGoogleLogin() {
		const supabase = createClient()
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		})
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='flex flex-col gap-4 w-80'>
				<h1 className='text-2xl font-medium'>Login</h1>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='border rounded-lg px-3 py-2'
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					className='border rounded-lg px-3 py-2'
				/>
				<button onClick={handleLogin} className='bg-black text-white rounded-lg px-3 py-2'>
					Login
				</button>
				<Link href='/register' className='text-sm text-center text-gray-500'>
					Don&apos;t have an account? Sign up
				</Link>
			</div>
			<button
				onClick={handleGoogleLogin}
				className='border rounded-lg px-3 py-2 flex items-center justify-center gap-2'
			>
				Войти через Google
			</button>
		</div>
	)
}
