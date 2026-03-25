'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const [error, setError] = useState<string | null>(null)

	async function handleRegister(e: React.FormEvent) {
		e.preventDefault()

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
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>Enter your information below to create your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='name'>Full Name</FieldLabel>
							<Input
								id='name'
								type='text'
								placeholder='John Doe'
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</Field>
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
							<FieldDescription>
								We&apos;ll use this to contact you. We will not share your email with anyone else.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Password</FieldLabel>
							<Input
								id='password'
								type='password'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
							<FieldDescription>Must be at least 8 characters long.</FieldDescription>
						</Field>
						<FieldGroup>
							<Field>
								<Button type='submit' onClick={handleRegister}>
									Create Account
								</Button>
								<Button variant='outline' type='button'>
									Sign up with Google
								</Button>
								<FieldDescription className='px-6 text-center'>
									Already have an account? <Link href='/login'>Sign in</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	)
}
