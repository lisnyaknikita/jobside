import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'

export function Header() {
	return (
		<header className='flex items-center justify-between px-6 md:px-10 py-5 border-b border-border'>
			<Link href='/' className='flex items-center gap-2 cursor-pointer'>
				<div className='size-7 bg-primary rounded-md flex items-center justify-center'>
					<GalleryVerticalEnd className='size-4 text-primary-foreground' />
				</div>
				<span className='text-[15px] font-medium'>Jobside</span>
			</Link>
			<nav>
				<ul className='flex gap-2.5 items-center'>
					<li>
						<Link
							href='/login'
							className='text-sm text-muted-foreground px-3 md:px-4 py-1.5 border border-border rounded-lg hover:bg-muted transition-colors'
						>
							Sign in
						</Link>
					</li>
					<li>
						<Link
							href='/register'
							className='text-sm bg-primary text-primary-foreground px-3 md:px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors'
						>
							Get started
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
