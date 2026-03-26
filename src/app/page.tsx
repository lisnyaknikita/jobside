import Link from 'next/link'

export default function LandingPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center gap-4'>
			<h1 className='text-4xl font-medium'>Job Tracker</h1>
			<p className='text-gray-500'>Track your job applications in one place</p>
			<div className='flex gap-3 mt-4'>
				<Link href='/login' className='border rounded-lg px-4 py-2 text-sm hover:bg-gray-50'>
					Login
				</Link>
				<Link href='/register' className='bg-black text-white rounded-lg px-4 py-2 text-sm'>
					Get started
				</Link>
			</div>
		</div>
	)
}
