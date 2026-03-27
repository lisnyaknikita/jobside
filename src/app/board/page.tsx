import { Button } from '@/components/ui/button'

export default function BoardPage() {
	return (
		<div className='w-screen h-dvh flex flex-col'>
			<div className='text-3xl'>Board</div>
			<form action='/logout' method='POST'>
				<Button type='submit'>Log out</Button>
			</form>
		</div>
	)
}
