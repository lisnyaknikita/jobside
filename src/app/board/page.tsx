import { Button } from '@/components/ui/button'

export default function BoardPage() {
	return (
		<div className='text-3xl text-center mt-20'>
			Board
			<form action='/logout' method='POST'>
				<Button type='submit'>Log out</Button>
			</form>
		</div>
	)
}
