'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { registerAction } from '@/lib/actions/auth'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useState } from 'react'

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
	const [error, setError] = useState<string | null>(null)

	async function handleSubmit(formData: FormData) {
		const result = await registerAction(formData)
		if (result?.error) setError(result.error)
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
		<Card {...props}>
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>Enter your information below to create your account</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={handleSubmit}>
					{error && <p className='text-red-500 text-sm'>{error}</p>}
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor='name'>Full Name</FieldLabel>
							<Input id='name' type='text' placeholder='John Doe' name='full_name' required />
						</Field>
						<Field>
							<FieldLabel htmlFor='email'>Email</FieldLabel>
							<Input id='email' type='email' placeholder='m@example.com' name='email' required />
							<FieldDescription>
								We&apos;ll use this to contact you. We will not share your email with anyone else.
							</FieldDescription>
						</Field>
						<Field>
							<FieldLabel htmlFor='password'>Password</FieldLabel>
							<Input id='password' type='password' name='password' required />
							<FieldDescription>Must be at least 8 characters long.</FieldDescription>
						</Field>
						<FieldGroup>
							<Field>
								<Button type='submit'>Create Account</Button>
								<Button variant='outline' type='button' onClick={handleGoogleLogin}>
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
