'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { resetPasswordAction } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<'div'>) {
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	async function handleSubmit(formData: FormData) {
		setLoading(true)
		setError(null)
		const result = await resetPasswordAction(formData)
		if (result?.error) {
			setError(result.error)
			setLoading(false)
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className='text-center'>
					<CardTitle className='text-xl'>Set new password</CardTitle>
					<CardDescription>Enter your new password below</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={handleSubmit}>
						<FieldGroup>
							{error && <p className='text-sm text-red-500'>{error}</p>}
							<Field>
								<FieldLabel htmlFor='password'>New password</FieldLabel>
								<Input
									id='password'
									name='password'
									type='password'
									placeholder='••••••••'
									required
									disabled={loading}
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor='confirm'>Confirm password</FieldLabel>
								<Input id='confirm' name='confirm' type='password' placeholder='••••••••' required disabled={loading} />
								<FieldDescription>Must be at least 8 characters long.</FieldDescription>
							</Field>
							<Field>
								<Button type='submit' className='w-full' disabled={loading}>
									{loading ? 'Saving...' : 'Save new password'}
								</Button>
								<FieldDescription className='text-center'>
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
