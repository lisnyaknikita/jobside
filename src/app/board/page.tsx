export default function BoardPage() {
	return (
		<div className='text-3xl text-center mt-20'>
			Board
			<form action='/logout' method='POST'>
				<button type='submit'>Log out</button>
			</form>
		</div>
	)
}
