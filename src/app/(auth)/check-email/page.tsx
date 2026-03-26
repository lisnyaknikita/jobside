import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldDescription } from '@/components/ui/field'
import { GalleryVerticalEndIcon } from 'lucide-react'
import Link from 'next/link'

export default function CheckEmailPage() {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10'>
			<div className='flex w-full max-w-sm flex-col gap-6'>
				<Link href='/' className='flex items-center gap-2 self-center font-medium'>
					<div className='flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<GalleryVerticalEndIcon className='size-4' />
					</div>
					Jobside
				</Link>
				<Card>
					<CardHeader className='text-center'>
						<CardTitle className='text-xl'>Check your email</CardTitle>
						<CardDescription>
							We&apos;ve sent a confirmation link to your email. Please click the link in the email to activate your
							account.
						</CardDescription>
					</CardHeader>
					<CardContent className='grid gap-4'>
						<Button variant='outline' className='w-full'>
							<Link href='/login'>Back to login</Link>
						</Button>
					</CardContent>
				</Card>
				<FieldDescription className='px-6 text-center text-xs text-muted-foreground'>
					By clicking continue, you agree to our{' '}
					<Link href='#' className='underline underline-offset-4 hover:text-primary'>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link href='#' className='underline underline-offset-4 hover:text-primary'>
						Privacy Policy
					</Link>
					.
				</FieldDescription>
			</div>
		</div>
	)
}
