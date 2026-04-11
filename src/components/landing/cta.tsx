import Link from 'next/link'

export function CTA() {
	return (
		<footer className='mx-6 md:mx-10 mb-20 bg-muted/50 border border-border rounded-2xl p-8 md:p-12 text-center'>
			<h2 className='text-xl md:text-2xl font-medium mb-3'>Ready to organize your job search?</h2>
			<p className='text-sm text-muted-foreground mb-7'>Free to start. No credit card required.</p>
			<Link
				href='/register'
				className='inline-block text-sm font-medium bg-primary text-primary-foreground px-7 py-2.5 rounded-lg hover:bg-primary/90 transition-colors'
			>
				Create free account
			</Link>
		</footer>
	)
}
