import { FileText, LayoutGrid, Zap } from 'lucide-react'

const FEATURES = [
	{
		icon: LayoutGrid,
		title: 'Kanban board',
		description: 'Drag and drop applications between stages. Custom columns for your workflow.',
	},
	{
		icon: Zap,
		title: 'AI cover letters',
		description: 'Generate tailored cover letters based on the job description and your experience.',
	},
	{
		icon: FileText,
		title: 'Notes & tracking',
		description: 'Keep notes on every vacancy. Track salary, location, recruiter contacts.',
	},
]

export function Features() {
	return (
		<section className='px-6 md:px-10 mb-20'>
			<p className='text-xs font-medium text-muted-foreground uppercase tracking-widest text-center mb-10'>
				Everything you need
			</p>
			<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
				{FEATURES.map(f => (
					<li key={f.title} className='bg-background border border-border rounded-xl p-5'>
						<div className='size-8 bg-muted rounded-lg flex items-center justify-center mb-3'>
							<f.icon className='size-4 text-muted-foreground' />
						</div>
						<p className='text-sm font-medium mb-1.5'>{f.title}</p>
						<p className='text-sm text-muted-foreground leading-relaxed'>{f.description}</p>
					</li>
				))}
			</ul>
		</section>
	)
}
