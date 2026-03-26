'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { forgotPasswordAction } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		setError(null)
		const result = await forgotPasswordAction(formData)
		if (result?.error) {
			setError(result.error)
			setLoading(false)
			return
		}
		setSubmitted(true)
		setLoading(false)
	}

	if (submitted) {
		return (
			<div className={cn('flex flex-col gap-6', className)} {...props}>
				<Card>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl'>Check your email</CardTitle>
						<CardDescription>
							We sent a password reset link to <span className='font-medium text-foreground'>{email}</span>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button variant='outline' className='w-full'>
							<Link href='/login'>Back to login</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Forgot password</CardTitle>
					<CardDescription>Enter your email and we&apos;ll send you a reset link</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={handleSubmit}>
						<FieldGroup>
							{error && <p className='text-sm text-red-500'>{error}</p>}
							<Field>
								<FieldLabel htmlFor='email'>Email</FieldLabel>
								<Input
									id='email'
									name='email'
									type='email'
									placeholder='m@example.com'
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
									disabled={loading}
								/>
							</Field>
							<Field>
								<Button type='submit' className='w-full' disabled={loading}>
									{loading ? 'Sending...' : 'Send reset link'}
								</Button>
								<FieldDescription className='text-center'>
									Remember your password?{' '}
									<Link href='/login' className='underline-offset-4 hover:underline'>
										Back to login
									</Link>
								</FieldDescription>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className='px-6 text-center text-xs text-muted-foreground'>
				By clicking continue, you agree to our <Link href='#'>Terms of Service</Link> and{' '}
				<Link href='#'>Privacy Policy</Link>.
			</FieldDescription>
		</div>
	)
}
