import { Zap } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
	return (
		<section className='text-center px-6 md:px-10 py-16 md:py-20'>
			<div className='inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted border border-border rounded-full px-3 py-1 mb-6'>
				<Zap className='size-3' />
				AI-powered cover letter generation
			</div>
			<h1 className='text-3xl md:text-[42px] font-medium leading-tight max-w-xl mx-auto mb-4'>
				Track every job application in one place
			</h1>
			<p className='text-base text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed'>
				Kanban board for your job search. Organize applications, take notes, and generate cover letters with AI.
			</p>
			<div className='flex flex-col sm:flex-row gap-2.5 justify-center'>
				<Link
					href='/register'
					className='text-sm font-medium bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors'
				>
					Start for free
				</Link>
				<Link
					href='/login'
					className='text-sm text-muted-foreground px-6 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors'
				>
					Sign in
				</Link>
			</div>
		</section>
	)
}
