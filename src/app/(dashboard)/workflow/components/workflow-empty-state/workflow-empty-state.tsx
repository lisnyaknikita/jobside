import { LayoutGrid, Rocket } from 'lucide-react'

export function WorkflowEmptyState() {
	return (
		<div className='flex flex-col items-center justify-center h-[calc(100vh-250px)] text-center animate-in fade-in zoom-in duration-500'>
			<div className='relative mb-8'>
				<div className='absolute inset-0 bg-primary/10 blur-3xl rounded-full' />
				<div className='relative bg-background border border-border p-6 rounded-3xl shadow-xl'>
					<LayoutGrid className='size-12 text-primary' />
				</div>
				<div className='absolute -top-3 -right-3 bg-yellow-500 rounded-full p-1.5 shadow-lg animate-bounce'>
					<Rocket className='size-5 text-white' />
				</div>
			</div>
			<div className='max-w-md px-4'>
				<h2 className='text-3xl font-bold tracking-tight text-foreground mb-3'>No Space Selected</h2>
				<p className='text-muted-foreground text-lg mb-10 leading-relaxed'>
					It looks like there is nothing here yet. Pick a workspace from your dashboard or create a brand new one to
					start managing your flow.
				</p>
			</div>
		</div>
	)
}
