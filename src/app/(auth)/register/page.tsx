'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [error, setError] = useState<string | null>(null)

	async function handleRegister() {
		const supabase = createClient()
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { full_name: name } },
		})
		if (error) {
			setError(error.message)
			return
		}
		router.push('/check-email')
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='flex flex-col gap-4 w-80'>
				<h1 className='text-2xl font-medium'>Sign up</h1>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
					className='border rounded-lg px-3 py-2'
				/>
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
				<button onClick={handleRegister} className='bg-black text-white rounded-lg px-3 py-2'>
					Sign up
				</button>
				<a href='/login' className='text-sm text-center text-gray-500'>
					Already have an account? Log in
				</a>
			</div>
		</div>
	)
}
