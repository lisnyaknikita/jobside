import { MockColumn } from '@/types/landing'

const MOCK_COLUMNS: MockColumn[] = [
	{
		name: 'Wishlist',
		count: 2,
		cards: [
			{ position: 'Product Designer', company: 'Figma', tags: [{ name: 'Remote', color: '#818cf8' }] },
			{ position: 'UX Engineer', company: 'Vercel', tags: [{ name: 'React', color: '#34d399' }] },
		],
	},
	{
		name: 'Applied',
		count: 3,
		cards: [
			{ position: 'Frontend Developer', company: 'Google', tags: [{ name: 'TypeScript', color: '#60a5fa' }] },
			{ position: 'Software Engineer', company: 'Stripe', tags: [{ name: 'Next.js', color: '#34d399' }] },
			{ position: 'React Developer', company: 'Linear', tags: [] },
		],
	},
	{
		name: 'Interview',
		count: 1,
		cards: [
			{
				position: 'Frontend Engineer',
				company: 'Notion',
				tags: [
					{ name: 'React', color: '#818cf8' },
					{ name: 'TS', color: '#60a5fa' },
				],
			},
		],
	},
	{ name: 'Offer', count: 0, cards: [] },
	{
		name: 'Rejected',
		count: 1,
		cards: [{ position: 'iOS Developer', company: 'Apple', tags: [], faded: true }],
	},
]

export function KanbanPreview() {
	return (
		<section className='hidden md:block md:mx-auto md:max-w-180 mb-20 bg-muted/50 border border-border rounded-2xl p-6 overflow-hidden'>
			<ul className='flex gap-4 overflow-x-auto pb-1'>
				{MOCK_COLUMNS.map(col => (
					<li key={col.name} className='flex flex-col w-36 shrink-0 gap-1.5'>
						<div className='flex items-center gap-1.5 mb-1'>
							<span className='text-xs font-medium text-muted-foreground'>{col.name}</span>
							<span className='text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5'>{col.count}</span>
						</div>
						{col.cards.length === 0 ? (
							<div className='h-14 border border-dashed border-border rounded-lg' />
						) : (
							col.cards.map((card, i) => (
								<div
									key={i}
									className='bg-background border border-border rounded-lg p-2.5'
									style={{ opacity: card.faded ? 0.5 : 1 }}
								>
									<p className='text-xs font-medium leading-snug'>{card.position}</p>
									<p className='text-[11px] text-muted-foreground mt-0.5'>{card.company}</p>
									{card.tags.length > 0 && (
										<div className='flex gap-1 mt-1.5 flex-wrap'>
											{card.tags.map(tag => (
												<span
													key={tag.name}
													className='text-[10px] px-1.5 py-0.5 rounded font-medium'
													style={{
														background: tag.color + '22',
														color: tag.color,
														border: `0.5px solid ${tag.color}44`,
													}}
												>
													{tag.name}
												</span>
											))}
										</div>
									)}
								</div>
							))
						)}
					</li>
				))}
			</ul>
		</section>
	)
}
