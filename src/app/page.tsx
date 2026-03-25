import Link from 'next/link'

export default async function Home() {
	return (
		<div className='text-3xl text-center'>
			Landing page
			<Link href={'/login'}>Log in</Link>
		</div>
	)
}
