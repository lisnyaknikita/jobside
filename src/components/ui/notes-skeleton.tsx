export function NotesSkeleton() {
	return (
		<div className='flex flex-col gap-1.5'>
			{[1, 2, 3].map(i => (
				<div key={i} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/20 animate-pulse'>
					<div className='h-4 bg-muted/60 rounded w-3/4' />
					<div className='h-3 bg-muted/40 rounded w-10 ml-auto' />
				</div>
			))}
		</div>
	)
}
